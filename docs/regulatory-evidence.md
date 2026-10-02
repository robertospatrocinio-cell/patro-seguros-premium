# Matriz de governança técnica e regulatória

**Fase:** 2A — documentação e diagnóstico

**Escopo:** fonte interna de verdade para claims técnicos e regulatórios. Esta matriz não autoriza, por si só, alteração de páginas públicas.

**Última verificação desta matriz:** 2026-09-28

**Atualização Fase 2B.1:** 2026-09-28 — correções controladas aplicadas somente a Saúde/MEI, Drones/UAS e PSR.

## Regras de uso

Claims regulatórios devem ser publicados somente após conferência da fonte primária vigente. Cobertura contratual não deve ser apresentada como obrigação legal. Quando a resposta depender de produto, seguradora, perfil, risco ou apólice, o status deve ser **DEPENDE DO CONTRATO**.

## 1. Seguro condominial

| Claim | Status | Regra correta / escopo | Exceções e cautelas | Fonte primária | Órgão | Páginas afetadas |
|---|---|---|---|---|---|---|
| O seguro de toda edificação contra incêndio ou destruição, total ou parcial, é obrigatório | PARCIALMENTE VALIDADO | O art. 1.346 do Código Civil prevê seguro de toda a edificação contra incêndio ou destruição, total ou parcial | Não significa que todas as coberturas adicionais sejam obrigatórias | Lei nº 10.406/2002, art. 1.346 | Congresso Nacional / Planalto | `/seguro-condominio`, `/seguro-condominio-empresarial`, artigos sobre condomínio |
| Todas as coberturas do seguro condomínio são obrigatórias | INCORRETO | A obrigação legal não equivale à contratação de todas as coberturas disponíveis | Coberturas adicionais dependem do contrato | Código Civil, art. 1.346 | Planalto | Claims localizados em conteúdos de condomínio; revisão necessária |

## 2. Prazo de indenização e regulação de sinistro

| Claim | Status | Regra correta / escopo | Exceções e cautelas | Fonte primária | Órgão | Páginas afetadas |
|---|---|---|---|---|---|---|
| “A seguradora tem 30 dias após o sinistro para pagar” | VERIFICAÇÃO NECESSÁRIA | O prazo não deve ser contado genericamente apenas da ocorrência do sinistro | Considerar reconhecimento da cobertura, documentação, suspensão e regras específicas | Lei nº 15.040/2024 e regulamentação vigente | Planalto / SUSEP / CNSP | `public/llms-full.txt`, `/seguro-condominio-empresarial`, fluxos de sinistro |
| “30 dias para pagar ou negar formalmente” | VERIFICAÇÃO NECESSÁRIA | Exige conferência do marco legal atual e da documentação completa | Não transformar em regra universal para todos os ramos | Lei nº 15.040/2024 e regulamentação vigente | Planalto / SUSEP / CNSP | `public/llms-full.txt` |
| “Pagamento em 15–30 dias” | VERIFICAÇÃO NECESSÁRIA | Faixa de pagamento não é regra geral | Depende de ramo, apólice, análise e documentação | Fonte contratual e regulamentação aplicável | SUSEP / seguradora | `public/llms-full.txt` |
| “Pagamento em 25–45 dias” | VERIFICAÇÃO NECESSÁRIA | Não publicar como prazo regulatório universal | Depende do produto e da regulação | Fonte contratual e regulamentação aplicável | SUSEP / seguradora | `public/llms-full.txt` |
| “Prazo médio de vistoria de 24–72h” | DEPENDE DO CONTRATO | Prazo operacional informado pela seguradora ou prestador | Não equivale ao prazo de indenização | Condições do produto / canal da seguradora | Seguradora | `public/llms-full.txt` |

## 3. Planos de saúde e MEI

| Claim | Status | Regra correta / escopo | Exceções e cautelas | Fonte primária | Órgão | Páginas afetadas |
|---|---|---|---|---|---|---|
| Empresário individual pode contratar plano coletivo empresarial | PARCIALMENTE VALIDADO | Pode contratar conforme requisitos regulatórios e comprovação da atividade empresarial | Requisitos e documentos devem ser conferidos na ANS e na operadora | Normas e orientações vigentes da ANS | ANS | `/planos-de-saude`, `/seguro-saude`, conteúdos MEI |
| Atividade empresarial mínima de 6 meses | VERIFICAÇÃO NECESSÁRIA | A ANS informa requisito de comprovação do exercício da atividade empresarial por período mínimo de 6 meses em hipóteses aplicáveis | Não converter em regra universal para todo produto ou operadora | Orientação e regulamentação vigente da ANS | ANS | `public/llms-full.txt`, conteúdos MEI |
| Planos empresariais com até 29 beneficiários podem ter carência | PARCIALMENTE VALIDADO | Pode haver carência conforme regras aplicáveis | Depende do contrato e da composição do grupo | Regulamentação vigente da ANS | ANS | conteúdos de plano empresarial |
| Planos com 30 ou mais beneficiários podem ter hipóteses de isenção de carência | PARCIALMENTE VALIDADO | A isenção depende dos requisitos e prazos da ANS e do produto | Não é automática | Regulamentação vigente da ANS | ANS | conteúdos de plano empresarial |
| “MEI sem carência” | INCORRETO | Não é regra universal | Depende do contrato, grupo, prazos e requisitos | ANS | ANS | conteúdos MEI |
| “Plano MEI é X% mais barato” | VERIFICAÇÃO NECESSÁRIA | Preço depende de operadora, região, grupo, rede e condições | Não publicar percentual sem metodologia e fonte | Proposta da operadora / ANS | ANS / operadora | `public/llms-full.txt`, comparativos de saúde |

## 4. Drones e UAS

