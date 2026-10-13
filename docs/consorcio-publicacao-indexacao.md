# Consórcio: simulador, publicação e verificação no Google

## Implementado

- Página principal `/consorcio` com simulador educativo de consórcio versus financiamento, sem exigir cadastro para calcular.
- `/lp/consorcio` renderiza a mesma experiência, com endereço principal declarado como `/consorcio` para evitar conteúdo concorrente.
- Taxa de administração total, fundo de reserva, custos adicionais, entrada, juros mensais e prazos editáveis. Financiamento calculado pela Tabela Price; ambos os totais são nominais.
- O visitante pode anexar o cenário à solicitação existente. O resumo acompanha o registro no CRM, e-mail e mensagem de WhatsApp.
- Conteúdo sobre construção de patrimônio, alavancagem e aquisição de imóveis para locação, com explicação de riscos e sem promessa de contemplação ou rentabilidade.
- Referências a Porto e MAPFRE condicionadas à disponibilidade de produto e grupo, sem atribuir os números hipotéticos do simulador a essas empresas.
- Título, descrição, perguntas frequentes e links para consórcios de imóveis, veículos e empresas em Guarulhos.
- Testes de cálculo adicionados. Não foi possível executar testes, build ou validar a tela no navegador neste atendimento.

## O que foi realmente verificado sobre o Google

Consulta direta ao banco durante este atendimento:

- `gsc_indexation_status`: **zero registros**, portanto zero URLs com inspeção salva.
- `monitored_urls`: **10 URLs ativas**.
- As URLs cadastradas incluem planos de saúde sênior, seguradoras parceiras, uma landing page de acidentes pessoais, carta verde e páginas de seguradoras.
- A lista ativa consultada não inclui `/consorcio` nem `/todos-os-seguros` e não representa todas as páginas de cidades, estados ou regiões.

Ausência de leituras neste monitor **não significa ausência de indexação no Google**. Também não permite afirmar que alguma página foi rastreada ou indexada. Nenhuma consulta à API do Google foi executada neste atendimento.

O código atual do botão de verificação no painel chama uma função que aceita apenas a credencial interna de serviço, não a sessão comum do administrador. Não foi alterado esse controle de acesso; não se deve colocar a credencial de serviço no navegador. A configuração e execução do monitor precisam ser verificadas no Lovable separadamente.

## Publicação e confirmação — ações pendentes

1. No Lovable, aguarde a sincronização e verifique o simulador em `/consorcio` no preview. Use **Publicar/Atualizar** para levar as alterações ao domínio público. A publicação não foi realizada por este atendimento.
2. No domínio público, teste também `/lp/consorcio`, um cálculo com juros zero e o encaminhamento do cenário ao formulário. As estimativas não dependem do banco; o envio de contatos depende dos serviços já usados pelo formulário.
3. Abra o Google Search Console na propriedade que corresponde a `https://www.patroseguros.com.br/` e confira o relatório de Sitemaps. O arquivo indicado pelo `robots.txt` do repositório é `https://www.patroseguros.com.br/sitemap-index.xml`; a resposta publicada e seu processamento pelo Google ainda precisam ser conferidos.
4. Em **Inspeção de URL**, confira `/consorcio`, `/todos-os-seguros`, as páginas canônicas de seguros e cada página local importante. Registre o último rastreamento, a situação de indexação e o endereço principal escolhido pelo Google. Para a landing page equivalente, é esperado que o endereço principal seja `/consorcio`, não duas páginas independentes.
5. Use o relatório **Indexação > Páginas** e os sitemaps para avaliar o conjunto de URLs de seguros, cidades, estados e regiões. Uma amostra ou uma pesquisa pelo nome do site não confirma a situação de todas elas.
6. Após a publicação, solicite indexação das páginas principais alteradas quando a inspeção indicar que estão aptas. Pedido de indexação não garante inclusão nem posição nos resultados.

Não foi feita auditoria completa dos sitemaps, da publicação ou de todas as rotas locais neste atendimento. A lista acima separa as alterações de código das verificações externas ainda necessárias.
