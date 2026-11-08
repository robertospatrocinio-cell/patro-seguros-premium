# Prompt 2/4 — fechamento e passagem para a Parte 3

## 1. Entrega e limites

Consolidação das três etapas do Prompt 2, preservando a Parte 1 técnica. Esta etapa cobre contatos publicados, acesso ao Google Maps, convite ético de avaliações e preparação da auditoria autorizada do Perfil da Empresa. **Não houve consulta ao Google, diretórios, Search Console, Analytics ou backlinks**, nem alteração externa. Não houve execução de build, testes, scripts ou navegação no preview neste ambiente. Inspeção do código não comprova funcionamento em produção.

As correções web desta etapa estão implementadas; a auditoria externa fica preparada, não certificada como concluída. O relatório não declara todo o acervo comercial validado. Não foram alterados os valores oficiais de `EMPRESA`, criadas páginas de bairros, removidas URLs, aplicados redirects ou alteradas regras de indexação. O `noindex` já existente em `/contato` foi preservado; sua conveniência deve ser analisada junto à arquitetura técnica, não mudada incidentalmente.

### Documentos-base

- `docs/auditoria-tecnica-parte-1.md`: arquitetura e riscos técnicos anteriores, sem nova certificação nesta etapa.
- `docs/auditoria-local-parte-2-etapa-1.md`: inventário por família, 22 registros de bairros, 19 configurações auto, Pimentas e propostas de consolidação.
- `docs/auditoria-local-parte-2-etapa-2.md`: 31 configurações locais revisadas, residencial geral, links e pendências comerciais.
- `docs/aeo-nap-master.md`: valores cadastrados, limites de comprovação e descrição proposta.
- `docs/aeo-fase-c-gbp-checklist.md`: matriz do Perfil da Empresa, diretórios, aprovações e procedimento de avaliações.

As contagens anteriores são de registros/configurações, não de URLs publicadas únicas nem de visitas. Não somar os catálogos como se fossem páginas distintas: há precedência e sobreposição. Os scripts de inventário das etapas anteriores continuam sem execução nesta entrega; nenhum CSV/JSON de resultados foi simulado.

## 2. Consistência dos contatos: evidências e ações

Referência operacional: `src/config/empresa.ts`. Telefone/WhatsApp `(11) 5199-7500`, e-mail `contato@patroseguros.com.br`, Av. Salgado Filho, 2120, sala 219, Edifício Via Alameda, Cidade Maia, Guarulhos/SP, CEP 07115-000; segunda a sexta, 8h30 às 18h. São dados cadastrados, não informações confirmadas externamente nesta sessão.

| Superfície examinada | Evidência | Ação nesta etapa |
| --- | --- | --- |
| Configuração oficial | Nome fantasia Patro Seguros; fundação 2021; horário comercial; CID cadastrado | Valores preservados |
| `/avaliar-no-google`, registrada em `App.tsx` | Conteúdo anterior pedia cinco estrelas, palavras-chave e trazia elogios prontos para copiar | Substituído por convite livre, sem incentivo, com privacidade e contatos importados |
| `/contato`, cards e FAQ | Telefone/e-mail copiados; promessa de plantão Patro 24h e retorno em duas horas | Cards usam configuração; FAQ distingue corretora de assistência contratada da seguradora |
| `/contato`, introdução e HowTo | Retorno e propostas em prazo fixo, atendimento imediato | Retiradas garantias; orientação para confirmar previsão e disponibilidade |
| `ContactMapSection`, usado em `/contato` | Google/Waze e endereço com cópias; incorporação com identificadores fixos sem comprovação apresentada | Maps usa destino cadastrado; Waze e incorporação pesquisam endereço da configuração |
| `ContactMapSection`, informações de visita | Estacionamento e referência ao shopping afirmados sem validação nesta etapa | Orientação para confirmar acesso e visita; sem promessa de estacionamento |
| `NapBlock`, bloco do rodapé | Link abria busca por endereço, diferente do link de perfil cadastrado | Link passa a usar `GOOGLE_MAPS_URL`; endereço e telefone preservados |
| `GoogleBusinessWidget` | Endereço fixo e outro link de busca; dados pareciam um bloco do Google | Usa configuração e perfil cadastrado; informa que não há atualização automática |
| `PATRO_SOCIAL_PROOF` | Link curto de avaliação distinto do link de perfil, sem comprovação do destino nesta etapa | Usa perfil já cadastrado como alternativa conservadora; não se afirma que o link antigo era inválido |
| Documento de referência anterior | Fundação 2020, sábado e preferência por outro nome público divergiam de `EMPRESA` | Documento substituído por espelho explícito da configuração, sem mudar os dados oficiais |
| Checklist anterior do Google | Metas de nota, respostas com palavras-chave e perguntas simuladas | Substituído por processo ético, baseado em experiência real e aprovação |
| Verificador de citações existente | Nome preferido fixo, URLs presumidas e análise textual limitada | Limitações documentadas; não utilizado como prova nem autorização de alteração externa |

