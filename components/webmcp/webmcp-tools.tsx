"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useSegment } from "@/providers/segment-provider";
import {
  createConfirmationController,
  type ConfirmationController,
  type ConfirmationView,
} from "@/lib/webmcp/confirmation";
import { getModelContext } from "@/lib/webmcp/model-context";
import { createUsageReporter } from "@/lib/webmcp/usage";
import type { LeadToolDeps } from "@/lib/webmcp/tools";

const AgentConfirmationPanel = dynamic(() => import("./agent-confirmation-panel"), {
  ssr: false,
});

function announcementFor(view: ConfirmationView): string {
  if (!view) return "";
  return view.step === "verify"
    ? "Autorizado. Fazendo uma verificação de segurança antes de enviar."
    : "Um assistente de IA quer enviar seus dados à Flowo. Confira os dados e escolha Autorizar e enviar ou Cancelar.";
}

/**
 * Registers the site's WebMCP tools once per document, only in browsers that
 * expose `document.modelContext`. The tool code is a separate chunk, so normal
 * visitors download nothing beyond this component. Contact tools wait for the
 * visitor's own click in the confirmation panel. Tools read the current
 * analytics helpers through refs and are never re-registered on re-render.
 */
export function WebMcpTools() {
  const { track, getAcquisitionContext, getAnonymousId } = useSegment();
  const [view, setView] = useState<ConfirmationView>(null);
  const [enabled, setEnabled] = useState(false);
  const controllerRef = useRef<ConfirmationController | null>(null);
  if (controllerRef.current === null) {
    controllerRef.current = createConfirmationController({
      needsVerification: () => Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
      onChange: setView,
    });
  }
  const controller = controllerRef.current;

  const depsRef = useRef<LeadToolDeps>({
    getAcquisitionContext,
    getAnonymousId,
    confirmSubmission: (request, signal) => controller.request(request, signal),
    fetch: (input, init) => window.fetch(input, init),
  });
  const trackRef = useRef(track);

  useEffect(() => {
    depsRef.current = {
      getAcquisitionContext,
      getAnonymousId,
      confirmSubmission: (request, signal) => controller.request(request, signal),
      fetch: (input, init) => window.fetch(input, init),
    };
    trackRef.current = track;
  });

  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;
    // The live region exists from here on, before any request can fill it.
    setEnabled(true);
    const abortController = new AbortController();
    let active = true;

    import("@/lib/webmcp/tools")
      .then(async ({ buildTools, registerTools }) => {
        if (!active) return;
        const registered = await registerTools(
          modelContext,
          buildTools(() => depsRef.current),
          createUsageReporter(() => trackRef.current),
          abortController.signal,
        );
        if (active) document.documentElement.dataset.webmcp = `registered:${registered}`;
      })
      .catch(() => {
        if (active) document.documentElement.dataset.webmcp = "error";
      });

    return () => {
      active = false;
      abortController.abort();
      delete document.documentElement.dataset.webmcp;
    };
  }, []);

  useEffect(() => () => controller.dispose(), [controller]);

  if (!enabled) return null;
  return (
    <>
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true" data-webmcp-live="">
        {announcementFor(view)}
      </div>
      {view ? (
        <AgentConfirmationPanel
          key={view.id}
          view={view}
          onApprove={controller.approve}
          onCancel={controller.cancel}
          onToken={controller.provideToken}
        />
      ) : null}
    </>
  );
}