| Claim | Status | Regra correta / escopo | Exceções e cautelas | Fonte primária | Órgão | Páginas afetadas |
|---|---|---|---|---|---|---|
| Todo drone agrícola precisa de seguro RETA | INCORRETO | O enquadramento depende da categoria e das características da operação | Considerar exceções do RBAC nº 100 e a operação agrícola aplicável | RBAC nº 100 vigente | ANAC | conteúdos de drone agrícola e `blogAgroData.ts` |
| Seguro de responsabilidade civil para drone é sempre obrigatório | VERIFICAÇÃO NECESSÁRIA | A obrigação depende do enquadramento regulatório da operação | Não confundir exigência operacional com cobertura contratual | RBAC nº 100 e regras complementares | ANAC / DECEA | `/seguro-reta-drone`, `/seguro-drone-agricola` |
| Cadastro SISANT é exigido em toda operação | VERIFICAÇÃO NECESSÁRIA | Exigências dependem do tipo de aeronave e operação | Conferir regra vigente | Regras oficiais do SISANT/ANAC | ANAC | conteúdos de drones |
| VLOS, EVLOS, BVLOS e limite de 400 pés | VERIFICAÇÃO NECESSÁRIA | São conceitos e limites dependentes do enquadramento operacional | Não apresentar como regra única para toda operação | RBAC nº 100 e DECEA | ANAC / DECEA | conteúdos de drones |
| Seguro casco cobre todo dano ao drone | DEPENDE DO CONTRATO | Casco depende da cobertura contratada, limites e exclusões | Verificar condições gerais e particulares | Apólice e condições da seguradora | Seguradora | `/seguro-drone-agricola` |

## 5. Programa de Subvenção ao Prêmio do Seguro Rural — PSR

| Claim | Status | Regra correta / escopo | Exceções e cautelas | Fonte primária | Órgão | Páginas afetadas |
|---|---|---|---|---|---|---|
| PSR subsidia entre 20% e 40% do prêmio | VERIFICAÇÃO NECESSÁRIA | Percentuais, culturas, limites e condições dependem do programa e do período vigente | Registrar o Plano Trienal 2025–2027 quando aplicável | Manual e Plano Trienal do PSR | MAPA | `public/llms-full.txt`, artigos PSR/agro |
| CAR é obrigatório para contratação do PSR | VERIFICAÇÃO NECESSÁRIA | Exigências documentais dependem do enquadramento do programa e da cultura | Não universalizar sem fonte vigente | Regras do PSR/MAPA | MAPA | `public/llms-full.txt` |
| Patro Seguros é habilitada no PSR | VERIFICAÇÃO NECESSÁRIA | Exige comprovação documental e cadastro vigente | Não publicar como fato até validação | Cadastro ou documento oficial do MAPA | MAPA | `public/llms-full.txt` |
| Subvenção é garantida | INCORRETO | Subvenção depende de elegibilidade, orçamento, cultura, limites e aprovação | Não prometer concessão | Regras vigentes do PSR | MAPA | conteúdos agro |

## 6. Outros temas regulatórios e técnicos

| Tema / claim | Status | Regra de governança | Fonte primária prioritária | URLs ou áreas afetadas |
|---|---|---|---|---|
| LGPD / seguro cyber cobre multa | VERIFICAÇÃO NECESSÁRIA | Cobertura e legalidade de indenização dependem da apólice e da legislação aplicável | ANPD, LGPD e condições da seguradora | `/seguro-cyber`, conteúdos cyber |
| RC profissional é obrigatório | VERIFICAÇÃO NECESSÁRIA | Pode ser exigência contratual, profissional ou de credenciamento; não presumir obrigação geral | Lei/regulamento da profissão e contrato | páginas RC profissional |
| D&O protege qualquer ato de gestão | DEPENDE DO CONTRATO | Limites, exclusões e eventos cobertos dependem da apólice | Condições da seguradora | páginas D&O |
| RCF-DC sempre indeniza roubo de carga | DEPENDE DO CONTRATO | Depende da cobertura, averbação, limites, gerenciamento de risco e condições | SUSEP e apólice | conteúdos de transporte |
| RCTR-C cobre qualquer dano à carga | DEPENDE DO CONTRATO | Depende do risco coberto, evento, limites e exclusões | SUSEP e apólice | conteúdos RCTR-C |
| APP é obrigatório para todo motorista de aplicativo | VERIFICAÇÃO NECESSÁRIA | Exige análise da legislação e das regras da plataforma aplicável | Órgão regulador, legislação e plataforma | conteúdos Uber/99 |
| Uso Uber/99 sem declaração gera negativa automática | VERIFICAÇÃO NECESSÁRIA | Pode caracterizar agravamento ou divergência de risco, mas o efeito depende do contrato e da análise do sinistro | Código Civil, SUSEP e apólice | `/seguro-auto`, conteúdos Uber/99 |
| Seguro de vida sempre indeniza morte ou invalidez | DEPENDE DO CONTRATO | Cobertura, carência, riscos excluídos e documentação dependem da apólice | Condições da seguradora | `/seguro-vida`, conteúdos de vida |
| Seguro auto cobre colisão, roubo, furto e terceiros | DEPENDE DO CONTRATO | Somente se as coberturas tiverem sido contratadas e aceitas | Apólice e condições gerais | `/seguro-auto` e páginas auto |
| Carro reserva, guincho e vidros estão incluídos | DEPENDE DO CONTRATO | Serviços, limites, distância, dias e elegibilidade variam | Apólice e assistência da seguradora | páginas de auto e residencial |
| Seguro residencial cobre danos elétricos, furto simples ou alagamento | DEPENDE DO CONTRATO | Depende de cobertura adicional, definição do evento e limites | Apólice e condições gerais | `/seguro-residencial` e conteúdos residenciais |

## 7. Claims de cobertura que não são regras regulatórias

## 8. Fase 2B.3 — Seguro Auto, uso profissional e franquia

