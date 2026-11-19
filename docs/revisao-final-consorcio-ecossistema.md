# Revisão final do ecossistema de Consórcio

**Situação: preparado para revisão da Patro; aprovação comercial e validação em execução ainda necessárias.**
Este relatório consolida a parte 2 com `docs/revisao-final-consorcio-parte-1.md`. “Conferido” significa inspeção de código, não teste do site publicado. Nenhum teste automatizado, build, auditoria de navegador ou envio real foi executado nesta revisão. O repositório sincroniza com o Lovable; esta entrega não executa um comando de publicação nem suspende uma publicação automática já configurada.

## 1. Páginas e abrangência

| Página / jornada | Revisão realizada |
| --- | --- |
| `/consorcio` e reutilização em `/lp/consorcio` | Hub, simulador educativo e solicitação comercial; detalhes e testes preparados no relatório da parte 1 |
| `/consorcio-imoveis` | Conteúdo consultivo, custos, FGTS condicionado, documentação, pós-contemplação, CTAs, FAQ e versão estática |
| `/consorcio-veiculos` | Carros e motos, crédito líquido, lance embutido, usados, documentação e mensagens de WhatsApp distintas |
| `/consorcio-pesados-maquinas` | Caminhões, renovação de frota e seção agrícola, sazonalidade e ausência de data garantida para safra |
| `/consorcio-servicos` | Projetos elegíveis, documentos do prestador, comparação ilustrativa, formulário existente, FAQ e dados estruturados |
| `/consorcio-guarulhos`, `/consorcio-imoveis-guarulhos`, `/consorcio-veiculos-guarulhos`, `/consorcio-caminhoes-guarulhos`, `/consorcio-empresarial-guarulhos` | Fonte local compartilhada e template ativo, orientação regional, links entre modalidades, condições específicas e fontes oficiais |
| Conexões com artigos e `/ebook-consorcio` | Links presentes no componente e ampliados no conteúdo estático nacional. Não constitui revisão integral de todos os artigos nem do PDF |
| Endereços antigos `/consorcio-carro`, `/consorcio-veiculos-pesados` e jornada de cotação | Preservados; comprovação de destino e cadeia HTTP fica no checklist de execução |

A implementação ativa das modalidades usa `ConsorcioGuarulhosVertical`, `ConsorcioNationalPage`, `ConsorcioIntentPageTemplate` e a página específica de serviços. O arquivo legado `ConsorcioGuarulhos.tsx` não foi reescrito: não se deve confundir seu conteúdo antigo com o template local revisado. Não foram eliminadas páginas, URLs ou integrações.

## 2. Design, conversão e navegação

- Preservados azul profundo, imagens existentes, grids responsivos e a distinção entre modalidades.
- Incluída orientação visível sobre o papel da Patro e da administradora nas modalidades e em serviços.
- Jornada mantida: modalidade → comparação educativa ou formulário do hub → contato; serviços conserva seu próprio formulário.
- WhatsApp mantém número oficial configurado, identificação da origem e mensagem por modalidade; atendimento local acrescenta Guarulhos e região. Moto e máquina agrícola têm mensagens específicas.
- Navegação local ganhou ligações diretas entre as páginas de atendimento regional. Artigos, hub, outras modalidades e seguros continuam acessíveis; seguro do bem é apresentado como contratação separada.
- As perguntas agrícolas explicam que não se pode contar com a máquina para uma safra em data presumida e que a aceitação depende da categoria e do bem.

## 3. Conteúdo consultivo, GEO e AEO

O bloco compartilhado identifica a Patro como orientadora da consulta, não administradora nem responsável por decidir contemplação. Explica que o Banco Central autoriza e fiscaliza, mas não garante a operação. Após contemplação, permanecem análise, documentos, garantias, parcelas e reajustes contratuais.

Nas páginas locais, foram revistas afirmações sobre aquisição, custos, FGTS, lance embutido, aceitação de bens e documentação. FGTS não é apresentado como disponível para toda finalidade; não se presume elegibilidade de terreno isolado, imóvel comercial ou compra de investimento. Urgência exige comparação com alternativas que não dependam de contemplação.

