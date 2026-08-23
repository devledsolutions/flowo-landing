#!/usr/bin/env python3
"""Validate the accessibility contract of the published Flowo PDFs."""

from __future__ import annotations

import hashlib
import sys
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public" / "downloads"

PDF_NAMES = (
    "comissoes-sem-planilha-flowo.pdf",
    "clientes-na-hora-de-voltar-flowo.pdf",
    "caixa-e-recebimentos-flowo.pdf",
    "agenda-sem-interrupcao-flowo.pdf",
    "fechamento-equipe-flowo.pdf",
    "retorno-sem-spam-flowo.pdf",
    "guia-completo-barbearia.pdf",
    "referencia-rapida-barbearia.pdf",
    "templates-stories-barbearia.pdf",
    "raio-x-da-agenda-flowo.pdf",
)

EXPECTED_CTA_PATHS = {
    "agenda-sem-interrupcao-flowo.pdf": "/agenda-barbearia-whatsapp",
    "caixa-e-recebimentos-flowo.pdf": "/software-barbearia-com-pix",
    "clientes-na-hora-de-voltar-flowo.pdf": "/flowo-recupera",
    "comissoes-sem-planilha-flowo.pdf": "/recursos/comissoes-barbeiros",
    "fechamento-equipe-flowo.pdf": "/recursos/comissoes-barbeiros",
    "guia-completo-barbearia.pdf": "/",
    "raio-x-da-agenda-flowo.pdf": "/agenda-barbearia-whatsapp",
    "referencia-rapida-barbearia.pdf": "/",
    "retorno-sem-spam-flowo.pdf": "/flowo-recupera",
    "templates-stories-barbearia.pdf": "/",
}

BANNED_COPY = (
    "r$ 197",
    "r$197",
    "teste grátis",
    "teste gratis",
    "jan/2025",
)


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def assert_pdf_contract(path: Path) -> None:
    reader = PdfReader(str(path))
    root = reader.trailer["/Root"]
    mark_info = root.get("/MarkInfo")
    assert mark_info and bool(mark_info.get("/Marked")), "sem /MarkInfo /Marked true"
    assert str(root.get("/Lang")) == "pt-BR", "idioma do catálogo não é pt-BR"

    struct_root = root.get("/StructTreeRoot")
    assert struct_root is not None, "sem /StructTreeRoot"
    struct_root = struct_root.get_object()
    document = struct_root["/K"][0].get_object()
    assert document.get("/S") == "/Document", "raiz semântica não é /Document"
    sections = document["/K"]
    assert len(sections) == len(reader.pages), "uma seção semântica por página é obrigatória"

    parent_tree = struct_root["/ParentTree"].get_object()
    parent_numbers = parent_tree["/Nums"]
    assert len(parent_numbers) == len(reader.pages) * 2, "ParentTree incompleta"
    assert int(struct_root["/ParentTreeNextKey"]) == len(reader.pages), "NextKey incorreta"

    extracted_pages: list[str] = []
    uris: list[str] = []
    for index, page in enumerate(reader.pages):
        assert int(page["/StructParents"]) == index, "StructParents fora de ordem"
        assert page.get("/Tabs") == "/S", "ordem de tabulação não segue a estrutura"
        section = sections[index].get_object()
        assert section.get("/S") == "/Sect", "elemento de página não é /Sect"
        assert int(section.get("/K")) == 0, "MCID semântico inesperado"
        assert section.get("/Pg") == page.indirect_reference, "seção ligada à página errada"

        mapped = parent_numbers[index * 2 + 1][0]
        assert mapped == sections[index], "ParentTree não aponta para a seção da página"
        content = page.get_contents().get_data()
        assert b"/Sect <</MCID 0>> BDC" in content, "stream sem marked content"
        assert content.rstrip().endswith(b"EMC"), "marked content sem fechamento"

        text = page.extract_text() or ""
        assert len(text.strip()) >= 40, "página sem texto extraível suficiente"
        extracted_pages.append(text)
        for annotation in page.get("/Annots", ()):
            annotation = annotation.get_object()
            action = annotation.get("/A")
            if action and action.get_object().get("/URI"):
                uri = str(action.get_object().get("/URI"))
                if uri not in uris:
                    uris.append(uri)

    assert reader.outline, "PDF sem sumário lateral/outlines"
    assert uris, "PDF sem CTA clicável"
    expected_path = EXPECTED_CTA_PATHS[path.name]
    campaign = path.stem
    matching_ctas = []
    for uri in uris:
        parsed = urlparse(uri)
        query = parse_qs(parsed.query)
        if (
            parsed.scheme == "https"
            and parsed.netloc == "www.flowo.com.br"
            and parsed.path == expected_path
            and query.get("utm_source") == ["flowo_material"]
            and query.get("utm_medium") == ["pdf"]
            and query.get("utm_campaign") == [campaign]
            and query.get("utm_content") == ["final_cta"]
        ):
            matching_ctas.append(uri)
    assert len(matching_ctas) == 1, "CTA final ausente, incorreto ou sem atribuição"
    full_text = "\n".join(extracted_pages).casefold()
    for stale_copy in BANNED_COPY:
        assert stale_copy.casefold() not in full_text, f"copy obsoleta: {stale_copy}"


def main() -> int:
    failures: list[str] = []
    for name in PDF_NAMES:
        output = OUTPUT_DIR / name
        public = PUBLIC_DIR / name
        try:
            assert output.exists(), f"arquivo ausente: {output}"
            assert public.exists(), f"arquivo ausente: {public}"
            assert digest(output) == digest(public), "output e public divergem"
            assert_pdf_contract(public)
            print(f"OK  {name}")
        except (AssertionError, KeyError, TypeError, ValueError) as error:
            failures.append(f"FAIL {name}: {error}")

    if failures:
        print("\n".join(failures), file=sys.stderr)
        return 1
    print(f"\n{len(PDF_NAMES)} PDFs tagged e validados.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