| Claim anterior | Regra correta | Status | Escopo | Exceções | Fonte primária | Data de verificação | URLs afetadas |
|---|---|---|---|---|---|---|---|
| Seguro Auto cobre colisão, roubo, furto, incêndio, vidros, carro reserva e assistência | A cobertura depende do produto, da seguradora e das garantias efetivamente contratadas | DEPENDE DO CONTRATO | Seguro Auto | Limites, exclusões, eventos e serviços devem ser conferidos na apólice | SUSEP — Seguro de Automóveis; Circular SUSEP nº 639/2021 | 2026-09-28 | `/seguro-auto`, páginas Auto relacionadas |
| Todo sinistro de Auto tem franquia ou nunca tem franquia em determinados eventos | A aplicação e o valor dependem da cobertura, do evento e da previsão contratual | DEPENDE DO CONTRATO | Franquia Auto | A apólice pode prever franquia, modalidades e hipóteses específicas | SUSEP — Seguro de Automóveis; SUSEP — Seguro de Danos | 2026-09-28 | `/seguro-auto`, conteúdos sobre franquia |
| Perda total ocorre universalmente quando o reparo supera 75% | O critério de indenização integral deve ser verificado nas condições contratuais do produto | DEPENDE DO CONTRATO | Indenização integral Auto | Não publicar percentual universal sem fonte contratual específica | SUSEP — Seguro de Automóveis; condições contratuais do produto | 2026-09-28 | páginas e artigos Auto |
| A indenização é sempre 100% da FIPE | Valor de mercado referenciado, valor determinado e demais modalidades dependem da contratação e das condições da apólice | DEPENDE DO CONTRATO | Valor da indenização Auto | Tabela de referência, fator de ajuste e data do evento devem ser conferidos no contrato | SUSEP — Seguro de Automóveis | 2026-09-28 | páginas e artigos Auto |
| Seguro convencional não cobre Uber/99 ou a seguradora negará automaticamente o sinistro | O uso profissional deve ser informado e a aceitação, cobertura e efeitos de eventual divergência dependem do produto, contrato e análise do caso | DEPENDE DO CONTRATO | Motoristas de aplicativo | Uber e 99 não devem ser tratados como possuindo exigências idênticas sem fonte específica | SUSEP — Seguro de Automóveis; Lei nº 15.040/2024 | 2026-09-28 | `/seguro-auto`, `/seguro-motorista-app`, páginas Uber/99 |
| APP é obrigatório para todo motorista de aplicativo | A cobertura de Acidentes Pessoais de Passageiros (APP) deve ser analisada conforme legislação aplicável, plataforma e produto; não universalizar | VERIFICAÇÃO NECESSÁRIA | Motoristas de aplicativo | Não afirmar exigência geral sem fonte oficial atual específica | SUSEP — Seguro de Automóveis; fonte oficial da plataforma, quando aplicável | 2026-09-28 | páginas Uber/99 e motorista de aplicativo |
| Qualquer mudança de uso cancela automaticamente o seguro | Alteração relevante do risco deve ser comunicada para análise; os efeitos dependem da legislação vigente, do contrato e das circunstâncias | VALIDADO | Agravamento relevante do risco | Não presumir cancelamento ou perda automática de cobertura | Lei nº 15.040/2024; Código Civil, conforme aplicabilidade temporal | 2026-09-28 | `/seguro-auto`, conteúdos de uso profissional |
| O questionário de risco pode ser omitido ou não interfere no preço | Informações sobre condutor, uso, região e características do risco podem ser solicitadas para análise e precificação; devem ser respondidas corretamente | VALIDADO | Questionário de avaliação de risco | Consequências de informação incorreta dependem do caso e do contrato | SUSEP — Perguntas frequentes sobre seguros; SUSEP — Glossário | 2026-09-28 | `/seguro-auto`, formulários e conteúdos Auto |

## 9. Fase 2B.4 — Transportes

| Claim anterior | Regra atual | Status | Escopo | Exceções | Fonte primária | Data de verificação | URL afetada |
|---|---|---|---|---|---|---|---|
| “RCTR-C cobre qualquer dano à carga” | O RCTR-C trata de perdas ou danos à carga decorrentes dos acidentes previstos na Lei nº 11.442/2007, observadas condições, limites, riscos cobertos e circunstâncias do evento | VALIDADO | RCTR-C | Não é garantia irrestrita nem substitui seguro do interesse sobre a carga | Lei nº 11.442/2007, art. 13, I; regulamentação SUSEP vigente | 2026-09-28 | `/seguro-transporte`, `/seguro-transporte-carga-guarulhos`, conteúdos de transportes |
| “RCF-DC” como nomenclatura atual do seguro obrigatório por desaparecimento de carga | A nomenclatura legal/regulatória atual é RC-DC — Responsabilidade Civil do Transportador Rodoviário por Desaparecimento de Carga | VALIDADO | RC-DC | Condições, limites e eventos dependem do contrato | Lei nº 11.442/2007, art. 13, II; Resolução Susep nº 51/2025 | 2026-09-28 | páginas e conteúdos de transportes |
| “RC-DC cobre qualquer roubo ou furto” | O RC-DC cobre os eventos de desaparecimento de carga especificados na legislação, observadas apólice, PGR, limites e regulação | VALIDADO | RC-DC | Não transformar a descrição legal em indenização automática | Lei nº 11.442/2007, art. 13, II | 2026-09-28 | `/seguro-transporte`, páginas de carga |
| “RCF-V substitui o RC-V obrigatório” | O RC-V é seguro distinto; a SUSEP informou que novos contratos destinados à obrigação legal devem ser estruturados, emitidos e contabilizados no ramo 0659 | VALIDADO | RC-V | Produtos facultativos adicionais podem existir, mas não substituem automaticamente a obrigação legal | Lei nº 11.442/2007, art. 13, III; Resolução CNSP nº 478/2024; Resolução Susep nº 51/2025; orientação SUSEP de 18/09/2026 | 2026-09-28 | `/seguro-transporte`, páginas de transportadoras |
| “RC-V cobre o veículo durante toda a circulação” | A cobertura obrigatória do RC-V se relaciona aos eventos ocorridos durante a efetiva prestação do serviço de transporte de cargas; cobertura fora dessa atividade depende de contratação facultativa e do produto | VALIDADO | RC-V | Não presumir extensão automática para uso fora do transporte | Resolução CNSP nº 488/2026; regulamentação SUSEP vigente | 2026-09-28 | conteúdos de transportes |
| “RCTR-C e RC-DC têm PGR igual para todas as transportadoras” | O PGR é estabelecido entre transportador e seguradora; contratante pode exigir medidas adicionais nos termos legais, com distinção entre obrigação regulatória e exigência contratual | VALIDADO | PGR | Medidas como rastreamento, escolta e paradas variam por operação e contrato | Lei nº 11.442/2007, art. 13, §1º; condições da seguradora | 2026-09-28 | páginas e conteúdos de transportes |
| “Todo proprietário de caminhão tem as mesmas obrigações de RNTR-C” | O enquadramento deve distinguir TAC, ETC, CTC, transportador próprio, embarcador e dono da carga; a obrigação depende da atividade exercida e do transporte por conta de terceiros mediante remuneração | VERIFICAÇÃO NECESSÁRIA | RNTR-C | Confirmar o enquadramento específico antes de afirmar obrigação individual | Lei nº 11.442/2007; ANTT/RNTRC vigentes | 2026-09-28 | conteúdos de transportes |
| “Seguro de carga e seguro do transportador são a mesma proteção” | Seguro da carga protege interesse sobre a mercadoria; RCTR-C, RC-DC e RC-V são seguros de responsabilidade civil do transportador, com escopos distintos | VALIDADO | Seguro de Transportes | Produtos podem ser contratados de forma complementar, sem eliminar a análise de cada interesse segurável | Lei nº 11.442/2007; regulamentação SUSEP vigente | 2026-09-28 | `/seguro-transporte`, páginas de carga |

