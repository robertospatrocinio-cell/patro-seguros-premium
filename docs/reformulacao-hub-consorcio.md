# Reformulação do hub principal de Consórcio

## Escopo

Reformulação da página `/consorcio`, com base na auditoria `docs/auditoria-hubs-consorcio-agro.md`. Mantidos os canais oficiais, as quatro modalidades nacionais, o formulário com seus seis campos, os envios para CRM/e-mail e a transferência do cenário educativo para o atendimento.

Não foram alterados endereços de páginas, regras de redirecionamento, endereços canônicos, robots ou sitemaps. O título principal foi alinhado entre a página e o conteúdo estático; os metadados de título/descrição foram preservados. Nenhuma fórmula, taxa inicial ou faixa de cálculo foi alterada.

## Direção visual

- Azul da marca `#003366`, azul profundo `#071f38`, branco, cinzas claros e texto azul-escuro `#092b4c`.
- Tipografia do próprio site (sistema/Inter), sem novas fontes, dependências ou imagens externas.
- Cabeçalho, logotipo oficial e rodapé preservados sem modificações.
- Hero tipográfico com painel de orientação, em vez de fotografia genérica ou equipe fictícia. Nenhuma nova imagem foi necessária; não foi presumida autorização para outras fotos.
- Espaçamento maior entre seções, bordas discretas, ausência de animações decorativas e de novos pop-ups.

## Computador e celular: comportamento implementado

No computador, hero e formulário têm duas colunas; modalidades usam duas colunas e as quatro etapas aparecem lado a lado em telas largas. O simulador mantém controles e resultado lado a lado a partir do breakpoint existente, com resultado fixado durante a rolagem nesse contexto.

No celular, hero, formulário, resultado e conteúdos passam para uma coluna, com botões principais empilhados. As modalidades ficam em uma coluna e etapas em uma ou duas, conforme a largura. A tabela comparativa permanece dentro de uma área própria de rolagem horizontal, acessível por teclado, sem exigir alargar o documento. As condições detalhadas e FAQs podem ser expandidas individualmente.

Esses comportamentos foram implementados no código, mas não foram conferidos por screenshots ou navegação real neste ambiente.

## Conteúdo e navegação

1. Hero com selo, título e texto solicitados, dois canais de conversão e aviso sobre custos e contemplação próximo dos botões.
2. Modalidades confirmadas: imóveis, pesados/agro, veículos/motos e serviços. Não foram inventadas categorias comerciais. Empresas são orientadas conforme o bem ou serviço pretendido.
3. Simulador educativo preservado, com diferenças nominais descritas de modo neutro, sem promessa de economia.
4. Quatro etapas explicam adesão, participação e análises após a contemplação.
5. Seção de adequação explica planejamento e espera, além de alternativas para quem tem urgência.
6. Atendimento consultivo com os serviços já descritos na fonte anterior, condições de lances e orientações de segurança preservados.
7. Seis FAQs, modalidades, link ao blog, e-book, atendimento local e links de seguros relacionados mantidos.
8. Chamada final com simulação e WhatsApp.

## Botões, simulador e formulário

- “Solicitar simulação” no hero e no final leva ao formulário `#simulacao`.
- “Conversar com a Patro” e “Falar pelo WhatsApp” abrem o número oficial já configurado, com mensagem contextual e proteção ao abrir nova aba.
- Os cards mantêm os quatro destinos nacionais existentes.
- O simulador mantém cálculo, hipóteses, detalhes de custos e metodologia. Valores inválidos escondem os controles de atendimento do resultado.
- O WhatsApp do simulador inclui o resumo do cenário. “Prefiro receber contato da Patro” transfere crédito, modalidade e resumo ao formulário, leva ao formulário e posiciona o foco no nome. A rolagem respeita a preferência por movimento reduzido.
- Mudar manualmente crédito ou modalidade continua removendo o cenário importado para evitar divergências.
- O formulário mantém validação, bloqueio de envio simultâneo, deduplicação temporária, CRM, e-mail e WhatsApp. Não foram adicionados CPF, documentos ou dados financeiros sensíveis; o link de privacidade permanece visível.

## Verificações efetivamente realizadas

Revisão estática dos componentes, contratos de envio, arquivo da auditoria anterior, rotas existentes e estilos globais. Conferidos no código os destinos das quatro modalidades, privacidade e atendimento; verificada a ligação do formulário ao simulador. Foi identificada a cor global de títulos e explicitada a cor branca nos títulos em fundos escuros para evitar perda de contraste.

**Não houve execução de build, Vitest, Playwright ou envio real de formulário neste ambiente. Não há resultado de testes executados a declarar.**

## Testes automatizados preparados, ainda não executados

- `src/pages/Consorcio.test.tsx`: validação de campos, privacidade, importação e invalidação do cenário, conteúdo enviado a CRM/e-mail/WhatsApp e preservação dos dados após erro de e-mail. Serviços externos são simulados, sem criar leads.
- `src/components/consorcio/ConsorcioPlanningSimulator.test.tsx`: cenário inicial, transparência, valores inválidos, transferência de modalidade e crédito, WhatsApp e cenário desfavorável ao consórcio.
- `e2e/consorcio-agro-hubs.spec.ts`: ampliado para hero, avisos, CTA do formulário, WhatsApp, FAQs e âncoras; preserva cobertura de modalidades, simulador e overflow em 390 e 1280 pixels.
- Testes existentes de cálculo em `src/lib/__tests__/consorcioSimulation.test.ts` e de conteúdo em `src/data/consorcioHub.test.ts` continuam como regressão; a matemática não foi modificada.

## Validação necessária no preview e na publicação

1. Compilar e executar as suítes sobre esta versão, apontando Playwright ao preview atualizado (por padrão, o arquivo usa o site publicado).
2. Conferir a apresentação em celular e computador, inclusive menu, contraste, teclado, foco, tabela e ausência de rolagem horizontal na página.
3. Fazer um envio controlado e confirmar recebimento no CRM e no e-mail, abertura do WhatsApp e integridade do cenário. O resultado depende dos serviços publicados e de sua configuração.
4. Confirmar com a Patro a disponibilidade dos planos, faixas, administradoras, histórico de lances, modalidades e acompanhamento descritos. São informações reaproveitadas, não uma certificação comercial atualizada.
5. Conferir o HTML final gerado e a consistência do título visível com a versão estática. Nenhuma mudança de indexação faz parte desta entrega.
