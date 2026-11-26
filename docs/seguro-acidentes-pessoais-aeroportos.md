# Seguro de Acidentes Pessoais para Aeroportos — entrega e validação

## O que foi implementado

- Página comercial em `/seguro-acidentes-pessoais-aeroportos`, acessível pelo Hub de Seguros Aeroportuários. Usa o cabeçalho e o rodapé institucionais, o WhatsApp oficial `(11) 5199-7500` e, provisoriamente, a imagem existente da vertical de engenharia aeroportuária.
- Conteúdo para empresas, autônomos e equipes temporárias: exigências contratuais, coberturas, elegibilidade, análise ocupacional, seis situações hipotéticas, segurança do trabalho, comparação com outras modalidades, preço, contratação e 25 perguntas frequentes. A página não confirma uma exigência universal de AP em GRU, aceitação da atividade ou direito à indenização.
- Metadados próprios, URL canônica, trilha de navegação, dados estruturados de página, serviço e FAQ, links internos, inclusão na geração do sitemap e na lista de pré-renderização React. A marcação do FAQ descreve o conteúdo visível e não garante destaque no Google.
- Cotação em três etapas para empresa ou profissional individual, reaproveitando `submit-lead`. O CRM recebe a categoria **Riscos Aeroportuários** e o produto **Acidentes Pessoais**, com perfil, equipe, vigência e coberturas visíveis na triagem. Não foi necessária alteração no banco.

## Privacidade e documentação

A consulta ao banco confirmou que `crm_documents` é privado e que sua regra de acesso exige usuário autenticado com perfil administrativo. O formulário pede autorização para análise e contato, orienta a não enviar documentos pessoais, limita o anexo opcional a PDF de até 2 MB com verificação de formato no navegador e no servidor, e não publica links para os arquivos. Essa verificação não é uma análise de malware: antes de tratar arquivos, a equipe deve seguir as práticas internas de segurança e de gestão de dados. O formulário não substitui uma avaliação completa de conformidade com a LGPD.

Como a exigência varia por contratante, atividade e equipe, a página indica os portais oficiais da SUSEP, do Ministério do Trabalho e Emprego e do GRU Airport e orienta a conferir a cláusula vigente, anexos de credenciamento e instrumentos coletivos aplicáveis. Não houve consulta externa nem acesso a contratos de clientes nesta entrega.

## Verificação pendente no ambiente Lovable

1. Confirmar build e renderização no preview. Em dispositivos móveis e desktop, conferir foco, contraste, navegação por teclado, FAQ e ausência de rolagem horizontal fora das tabelas.
2. Rodar a especificação Playwright `e2e/seguro-acidentes-pessoais-aeroportos.spec.ts` para rota, breadcrumb estruturado, canonical, acesso pelo hub, link oficial, consentimento e envio simulado nos dois perfis, inclusive anexo aceito e rejeitado. O teste usa respostas simuladas e não valida a função publicada.
3. Após o Lovable publicar a função `submit-lead` atualizada, enviar contatos de teste pelos dois perfis, inclusive com PDF fictício sem dados pessoais. Verificar categoria, produto e campos no CRM, download com perfil administrador, ausência de acesso anônimo e funcionamento dos formulários anteriores do hub e de E&O.
4. Conferir o sitemap gerado, o HTML pré-renderizado, o JSON-LD e as métricas de carregamento, além de conferir as referências externas e substituir a foto provisória por uma foto dedicada sem marcas de terceiros. Build, navegador, testes automatizados, medições e publicação da função não puderam ser executados neste ambiente.