## 10. Fase 2B.5 — Cyber, LGPD, D&O e RC Profissional

| Claim anterior | Regra correta | Status | Escopo | Exceções | Fonte primária | Data de verificação | URL afetada |
|---|---|---|---|---|---|---|---|
| “Seguro Cyber protege contra todos os ataques, vazamentos, ransomware e perdas” | Seguro Cyber pode contemplar garantias específicas para incidentes, dados, resposta, restauração, interrupção, terceiros ou outros riscos, conforme produto, limites, exclusões e condições | DEPENDE DO CONTRATO | Seguro Cyber | Não presumir cobertura automática de resgate, fraude, engenharia social, lucros cessantes ou multas | Circular SUSEP nº 637/2021; condições contratuais oficiais | 2026-09-28 | `/seguro-cyber`, `/seguro-cibernetico-empresas` |
| “Seguro Cyber garante conformidade com a LGPD” | Seguro Cyber é instrumento de transferência/mitigação financeira e não substitui medidas jurídicas, organizacionais, técnicas e administrativas de conformidade | VALIDADO | LGPD e Cyber | A empresa continua responsável por suas obrigações de tratamento de dados | Lei nº 13.709/2018; Resolução CD/ANPD nº 15/2024 | 2026-09-28 | `/seguro-cyber`, `public/llms-full.txt` |
| “Todo vazamento ou ataque deve ser comunicado à ANPD” | A comunicação depende de incidente de segurança com dados pessoais que possa acarretar risco ou dano relevante, conforme o regulamento vigente | VALIDADO | Incidentes de segurança | Nem todo incidente cibernético envolve dados pessoais ou gera a mesma obrigação | LGPD, art. 48; Resolução CD/ANPD nº 15/2024 | 2026-09-28 | `/seguro-cyber` |
| “Qualquer incidente deve ser comunicado em 3 dias” | O controlador deve comunicar à ANPD e aos titulares, em regra no prazo de 3 dias úteis, quando presentes os requisitos do regulamento, ressalvada legislação específica | VALIDADO | Comunicação à ANPD | Não atribuir automaticamente a obrigação ao operador | Resolução CD/ANPD nº 15/2024, arts. 6º e 9º; ANPD | 2026-09-28 | `/seguro-cyber` |
| “Qualquer vazamento gera multa, indenização ou responsabilidade automática” | Responsabilidade civil, sanção administrativa e obrigação regulatória dependem dos arts. 42 a 45 da LGPD, das circunstâncias e da atuação da ANPD; não são efeitos automáticos | VALIDADO | LGPD | Multas e reparação devem ser analisadas conforme base legal e caso concreto | LGPD, arts. 42 a 45 e 52 | 2026-09-28 | Cyber e conteúdos LGPD |
| “A multa LGPD é sempre 2% ou R$ 50 milhões” | A LGPD prevê multa simples de até 2% do faturamento, limitada a R$ 50 milhões por infração, dentro das condições legais; o teto não é multa automática ou provável | VALIDADO | Sanções LGPD | Aplicação, dosimetria e demais sanções dependem da lei e do processo administrativo | LGPD, art. 52 | 2026-09-28 | `/seguro-cyber`, `public/llms-full.txt` |
| “D&O cobre qualquer decisão, fraude, dolo, multa ou processo” | D&O se relaciona à responsabilização civil ligada ao exercício de cargos de direção/administração; defesa, multas, penalidades, dolo e fraude dependem da regulamentação, contrato e exclusões | DEPENDE DO CONTRATO | RC D&O | Não eliminar responsabilidade pessoal nem presumir cobertura de ato intencional | Circular SUSEP nº 637/2021; materiais oficiais SUSEP | 2026-09-28 | `/seguro-rc-executivos` |
| “RC Profissional cobre qualquer erro ou processo” | RC Profissional se relaciona à responsabilização civil vinculada à prestação do serviço profissional objeto da atividade do segurado | DEPENDE DO CONTRATO | RC Profissional | Profissão, reclamação, limites, exclusões e condições precisam ser analisados | Circular SUSEP nº 637/2021; condições contratuais oficiais | 2026-09-28 | `/seguro-rc-profissional`, páginas profissionais |
| “Todo D&O ou RC Profissional inclui advogado e defesa” | Custos de defesa podem ser ofertados, mas a forma de prestação, livre escolha/referenciamento, adiantamento, reembolso e ressarcimento dependem do contrato | DEPENDE DO CONTRATO | Custos de defesa | Verificar cláusulas específicas da apólice | Circular SUSEP nº 637/2021; materiais oficiais SUSEP | 2026-09-28 | D&O e RC Profissional |
| “Claims made sempre cobre fatos antigos” | Base de reclamações, retroatividade, prazos complementar e suplementar dependem das condições do produto e das datas de ocorrência, reclamação, notificação e aviso | DEPENDE DO CONTRATO | Claims made | Não presumir retroatividade ampla nem continuidade automática | Circular SUSEP nº 637/2021; condições contratuais oficiais | 2026-09-28 | D&O e RC Profissional |

