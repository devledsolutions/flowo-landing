import type { ErroCodigo } from "./tool-names";

/** An expected failure with its own pt-BR code, message and next step for the agent. */
export class ToolError extends Error {
  constructor(
    public readonly codigo: ErroCodigo,
    message: string,
    public readonly comoResolver: string,
    public readonly alternativa?: string,
  ) {
    super(message);
    this.name = "ToolError";
  }
}
