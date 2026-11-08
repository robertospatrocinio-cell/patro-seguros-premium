# Revisão dos títulos e descrições para resultados de busca

## Conclusão e alcance

Há oportunidades editoriais de melhoria, mas não há nesta análise uma medição que comprove CTR baixo ou aumento de cliques. A revisão foi feita no código, sem consultar os resultados exibidos atualmente pelo Google nem executar testes ou build.

Foram priorizadas cinco páginas comerciais: seguro auto, moto, vida, empresarial e planos de saúde. A página de seguro residencial já tinha um texto específico e adequado: ele foi preservado na página e sincronizado com o HTML estático. Não foi feita uma reescrita em massa de todas as páginas, bairros ou artigos.

## Problemas identificados

- Seguro auto destacava economia de até 35% e resposta em até duas horas. Esses resultados não foram comprovados nesta revisão; deixaram de ser o argumento da descrição.
- Moto, vida e empresarial usavam prazo de cotação de duas horas nos metadados da página. Os novos textos priorizam comparação e orientação, sem assumir um prazo universal.
- Planos de saúde destacava quantidade de operadoras; agora explicita critérios úteis à escolha: rede, carência e coparticipação.
- As versões estáticas de moto, vida, empresarial, residencial e saúde tinham textos diferentes dos publicados pelo React, alguns bastante genéricos. As duas versões foram alinhadas nas seis páginas revisadas.
- O componente de metadados pode acrescentar a marca. Os novos títulos já contêm “Patro Seguros”, evitando a duplicação do sufixo nessas páginas.

## Textos finais

| Página | Título | Descrição |
| --- | --- | --- |
| `/seguro-auto` | Seguro Auto em Guarulhos: Compare Cotações \| Patro Seguros | Compare coberturas, franquias e assistência para seu seguro auto em Guarulhos. Peça uma cotação à Patro e escolha com orientação de um corretor. |
| `/seguro-moto` | Seguro de Moto em Guarulhos: Compare \| Patro Seguros | Seguro de moto em Guarulhos: compare opções contra roubo, furto e colisão. Confira assistência e franquias antes de contratar. Peça sua cotação. |
| `/seguro-vida` | Seguro de Vida em Guarulhos: Compare \| Patro Seguros | Seguro de vida em Guarulhos: compare opções para morte, invalidez e doenças graves. Defina a proteção da sua família com a Patro. Solicite uma cotação. |
| `/seguro-empresarial` | Seguro Empresarial em Guarulhos: Cote \| Patro Seguros | Seguro empresarial em Guarulhos: compare opções para estoque, equipamentos e lucros cessantes. Solicite uma análise das coberturas com a Patro. |
| `/planos-de-saude` | Planos de Saúde em Guarulhos: Compare \| Patro Seguros | Compare planos de saúde em Guarulhos por rede credenciada, carências e coparticipação. Peça orientação à Patro para você, sua família ou empresa. |
| `/seguro-residencial` | Seguro Residencial em Guarulhos \| Patro Seguros | Seguro residencial em Guarulhos: compare coberturas, franquias e limites para casa ou apartamento. Solicite uma proposta com a Patro Seguros. |

A localização acompanha o conteúdo e os títulos principais já existentes nessas páginas. Não foram criadas novas localidades, ofertas, garantias, preços ou descontos. Os limites de 60 caracteres para título e 155 para descrição são regras do projeto, não uma garantia de exibição integral pelo Google.

## Arquivos modificados

- `src/pages/SeguroAuto.tsx`
- `src/pages/SeguroMoto.tsx`
- `src/pages/SeguroVida.tsx`
- `src/pages/SeguroEmpresarial.tsx`
- `src/pages/PlanosDeSaude.tsx`
- `src/lib/seoMetadata.ts`
- `src/lib/seoMetadata.regression.test.ts`
- `src/components/PageMeta.robots.test.tsx`
- Este documento.

O texto de `src/pages/SeguroResidencial.tsx` não foi alterado. Em `seoMetadata.ts`, os H1 de moto, vida, empresarial, residencial e saúde foram alinhados aos títulos principais já presentes nas respectivas páginas. Rotas, endereços canônicos, regras de indexação, integrações comerciais e layout foram preservados.

## Validações preparadas e limitações

Foram acrescentados testes para:

- Conferir igualdade entre os textos das páginas e os metadados estáticos das seis rotas.
- Verificar os limites do projeto, descrições completas, unicidade e ausência das promessas removidas nos snippets revisados.
- Conferir o título principal e a URL canônica, inclusive a resolução do título com barra final.
- Renderizar o componente de metadados e conferir título, descrição, Open Graph, Twitter, canonical e indexação no domínio público, sem duplicação de marca ou descrição.

**Status: testes escritos, não executados nesta sessão.** Também não foram executados build, navegação real ou consulta ao Google. A inspeção do banco identificou tabelas de estado de indexação entre as tabelas com nomes relacionados a GSC/keywords; isso não fornece uma série de cliques e impressões por página, nem prova ausência de dados na integração externa do Search Console.

Para validar no ambiente de desenvolvimento/CI, executar os testes de `src/lib/seoMetadata.regression.test.ts` e `src/components/PageMeta.robots.test.tsx`, além da validação de metadados existente. O build completo do projeto contém ações de envio de sitemaps no pós-build; respeitar o procedimento isolado de validação já adotado, evitando acionar produção durante testes.

## O que ainda depende de verificação

1. Publicar e verificar os metadados no HTML final e após o carregamento de cada página.
2. Conferir no Search Console a URL canônica e o último rastreamento. A atualização no Google depende de novo processamento, sem prazo garantido.
3. O Google pode reescrever título e descrição a partir do conteúdo. Há números, prazos e alegações no corpo de algumas páginas e em dados estruturados que não foram auditados integralmente aqui; a retirada dessas promessas dos metadados não equivale a uma revisão de todas as alegações comerciais do site.
4. A seleção de novas páginas para reescrita deve usar impressões, posição, consultas e CTR reais. Não se deve substituir textos de centenas de páginas somente por serem diferentes destes exemplos.

## Acompanhamento para decidir se houve melhora

- **Marco inicial:** registrar a data efetiva de publicação e exportar do Search Console os 28 dias anteriores por página, consulta, dispositivo e país. Separar buscas de marca e sem marca.
- **30 dias:** confirmar rastreamento e analisar os primeiros dados. Usar janelas completas comparáveis; não concluir melhora apenas pelo total de cliques ou por poucos acessos.
- **60 dias:** comparar cliques, impressões, CTR e posição média para consultas e dispositivos semelhantes. Priorizar páginas com exposição relevante e CTR inferior ao próprio histórico em posições comparáveis. Considerar sazonalidade e mudanças de posição.
- **90 dias:** confrontar a evolução do tráfego orgânico com leads confirmados, qualificação e propostas, respeitando as limitações de atribuição do CRM e analytics. Cliques no WhatsApp não equivalem a leads enviados ou apólices emitidas.

Uma comparação antes/depois não isola causalidade: ranking, concorrentes e composição das consultas também mudam. Manter os textos quando houver melhora consistente; revisar quando os dados mostrarem desalinhamento de intenção, sem trocar todos os snippets ao mesmo tempo.