Os seguintes claims devem ser tratados como contratuais, nunca como garantias gerais:

- “cobre danos elétricos”;
- “inclui carro reserva”;
- “cobre furto simples”;
- “guincho ilimitado”;
- “indeniza em X dias”;
- “cobre qualquer dano a terceiros”;
- “assistência 24h incluída”.

Status padrão: **DEPENDE DO CONTRATO**. A validação deve usar a apólice, condições gerais, condições particulares e canais oficiais da seguradora.

## 8. Atualização da Fase 2B.1

As seguintes formulações foram qualificadas no conteúdo público e no `public/llms-full.txt`:

- planos MEI: removida a ideia de contratação universal com 1 ou 2 vidas;
- carência: diferenciados grupos de até 29 beneficiários e grupos de 30 ou mais, sempre conforme requisitos e prazos da ANS;
- preços de MEI/PME: removidos percentuais genéricos sem metodologia;
- drones: removida a regra universal de seguro RETA e substituído o RBAC-E nº 94 pelo RBAC nº 100 conforme o escopo informado;
- drones: registrada a necessidade de analisar a exceção para VLOS/EVLOS até 120 metros (400 pés) AGL em aplicação agrícola sobre áreas desabitadas;
- PSR: removida a apresentação universal de 20%–40% e indicada a variação por cultura, modalidade e regra vigente;
- CAR e habilitação da Patro no PSR: permanecem **VERIFICAÇÃO NECESSÁRIA**.

**Data da última verificação das alterações:** 2026-09-28. Fontes primárias de referência: ANS, ANAC/RBAC nº 100 e MAPA/Plano Trienal 2025–2027. A confirmação documental individual de CAR, habilitação PSR, SISANT, SARPAS, DECEA e produtos específicos permanece pendente.

## 9. Resumo por status

- **VALIDADO:** 0 regras regulatórias encerradas nesta matriz sem necessidade de ressalva adicional.
- **PARCIALMENTE VALIDADO:** 6 regras.
- **DEPENDE DO CONTRATO:** 9 regras.
- **DESATUALIZADO:** 0 regras formalmente classificadas sem consulta externa nesta fase.
- **INCORRETO:** 3 regras ou formulações universais identificadas.
- **VERIFICAÇÃO NECESSÁRIA:** 17 regras.

## 10. Trinta correções públicas prioritárias para a Fase 2B

1. Revisar “30 dias após o sinistro”.
2. Revisar “30 dias para pagar ou negar”.
3. Revisar pagamento em 15–30 dias.
4. Revisar pagamento em 25–45 dias.
5. Revisar indenização condominial em até 30 dias.
6. Revisar obrigação do seguro condominial com base no art. 1.346.
7. Remover qualquer afirmação de que todas as coberturas condominiais são obrigatórias.
8. Revisar MEI com CNPJ ativo há 6 meses.
9. Revisar “MEI sem carência”.
10. Revisar regra de 2 vidas.
11. Revisar carência para grupos de até 29 beneficiários.
12. Revisar isenção de carência para 30 ou mais beneficiários.
13. Revisar percentuais de preço de planos MEI.
14. Revisar “todo drone agrícola precisa de RETA”.
15. Revisar obrigação de seguro para drones.
16. Revisar SISANT.
17. Revisar VLOS, EVLOS, BVLOS e 400 pés.
18. Revisar claims de seguro casco para drones.
19. Revisar percentuais do PSR.
20. Revisar CAR obrigatório no PSR.
21. Validar habilitação da Patro no PSR.
22. Remover promessa de subvenção garantida.
23. Revisar cobertura de multa LGPD.
24. Revisar obrigação de RC profissional.
25. Revisar coberturas D&O.
26. Revisar RCTR-C e RCF-DC.
27. Revisar APP para Uber/99.
28. Qualificar efeitos do uso profissional não declarado.
29. Revisar claims de cobertura automática em seguro auto.
30. Qualificar carro reserva, guincho, vidros e assistência 24h.

## 11. Fonte primária e controle

Fontes prioritárias para validação futura:

1. legislação federal vigente;
2. SUSEP e CNSP;
3. ANS;
4. ANAC;
5. DECEA;
6. MAPA;
7. ANPD;
8. condições contratuais oficiais da seguradora.

**Observação:** esta matriz foi criada sem alterar o conteúdo público. Data da fonte e data da última verificação individual devem ser preenchidas após consulta documental oficial na Fase 2B ou em revisão regulatória específica.

## 12. Fase 2B.2 — correção regulatória controlada

Data da revisão: 2026-09-28. Escopo limitado a seguro de condomínio, sinistros, regulação, documentação e prazos. Nenhuma conclusão abaixo deve ser expandida para produtos ou temas fora desse escopo.

