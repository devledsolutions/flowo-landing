# Fontes e capturas da landing servidas pelo próprio site

O deploy de `34cea2a` falhou no loader `next/font/google` ao baixar/processar Lora (TypeError em loader.js:122). Os gates de ambiente, produto, marca, consentimento e 211 testes haviam passado no build remoto. A falha e o log foram preservados na evidência local de release.

`next/font/local` passa a usar os WOFF2 dos pacotes @fontsource/poppins e @fontsource/lora já fixados no lockfile. Mantidos as famílias, os pesos 400/500/600/700 de Poppins, 500/600 normal e itálico de Lora, as variáveis CSS e display optional. As licenças acompanham os arquivos servidos. Nenhuma dependência ou configuração externa foi alterada.

Validação: build de produção sem cache local, lint e typecheck; publicação remota e leitura da fonte carregada no navegador registradas separadamente no recibo de release.

As duas capturas reais são PNGs pequenos (97 KB web e 38 KB app). São servidas sem recompressão para preservar os textos da interface, mantendo as dimensões e os arquivos aprovados.
