# Blog — datas e consistência editorial (parte 3)

## Escopo e critério editorial

Foram corrigidas 33 publicações com datas posteriores ao limite de 19/11/2026 informado no pedido: 12 de consultórios, 10 de flats, 10 de salas comerciais e 1 estudo de sinistros. As novas datas são uma redistribuição editorial solicitada pelo responsável pelo site, não uma comprovação documental das datas históricas de publicação. É necessário confirmar esse histórico com o responsável editorial antes de tratá-las como datas reais verificadas.

As datas substitutas vão de 12/10/2026 a 14/11/2026, dentro do intervalo autorizado de 15/09/2026 a 16/11/2026. São distintas entre os 33 artigos corrigidos; 15/10, 15/11 e 16/11 foram preservados para os artigos que já tinham essas datas. Datas históricas anteriores ao limite foram mantidas, inclusive duplicidades antigas: não foi reescrito todo o histórico do blog para impor artificialmente um artigo por dia.

## Tabela de datas alteradas

Cada identificador abaixo corresponde à página `/blog/` seguida do identificador.

| Artigo (identificador da URL) | Antes | Nova data ISO |
| --- | --- | --- |
| seguro-consultorio-guarulhos-guia-completo | 2026-11-25 | 2026-10-12 |
| quanto-custa-seguro-consultorio-clinica | 2026-11-25 | 2026-10-13 |
| seguro-consultorio-alugado-sala-comercial | 2026-11-25 | 2026-10-14 |
| seguro-equipamentos-medicos-odontologicos-esteticos | 2026-11-25 | 2026-10-16 |
| rc-profissional-medicos-dentistas-veterinarios | 2026-11-25 | 2026-10-17 |
| cyber-lgpd-clinicas-consultorios | 2026-11-25 | 2026-10-18 |
| clinica-estetica-riscos-seguros | 2026-11-25 | 2026-10-19 |
| consultorio-veterinario-cobertura-refrigeracao-vacinas | 2026-11-25 | 2026-10-20 |
| consultorio-medico-prontuario-eletronico-riscos | 2026-11-25 | 2026-10-21 |
| clinica-pequena-multidisciplinar-seguro | 2026-11-25 | 2026-10-22 |
| lucros-cessantes-consultorio-clinica | 2026-11-25 | 2026-10-23 |
| checklist-seguro-consultorio-clinica-guarulhos | 2026-11-25 | 2026-10-24 |
| seguro-para-flat-o-que-cobre | 2026-12-01 | 2026-10-25 |
| seguro-flat-alugado-proprietario-ou-inquilino | 2026-12-01 | 2026-10-26 |
| seguro-airbnb-locacao-temporada | 2026-12-01 | 2026-10-27 |
| seguro-residencial-cobre-imovel-alugado | 2026-12-01 | 2026-10-28 |
| como-proteger-imovel-mobiliado-para-locacao | 2026-12-01 | 2026-10-29 |
| seguro-fianca-para-flat-como-funciona | 2026-12-01 | 2026-10-30 |
| seguro-imoveis-compactos-sao-paulo-guarulhos | 2026-12-01 | 2026-10-31 |
| flat-como-investimento-quais-seguros-considerar | 2026-12-01 | 2026-11-01 |
| seguro-para-studio-kitnet-flat-diferencas | 2026-12-01 | 2026-11-02 |
| seguro-para-flat-cidade-maia-guarulhos | 2026-12-01 | 2026-11-03 |
| seguro-sala-comercial-guarulhos-o-que-cobre | 2026-12-05 | 2026-11-04 |
| quem-paga-seguro-sala-comercial-proprietario-ou-inquilino | 2026-12-05 | 2026-11-05 |
| seguro-consultorio-medico-guarulhos | 2026-12-05 | 2026-11-06 |
| seguro-clinica-odontologica-guarulhos | 2026-12-05 | 2026-11-07 |
| seguro-escritorio-advocacia-guarulhos | 2026-12-05 | 2026-11-08 |
| seguro-escritorio-contabilidade-guarulhos | 2026-12-05 | 2026-11-09 |
| seguro-sala-alugada-empresa | 2026-12-05 | 2026-11-10 |
| seguro-equipamentos-consultorio-escritorio | 2026-12-05 | 2026-11-11 |
| seguro-coworking-escritorios-compartilhados | 2026-12-05 | 2026-11-12 |
| seguro-para-sala-comercial-cidade-maia-guarulhos | 2026-12-05 | 2026-11-13 |
| estudo-sinistros-prevencao-guarulhos-2026 | 2026-11-20 | 2026-11-14 |

No estudo de sinistros, publicação e revisão foram corrigidas juntas. Nos outros 32 artigos, a revisão usa a própria data de publicação, sem inventar uma atualização posterior.

## Implementação