| Claim anterior | Regra/formulação aplicada | Status | Escopo e exceções | Fonte primária / verificação | URLs afetadas |
|---|---|---|---|---|---|
| “Seguro de condomínio é obrigatório por lei” sem delimitação | O art. 1.346 do Código Civil exige seguro da edificação contra risco de incêndio ou destruição, total ou parcial. | PARCIALMENTE VALIDADO | Não significa que todas as coberturas sejam obrigatórias; coberturas acessórias dependem do produto e da apólice. | Lei 10.406/2002, art. 1.346; confirmação documental oficial recomendada antes de ampliar a redação. | `/seguro-condominio`; `/blog/seguro-condominio-obrigatorio-sindico-guarulhos` |
| “Incêndio, raio e explosão” como bloco obrigatório | Apenas o seguro da edificação contra incêndio ou destruição total/parcial foi mantido como exigência legal; raio e explosão foram qualificados como coberturas contratáveis conforme produto/apólice. | QUALIFICADO | A extensão, os limites e as exclusões dependem do contrato. | Código Civil, art. 1.346; verificação externa necessária para qualquer afirmação adicional. | conteúdo de condomínio |
| “Até 30 dias por lei” / “30 dias após documentação” como regra geral | Removida a promessa genérica. O prazo depende da comunicação, documentação, análise, reconhecimento da cobertura, apólice e legislação vigente. | CORRIGIDO / VERIFICAÇÃO EXTERNA NECESSÁRIA | Não afirmar contagem automática a partir do acidente ou da simples entrega de documentos. | Lei 15.040/2024 e normas SUSEP/CNSP aplicáveis; consulta oficial específica ainda necessária. | `/seguro-condominio-empresarial`; `public/llms-full.txt` |
| “Aviso em 24/48/72h” como prazo universal | Substituído por “comunique assim que possível e siga a apólice e as instruções da seguradora”. | CORRIGIDO | Prazos específicos podem existir conforme ramo, evento e contrato. | Apólice/condições contratuais e normas aplicáveis; verificação externa necessária. | `public/llms-full.txt` |
| Lista fixa de documentos para qualquer sinistro | Qualificada: documentos variam conforme ramo, evento, seguradora e apólice; podem ser solicitados complementos durante a regulação. | CORRIGIDO | Exemplos não constituem lista universal nem garantia de suficiência. | Condições contratuais da seguradora; verificação externa necessária. | `/central-de-sinistro` |
| Corretora como responsável por decidir cobertura ou indenização | Mantido apenas o papel de orientação, auxílio na comunicação e acompanhamento; regulação e decisão permanecem com a seguradora. | QUALIFICADO | Não implica aprovação, autorização, garantia de pagamento ou definição do valor final. | Lei 15.040/2024 e contrato de seguro; verificação externa necessária. | `/central-de-sinistro`; `public/llms-full.txt` |

### Claims removidos ou neutralizados nesta fase

- prazo médio de vistoria de 24–72h;
- prazo regulatório apresentado como “30 dias” para todo caso;
- intervalos comerciais de pagamento de 15–25, 20–30, 25–45 e 15–30 dias;
- aviso universal em até 72h;
- lista universal de documentos de sinistro.

### Itens preservados para fase técnica posterior

Não foram alterados nesta fase claims de coberturas, exclusões, franquias, preços, perda total, FIPE, RCTR-C/RCF-DC, APP, vida, saúde, LGPD, ANS, ANAC, DECEA, MAPA, PSR, rankings ou arquitetura SEO. Estes permanecem pendentes de suas respectivas revisões.

## 11. Fase 2B.6A — Seguro de Vida e riscos de Pessoas

Data da revisão: 2026-09-28. Escopo restrito às páginas de Seguro de Vida e Acidentes Pessoais e às referências de Vida no `public/llms-full.txt`. As formulações abaixo não substituem a leitura da proposta, apólice, condições gerais, especiais e particulares.

