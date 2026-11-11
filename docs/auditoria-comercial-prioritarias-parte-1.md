# Auditoria comercial — parte 1 de 3

## Escopo e limites

Trabalho exclusivamente na **main**, conforme a última instrução do responsável. Esta entrega trata das páginas comerciais prioritárias; não representa conclusão da auditoria integral do site. Nenhuma URL, regra de indexação, redirecionamento, registro de cliente ou configuração de produção foi removido ou alterado.

A análise foi feita no código do repositório. Não houve navegação no site publicado, consulta ao Search Console, execução de build, testes automatizados ou verificação de apólices reais. Ausência de referência junto a uma afirmação não prova que a empresa não tenha documentação externa: os números foram retirados destas páginas até eventual validação comercial.

## Arquitetura identificada

- Vite, React 18, TypeScript, React Router 6, Tailwind 3 e componentes shadcn/Radix.
- Rotas em `src/App.tsx`, com carregamento sob demanda das páginas. Confirmadas as rotas `/seguro-auto`, `/seguro-auto-guarulhos` e `/seguro-residencial-guarulhos`.
- Páginas locais baseadas em `SeoLocalPage` e dados de `seoLocalAutoPages.ts`; páginas de produto reutilizam `InsurancePageTemplate`.
- `PageMeta` controla título, descrição e canonical; schemas também são fornecidos pelos componentes das páginas.
- Há três fontes editoriais relevantes: página React, texto complementar de `seoServiceContent.ts` e HTML inicial de `scripts/seo-content-full.mjs`. Corrigir apenas a página deixaria afirmações antigas nas outras fontes.
- Captação existente por formulários e WhatsApp, com eventos de rastreamento. Supabase, React Query e ferramentas de monitoramento constam nas dependências. Nenhuma integração foi modificada nesta etapa.
- Identidade visual, logotipo, navegação, formulários, imagens e componentes compartilhados foram preservados.

## Inventário prioritário de URLs

| URL | Modalidade / local | Situação nesta etapa |
| --- | --- | --- |
| `/seguro-auto` | Auto / Guarulhos | FAQs, coberturas, processo, hero, schemas e links comerciais revisados |
| `/seguro-auto-guarulhos` | Auto / Guarulhos | Página, cards de bairros/modelos, conteúdo complementar e HTML inicial revisados |
| `/seguro-residencial-guarulhos` | Residencial / Guarulhos | Página, conteúdo complementar e HTML inicial revisados |
| `/seguro-auto-pimentas` | Auto / Pimentas | Dados atuais já sem preços e percentuais; revisão preservada |
| `/seguro-auto-pimentas-guarulhos` | Auto / Pimentas | Mesma situação; duplicidade de URL será avaliada na parte 2 |
| `/seguro-auto-bonsucesso-guarulhos` | Auto / Bonsucesso | Dados atuais já sem preços e percentuais; revisão preservada |
| `/seguro-auto-bonsucesso-guarulhos-v2` | Auto / Bonsucesso | Mesma situação; duplicidade de URL será avaliada na parte 2 |

As URLs de bairros foram identificadas nos dados de `seoLocalAutoPages.ts`. Seu comportamento HTTP e eventual redirecionamento precisam de verificação separada. O inventário completo, inclusive Ponte Grande e cruzamentos produto/bairro, fica para a parte 2. Não há dados de indexação disponíveis nesta análise.

## Evidências comprovadas no código antes das alterações

| Fonte | Evidência | Tratamento |
| --- | --- | --- |
| `SeguroAuto.tsx`, FAQ de rastreador | Limiar de R$ 80 mil e redução de 8% a 18%, sem referência junto ao texto | Substituídos por avaliação individual e custos/exigências da proposta |
| Mesmo arquivo, FAQ de transferência | Mais de 60% de casos com preço melhor; preservação incondicional de bônus/coberturas | Removidos percentual e garantia; explicadas as regras de análise |
| Mesmo arquivo, schema local | Economia de até 35% e retorno em até duas horas | Descrição neutra e coerente com a cotação personalizada |
| Mesmo arquivo, coberturas/processo | Indenização de 100% da FIPE e proteção imediata após assinatura | Critérios contratuais, aceitação, exigências e vigência explicitados |
| Mesmo arquivo, links relacionados | Residencial de R$ 150/ano, desconto de 15%, frota com economia de 30%, faixa de BYD chamada de real | Valores e promessas retirados; links preservados |
| `SeoSeguroAutoGuarulhos.tsx` | Faixas por veículo/bairro, classificação pública de risco e exemplos apresentados como sinistros reais sem fonte associada | Removidos preços e classificações dos cards, casos e resultados não documentados; orientações específicas para auto |
| `SeoSeguroResidencialGuarulhos.tsx` | Preço mínimo e benefícios apresentados de forma abrangente, exemplos de sinistros sem comprovação associada | Cotação individual; limites e exclusões por cobertura; casos retirados |
| `seoServiceContent.ts`, auto | Sinistralidade 40% maior, economia de 15% a 35% e ranking sem referência verificável junto ao conteúdo | Retirados números e inferências sobre bairros |
| Mesmo arquivo, residencial | Inglês involuntário `with`, preço inferior a R$ 1/dia e assistência incluída | Português corrigido e contratação/limites explicitados |
| `seo-content-full.mjs`, auto | Economia de 15% a 30%, cotação em um minuto e depoimentos com valores/prazos sem fonte associada | HTML inicial revisado, sem essas afirmações ou depoimentos |
| Mesmo arquivo, residencial | R$ 25/mês, confusão entre residencial e fiança e inclusão de alagamento no vendaval | Modalidades e eventos separados; preço e depoimentos sem referência retirados |