- `blogDates.ts` valida dias civis ISO e omite datas inválidas ou posteriores ao relógio atual; não substitui por uma falsa data de hoje. A formatação usa UTC para evitar mudança de dia pelo fuso.
- O catálogo exportado por `blogData.ts` normaliza publicação e revisão antes de alimentar listagens, cards, artigos e consumidores de SEO.
- `ArticleSchema` protege também chamadas diretas. Os dados estruturados da rota `/blog/` no pré-render usam o mesmo ISO, sem acrescentar um horário artificial.
- O gerador de sitemap usa a data editorial do artigo; o pós-processamento deixa de restaurar o `lastmod` antigo dos XML publicados por cima dessa correção. A mudança nos XML é produzida no build do Lovable, não por edição manual de centenas de entradas.
- O H1 dos artigos passa a usar o título do catálogo. O template acrescenta um link interno contextual por assunto, sem alterar formulários nem botões de WhatsApp.

## Arquivos desta parte

1. `src/lib/blogDates.ts` (novo)
2. `src/data/blogConsultorioData.ts`
3. `src/data/blogFlatData.ts`
4. `src/data/blogSalaComercialData.ts`
5. `src/lib/blogData.ts`
6. `src/lib/seoMetadata.ts`
7. `src/components/ArticleSchema.tsx`
8. `scripts/generate-sitemap.ts`
9. `scripts/build-sitemap-index.mjs`
10. `src/pages/BlogArticle.tsx`
11. `docs/blog-datas-consistencia-editorial.md` (este relatório)
12. `src/lib/__tests__/blogDates.test.ts` (novo)
13. `src/pages/Blog.tsx`
14. `src/pages/BlogAuthor.tsx`
15. `src/lib/seoMetadata.regression.test.ts`
16. `src/lib/__tests__/blogEditorial.test.ts` (novo)

## Consolidação e limites da validação

As partes 1 e 2 constam como já commitadas no plano: identidade/canonicals/dados estruturados e renderização/conteúdo. Esta etapa não reabre esses escopos nem certifica novamente todos os seus arquivos. A lista acima reúne os arquivos desta parte, inclusive os preparados antes da retomada.

### Verificações no código

- Zero resultados em `src/` para o domínio sem `.br`, para a expressão literal “5 de dezembro de 2026” e para “Salgado Filho” seguido na mesma linha de Centro ou Parque Renato Maia. Essa última busca é restrita: não prova a ausência de endereços divergentes escritos de outras formas.
- Não foram encontradas datas ISO posteriores a 19/11/2026 nos dados de produção em `src/`; os únicos resultados dessa busca foram exemplos intencionalmente futuros nos testes da trava de datas.
- Não se certifica zero ocorrências de Centro como endereço em todo o repositório nem de fallback “Carregando” nas rotas principais/Footer: esses itens pertencem às etapas anteriores e não foram revalidados integralmente nesta retomada. Referências históricas e as datas antigas permanecem neste relatório por rastreabilidade.
- A busca em `index.html` confirmou o tipo InsuranceAgency e sua logo: `https://www.patroseguros.com.br/images/logo-full.webp`. O caminho público exato é `/images/logo-full.webp`, presente na lista de arquivos do projeto. `OrganizationSchema.tsx` é um componente sem emissão própria, documentando que a entidade vem do HTML raiz.
- `BlogArticle.tsx` possui um H1 no template. Agora o título visível e o headline do artigo usam o catálogo; o título e a descrição da página seguem os mesmos valores do pré-render. O título é passado como absoluto para evitar acréscimos diferentes entre o navegador e o HTML gerado. A revisão de exatamente um H1, title e description por HTML final ainda exige execução do build e inspeção do resultado.
- A página do artigo inclui um link contextual para a solução relacionada por assunto. Nenhum formulário ou botão de WhatsApp foi alterado.
- Blog, perfis de autores, artigos e metadados do endereço antigo `/artigos/` deixam de emitir datas vazias/futuras no JSON-LD. A data visível do artigo usa `<time>` com o mesmo ISO.

### Testes e execução

Foram adicionados testes para validação de dias civis, datas futuras, revisão anterior à publicação, última modificação e distribuição das 33 datas. Também foram acrescentadas verificações de alinhamento entre catálogo e metadados e de títulos/descrições distintos entre os artigos corrigidos. Os testes existentes que esperavam horários artificiais foram ajustados para o ISO diário compartilhado.

Não foi possível executar build, TypeScript, testes, navegador ou inspeção do console neste ambiente. Portanto, os testes estão preparados, mas não há declaração de build aprovado ou de ausência de erros em produção. A sincronização dos XML depende do build do Lovable executar o gerador e seu pós-processamento; os arquivos XML em `public/` não foram reescritos manualmente.

A política de metadados do projeto foi preservada: títulos e descrições de artigos não são truncados automaticamente. Nenhuma alegação de dados históricos comprovados, indexação ou posição no Google foi acrescentada. Datas anteriores que já existiam no catálogo foram mantidas; a exigência de dias únicos foi aplicada aos 33 artigos corrigidos, não a todas as publicações históricas.
