# Auditoria dos hubs de Consórcio e Agro

## Escopo e limite da verificação

Revisão estática do código de rotas, páginas nacionais de consórcio, hub Agro, simulador, passagem do cenário para o formulário, cotação e chamadas de atendimento. Foram examinados também os contratos de envio de leads e e-mail e a configuração dos testes de navegação.

**Esta revisão não certifica funcionamento perfeito em produção.** Não houve execução de build, testes automatizados ou navegação em navegador neste ambiente. Não foram enviados formulários, criados leads reais ou realizados disparos de e-mail/WhatsApp.

## Ajustes incluídos

- No hub Agro, o card de lavoura usa `/seguro-rural`, uma rota existente, em vez de `/seguro-agricola`.
- O CTA principal e a barra fixa do Agro encaminham para `/cotacao?tipo=agro`.
- A cotação reconhece `agro`, `agronegocio` e `seguro-agro` como a mesma modalidade e oferece campos próprios de máquina/cultura, município/UF e detalhes da operação.
- Os campos dinâmicos da cotação têm seus rótulos associados aos controles, inclusive os campos Agro.
- No hub Consórcio, os cards usam as quatro modalidades nacionais: imóveis, pesados e máquinas, veículos e serviços.
- O simulador transmite modalidade, valor da carta e resumo do cenário ao formulário de análise personalizada.
- A modalidade “Pesados & Agro” do simulador é convertida para a opção “Pesados e agro” do formulário.
- Alterar manualmente modalidade ou crédito no formulário remove o resumo importado, evitando enviar um cenário anterior incompatível com o novo objetivo.
- Os links de proteção patrimonial da página nacional de pesados usam `/seguro-agro` e `/seguro-maquinas`, incluindo a versão de conteúdo estático.
- Os controles de contato do simulador só são oferecidos quando os valores produzem um cenário válido.

## Pontos conferidos no código

### Navegação

- `/consorcio`, as quatro modalidades nacionais e as páginas locais de Guarulhos estão registradas no roteador.
- A página intermediária resolve o endereço atual e encaminha para o conteúdo nacional, local ou de serviços correspondente.
- As rotas antigas de carro e veículos pesados encaminham para as modalidades nacionais.
- As rotas dos produtos listados nos cards Agro estão registradas no roteador, incluindo máquinas, tratores, colheitadeiras, drones, penhor, silos e transporte.
- A página nacional de pesados oferece links de retorno ao hub e de navegação entre modalidades.

### Simulação

- O cálculo de consórcio considera carta, administração, reserva e outros custos.
- O financiamento usa Tabela Price sobre o valor após a entrada; entrada e custos extras compõem o total.
- O cálculo trata juros zero e rejeita valores não finitos, negativos, prazos inválidos e entrada superior à carta.
- A interface do simulador restringe carta e prazo às faixas informadas e mostra alerta quando o cenário é inválido.
- A diferença nominal pode ser positiva, negativa ou zero, sem impor economia favorável ao consórcio.
- O texto informa que os valores são educativos, sem reajustes ou garantia de contemplação.

### Formulário e atendimento

- O formulário de consórcio valida nome, WhatsApp, cidade, modalidade, crédito e horário antes do envio.
- O resumo do simulador integra os dados de atendimento, o e-mail e a mensagem de WhatsApp.
- Existe bloqueio de envio simultâneo e deduplicação temporária por conteúdo na sessão.
- O formulário chama o registro de lead e o envio de e-mail separadamente; um erro de registro no CRM é registrado no console, mas não bloqueia o envio de e-mail.
- A confirmação de envio e a entrega efetiva dependem dos serviços publicados e de sua configuração; não foram verificadas com um envio real.

## Cobertura automatizada preparada, ainda não executada

Arquivo: `e2e/consorcio-agro-hubs.spec.ts`.

Cenários previstos em larguras de 390 e 1280 pixels:

- Navegação pelas quatro modalidades nacionais.
- Estado válido/inválido do simulador e conteúdo do link de WhatsApp.
- Preenchimento de crédito e modalidade no formulário a partir do simulador.
- Remoção do resumo antigo após edição manual do crédito.
- Navegação pelos destinos dos cards Agro sem retorno à página inicial ou página não encontrada.
- Reconhecimento dos três identificadores Agro e exibição dos campos específicos.
- Verificação de rolagem horizontal nos dois hubs.

A configuração permite apontar `PLAYWRIGHT_BASE_URL` para o preview; sem essa variável, os testes usam o site publicado. Portanto, devem ser executados sobre a versão que contenha estes ajustes.

## Validação ainda necessária no preview/publicação

1. Confirmar que a compilação e os validadores do projeto concluem sem erro.
2. Executar os testes de navegação adicionados contra a versão atualizada.
3. Conferir visualmente celular e desktop, incluindo menu, tabelas, formulário e barra fixa.
4. Fazer uma solicitação controlada em cada fluxo e confirmar recebimento no CRM e nas caixas de e-mail.
5. Abrir o WhatsApp e conferir modalidade, crédito e dados da operação.
6. Conferir metadados, conteúdo pré-renderizado e dados estruturados no HTML final publicado; a leitura do código não substitui essa validação.

Não foi necessário alterar a estrutura do banco nem modificar serviços de servidor nesta revisão.
