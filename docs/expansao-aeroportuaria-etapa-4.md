# Expansão aeroportuária · Etapa 4/5: relatório editorial e roteiro de validação

**Status dos três artigos: prévias para revisão técnica. Nenhum foi publicado nesta etapa.** No Lovable, abra o hub `/seguros-aeroportuarios` e procure **Leituras para quem administra o contrato**. O guia pilar é o ponto de partida e direciona o leitor para os dois aprofundamentos, sem reproduzi-los.

| Prévia | Entrega | Pontos para revisão técnica |
| --- | --- | --- |
| [Seguro Garantia para contratos aeroportuários](/blog/seguro-garantia-contratos-aeroportuarios) | Modalidades, comparação com caução e fiança bancária, documentação, exemplo e FAQ. [Ficha de revisão](garantia-aeroportuaria-revisao.md). | Objeto garantido, eventos, aceitação, contragarantias e separação entre garantia e seguros de responsabilidade. Confirmar a Circular SUSEP nº 662/2022 e as condições dos produtos citados. |
| [Como evitar apólices inadequadas](/blog/como-evitar-apolice-inadequada-contratos-empresariais) | Quinze erros com prevenção, matriz ilustrativa, exemplos, checklist e FAQ. [Ficha de revisão](apolice-contratos-empresariais-revisao.md). | Escopo, áreas e exclusões, exposição de subcontratados, franquias, vigência, retroatividade e efeito dos endossos. Distinguir aceite documental, aceitação do risco e cobertura de sinistro. |
| [Guia completo de seguros para fornecedores aeroportuários](/blog/guia-completo-seguros-fornecedores-aeroportuarios) | Doze capítulos, comparativo de dez modalidades, matriz de quinze atividades, checklist imprimível, seis cenários hipotéticos, 33 termos e 21 respostas. | Conferir a distinção entre lei, regulamento, credenciamento, contrato e recomendação. Validar o escopo do RBAC nº 153 na versão vigente, os dispositivos legais, a terminologia e as modalidades conforme o produto. Validar que os exemplos não extrapolam as condições de mercado nem descrevem regras de uma concessionária. |

## Verificação em código

- As três rotas usam a restrição de host de prévia já adotada pelo projeto. Seus cards não aparecem no hub público; os textos não entram no catálogo público do blog nem no sitemap. `noindex` sinaliza a intenção de não indexar a prévia; a restrição de host não protege informação confidencial, nem garante status HTTP 404 fora da prévia. A capa é um arquivo estático.
- O guia usa a identidade visual do hub: abertura em azul-marinho e foto editorial exclusiva (1536 × 1024, cerca de 180 KB). A página e o conteúdo longo são carregados sob demanda; a capa tem dimensões reservadas e prioridade de carregamento. São medidas de implementação, não resultados de performance.
- Metadados e JSON-LD descrevem os textos reais; as respostas do guia e do `FAQPage` vêm da mesma fonte. Não foram acrescentadas datas de publicação nem atribuições de revisão inexistentes. Marcação estruturada não garante destaque nos resultados de pesquisa.
- O guia usa resumo direto, perguntas com respostas identificáveis e contexto explícito para Guarulhos e outros aeroportos brasileiros. Não anuncia vínculo com a GRU Airport nem requisitos específicos da concessionária. A conversão usa somente o WhatsApp oficial **(11) 5199-7500** e também leva à triagem existente no hub.
- As referências são identificáveis por órgão e documento. A disponibilidade dos endereços, a atualidade dos atos e a aplicabilidade de instruções da concessionária ou condições de apólice devem ser confirmadas na revisão. Sem documento vigente e aplicável, não atribuir requisitos a uma concessionária nem tratar exemplos como dados ou confirmações de cobertura.

## Testes de prévia e condições para lançamento

Os testes Playwright foram preparados, mas **não executados neste ambiente**. Com `AIRPORT_EDITORIAL_PREVIEW_ORIGIN` e `AIRPORT_EDITORIAL_PUBLIC_ORIGIN` apontando para os ambientes que receberam a versão, executar:

`npx playwright test e2e/garantia-aeroportuaria.spec.ts e2e/apolice-contratos-empresariais.spec.ts e2e/guia-aeroportuario.spec.ts`

| Área | O que verificar antes de publicar |
| --- | --- |
| Revisão técnica | Registrar revisor, data, evidências, correções e aprovação de cada texto. Conferir as fontes oficiais, os anexos vigentes quando disponíveis e as condições dos produtos relevantes. |
| Links e conversão | Conferir destinos internos, fontes externas ao vivo e abertura do número oficial, sem enviar mensagem. Abrir os três rascunhos a partir do hub e validar a rota para E&O e a âncora de triagem. |
| Responsividade e acessibilidade | Conferir em 390 e 1280 px e complementar com tela de 320 px, zoom, teclado, leitor de tela, contraste e foco. Verificar navegação por capítulos, rolagem das tabelas, abertura de respostas e impressão legível só do checklist. |
| SEO, GEO e AEO | Validar título, descrição, imagem, canônico, hierarquia, paridade do JSON-LD, síntese inicial e clareza das respostas. Conferir se as menções geográficas separam o local de atendimento da eventual área de atuação do prestador. |
| Indexabilidade | Na prévia, conferir `noindex` e ausência dos três artigos da descoberta pública. Só após aprovação integrar ao fluxo do blog, datas reais, listagens, metadados, sitemap e pré-render. No lançamento, checar HTML inicial, status, canônico, robots, sitemap e inspeção no Search Console. |
| Performance | Conferir peso e resposta da capa, ausência de salto de layout, carregamento inicial e navegação do hub em dispositivo móvel. Medir LCP, CLS e INP em ambiente representativo e registrar os resultados antes de liberar. |
