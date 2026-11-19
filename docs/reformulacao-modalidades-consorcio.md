# Reformulação das modalidades de Consórcio

## Base e limites

Aplicação da direção visual de `docs/reformulacao-hub-consorcio.md`, usando o diagnóstico de `docs/auditoria-hubs-consorcio-agro.md`: azul profundo, branco, tipografia do site, hierarquia editorial, espaço entre seções e condições próximas das chamadas.

Foram usadas as URLs já cadastradas no roteador. Não foram criadas novas páginas, parcerias, faixas comerciais ou planos. Não foram alterados canonical, redirects nem configurações globais de SEO. Cabeçalho, logotipo, rodapé e canais oficiais são reutilizados.

A presença de uma modalidade no catálogo existente é evidência editorial, não confirmação comercial atualizada. O texto orienta a consultar disponibilidade, bens aceitos, custos e condições antes da adesão. É necessário validar esses dados com a Patro e com a administradora.

## Entrega por modalidade

| Página ou seção | Alterações realizadas | CTA utilizado | Conteúdo preservado | Testes realizados | Pendências de confirmação |
| --- | --- | --- | --- | --- | --- |
| Imóveis — `/consorcio-imoveis` e `/consorcio-imoveis-guarulhos` | Hero com imagem ilustrativa; finalidade da carta; compra, construção e reforma quando admitidas; FGTS elegível; custos, reajustes, documentos e etapas | Simular consórcio imobiliário | URL, metadados de título/descrição, FAQs nacionais, orientações úteis, links ao hub, seguros e atendimento | Revisão estática de rotas, conteúdo e CTAs; testes de componente preparados, não executados | Grupos disponíveis, finalidades, FGTS, índices, despesas admitidas, garantias e documentos |
| Veículos e motos — `/consorcio-veiculos` e `/consorcio-veiculos-guarulhos` | Imagem ilustrativa; diferenciação entre carro e moto no atendimento; novos, usados, híbridos, elétricos e utilitários; idade, procedência, lance embutido e crédito líquido | Simular consórcio de veículo; Simular consórcio de moto | URLs, metadados, FAQs nacionais, links de seguros e retorno ao simulador e formulário do hub | Revisão estática de mensagens e destinos; testes preparados, não executados | Categorias, limite de idade, avaliação, veículos aceitos e modalidades de lance |
| Caminhões e pesados — `/consorcio-pesados-maquinas#caminhoes` e `/consorcio-caminhoes-guarulhos` | Renovação por etapas, transporte autônomo e empresarial, manutenção, prazo, documentação e capital de giro | Planejar aquisição de caminhão ou frota | URL nacional compartilhada, URL local, FAQs nacionais, condições, links úteis e seguros separados | Revisão estática do enquadramento e dos links; testes preparados, não executados | Caminhões e implementos admitidos, idade, garantias e regras por operação |
| Máquinas agrícolas — `/consorcio-pesados-maquinas#maquinas-agricolas` | Seção identificável, imagem compartilhada de pesados/agro, tratores, colheitadeiras, pulverizadores e implementos; sazonalidade, safra, comparação com crédito rural/Finame e dúvidas próprias | Simular consórcio de máquina agrícola | Página existente de pesados, FAQs sobre equipamentos, links a artigos e Seguro Agro/Máquinas | Revisão estática de âncora, mensagem e conteúdo; testes preparados, não executados | Equipamentos aceitos e alternativas efetivamente acessíveis; pagamentos sazonais apenas se contratuais |
| Empresas — `/consorcio-empresarial-guarulhos` | Atendimento por objetivo: frotas, máquinas, equipamentos ou imóvel comercial; CNPJ, representantes, garantias, orçamento e análise de caixa | Conversar sobre consórcio para minha empresa | URL e contexto de Guarulhos, metadados, canais oficiais, links às modalidades nacionais e ao formulário do hub | Revisão estática de rota, documentos e CTA; testes preparados, não executados | Aceitação por pessoa jurídica, categoria adequada, documentos, garantias e cobertura do atendimento |
| Serviços — `/consorcio-servicos` | Nova apresentação, públicos, serviços elegíveis, contratação, documentação, pagamento ao prestador, lances e encerramento; título visível compartilhado com a fonte de conteúdo estático | Consultar consórcio de serviços | Formulário `ProductQuoteForm`, campos, consentimento, fluxo de envio existente, comparação ilustrativa, seis usos, cinco FAQs e links de seguros | Revisão estática do formulário e referências; teste existente do envio mantido; execução pendente | Modalidade e serviços disponíveis, prestadores aceitos, documentação, liberação e condições de pagamento |