Não se conclui que os depoimentos sejam falsos: sua origem e autorização não estavam vinculadas aos trechos analisados. As fontes e condições comerciais necessárias para republicação estão nas pendências abaixo.

## Correções editoriais e técnicas de conteúdo

- Explicações diferentes para auto e residencial, sem repetir um aviso genérico em todas as seções.
- Auto: terceiros, vidros, acessórios, rastreador, carro reserva e guincho sujeitos às condições de contratação; uso profissional precisa ser declarado.
- Residencial: edificação versus conteúdo, vendaval versus alagamento, condomínio versus individual e home office sujeitos à proposta.
- Removida da FAQ principal a afirmação ampla de que toda proteção veicular opera sem regulação; recomendada consulta oficial da entidade e do contrato.
- HTML inicial e texto complementar das duas páginas locais também foram revisados para não manter preços e traduções antigas fora da experiência React.
- Não alterados canonical, robots, sitemap, redirecionamentos nem regras de formulários. Revisão técnica completa permanece na parte 3.

## Arquivos alterados

1. `src/pages/SeguroAuto.tsx`
2. `src/pages/SeoSeguroAutoGuarulhos.tsx`
3. `src/pages/SeoSeguroResidencialGuarulhos.tsx`
4. `src/data/seoServiceContent.ts` — somente auto e residencial de Guarulhos
5. `scripts/seo-content-full.mjs` — somente as duas rotas de Guarulhos acima
6. `src/data/priorityCommercialContent.test.ts` — novos testes de regressão
7. `docs/auditoria-comercial-prioritarias-parte-1.md` — esta entrega

## Verificações e testes

**Executado:** inspeção estática dos componentes, dados e rotas; busca após a edição de `SeguroAuto.tsx` por moeda, percentuais e promessas. Essa busca não encontrou preços ou descontos comerciais restantes nesse arquivo; percentuais das classes de gradiente são apenas CSS.

**Adicionado, não executado:** `priorityCommercialContent.test.ts` cobre fontes prioritárias, ausência de preços/descontos sem referência, remoção de casos, manutenção de componentes de captação, limites de metadados e mínimo de conteúdo inicial. Também preserva verificações de Pimentas e Bonsucesso. A suíte existente `localContentSafety.test.ts` já verifica as páginas de auto por bairro.

**Execução pendente:** Vitest para os dois arquivos acima, validação de metadados, validação de contagem de palavras, build completo e teste de cotação/WhatsApp em desktop e celular. O ambiente desta sessão não disponibiliza execução desses comandos; nenhum resultado aprovado de teste ou build é alegado. Manter validação antes de liberar publicação.

## Pendências comerciais e ações que exigem aprovação

- Validar os novos textos técnicos com o responsável comercial, usando as condições vigentes de cada produto/seguradora.
- Para republicar preço ou economia: apresentar seguradora/produto, fonte, data-base, amostra, perfil, local, coberturas, franquias, parcelamento, metodologia e validade. Não basta indicar que o valor é ilustrativo.
- Para casos/depoimentos: confirmar registro, autorização, texto original e contexto; resultado individual não deve virar promessa de resultado futuro.
- Confirmar carteira atual de parceiros, disponibilidade de produtos, SLA de retorno, número de clientes e métricas de avaliações. A prova social compartilhada existente não foi auditada nem homologada nesta etapa.
- Permanecem fora desta entrega afirmações em outras páginas, inclusive cotação local, residencial geral, modelos, blog e fontes institucionais. Textos como `with` e percentuais em outras modalidades de `seoServiceContent.ts` ainda precisam de revisão.
- Nenhuma consolidação, desindexação ou mudança de endereço de página foi executada. Qualquer recomendação desse tipo dependerá do inventário, tráfego e autorização específica.

## Próximas partes

2. Inventário completo e classificação individual das páginas de bairros, incluindo Pimentas, Bonsucesso e Ponte Grande.
3. SEO técnico, centralização institucional e consolidação das evidências e pendências restantes.
