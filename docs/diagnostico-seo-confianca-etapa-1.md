# SEO e confiança — primeira etapa

## Escopo e limites

Revisão do código do site principal e consulta aos dados disponíveis no banco conectado. Não houve acesso às SERPs atuais, ao Search Console, ao Perfil da Empresa no Google nem à hospedagem dos domínios satélites. Não foram executados testes ou build neste ambiente.

As alegações de penalização, perda de 60% a 80% de tráfego e prazos de recuperação não estão comprovadas por esta revisão. Datas futuras e conteúdo semelhante precisam de investigação editorial, mas não demonstram isoladamente uma penalização ou inelegibilidade automática para o Discover.

## Dados consultados antes das alterações

- A consulta à tabela `gsc_indexation_status` não retornou registros.
- A consulta à tabela `leads`, limitada aos últimos 90 dias em relação ao relógio do banco, não retornou registros.
- O inventário de tabelas não mostrou um histórico persistido de cliques orgânicos por propriedade do Search Console.

Isso significa falta de dados disponíveis nesta integração, não ausência de tráfego, leads ou problemas de indexação. Cliques de WhatsApp também não equivalem a leads qualificados ou vendas.

### Evidências externas necessárias antes de migrar domínios

Exportar de cada propriedade do Search Console, com o mesmo intervalo de 90 dias e a mesma data final:

1. Desempenho de pesquisa por página: cliques, impressões, CTR e posição.
2. Indexação de páginas: totais e exemplos de “Rastreada, mas não indexada no momento” e “Soft 404”.
3. Inspeção das URLs críticas: home, serviços, hub Guarulhos e galpões, incluindo HTML renderizado e canônica escolhida pelo Google.
4. Do CRM/analytics: leads recebidos e qualificados por domínio, página de entrada e origem. Preservar identificadores de atribuição, sem incluir dados pessoais em documentos públicos.

## Problemas confirmados e correções aplicadas

### Home — depoimentos

`src/pages/Index.tsx` continha citações de Ricardo Silva, Mariana Costa e André Santos sem fonte individual documentada no componente, além de uma segunda seção `LocalTestimonials`.

As três citações e a segunda seção foram removidas da home. O link para o perfil público no Google foi preservado com uma orientação para consultar os relatos originais. Nenhuma avaliação foi inventada ou copiada como se tivesse sido verificada nesta revisão. As notas e contagens já cadastradas no site não foram verificadas externamente.

### Home — nomes das seguradoras

Foram adicionados espaços explícitos após os nomes na sequência principal do carrossel. O espaçamento visual por margem não insere separação no conteúdo textual do DOM.

### Central de Sinistros

O título com separadores e descrição de SEO era reutilizado como nome do serviço no template. O nome passou a ser “Central de Sinistros”. No modo de suporte, as seções de funcionamento e assistência agora usam títulos próprios, sem tratar a central como um seguro com coberturas.

### Hub `/seguros-guarulhos`

A primeira declaração dessa rota renderizava `SegurosGuarulhosBairros` sem parâmetro de bairro. Esse componente seleciona o primeiro bairro como padrão. A declaração foi alterada para renderizar o hub municipal já existente `HubSegurosGuarulhos`, com título e H1 referentes a Guarulhos. As rotas de bairro não foram alteradas.

Ainda existem declarações sobrepostas de rotas locais em `src/App.tsx`; a reorganização geral e a revisão do conteúdo local permanecem pendentes. O hub municipal reutilizado também precisa de revisão editorial das afirmações comerciais e links.

## Pendências — não considerar resolvidas

- **Datas do blog:** foram localizadas dez entradas com `2026-12-05` em `src/data/blogSalaComercialData.ts`. A data precisa ser confrontada com o histórico real de publicação e revisão. Não foram inventadas datas escalonadas nem alteradas autorias para aparentar revisão. A correção deve alcançar página, listagens, dados estruturados e sitemap de forma consistente.
- **Conteúdo raso:** nenhuma página recebeu `noindex` em massa sem avaliação individual e critérios documentados de qualidade.
- **“Carregando” indexado:** não foi reproduzido um snapshot do Googlebot. Home já possui diversos fallbacks sem texto. Não se deve presumir erro de hidratação só pela presença de um estado de carregamento; investigar o HTML final e o processo de pré-renderização antes de alterar o carregamento global.
- **Galpões no satélite:** o crash relatado pertence a outro domínio e não foi reproduzido neste repositório. Não houve implantação ou redirecionamento nesse domínio.
- **NAP e horário:** a grafia e o horário oficiais precisam ser conferidos com o Perfil da Empresa. O endereço sugerido no diagnóstico não foi adotado como verdade sem confirmação. Sites externos e WhatsApp não foram alterados.
- **301 externos:** nenhum redirecionamento entre domínios foi ativado. Exige inventário das URLs de origem, destinos equivalentes, preservação dos caminhos de conversão e configuração em cada hospedagem de origem.

## Validação após sincronização

1. Abrir a home e confirmar a ausência dos seis cartões de depoimentos nas duas seções removidas.
2. Conferir a separação textual das seguradoras, inclusive com leitor de tela.
3. Abrir `/central-de-sinistro` e conferir os títulos de funcionamento e assistência.
4. Abrir `/seguros-guarulhos` diretamente e por navegação interna: deve aparecer o hub municipal, não o bairro padrão.
5. Executar build, testes existentes e inspeção de URL no Search Console antes de considerar encerrada a primeira etapa. A mudança no código não atualiza imediatamente o índice do Google.
