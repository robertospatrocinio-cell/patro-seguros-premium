# Expansão aeroportuária — Conferência de apólices empresariais

**Status: prévia editorial, aguardando revisão técnica.** No Lovable, abra `/blog/como-evitar-apolice-inadequada-contratos-empresariais` ou a seção “Leituras para quem administra o contrato” do hub `/seguros-aeroportuarios`.

## Controle de publicação

- O artigo e o card do hub só aparecem nos hosts de prévia previstos pelo projeto, incluindo o ambiente local. Fora deles, a rota mostra a tela de página não encontrada; essa regra não é uma barreira de confidencialidade nem determina por si só o status HTTP.
- A prévia emite `noindex` e não foi incluída no catálogo público do blog, na pré-renderização editorial nem no sitemap. Os dados estruturados descrevem o conteúdo da prévia, sem data de publicação ou indicação de aprovação técnica.

## Validação antes da publicação

1. Confirmar a terminologia e a vigência das referências com o revisor técnico. Verificar escopo, exclusões aeroportuárias, limites, franquias, cobertura à base de reclamações, subcontratados e endossos contra as condições de produtos aplicáveis. Conferir a distinção entre aceitação do risco pela seguradora, aceite documental pela contratante e cobertura de um sinistro. Os exemplos e a matriz são hipotéticos e não descrevem regras do GRU Airport.
2. Confirmar a disponibilidade e pertinência dos links de SUSEP, ANAC, Planalto e concessionária, os destinos internos e o WhatsApp oficial (11) 5199-7500. Para exigências específicas, só citar documentação vigente e aplicável à contratação analisada.
3. Executar `e2e/apolice-contratos-empresariais.spec.ts` com `AIRPORT_EDITORIAL_PREVIEW_ORIGIN` e `AIRPORT_EDITORIAL_PUBLIC_ORIGIN`. O teste contempla a navegação do hub, o índice por teclado, a matriz em telas de 390 e 1280 px, o checklist, os metadados, a paridade das perguntas com os dados estruturados e a ausência do rascunho no site público e no sitemap. Os testes não foram executados neste ambiente. Conferir contraste, navegação com leitor de tela e desempenho no Lovable, especialmente o carregamento da capa.
4. Somente após aprovação registrada, integrar ao fluxo editorial público, registrar datas e revisão reais e validar canônico, links, sitemap, HTML pré-renderizado, dados estruturados e indexabilidade da versão publicada. Incorporar as verificações ao relatório final da vertical.
