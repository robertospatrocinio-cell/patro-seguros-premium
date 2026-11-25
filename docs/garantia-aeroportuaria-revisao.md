# Expansão aeroportuária — Seguro Garantia em revisão

**Status: rascunho editorial, sem aprovação técnica.** No preview Lovable, abra `/blog/seguro-garantia-contratos-aeroportuarios` ou a seção “Leituras para quem administra o contrato” no hub `/seguros-aeroportuarios`.

## Controles de publicação

- A rota só renderiza o artigo nos hosts de preview já aceitos pelo projeto e em desenvolvimento local. Fora deles, apresenta a tela de página não encontrada do aplicativo. Isso não é um controle de confidencialidade nem configura, por si só, um status HTTP 404 no servidor.
- A prévia emite `noindex` e o artigo não foi cadastrado no catálogo editorial público, nas listagens do blog ou no sitemap. O card do hub também só aparece no ambiente de revisão.
- Os dados estruturados descrevem o conteúdo visível na prévia e não incluem data publicada ou autoria técnica não confirmada. No lançamento, registrar apenas autoria, revisão e datas efetivas conforme as práticas editoriais do blog.

## Antes de publicar

1. Solicitar revisão por especialista responsável: confirmar a vigência da Circular SUSEP nº 662/2022 e dos dispositivos legais citados, as descrições das modalidades, o alcance das obrigações, os critérios de aceitação e o tratamento das contragarantias. Conferir a terminologia e as ressalvas com condições de produtos aplicáveis. Não atribuir exigências a concessionárias sem documentação vigente e específica.
2. Validar ao vivo os links institucionais, as rotas relacionadas e o destino do WhatsApp oficial (11) 5199-7500. O exemplo é hipotético; revisar sua separação entre descumprimento, adiantamento e responsabilidade civil.
3. Executar `e2e/garantia-aeroportuaria.spec.ts` com `AIRPORT_EDITORIAL_PREVIEW_ORIGIN` e `AIRPORT_EDITORIAL_PUBLIC_ORIGIN` apontando para as origens correspondentes. Conferir navegação por teclado, contraste e leitura no celular; medir performance e estabilidade em ambiente representativo. Os testes foram preparados, mas não executados neste ambiente.
4. Somente após aprovação, registrar a decisão editorial e integrar o artigo ao fluxo público de blog, metadados, sitemap e pré-renderização. Validar o HTML publicado, o canônico, os dados estruturados e a indexabilidade; manter links de descoberta em páginas relevantes. Consolidar esses resultados no relatório final da vertical.
