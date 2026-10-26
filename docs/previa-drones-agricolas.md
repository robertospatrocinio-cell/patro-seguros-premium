# Drones agrícolas — aplicação nas páginas públicas

## Etapa 2 — versão aplicada após solicitação de continuidade

A solicitação de execução da etapa 2 foi considerada aprovação da proposta editorial. `/seguro-drone-agricola` passa a exibir a versão agrícola como página principal, e `/seguro-reta-drone` usa a versão complementar. Ambas reutilizam o formulário compacto integrado, sem documentos no primeiro contato. Os endereços de revisão continuam separados e sem indexação.

### Consolidação e descoberta

- `/seguro-drone` foi incluído na fonte central de redirecionamentos permanentes para `/seguro-drone-agricola`, preservando um destino único. O processo de pré-compilação existente gera a regra HTTP 301 no `.htaccess`; há também navegação substitutiva no React, preservando parâmetros e fragmento.
- A resposta HTTP 301 depende de a hospedagem executar o `.htaccess` gerado. A prévia SPA sozinha não comprova o código HTTP; conferir a resposta no domínio público após a implantação.
- Menu, catálogo, especialidades, guia de soluções e produtos do atendimento nacional apontam diretamente para a página principal. O arquivo de orientação para assistentes também foi atualizado.
- A geração do sitemap exclui o endereço antigo. Metadados e canonical das duas páginas públicas descrevem exclusivamente operações agrícolas.
- Dados estruturados de serviço e perguntas frequentes usam as mesmas informações editoriais da página. O gerador de HTML para buscadores recebe o conteúdo agrícola completo, sem depender de consulta ao banco ou do carregamento da rota React.
- As ações flutuantes globais são suprimidas somente nessas páginas e nas prévias reconhecidas; o aviso de cookies permanece no fluxo do rodapé.

### Revisão regulatória e limites desta execução

O texto aplicado não afirma obrigatoriedade, dispensa por peso, valores mínimos legais, validade de registros ou enquadramento automático em penhor rural. Não promete cobertura de deriva, pane, perda de sinal ou dano ambiental; pede análise das condições disponíveis. A referência a DJI Agras e XAG não representa parceria nem aceitação garantida.

Não foi possível consultar fontes oficiais externas neste ambiente. Portanto, a atualização não equivale a uma validação regulatória vigente: antes de acrescentar regras legais, conferir as orientações atuais de ANAC, MAPA, DECEA e SUSEP, conforme a atividade. O registro da corretora foi reutilizado da configuração institucional e ainda precisa de conferência externa, assim como a disponibilidade efetiva dos produtos junto às seguradoras.

### Verificações e pendências de implantação

Foi feita revisão estática das rotas, redirecionamento central, exclusão do sitemap, formulário, metadados, conteúdo agrícola e geração de HTML. Os testes de catálogo foram ajustados para deixar de exigir o endereço consolidado; os testes públicos foram atualizados para a página principal, RETA, canonical, conteúdo estático e regra de redirecionamento.

Não foram executados compilação, testes automatizados, inspeção visual em celular/computador, consulta HTTP ou envio real de formulário. A inclusão dos testes não significa que passaram. No Lovable, executar a compilação e os testes; conferir ambas as páginas públicas, navegação por teclado, imagem, cookies e recebimento de um contato identificado como teste. Após implantar, conferir o 301 e os arquivos de sitemap/HTML gerados.

---

## Histórico da etapa 1 — prévia apresentada para aprovação

As observações abaixo descrevem o estado anterior à aplicação da etapa 2, não as páginas públicas atuais.

## Como revisar

No navegador de prévia do editor Lovable, abrir:

- `/previa/drones-agricolas` — proposta de página principal.
- `/previa/reta-drone-agricola` — conteúdo complementar agrícola de RETA.

Esses endereços não estão no catálogo, na navegação pública nem no sitemap. O conteúdo é limitado aos domínios de prévia/desenvolvimento reconhecidos no projeto e usa `noindex`. No domínio institucional e no subdomínio publicado comum do Lovable, essas rotas mostram a página de não encontrado. Isso separa o rascunho da publicação; não é um controle de acesso para conteúdo confidencial.

As três páginas públicas atuais, seus redirecionamentos e seus metadados não foram substituídos. Não publicar a nova versão sem aprovação.

## Proposta de conteúdo e apresentação