O mapa incorporado agora é uma **busca por endereço**, não prova do pin do perfil. Seu resultado depende do Google e deve ser conferido por pessoa autorizada. Os links de perfil também dependem da existência e do destino do CID cadastrado. O nome “oficial” em textos do site significa cadastrado pela Patro, não titularidade verificada nesta auditoria.

Uma busca no código encontrou cópias do mesmo telefone em outros componentes e conteúdos. Duplicação não comprova número errado; a centralização global não foi refeita. Coordenadas, equivalência Cidade Maia/Parque Renato Maia/Jardim Maia e paridade dos dados estruturados e do HTML estático não foram certificadas. A nota 4,9 e demais métricas já cadastradas não foram alteradas nem validadas: obter fonte e data antes de tratá-las como atuais.

## 3. Inventário, prioridades e consolidação

O inventário editorial consolidado é a união dos documentos das etapas 1 e 2, com os limites de publicação acima. Prioridade **P0**: preços, condições, redes e resultados sem fonte; Pimentas foi a revisão inicial. **P1**: configurações locais comerciais, diferenciação real de bairros, rotas sobrepostas e comprovação de oferta. **P2**: demais recortes e manutenção, sem autorização implícita de excluir.

Decisões mantidas: melhorar páginas existentes; não criar páginas cujo único diferencial seja o nome do bairro. Pimentas curto/longo, Vila Augusta curto/longo, Bonsucesso com `-v2`, recortes Maia e hubs versus variantes `seguros-em`/`corretora` continuam candidatos a consolidação, **dependendo de análise e aprovação**. Antes de escolher destino: confirmar rota efetiva, canonical, resposta HTTP, tráfego, conversões, backlinks e utilidade distinta. Nenhuma consolidação foi aplicada.

Conteúdos já corrigidos: segurança comercial auto/Pimentas, condições de contratação locais de saúde/residencial/vida/empresarial/galpão e comparação residencial; agora, condições de atendimento e avaliações. Retirada de alegações sem fonte não é comprovação de originalidade local nem validação dos textos remanescentes.

## 4. Arquitetura de links e contato

- Mantidos os caminhos das etapas anteriores: modalidade → página local → hub do bairro quando inequívoco → cotação do produto; saúde → comparativo; residencial → modalidades relacionadas, blog e cotação.
- `/avaliar-no-google` continua na rota existente, com breadcrumb para `/sobre`, link para `/contato`, telefone, e-mail, WhatsApp e acesso ao perfil cadastrado.
- Rodapé, bloco Google e seção “Como chegar” convergem para o perfil configurado, em vez de buscas distintas. Waze permanece uma busca pelo endereço, com rastreamento existente preservado.
- Convite de avaliação não condiciona contato ou suporte. O cliente pode usar os canais de atendimento independentemente de nota, contratação ou publicação.
- Não foram adicionadas nuvens de bairros, novas rotas ou links massivos na home. Links editoriais/comerciais anteriores foram preservados.

## 5. Auditoria do Google e avaliações: execução necessária

A matriz completa está em `docs/aeo-fase-c-gbp-checklist.md`: nome real, categorias disponíveis, endereço/sala, pin, recepção de clientes, telefone, horários especiais, serviços, descrição, atributos, fotos reais autorizadas, links, avaliações, indicadores e diretórios. Tudo começa como pendente de conferência, com registro de evidência, responsável, data e aprovação. A descrição em `docs/aeo-nap-master.md` é proposta; não foi publicada no Google.