Fontes oficiais visíveis: informações de consórcios e consulta de instituições do Banco Central, além de regras habitacionais da CAIXA. Endereços oficiais não tiveram disponibilidade HTTP aferida. Não foram inventados autores, avaliações, credenciais, datas de revisão ou resultados comerciais. Não há promessa de citações por IA ou destaques no Google.

**Limite editorial:** artigos relacionados e o PDF precisam de leitura comercial integral. A página do e-book ainda contém linguagem promocional sobre vantagens, estratégias e economia que merece aprovação; sua presença não comprova as afirmações do material. Não se declara todo o acervo editorial aprovado.

## 4. SEO e preservação técnica

- Templates revisados mantêm um H1 principal por página, navegação semântica e perguntas em elementos nativos `details`, com respostas no documento.
- Metadados centrais passaram a aproveitar as fontes das páginas nacionais e locais; serviços mantém seu grafo próprio. É uma alteração limitada às rotas encontradas nessas listas, sem mudança da regra global de canonical.
- Conteúdo estático nacional foi ampliado com etapas, custos, documentação, lances, responsabilidades, fontes e leituras. Serviços também recebe responsabilidades e fontes na versão estática. Isso não comprova que o servidor publicou o HTML gerado.
- FAQ de serviços continua derivada das mesmas perguntas visíveis. As faixas de crédito do produto estruturado continuam acompanhadas da ressalva de disponibilidade no texto visível. Não foram criadas ofertas nem avaliações estruturadas.
- Imagens existentes têm descrição e dimensões explícitas; não houve geração de imagem ou importação de pacote.
- Canonical, robots e breadcrumbs seguem as ferramentas existentes. O preview Lovable é propositalmente não indexável; a conferência de indexação deve usar o domínio público.

**Nenhuma alteração global em canonical, sitemap, robots.txt, redirects, servidor, build, banco ou funções de integração foi realizada nesta etapa.** Não se declara cobertura dos sitemaps publicados, ausência de páginas órfãs, links quebrados ou redirecionamentos em cadeia: isso depende do rastreamento e do HTML efetivamente entregue. As ligações locais adicionadas reduzem isolamento dentro desse conjunto, mas não substituem a auditoria completa.

## 5. Formulários, WhatsApp e simuladores: evidência disponível

| Item | Conferido / implementado | Resultado de execução |
| --- | --- | --- |
| WhatsApp das modalidades | Construção de URL oficial, origem e mensagens específicas; testes de componente ampliados | Não executado; abertura em aplicativo e desktop pendente |
| Formulário do hub | Tratamento de erros, confirmação e falhas parciais descritos na parte 1 | Testes preparados, não executados; CRM real não confirmado |
| Formulário de serviços | `ProductQuoteForm` e envio existente preservados, consentimento e qualificação do projeto | Teste existente com serviço simulado inspecionado; não executado |
| Simulador educativo | Fórmulas, arredondamento de apresentação, limites e hipóteses revistos na parte 1 | Sem execução; não é proposta, CET, cronograma contratual ou garantia de economia |
| Links internos e fontes | Destinos mantidos no conteúdo; âncoras têm verificações preparadas | Status HTTP e rastreamento geral indisponíveis |

Os testes ampliados em `ConsorcioModalityContent.test.tsx` verificam H1, responsabilidades, fontes, âncoras, mensagens locais, chamada de mensuração e links entre páginas locais. Mantêm as verificações existentes de moto, seção agrícola, pessoa jurídica, formulário e simulador. Escrever um teste não significa que ele passou.

## 6. Celular, computador, acessibilidade e performance

A inspeção confirma grids que mudam por breakpoint, botões com quebra de linha, links com área mínima, foco explícito nos principais CTAs e resumos de FAQ, além de tabela de serviços com rolagem horizontal focável. O conteúdo novo é textual e compartilhado, sem biblioteca ou consulta de rede adicional. As imagens atuais reservam proporção e dimensões.