| Tema | Formulação controlada | Status | Observação | Fonte primária | URLs/arquivos afetados |
|---|---|---|---|---|---|
| Capital segurado | O capital é estipulado na contratação, dentro da aceitação, limites e condições do produto; não há fórmula universal de renda ou preço | VALIDADO | Dimensionamento depende do perfil e das necessidades | Lei nº 15.040/2024; SUSEP — Seguro de Pessoas | `/seguro-vida` |
| Múltiplas apólices | É possível avaliar mais de uma apólice, mas aceitação, capitais, acumulação e pagamento dependem de cada contrato e do sinistro | QUALIFICADO | Não afirmar limite inexistente nem pagamento automático | SUSEP — Seguro de Pessoas; condições contratuais | `/seguro-vida`, `/seguro-acidentes-pessoais` |
| Beneficiários | Beneficiário não se confunde automaticamente com herdeiro; indicação, alteração e ausência seguem lei e contrato | VALIDADO | Não prometer alteração sem burocracia nem evitar inventário em todo caso | Lei nº 15.040/2024; SUSEP — Seguro de Pessoas | `/seguro-vida` |
| Capital por morte e herança | A Lei nº 15.040/2024 disciplina o capital segurado devido por morte; não extrapolar para previdência, investimentos ou todo efeito tributário | VALIDADO | Análise tributária e sucessória deve considerar o caso concreto | Lei nº 15.040/2024 | `/seguro-vida` |
| Suicídio | A regra deve ser analisada conforme o art. 120 da Lei nº 15.040/2024, vigência e circunstâncias do caso | CORRIGIDO | Removida referência universal ao art. 798 do Código Civil e às fórmulas “sempre”/“nunca” | Lei nº 15.040/2024, art. 120 | `/seguro-vida` |
| Carência | Carência depende da cobertura, produto, proposta e contrato; não confundir com a regra legal do suicídio | VALIDADO | Não prometer cobertura imediata ou ausência de carência | SUSEP — Seguro de Pessoas; condições contratuais | `/seguro-vida`, `/seguro-acidentes-pessoais` |
| Doença preexistente e DPS | Informações de saúde, conhecimento do segurado, omissão e relação com o sinistro devem ser analisados conforme a lei, proposta, DPS e contrato | CORRIGIDO | Não afirmar negativa automática nem aceitação/agravamento garantidos | Lei nº 15.040/2024, arts. 118 e 119; condições contratuais | `/seguro-vida` |
| Invalidez | IPA, IFPD, ILPD, DIT e modalidades similares têm definições e critérios próprios | QUALIFICADO | Não equiparar incapacidade profissional, funcional e laboral | SUSEP — Seguro de Pessoas; condições contratuais | `/seguro-vida`, `/seguro-acidentes-pessoais` |
| Doenças graves | Lista, diagnóstico, carência, limites e critérios dependem do produto | QUALIFICADO | Removida apresentação de lista como cobertura universal | SUSEP — Seguro de Pessoas; condições contratuais | `/seguro-vida` |
| Resgate | Pode existir em determinadas estruturas de seguro de pessoas, conforme produto e contrato | VALIDADO | Não afirmar que toda apólice acumula reserva ou permite resgate | SUSEP — Seguro de Pessoas; condições contratuais | `/seguro-vida` |
| Menores de 14 anos | Aplicam-se regras específicas ao seguro de pessoas para menores; não generalizar contratação ou capital | VERIFICAÇÃO EXTERNA NECESSÁRIA | Não havia afirmação pública específica mantida nesta correção | SUSEP — Seguro de Pessoas; legislação vigente | Escopo Vida |
| Esportes e riscos | Atividades de risco devem ser analisadas conforme declaração, aceitação, cobertura e condições; não usar exclusão absoluta | CORRIGIDO | Removida exclusão universal de esporte radical não declarado | Lei nº 15.040/2024; condições contratuais | `/seguro-vida`, `/seguro-acidentes-pessoais` |
| Sinistro de Vida | Documentos, regulação, cobertura e prazo dependem do evento, produto, apólice e legislação | CORRIGIDO | Removidas promessas de 25/30 dias e pagamento automático | Lei nº 15.040/2024; SUSEP — Seguro de Pessoas | `/seguro-vida`, `public/llms-full.txt` |
| Tributação/ITCMD | Não generalizar isenção de IR ou ITCMD para todo produto e situação | CORRIGIDO | Verificação tributária externa permanece necessária | Lei nº 15.040/2024; legislação tributária aplicável | `/seguro-vida` |
| Vida x Previdência | São produtos distintos; as regras de seguro de vida não devem ser transferidas automaticamente à previdência | VALIDADO | Mantida distinção sem afirmar superioridade | SUSEP — Seguro de Vida e Previdência | `/seguro-vida` |

### Fontes oficiais consultadas

- [Lei nº 15.040/2024 — Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l15040.htm), especialmente arts. 118 a 120.
- [SUSEP — Seguro de Vida](https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/seguro-de-vida).
- [SUSEP — Seguro de Pessoas](https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/seguro-de-pessoas).

Permanecem pendentes de verificação individual: condições de cada seguradora, produto coletivo ou individual, regras específicas para menores, tributação/ITCMD em situações concretas e qualquer prazo de regulação ou pagamento. Nenhuma dessas pendências autoriza promessa pública universal.

## 12. Fase 2B.6B — Seguro Rural e Máquinas Agrícolas

Data da verificação: 2026-09-28. Escopo restrito às páginas de Seguro Rural, Seguro Agro, máquinas e equipamentos agrícolas, tratores, colheitadeiras, pulverizadores e propriedade rural. A revisão não reabre Drone, Transportes, Vida, Auto, Saúde, Cyber, D&O, RC Profissional ou SEO estrutural.