Processo preparado: convite opcional após marco neutro de atendimento, sem filtrar clientes satisfeitos, exigir contratação, pedir nota/palavras-chave, oferecer recompensa ou fornecer elogios prontos. Não criar perguntas ou avaliações simuladas. Não pressionar por edição/remoção. Responder relatos reais sem expor dados; tratar reclamações sem condicionar solução à avaliação. Não estabelecer meta de nota. O roteiro contém mensagem sugerida e respostas neutras, não automação de envios.

Para diretórios, confirmar primeiro existência e titularidade da ficha e depois comparar os campos. Não declarar perfis presumidos como encontrados. Abreviações e formatos de telefone não são divergência factual por si só. Monitorar apenas métricas disponíveis na conta, períodos comparáveis e definições claras; cliques não equivalem a contratos. Não foi implementada integração com a API do Google nem coleta de indicadores.

## 6. Pendências para a Patro e passagem para a Parte 3

| Prioridade | Responsável sugerido | Evidência necessária / critério de aceite |
| --- | --- | --- |
| P0 | Direção / operação | Confirmar nome público, endereço/sala, bairro, recepção, acesso, horários e canais com documentos e funcionamento real |
| P0 | Gestor autorizado do perfil | Preencher matriz e testar pin, links e eventual link direto de avaliação em celular/computador; aprovar antes de mudar qualquer campo |
| P0 | Comercial | Validar produtos atuais, rede exata, preços, franquias, limites, exclusões, prazos e provas sociais remanescentes, conforme etapa 2 |
| P1 | Gestão / conteúdo | Confirmar métricas publicadas, fonte/data de nota, depoimentos e estatísticas; não republicar valores retirados sem documentação |
| P1 | Web / SEO | Executar inventários, conferir rotas efetivas, prerender, contatos e dados estruturados; preservar correções da Parte 1 |
| P1 | Gestão / SEO | Exportar métricas autorizadas por URL, conversões e backlinks antes de aprovar consolidação ou desindexação |
| P1 | Atendimento | Adotar regra neutra de convite, respeitar recusas e aprovar respostas com privacidade |
| P2 | Gestor autorizado | Conferir fichas reais em diretórios, registrar aprovações e manter horários especiais atualizados |

A Parte 3 pode utilizar esta base sem supor que a auditoria externa foi feita. Anexar posteriormente inventários executados, resultados de testes, capturas autorizadas, evidências comerciais e decisões assinadas. Não apagar URLs ou ampliar catálogos antes dessas validações. Não há promessa de ranking, tráfego, nota ou cotações.

## 7. Arquivos desta etapa e verificações

Alterados: `src/pages/AvaliarNoGoogle.tsx`, `src/pages/Contato.tsx`, `src/components/ContactMapSection.tsx`, `src/components/NapBlock.tsx`, `src/components/GoogleBusinessWidget.tsx`, `src/lib/patroSocialProof.ts`, `docs/aeo-nap-master.md` e `docs/aeo-fase-c-gbp-checklist.md`. Criados: `src/pages/AvaliarNoGoogle.test.tsx` e este relatório. As listas das etapas anteriores permanecem nos relatórios respectivos.

Inspeção estática realizada: rota de avaliação; uso do mapa e widget na página de contato; origem dos contatos; interface dos componentes utilizados; paridade das seis perguntas/respostas visíveis com a entrada do FAQ; preservação de formulários e rastreamento nos trechos alterados. O novo teste cobre destino do convite, rastreamento, contatos da configuração, ausência de pedido de cinco estrelas/modelos e paridade do FAQ. **Teste preparado, não executado**; não representa resultado aprovado.

Validação a executar no Lovable/CI: `npx vitest run src/pages/AvaliarNoGoogle.test.tsx src/data/localContentSafety.test.ts src/data/localCommercialContent.test.ts`; `node scripts/audit-local-content.mjs`; `node scripts/audit-commercial-content.mjs`; build habitual com validadores existentes. O build também contém tarefas externas: registrar saídas e não presumir sucesso por existir commit. Conferir no preview `/avaliar-no-google`, `/contato` e o rodapé, além de auto/Pimentas e residencial da etapa anterior; testar FAQ por teclado, telefone, WhatsApp, e-mail, perfil, Waze, envio de contato e mapa após carregamento. Conferir em produção paridade do HTML pré-renderizado e marcações antes de declarar publicação validada.
