# Auditoria de catálogo, menus e captação — etapa 1

## Escopo e limite da verificação

Inspeção estática do roteador efetivamente utilizado (`src/App.tsx`), do cabeçalho, do catálogo e dos registros de landing pages. Não foram executados build, testes, navegação no preview, envio de formulários nem análise de métricas de conversão nesta etapa. Existir um arquivo não significa que sua página está publicada; existir uma landing page não comprova alta conversão.

O catálogo representa produtos, modalidades e especialidades. Variações por bairro, cidade, modelo de veículo, seguradora e operadora devem ser acessadas pelos respectivos hubs, não repetidas integralmente no cabeçalho.

## Diagnóstico e correções realizadas

- Os menus desktop, as seções mobile e a busca mobile mantinham listas separadas e incompletas. Havia páginas de produtos sem acesso direto nesses menus.
- O catálogo foi ampliado em dez grupos: pessoas; veículos/náutica/aviação; empresas/patrimônio; responsabilidade civil; máquinas/equipamentos/drones; agro; saúde/odontológico; consórcio; clínicas/serviços; Patro Private.
- O menu desktop **Todos os seguros** agora apresenta os grupos e seus destinos. Os atalhos anteriores de pessoas, empresas, agronegócio, atendimento e conteúdo foram preservados.
- As seções e a busca mobile usam a mesma fonte do catálogo. A busca considera nome, descrição e categoria, sem depender de acentos ou da ordem das palavras.
- Na página **Todos os seguros**, há atalhos destacados para máquinas/equipamentos/drones, saúde e consórcio. Casco de drone e RETA permanecem separados.
- Sete componentes já importados no App não tinham rotas registradas. Foram conectados ao roteador e ao catálogo: `/seguro-para-dentistas`, `/seguro-para-veterinarios`, `/seguro-clinica-veterinaria`, `/seguro-hospital-veterinario`, `/seguro-equipamentos-veterinarios`, `/plano-saude-clinicas-veterinarias` e `/seguro-vida-clinicas-veterinarias`.
- Adicionado teste de destinos registrados, duplicidades e busca. O teste foi escrito, mas não executado neste ambiente.

## Captação: o que existe de fato no roteador

### Família dinâmica `/lp/:slug`

O roteador utiliza `DynamicLandingPage`, que busca conteúdo em `src/data/landingPages.ts` e renderiza `InsurancePageTemplate`. Esse template inclui chamadas de cotação/WhatsApp e `QuickQuoteForm`; a validação operacional de cada envio ainda é necessária.

Há registros para:

- Auto, auto em Guarulhos, auto premium e cotação auto.
- Plano de saúde, MedSenior e Alice.
- Empresarial, residencial, vida, moto, celular e motorista de aplicativo.
- Galpões e galpão alugado.
- Consórcio e vida para sócios.
- Modelos BYD Dolphin, BYD Song Plus, BYD Seal, GWM Haval H6, Toyota SW4, Ford Ranger, Chevrolet S10, Audi Q3 e Mercedes GLA.
- Moto entregadores em Guarulhos.

**Atenção:** os componentes `LandingSeguroAuto`, `LandingPlanoSaude`, `LandingConsorcio` e outros estão importados no App, mas os respectivos caminhos `/lp/...` são atendidos pela rota dinâmica, não por esses componentes especializados. A presença desses arquivos, isoladamente, não comprova que o visitante recebe seu layout ou formulário. A exceção explícita nessa família é `/lp/seguro-acidentes-pessoais`.

### Páginas de campanha com rota própria

Rotas identificadas:

- `/lp-maquinas-equipamentos`
- `/lp-transportes-360`
- `/seguro-locadoras-equipamentos`
- `/seguro-galpoes-centros-distribuicao`
- `/seguro-cibernetico-empresas`
- `/responsabilidade-administradores-profissionais`
- `/seguro-moto-entregadores-guarulhos`
- `/lp/seguro-acidentes-pessoais`

Também existem fluxos de cotação em `/cotacao`, `/cotacao-seguro-auto`, `/seguro-vida/formulario` e páginas de produto com captação incorporada. Não é necessário criar outra URL apenas para chamar uma página de landing page.

## Matriz de lacunas para a etapa 2

| Grupo | Evidência de campanha encontrada | Próxima avaliação |
| --- | --- | --- |
| Máquinas/equipamentos | LP geral e página de locadoras | Prioridade máxima: adaptar mensagem e formulário por máquinas agrícolas, tratores, colheitadeiras, pulverizadores e linha amarela; não duplicar a LP geral sem necessidade. |
| Drones | Páginas de drone, drone agrícola e RETA | Não há entrada específica de campanha na família `/lp/`; revisar conversão das páginas existentes, distinguindo casco, uso agrícola e responsabilidade civil. |
| Agro | Páginas de produto para rural, pecuário, café, geada, granja, propriedade, silo e transporte | Não foram identificadas campanhas próprias para cada modalidade no registro de LPs. Conferir a captação de cada página antes de criar novas. |
| Veículos/náutica/aviação | Auto, moto, aplicativo, entregadores e modelos têm campanhas | Caminhão, micro-ônibus, frota, APP de passageiros, bike, embarcações, jet ski, aviões e helicópteros precisam de avaliação individual de captação; campanhas genéricas não equivalem a uma campanha específica. |
| Pessoas/famílias | Residencial, vida, acidentes pessoais e celular | Verificar viagem, fiança, funeral/decesso, pet e previdência. |
| Empresas/patrimônio | Empresarial, galpões, transportes, cyber e locadoras | Verificar armazenagem, condomínio, lojas, restaurantes, imobiliário, engenharia, garantia, crédito, ambiental e vida PME. |
| Responsabilidade civil | Página de administradores/profissionais | Avaliar conteúdo e qualificação de lead por profissão, obras, serviços e eventos. |
| Saúde/odontológico | LP dinâmica de saúde, MedSenior e Alice | Distinguir individual/familiar, MEI, PME, empresarial, idosos e odonto; conferir elegibilidade, rede e contato sem solicitar dados médicos desnecessários. |
| Consórcio | LP dinâmica de consórcio | Conferir tratamento específico de carro, imóvel, pesados e empresarial; explicar taxas e contemplação sem promessas. |
| Clínicas e Private | Páginas de produto e consultoria existentes | Avaliar formulários reais, contexto enviado ao atendimento e continuidade após envio. |

