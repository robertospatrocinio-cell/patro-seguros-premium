# Correções de arquitetura, links internos e organização da home

## O que a auditoria já confirmou (antes de editar)

Rodei a verificação no código atual do projeto (434 rotas registradas):

1. **Links de WhatsApp malformados: não existem mais no código.** A busca por
   `patroseguros.com.br/+5511`, `href="+55`, `href="/+55` e variantes não
   encontrou nenhum link. As únicas ocorrências de `+551151997500` são o campo
   `telephone` dos dados estruturados, onde esse formato é o correto. A correção
   foi feita em etapa anterior; **o site no ar ainda mostra o problema porque
   não houve publicação depois dessa correção.**
2. **URLs com `%20` / `%22` / título dentro do slug: não existem.** Todas as
   ocorrências de `%20`/`%C3` são texto de mensagem de WhatsApp, e-mail e mapa
   do Google — uso legítimo e obrigatório.
3. **Links internos quebrados: zero.** O verificador automático de links
   (`scripts/check-internal-links.mjs`) passou sem nenhuma rota quebrada. As
   rotas citadas como suspeitas existem ou têm redirecionamento 301 já
   registrado (por exemplo `/corretora-de-seguros-cumbica` →
   `/seguros-guarulhos/cumbica`).

Conclusão: as Fases 1, 2 e 3 já estão resolvidas no código. O que falta é
**publicar** e executar as demais fases.

## Ponto que precisa da sua decisão

A Fase 4 pede Consórcio → `/cotacao?tipo=rc`. No formulário, `rc` é
Responsabilidade Civil, produto diferente de consórcio. Vou usar
`/cotacao?tipo=outros` para consórcio e manter `rc` para Responsabilidade Civil,
salvo orientação contrária.

## O que vou fazer

### Destinos de cotação (Fase 4)
Padronizar os botões de cotação por produto para `/cotacao?tipo=...` (auto,
residencial, vida, saude, empresarial, frota, rc, outros) — a página de cotação
já aceita esses valores e pré-seleciona o produto. Exceção documentada: no
Seguro Auto, os botões de cotação online continuam indo para o SmartBroker,
conforme você definiu antes. Corrigir qualquer CTA de residencial, casa,
apartamento, flat, vida, saúde, empresarial, frota, transporte, carta verde e
consórcio que hoje aponte para `/cotacao-auto`.

### Organização da home (Fases 5 a 10)
Mantendo cores, fontes, imagens, componentes e o formulário exatamente como
estão, apenas reordenando e consolidando blocos:

- Ordem final: Header, Hero, proposta de valor, CTA principal, indicadores de
  confiança, Cotação Express, diferenciais, principais soluções, como funciona,
  depoimentos, autoridade local e sede, bairros atendidos, FAQ comercial, CTA
  final, Rodapé.
- **Produtos:** seis cards principais (Auto, Residencial, Vida, Plano de Saúde,
  Empresarial, Frota) + um único link "Ver todas as soluções" para a página
  pilar. Os demais produtos saem só da home; as páginas continuam no site.
- **Seguradoras:** uma única lista de 8 a 12 marcas, sem repetição no HTML, com
  um link "Ver todas as seguradoras" para `/seguradoras-parceiras`. Se o
  carrossel precisar repetir itens, a repetição fica marcada como decorativa
  para não duplicar conteúdo rastreável.
- **Bairros:** uma única seção "Atendimento em Guarulhos" com os 10 bairros
  prioritários. Hoje Macedo, Gopoúva, Ponte Grande, Jardim Maia e Picanço
  apontam para o hub genérico; vou apontar cada um para a página específica
  quando ela existir e, quando não existir, manter o hub (sem criar página
  nova). Depois, um único link "Ver todos os bairros atendidos".
- **FAQ:** uma única FAQ comercial com as 5 perguntas pedidas e respostas
  presentes no HTML gerado. A segunda FAQ, "Central de Sinistro & Ajuda", sai da
  home e permanece em `/central-de-sinistro`.
- **Topic cluster:** a listagem completa sai da home e fica na página pilar /
  mapa do site; na home ficam só os links estratégicos.

### Dados da entidade (Fases 11 e 12)
O projeto já tem fonte única em `src/config/empresa.ts`. Vou:

- varrer o site por "15+ anos", "30+ anos", "anos de mercado", "desde 2010" e
  trocar por "experiência profissional dos sócios" / "experiência dos
  profissionais", sem mexer em textos que falam de vidas, dias ou percentuais;
- padronizar a frase institucional oficial;
- conferir Política de Privacidade, Termos de Uso, Cotação, Central de Sinistro,
  rodapé e blocos de avaliação, contato e autoridade para que nota e demais
  dados sejam idênticos aos da home.

Sobre a quantidade de avaliações: hoje o site **não publica número de
avaliações** em nenhum lugar (só a nota 4.9). Vou manter assim. Se você quiser
publicar a quantidade, preciso do número oficial atual — não vou estimar.

### Canônicas, sitemap e schemas (Fase 13)
Rodar os validadores já existentes (canônicas, sitemaps, dados estruturados,
status HTTP), remover do sitemap qualquer URL que caia em 404 ou redirecionamento
e garantir domínio único `https://www.patroseguros.com.br`, com breadcrumbs,
og:url e schemas apontando para a URL final.

### Validação (Fase 14)
Build de produção, verificador de links, validadores de SEO e conferência no
navegador em computador e celular (home carregada, H1, `<main>`, destinos de
WhatsApp e de cotação). Depois entrego o relatório com os 12 itens pedidos.

## Limitações que vou declarar no relatório

- **Backup/commit:** não tenho acesso a comandos de Git neste ambiente; o
  histórico é gerenciado pela plataforma. Registro isso como limitação.
- **Publicação:** só acontece com sua aprovação no cartão de publicação. Não
  vou afirmar que algo está no ar antes disso.
- **Indexação no Google:** só pode ser confirmada por você no Search Console.

## Detalhes técnicos

Arquivos principais: `src/pages/Index.tsx` (reordenação e consolidação),
`src/config/empresa.ts` (fonte única já existente), páginas de produto e bairro
com CTA de cotação, `src/data/seoLocalAutoPages.ts` e `src/pages/Sobre.tsx`
(textos de experiência), `scripts/prerender.mjs` e `scripts/seo-content-full.mjs`
(conteúdo estático da home precisa acompanhar a nova organização para o HTML
inicial e a página carregada continuarem alinhados), validadores em `scripts/`.
