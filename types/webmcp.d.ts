/**
 * Minimal types for the WebMCP imperative API (Chrome 149+, `document.modelContext`).
 * Only what the site uses. The older `navigator.modelContext` no longer exists.
 */
export {};

declare global {
  interface ModelContextToolAnnotations {
    readOnlyHint?: boolean;
    consequentialHint?: boolean;
    untrustedContentHint?: boolean;
  }

  interface ModelContextToolDefinition {
    name: string;
    title?: string;
    description: string;
    inputSchema: Record<string, unknown>;
    annotations?: ModelContextToolAnnotations;
    /** Chrome sends the input as a JSON string; the result is returned as text. */
    execute: (input: unknown, client?: { signal?: AbortSignal }) => Promise<string>;
  }

  interface ModelContextRegisteredTool extends Omit<ModelContextToolDefinition, "execute"> {
    origin?: string;
  }

  interface ModelContext extends EventTarget {
    registerTool(
      tool: ModelContextToolDefinition,
      options?: { signal?: AbortSignal },
    ): Promise<void> | void;
    getTools?(options?: { fromOrigins?: string[] }): Promise<ModelContextRegisteredTool[]>;
    executeTool?(
      tool: ModelContextRegisteredTool,
      input?: string,
      options?: { signal?: AbortSignal },
    ): Promise<unknown>;
    ontoolchange?: ((event: Event) => void) | null;
  }

  interface Document {
    modelContext?: ModelContext;
  }
}