## Respostas objetivas

1. **Todos os produtos estavam nos menus?** Não. Havia listas parciais e divergentes. A cobertura foi ampliada e centralizada nesta etapa.
2. **Há landing page específica para todos os seguros?** Não foi identificada cobertura individual de todos os produtos no registro de campanhas. Há LPs genéricas e páginas de produto com captação, que não devem ser confundidas com ausência total de formulário.
3. **Todas são de alta conversão?** Não é possível afirmar sem testar o fluxo e medir visitantes, contatos qualificados e vendas por origem, produto e dispositivo.
4. **O site já pode ser considerado o melhor de Guarulhos e Grande São Paulo?** Essa comparação não foi medida. O objetivo exige conteúdo confiável, navegação completa, atendimento e resultados reais — não apenas quantidade de páginas.

## Próximas etapas aprovadas

- **Etapa 2:** completar/adaptar a captação onde houver lacuna, começando pelas especialidades. Verificar qual componente está efetivamente renderizado, transmissão do produto/origem, validação, consentimento, confirmação e entrega do lead. Evitar trocar o template de campanhas já ativas sem verificar o comportamento atual.
- **Etapa 3:** SEO/GEO local, entidades e informações consistentes, conteúdos úteis e citáveis, navegação entre pilares e especialidades, dados estruturados e sitemaps. Há rotas locais duplicadas de saúde e Guarulhos no App que merecem reconciliação antes de ampliar páginas locais; não foram alteradas nesta etapa.

Nenhuma mudança no banco ou criação de novas landing pages foi feita nesta etapa. SEO/GEO não garante posição no Google nem citação por assistentes de IA.

## Etapa 2 — captação por ramo implementada

### Onde a experiência muda

- As páginas atendidas por `InsurancePageTemplate` e reconhecidas no catálogo passam a apresentar conteúdo de qualificação e formulário específico na seção de cotação. Isso inclui as especialidades em máquinas agrícolas, tratores, colheitadeiras, pulverizadores, linha amarela, drone, drone agrícola e RETA.
- A configuração compartilhada diferencia operação agrícola, construção, equipamentos, casco e responsabilidade civil; também oferece perfis para agro, saúde, consórcio, RC e campos por modalidade para os demais produtos.
- Campos que a própria página já definia são preservados, com prioridade sobre sugestões de mesmo identificador. Os detalhes complementares ficam opcionais; nome, WhatsApp e autorização de contato são exigidos.
- Os botões inicial e final dos produtos reconhecidos levam ao formulário na mesma página quando não possuem destino próprio ou apontam para a cotação genérica. Destinos próprios de parceiros e campanhas permanecem preservados.
- **Todos os seguros** ganha uma seção de solicitação com seletor para todos os destinos do catálogo, inclusive produtos que utilizam outros templates. Os botões de cotação no início e no final do catálogo levam a essa seção. Trocar o produto atualiza as orientações e limpa os detalhes do produto anterior.
- A qualificação diferencia também lotação e operação no APP de passageiros, rotas e mercadorias no transporte agro e características dos equipamentos veterinários.
- Não foram criadas URLs duplicadas nem substituídos os layouts das campanhas independentes. A LP geral de máquinas e os formulários de outros templates continuam existentes; a adaptação automática por página se limita ao template compartilhado descrito acima.

### Entrega e continuidade

- O novo formulário reutiliza `send-form-email`, já existente, enviando produto, página de origem, campanha, detalhes e autorização de contato. Essa função envia o e-mail e tenta registrar o lead no CRM; o código existente não garante o registro no CRM caso essa segunda operação falhe.
- A confirmação só aparece depois de resposta positiva do serviço. Em falha, o formulário preserva os dados na tela e oferece WhatsApp com contexto; não há redirecionamento automático nem confirmação fictícia.
- Os dados do novo formulário não são gravados automaticamente no navegador nem enviados parcialmente. O usuário encontra o aviso de privacidade antes de enviar.
- Saúde não pede diagnósticos ou documentos médicos. Consórcio explica custos e ausência de data garantida de contemplação. O bloco de drones diferencia danos ao equipamento, RETA e riscos da pulverização, sujeitos à análise.

### Verificação e limites

Foram adicionados testes para cobertura dos destinos do catálogo, distinção das especialidades, preservação dos campos, autorização, conteúdo enviado, troca de produto, bloqueio de envios repetidos e tratamento de falha. O teste da página RETA também verifica a presença do formulário específico e os atalhos de cotação. Os testes, build, navegação no preview e envios reais **não foram executados neste ambiente**. A entrega depende da configuração e disponibilidade da função de envio e do serviço de e-mail existentes no Lovable; não houve alteração de banco nem de funções nesta etapa.

Antes de investir em campanhas, validar no preview um pedido de máquinas agrícolas, um de linha amarela e um de drone/RETA; conferir recebimento dos e-mails e registro no CRM com origem e produto corretos. Medir pedidos qualificados por produto e dispositivo para avaliar conversão — a implementação não comprova alta conversão. SEO/GEO permanece reservado à etapa 3.