**Não medidos:** contraste final, tema escuro completo, leitor de tela, teclado em navegador, zoom, barras fixas, overflow real, tamanho transferido das imagens, LCP, INP, CLS e tempo de carregamento. Não há pontuação ou declaração de conformidade. Não foi feito teste visual em celular ou computador.

## 7. Indicadores: implementação não é dado comprovado

- Cliques de WhatsApp e intenção de simulação conservam os eventos existentes; origem diferencia páginas e alguns CTAs.
- Envio do hub e serviços preserva os mecanismos existentes; confirmar recebimento comercial é uma verificação separada.
- Uso do simulador e escolha de modalidade têm instrumentação descrita na parte 1, dependente do analytics carregado.
- Início de formulário depende do observador global; não foi comprovado para cada página. Não se presume mensuração de todos os cartões ou de toda navegação.
- Os novos testes observam chamadas simuladas, não recebimento no analytics. Contagens, taxas de conversão e dados reais não foram consultados.
- Nenhum novo evento transmite nome, telefone, detalhes de projeto ou documentos. A revisão não certifica privacidade de todas as ferramentas existentes; conferir payloads e consentimento em execução.

## 8. Aprovação comercial necessária

- [ ] Confirmar administradoras e modalidades realmente disponíveis, cobertura nacional, faixas, prazos e regras de atendimento.
- [ ] Validar bens usados, motos, elétricos, máquinas e implementos, além de documentação e categorias de serviços.
- [ ] Confirmar condições de FGTS, lance embutido, reajustes, garantias e despesas admitidas com a administradora.
- [ ] Aprovar responsabilidades da Patro, canais de contato, promessa de retorno e tratamento operacional de falhas parciais do hub.
- [ ] Revisar comparação ilustrativa de serviços e esclarecer que taxas e valores não são ofertas nem médias do mercado.
- [ ] Ler artigos relacionados, página de captação e PDF do e-book; aprovar ou corrigir alegações antes da divulgação conjunta.

## 9. Checklist antes da publicação e acompanhamento

1. Executar build e as suítes de metadados, modalidades, serviços, hub e simulador; registrar resultados, não apenas existência dos testes.
2. No preview, percorrer todas as rotas acima em 360/390 px e 1280/1440 px, teclado, zoom de 200%, movimento reduzido e leitor de tela. Conferir foco, barras fixas, FAQs e tabela.
3. Testar todos os CTAs, incluindo moto, agrícola, páginas locais, artigos e retorno ao hub. Abrir WhatsApp no celular e computador, confirmar número e mensagem, sem enviar dados sensíveis.
4. Fazer envios autorizados e identificados como teste nos dois formulários; conferir consentimento, erros, conexão lenta, duplo clique, falha total, falha parcial, confirmação, CRM e e-mail. Separar confirmação técnica de atendimento efetivo.
5. Exercitar simulador com zero juros, juros muito pequenos, entrada integral, custos adicionais, limites e inválidos; verificar resultados com totais maiores e menores e cenário enviado ao formulário.
6. Conferir no domínio público HTTP, canonical e robots finais, redirects antigos e páginas de cotação, breadcrumbs e grafos renderizados. Validar sitemap e rastrear links para identificar quebrados e órfãos.
7. Inspecionar URLs no Search Console e dados estruturados nas ferramentas oficiais, sem esperar elegibilidade automática de FAQ ou resultado especial.
8. Medir carregamento e estabilidade em aparelhos reais, inclusive imagens e recursos de cabeçalho/rodapé; priorizar ajustes a partir de medições.
9. Conferir eventos em depuração e ausência de dados pessoais. Após aprovação e publicação, comparar solicitações recebidas com eventos, acompanhar erros, abandono e qualidade dos contatos por modalidade.

**Conclusão:** correções de modalidades e atendimento local estão preparadas para revisão, com integrações preservadas e relatório consolidado. A liberação comercial depende dos itens acima; esta entrega não equivale a homologação em produção nem a revisão integral do acervo editorial.