- Página principal: “Seguro para drones agrícolas”, com atendimento nacional, imagem agrícola já disponível no repositório e chamadas específicas para o produto.
- Navegação institucional preservada, sem carrossel de ofertas ou seções de outros produtos no corpo.
- Dois cartões, formulário próximo ao início e comparação de casco e RETA, incluindo “Quem recebe a indenização”.
- Nenhuma terceira cobertura genérica de responsabilidade civil apresentada como automática.
- Blocos sobre equipamento, acessórios, transporte, prestação de serviços, pulverização, deriva, financiamento, limites, franquias e vigência.
- Dez perguntas frequentes, exemplos expressamente ilustrativos e identificação institucional centralizada.
- Sem novos números comerciais, depoimentos, marcas de seguradoras ou alegações de parceria com DJI/XAG.
- Página complementar de RETA centrada na responsabilidade da operação agrícola, com acesso à análise completa de casco na principal.

## Formulário e integração

Reutiliza `ProductQuoteForm` e o recebimento existente por `send-form-email`. A opção de contato compacto é desativada por padrão e aplicada somente nas prévias; os formulários das outras páginas mantêm o comportamento atual.

Obrigatórios: nome, WhatsApp e autorização. Os seis detalhes agrícolas ficam em um grupo opcional: equipamento, valor, cidade/UF, forma de operação, atividade e interesse. Não há CPF, nota fiscal ou upload. A cidade também alimenta o campo já existente usado na integração.

Validação, foco no campo inválido, bloqueio de envio repetido, estado de envio e erros permanecem no componente existente. O sucesso depende da confirmação da integração. A alternativa de WhatsApp mantém os dados preenchidos e identifica o drone agrícola.

**A integração é real:** testar o botão de envio gera contato para a Patro. Não foi enviado um contato de teste nesta revisão.

## Verificações feitas no código

- Leitura das três páginas atuais, regras de SEO/apresentação, formulário, metadados, cabeçalho, cookies, ações flutuantes e dados institucionais.
- Rotas de prévia registradas no React Router com bloqueio de exibição nos domínios publicados.
- Reaproveitamento de imagem cujo caminho consta nos materiais do projeto; conferir visualmente o enquadramento no editor.
- Layout em uma coluna no celular e duas no computador, imagem com proporção reservada, campos com fonte de 16 px e controles principais com pelo menos 44 px.
- Rótulos e consentimento preservados, foco visível, comparativo sem dependência de rolagem horizontal e perguntas com controles nativos de teclado.
- Ações flutuantes removidas apenas nas prévias; consentimento de cookies colocado no fluxo do rodapé para não cobrir o formulário.
- Conteúdo principal não depende de consulta ao banco. As prévias usam o carregamento de rota existente; a geração do HTML público será tratada na publicação aprovada.
- Adicionados testes para isolamento dos domínios, conteúdo agrícola, três campos obrigatórios, envio mínimo, validação de telefone e falha sem falso sucesso.

**Não executado neste ambiente:** compilação, suíte de testes, navegação visual em dispositivos, inspeção da imagem, envio real e medições de contraste/desempenho. A inclusão de testes não significa que eles já passaram.

## Checklist de aprovação no editor

1. Abrir ambas as prévias em 360 px e em largura de computador; conferir imagem, textos, contraste e ausência de cortes.
2. Navegar com Tab/Enter pelos links, formulário, consentimento e perguntas. Conferir foco e rótulos.
3. Testar âncoras e acesso entre as duas prévias; confirmar que não há botões cobrindo ações.
4. Em sessão sem consentimento salvo, conferir o aviso de cookies no rodapé.
5. Testar erro de campos obrigatórios; executar os testes automatizados e a compilação pelo fluxo do projeto.
6. Se autorizado, enviar um contato identificado como teste e conferir recebimento real; simular falha de rede para confirmar manutenção dos dados.
7. Aprovar textos e organização antes de substituir páginas públicas.

## Pendências para a publicação aprovada

- Conferir fontes oficiais vigentes sobre os requisitos da operação agrícola, documentação e responsabilidade aeronáutica antes de incluir ou confirmar qualquer afirmação regulatória. Não foram consultados sites externos nesta execução, inclusive Ecofly. O texto evita regras de obrigatoriedade, pesos, dispensa ou interpretação normativa não verificada.
- Conferir o registro institucional e a compatibilidade das descrições com as condições dos produtos efetivamente disponíveis; o número SUSEP foi reutilizado da configuração institucional, não revalidado externamente.
- Consolidar `/seguro-drone-agricola` como principal e `/seguro-reta-drone` como complementar; avaliar e implementar o redirecionamento HTTP permanente de `/seguro-drone` pela infraestrutura existente.
- Atualizar catálogo, links internos, seletores/formulários públicos, sitemap, canonical, metadados centralizados e dados estruturados apenas após aprovação.
- Atualizar também a geração de HTML para buscadores e validar o resultado construído: o conteúdo público não pode depender só do fallback de carregamento do React.
- Remover a comunicação de prévia e executar as verificações finais antes de publicar.
