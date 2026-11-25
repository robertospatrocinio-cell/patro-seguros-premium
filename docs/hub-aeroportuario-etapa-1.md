# Hub Aeroportuário — fechamento da Etapa 1/5

**Situação: implementado no repositório; build, prévia e atendimento real ainda não homologados.** Esta entrega não inicia outra etapa da expansão.

## O que mudou

Na página `/seguros-aeroportuarios`, o orientador antes da cotação pergunta aeroporto, atividade, existência de contrato/edital, modalidade solicitada, prazo e seguro vigente. Não pede identificação para exibir o resultado. A seleção da atividade e a modalidade que a contratante mencionou orientam a lista para avaliação; o resultado não confirma exigência, cobertura, prazo, aceitação ou contratação.

A empresa pode revisar as respostas, seguir para a cotação ou pular a triagem. O resumo aparece ao lado do formulário. Após o consentimento e o envio, o fluxo existente de `send-form-email` recebe as respostas em `lead.raw_data.triagem` e no corpo do e-mail, com origem comercial **Hub Aeroportuário**. Não há tabela nova, upload ou armazenamento local da triagem. As respostas não são colocadas no link de WhatsApp nem nos eventos de conversão.

## Conferência no código

- Corrigidos os destinos antigos encontrados nas centrais de guias e materiais, nos guias individuais, nos comparativos e nos CTAs dos checklists. Mantidas as mensagens de cada contexto. Esses pontos, o número exibido no hub e as constantes dos formulários de seguro e vida usam a configuração institucional.
- A busca final pelo número antigo (incluindo variação com separador) não apontou outras referências no código pesquisável. Busca por destinos numéricos literais em `wa.me` e `send?phone=` não identificou outro destino divergente. Isso não verifica números em PDFs, campanhas, sistemas externos nem configurações de mensagens no próprio WhatsApp.
- Telefones de assistência das seguradoras, contatos de clientes no CRM e exemplos de preenchimento não foram alterados. Nenhuma credencial, permissão de acesso ou configuração de envio foi modificada.

## Testes e critérios de homologação

**Cenários escritos, não executados neste ambiente:** `e2e/hub-aeroportuario.spec.ts` cobre navegação em 390 e 1280 px, canonical, link para E&O, FAQ e link oficial com a mensagem do hub. O novo cenário simula o recebimento comercial: testa perguntas obrigatórias, resultado por serviço e modalidade solicitada, foco, revisão, consentimento e envio único das seis respostas atualizadas com origem identificada. A simulação não dispara e-mail nem comprova entrega no CRM.

| Verificação pendente | Critério para liberar |
| --- | --- |
| Build e prévia Lovable | Build de produção e validadores de metadados/prerender aprovados; rota abre também por acesso direto. Executar os testes do hub contra a aplicação compilada. |
| Navegação e acessibilidade | Em celular e desktop, percorrer perguntas por teclado e leitor de tela, alterar respostas, ampliar texto e concluir tanto a triagem quanto a cotação direta. Sem corte, rolagem lateral ou foco perdido. |
| Encaminhamento comercial | Com dados de teste autorizados, conferir resumo, origem e consentimento no CRM e na caixa da equipe. O serviço existente pode confirmar o e-mail mesmo se a gravação do lead falhar; conferir os dois destinos. Simular falha de rede e verificar preservação dos campos para nova tentativa. |
| WhatsApp | Abrir a conversa em celular e desktop pelo hub, pelas centrais e pelos guias, materiais e comparativos. Confirmar o número (11) 5199-7500, o texto próprio do CTA e a ausência das respostas da triagem no endereço. Revisar separadamente PDFs distribuídos e automações externas. |
| SEO e links | Conferir canonical, sitemap gerado, breadcrumbs, destinos internos, HTML e JSON-LD na versão publicada. O título e a descrição da parte 1 foram compactados para os limites do projeto; não foram alterados nesta parte. |
| Performance e privacidade | Medir carregamento e estabilidade visual em conexão móvel. Inspecionar eventos e URLs com dados fictícios; as seis respostas não devem sair na consulta preliminar. Conferir acesso restrito aos pedidos no CRM com perfis de teste autorizados. |
| Comercial | Validar com a equipe a disponibilidade por atividade e aeroporto, sem presumir vínculo com concessionárias nem aceitação automática. |
