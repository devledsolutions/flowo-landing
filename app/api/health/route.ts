export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return Response.json(
    { ok: true, service: "flowo-landing" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
