"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useSegment } from "@/providers/segment-provider";
import { ToolError } from "@/lib/webmcp/errors";
import { getModelContext } from "@/lib/webmcp/model-context";
import { createUsageReporter } from "@/lib/webmcp/usage";
import type { LeadToolDeps } from "@/lib/webmcp/tools";

const AgentVerificationPanel = dynamic(() => import("./agent-verification-panel"), {
  ssr: false,
});

const VERIFICATION_TIMEOUT_MS = 30_000;
const PENDING_HINT =
  "Peça para a pessoa concluir a verificação na página e chame a ferramenta de novo.";

type PendingVerification = {
  resolve: (token: string) => void;
  reject: (error: ToolError) => void;
  timer: number;
};

/**
 * Registers the site's WebMCP tools once per document, only in browsers that
 * expose `document.modelContext`. The tool code is a separate chunk, so normal
 * visitors download nothing beyond this component. Tools read the current
 * analytics helpers through refs and are never re-registered on re-render.
 */
export function WebMcpTools() {
  const { track, getAcquisitionContext, getAnonymousId } = useSegment();
  const [verifying, setVerifying] = useState(false);
  const pendingRef = useRef<PendingVerification | null>(null);

  const settle = useCallback((outcome: { token: string } | { error: ToolError }) => {
    const pending = pendingRef.current;
    if (!pending) return;
    pendingRef.current = null;
    window.clearTimeout(pending.timer);
    setVerifying(false);
    if ("token" in outcome) pending.resolve(outcome.token);
    else pending.reject(outcome.error);
  }, []);

  const requestTurnstileToken = useCallback((): Promise<string> => {
    // Without a configured site key the server only accepts this in local development.
    if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return Promise.resolve("");
    if (pendingRef.current) {
      return Promise.reject(
        new ToolError(
          "verificacao_pendente",
          "Já existe uma verificação de segurança em andamento.",
          PENDING_HINT,
        ),
      );
    }
    return new Promise<string>((resolve, reject) => {
      const timer = window.setTimeout(
        () =>
          settle({
            error: new ToolError(
              "verificacao_pendente",
              "A verificação de segurança não terminou a tempo.",
              PENDING_HINT,
            ),
          }),
        VERIFICATION_TIMEOUT_MS,
      );
      pendingRef.current = { resolve, reject, timer };
      setVerifying(true);
    });
  }, [settle]);

  const handleToken = useCallback(
    (token: string) => {
      if (token) settle({ token });
    },
    [settle],
  );

  const handleCancel = useCallback(() => {
    settle({
      error: new ToolError(
        "cancelado_pela_pessoa",
        "A pessoa cancelou o envio na página.",
        "Não envie de novo, a menos que a pessoa peça.",
      ),
    });
  }, [settle]);

  const depsRef = useRef<LeadToolDeps>({
    getAcquisitionContext,
    getAnonymousId,
    requestTurnstileToken,
    fetch: (input, init) => window.fetch(input, init),
  });
  const trackRef = useRef(track);

  useEffect(() => {
    depsRef.current = {
      getAcquisitionContext,
      getAnonymousId,
      requestTurnstileToken,
      fetch: (input, init) => window.fetch(input, init),
    };
    trackRef.current = track;
  });

  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;
    const controller = new AbortController();
    let active = true;

    import("@/lib/webmcp/tools")
      .then(async ({ buildTools, registerTools }) => {
        if (!active) return;
        const registered = await registerTools(
          modelContext,
          buildTools(() => depsRef.current),
          createUsageReporter(() => trackRef.current),
          controller.signal,
        );
        if (active) document.documentElement.dataset.webmcp = `registered:${registered}`;
      })
      .catch(() => {
        if (active) document.documentElement.dataset.webmcp = "error";
      });

    return () => {
      active = false;
      controller.abort();
      delete document.documentElement.dataset.webmcp;
    };
  }, []);

  useEffect(
    () => () => {
      const pending = pendingRef.current;
      if (pending) window.clearTimeout(pending.timer);
      pendingRef.current = null;
    },
    [],
  );

  return verifying ? <AgentVerificationPanel onToken={handleToken} onCancel={handleCancel} /> : null;
}