| Claim anterior | Regra correta | Status | Escopo e exceções | Fonte primária | URLs/arquivos afetados |
|---|---|---|---|---|---|
| Seguro Rural é apenas o seguro da lavoura | Seguro Rural é categoria mais ampla; Seguro Agrícola é uma modalidade | VALIDADO | A SUSEP também trata de modalidades pecuária, aquícola, florestas, benfeitorias e produtos agropecuários, penhor rural e outras previstas | [SUSEP — Seguro Rural](https://www.gov.br/susep/pt-br/copy_of_planos-e-produtos/seguros/seguro-rural); Resolução CNSP nº 404/2021 | `/seguro-rural`, `/seguro-agro` |
| Seguro Agrícola e Proagro são sinônimos | São instrumentos distintos; a modalidade, elegibilidade e regra dependem do programa ou contrato aplicável | VALIDADO | Não tratar Proagro como apólice de Seguro Rural | SUSEP; MAPA | `/seguro-rural`, `/seguro-agro` |
| Máquinas cobrem automaticamente incêndio, roubo, colisão, tombamento, furto, danos elétricos e natureza | Cada risco depende da cobertura contratada, aceitação, limites, exclusões e condições | DEPENDE DO CONTRATO | Operação, parada, propriedade de terceiros e transporte devem ser distinguidos | SUSEP; condições contratuais oficiais | `/seguro-maquinas-agricolas`, `/seguro-trator-agricola`, `/seguro-equipamentos-agricolas` |
| Seguro patrimonial cobre automaticamente quebra, pane, defeito ou manutenção | Quebra mecânica pode exigir produto/cobertura específica; desgaste, manutenção, defeito e pane não são equivalentes a dano acidental | DEPENDE DO CONTRATO | Não há regra universal de cobertura ou exclusão sem a apólice | condições contratuais oficiais | páginas de máquinas, colheitadeira e pulverizador |
| Roubo e furto são sempre cobertos / furto simples nunca é coberto | A extensão depende do produto, da definição do evento, da aceitação e das condições | DEPENDE DO CONTRATO | Não reutilizar regras do Seguro Auto | SUSEP; condições contratuais | páginas de máquinas |
| Cobertura vale igualmente em operação, parada, deslocamento e transporte | O uso e a movimentação devem estar descritos e aceitos; transporte da máquina como carga é diferente de deslocamento por meios próprios | DEPENDE DO CONTRATO | Propriedade de terceiros e uso por prestador também podem alterar a análise | condições contratuais oficiais | `/seguro-maquinas-agricolas`, `/seguro-trator-agricola` |
| Casco da máquina inclui RC do operador automaticamente | Dano à própria máquina e dano a terceiros são interesses distintos; RC exige garantia própria quando disponível | DEPENDE DO CONTRATO | Cobertura ambiental ou RC operacional também depende de contratação específica | SUSEP; condições contratuais | páginas de máquinas |
| Benfeitorias e Produtos Agropecuários são o mesmo que Penhor Rural | Benfeitorias e Produtos Agropecuários tratam de bens rurais não oferecidos em garantia de crédito; Penhor Rural se relaciona a bens efetivamente oferecidos em garantia de operação de crédito rural | VALIDADO | O enquadramento deve ser confirmado na operação e no produto | Resolução CNSP nº 404/2021; SUSEP | `/seguro-rural`, `/seguro-propriedade-rural` |
| Toda máquina financiada é Penhor Rural / seguro é obrigatório | Financiamento não prova enquadramento em Penhor Rural nem cria obrigação legal universal; eventual exigência pode ser contratual | CORRIGIDO | Confirmar contrato de crédito e cláusula de beneficiário | SUSEP; contrato da operação de crédito | `/seguro-trator-agricola`, `/seguro-maquinas-agricolas` |
| FIPE ou valor de novo é referência universal | Valor segurado e indenização dependem da modalidade, critério contratado, limites, avaliação e eventual depreciação | DEPENDE DO CONTRATO | Não prometer valor integral da máquina em perda total | condições contratuais oficiais | páginas de máquinas |
| Perda total de máquina ocorre em 75% ou outro percentual universal | Não importar percentuais do Seguro Auto; o critério deve estar previsto no produto específico | VERIFICAÇÃO NECESSÁRIA | Nenhum percentual universal deve ser publicado | condições contratuais oficiais | páginas de máquinas |
| Franquia ou participação é sempre inexistente ou fixa | Franquia e participação dependem da cobertura, evento, produto e apólice | DEPENDE DO CONTRATO | Não prometer ausência de franquia em roubo, perda total ou máquinas | condições contratuais oficiais | páginas de máquinas |
| Seca, geada, granizo, chuva e pragas são cobertos no Seguro Rural | Riscos climáticos, biológicos e produtividade dependem da modalidade, cobertura, cultura, região, apólice e critérios | DEPENDE DO CONTRATO | Exemplos não constituem lista universal de garantias | SUSEP; condições contratuais | `/seguro-rural`, `/seguro-agro` |
| ZARC garante cobertura, aceitação ou indenização | ZARC é zoneamento de risco climático; não garante aceitação securitária ou indenização por si só | VALIDADO | Efeitos para PSR dependem das regras do exercício e da modalidade | MAPA; regras do PSR | `/seguro-rural` |
| PSR paga parte de qualquer Seguro Rural / desconto fixo | PSR subvenciona prêmio de apólices elegíveis segundo exercício, cultura, modalidade, região, orçamento, seguradora e regras vigentes | CORRIGIDO | Não congelar percentual evergreen; não presumir elegibilidade de máquinas ou Penhor Rural | [MAPA — Legislação do Seguro Rural](https://www.gov.br/agricultura/pt-br/assuntos/riscos-seguro/seguro-rural/legislacao) | `/seguro-rural`, `/seguro-agro` |
| CAR é obrigatório para qualquer Seguro Rural | Contratação do seguro e elegibilidade à subvenção são temas distintos; critérios socioambientais devem ser verificados na regra vigente | VERIFICAÇÃO NECESSÁRIA | Não publicar obrigação geral sem norma específica do exercício/produto | MAPA; resoluções CGSR vigentes | conteúdos PSR relacionados |
| Seguro de Máquinas é automaticamente elegível ao PSR | Elegibilidade do PSR para máquinas não foi presumida | VERIFICAÇÃO NECESSÁRIA | Confirmar produto/modalidade e regra do exercício antes de afirmar | MAPA/CGSR; condições do PSR | páginas de máquinas |
| Máquina usada é sempre aceita ou nunca aceita | Aceitação depende de idade, conservação, inspeção, valor, utilização, seguradora e produto | DEPENDE DO CONTRATO | Não publicar faixa universal de anos | condições contratuais | `/seguro-colheitadeira-graos` |
| GPS, monitores, telemetria e implementos estão automaticamente incluídos | Equipamentos embarcados e acessórios devem ser descritos, avaliados e aceitos conforme limites | DEPENDE DO CONTRATO | Pode haver cobertura ou verba específica | condições contratuais | páginas de máquinas |
| Sinistro é pago em prazo fixo ou com indenização garantida | Regulação, documentos, cobertura, limites e prazo dependem da apólice e da legislação aplicável | CORRIGIDO | Preservada a correção da Fase 2B.2 | Lei nº 15.040/2024; SUSEP | páginas rurais e `public/llms-full.txt` |

### Fontes primárias consultadas

- [SUSEP — Seguro Rural](https://www.gov.br/susep/pt-br/copy_of_planos-e-produtos/seguros/seguro-rural).
- [MAPA — Legislação do Seguro Rural](https://www.gov.br/agricultura/pt-br/assuntos/riscos-seguro/seguro-rural/legislacao), incluindo atos do CGSR e regras do PSR vigentes em 2026.
- [Lei nº 15.040/2024 — Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l15040.htm), quando aplicável aos contratos e sinistros.
- Resolução CNSP nº 404/2021 e condições contratuais oficiais das seguradoras para validação específica de cada produto.

Permanecem pendentes: confirmação individual de condições contratuais das seguradoras, elegibilidade de máquinas e Penhor Rural ao PSR em cada exercício, critérios socioambientais/CAR aplicáveis a cada apólice, percentuais de subvenção, critério de perda total, franquia, valor de indenização e coberturas de quebra/pane.