## Estrutura e atendimento

- Breadcrumb, título e introdução próprios, ações iniciais, usos, adequação, etapas, custos, documentos, lances, FAQs, artigos, modalidades relacionadas e chamada final.
- Conteúdo específico por objetivo, sem promessa de data, aprovação, economia ou vantagem tributária.
- WhatsApp com o número oficial já configurado e mensagem contextual, inclusive para moto e máquina agrícola. Links externos mantêm abertura segura em nova aba.
- Páginas nacionais e locais reutilizam a mesma estrutura visual; a orientação de Guarulhos é explicitada nas páginas locais.
- O formulário de serviços permanece na própria página; as demais modalidades oferecem acesso ao formulário e ao simulador educativo do hub.
- O seguro do bem é apresentado como contratação separada, sujeita à aceitação e às condições da seguradora.
- Três imagens ilustrativas foram criadas para imóveis, veículos/motos e pesados/agro. Não representam patrimônio, equipe ou clientes da Patro. Não foi utilizada foto de empresa fictícia.

## Recomendações de organização

1. Manter máquinas agrícolas como seção da página de pesados; não criar uma URL apenas para separar o tema.
2. Manter empresas no endereço existente de Guarulhos, com links às categorias nacionais. Não apresentar uma nova categoria genérica de crédito livre para qualquer ativo.
3. Não apresentar exemplos de uso como disponibilidade confirmada. Validar antes bens, serviços, prestadores, limites, prazos e condições específicas.
4. Revalidar comercialmente as faixas e exemplos numéricos já existentes, preservados como referências condicionais ou comparações ilustrativas. Não foram verificados em proposta de administradora.

## Verificações efetivamente realizadas

Revisão estática dos componentes, roteador, fontes de conteúdo, formulários referenciados, gerador de WhatsApp, estilos de títulos e testes existentes. Conferidos os destinos das modalidades, o uso do canal oficial e o reaproveitamento das FAQs nacionais. O título de serviços foi centralizado para evitar diferença entre a página e sua fonte estática.

**Não houve execução de build, Vitest, Playwright, navegação real ou envio de formulário neste ambiente. Não há resultados de execução ou screenshots a declarar.**

## Testes preparados e preservados

- `src/components/consorcio/ConsorcioModalityContent.test.tsx`: estrutura, conteúdo nacional, número oficial, mensagens, links de formulário/simulador, moto, seção agrícola e pessoa jurídica.
- `e2e/consorcio-agro-hubs.spec.ts`: ampliado para modalidades em 390 e 1280 pixels, estrutura, CTAs, mensagens, dúvidas e rolagem horizontal. Não envia formulários reais. Apontar a URL base para o preview atualizado; o padrão é o site publicado.
- `src/data/consorcioServicos.test.tsx`: mantido para conteúdo, FAQs, comparação, campos, consentimento e contrato de envio do formulário com serviços simulados.
- Testes existentes de imóveis, veículos e pesados continuam disponíveis para verificar dados e FAQs.

## Conferência necessária antes da publicação

- Executar build e as suítes de regressão no ambiente do projeto.
- Conferir o preview no celular e computador: imagens, contraste, teclado, menus, âncoras, tabela de serviços e ausência de rolagem horizontal.
- Conferir as mensagens e o destino do WhatsApp em cada modalidade.
- Fazer um envio controlado nos formulários e confirmar recebimento nos serviços já integrados; preservação de código não comprova entrega externa.
- Confirmar com a Patro a disponibilidade comercial e todas as condições indicadas na tabela antes de divulgar ofertas específicas.
