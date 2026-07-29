import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { generateSpeech } from "ai";
import { gateway } from "@ai-sdk/gateway";

const FULL_SCRIPT =
  "Sabe aquelas mensagens que chegam bem na hora do corte? A Flowo responde por você. A inteligência artificial conversa com o cliente pelo WhatsApp, entende o serviço e consulta os horários de cada profissional. O cliente escolhe. A agenda atualiza na hora. E a confirmação acontece ali mesmo, sem trocar de aplicativo. Você acompanha tudo pelo painel e, quando quiser, sua equipe assume a conversa. Agenda, comandas e histórico, no mesmo fluxo. E, se fizer sentido para a sua barbearia, você ainda pode ativar pagamentos integrados e cashback. Flowo. Sua barbearia trabalhando. Sua recepção, sempre pronta.";

const SAMPLE_SCRIPT =
  "Sabe aquelas mensagens que chegam bem na hora do corte? A Flowo responde por você. O cliente escolhe um horário, a agenda atualiza na hora e a confirmação acontece ali mesmo.";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...value] = arg.replace(/^--/, "").split("=");
    return [key, value.join("=") || true];
  }),
);

const gatewayApiKey = process.env.AI_GATEWAY_API_KEY;
const model = String(args.model || "xai/grok-tts");
const voice = String(args.voice || "ara");
const mode = String(args.mode || "full");
const outputPath = resolve(
  String(
    args.output ||
      `public/videos/source/flowo-institucional-voz-${voice}-${mode}.wav`,
  ),
);
const script = mode === "sample" ? SAMPLE_SCRIPT : FULL_SCRIPT;
const speechText = script
  .replace("bem na hora do corte? ", "bem na hora do corte? [pause] ")
  .replace(
    "A Flowo responde por você. ",
    "A Flowo responde por você. [pause] ",
  )
  .replace(
    "sem trocar de aplicativo. ",
    "sem trocar de aplicativo. [pause] ",
  )
  .replace(
    "pagamentos integrados e cashback. ",
    "pagamentos integrados e cashback. [pause] ",
  )
  .replace(
    "Flowo. Sua barbearia trabalhando.",
    "[pause] Flowo. Sua barbearia trabalhando.",
  );

if (!gatewayApiKey) {
  throw new Error(
    "AI_GATEWAY_API_KEY não está disponível. Execute com um arquivo de ambiente seguro.",
  );
}

const result = await generateSpeech({
  model: gateway.speechModel(model),
  text: speechText,
  voice,
  outputFormat: "wav",
  language: "pt-BR",
  speed: 0.96,
});

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, result.audio.uint8Array);

console.log(
  JSON.stringify({
    output: outputPath,
    model,
    voice,
    mode,
    warnings: result.warnings,
    transcript: script,
  }),
);
