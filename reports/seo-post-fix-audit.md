# Relatório de Auditoria SEO Técnica - Patro Seguros
Data: 05/08/2026 18:56:54
Domínio: https://www.patroseguros.com.br

## 1. Robots.txt
- Status: ✅ OK
- Sitemap Declarado: ✅ Sim
- Agentes de IA configurados: ✅ Sim

### Conteúdo do Robots.txt:
```text
User-agent: *
Allow: /
Allow: /assets/
Allow: /images/
Allow: /fonts/
Disallow: /admin
Disallow: /crm
Disallow: /~*

# AI & Search Crawlers
User-agent: ChatGPT-User
Allow: /
User-agent: GPTBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: SemrushBot
Allow: /

Sitemap: https://www.patroseguros.com.br/sitemap-index.xml
Sitemap: https://www.patroseguros.com.br/sitemap.xml
```

## 2. Sitemaps
- Sitemaps Gerados: ✅ (sitemap-auto.xml, sitemap-bairros.xml, sitemap-bairros.xml.br, sitemap-bairros.xml.gz, sitemap-blog.xml, sitemap-blog.xml.br, sitemap-blog.xml.gz, sitemap-empresarial.xml, sitemap-geral.xml, sitemap-guarulhos.xml, sitemap-images.xml, sitemap-images.xml.br, sitemap-images.xml.gz, sitemap-index.xml, sitemap-pages.xml, sitemap-pages.xml.br, sitemap-pages.xml.gz, sitemap-seguros.xml, sitemap-seguros.xml.br, sitemap-seguros.xml.gz, sitemap-vida-saude.xml, sitemap.xml, sitemap_index.xml)
- URLs de Preview filtradas: ✅ Confirmado

## 3. Canonicals e Redirecionamentos
- Padronização WWW: ✅ Implementada globalmente em PageMeta.tsx
- Redirecionamentos 301: ✅ Centralizados em src/lib/redirects.ts
- Forçar HTTPS: ✅ Ativado em App.tsx

## 4. Dados Estruturados (JSON-LD)
- @id Unificado: ✅ #insurance-agency (evita duplicidade de entidades)
- Tipo Institucional: ✅ InsuranceAgency (subtipo recomendado para corretoras)
- Geolocalização: ✅ Coordenadas precisas (-23.4460, -46.5220)
- Schema Local: ✅ Integrado com reviews e horários de funcionamento

## 5. Títulos e Hierarquia de Cabeçalhos (H1)
- Titles Duplicados: ⚠️ 21 encontrados
- Conflito Title vs H1: ✅ Resolvido

### Detalhes Técnicos (Scan):
```text
--- Duplicates ---
[
  {
    "file": "src/pages/LandingPages.tsx",
    "title": "Seguro Auto",
    "headline": null,
    "h1": "Landing Pages de Campanha"
  },
  {
    "file": "src/pages/LandingSeguroResidencial.tsx",
    "title": "Incêndio e explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/NichoClinicasVeterinarias.tsx",
    "title": "Seguro Empresarial",
    "headline": null,
    "h1": "Proteção Completa para Clínicas e Hospitais Veterinários"
  },
  {
    "file": "src/pages/NichoEmpresarios.tsx",
    "title": "Seguro Empresarial",
    "headline": null,
    "h1": "Seguros para Empresários e Empresas"
  },
  {
    "file": "src/pages/NichoTransportadoras.tsx",
    "title": "Seguro de Frota",
    "headline": null,
    "h1": "Seguros para Transportadoras e Frotistas"
  },
  {
    "file": "src/pages/SeguroBMW.tsx",
    "title": "Cobertura Total sem Franquia",
    "headline": null,
    "h1": "Seguro BMW \n                Puro Prazer de Dirigir Protegido."
  },
  {
    "file": "src/pages/SeguroMaquinasAgricolas.tsx",
    "title": "Incêndio e Explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroMaquinasLinhaAmarela.tsx",
    "title": "Inventário de Máquinas",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCAdvogados.tsx",
    "title": "Análise do Perfil",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCEngenheiros.tsx",
    "title": "Análise do Perfil",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCMedicos.tsx",
    "title": "Análise da Especialidade",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCObras.tsx",
    "title": "Análise do Projeto",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroSaude.tsx",
    "title": "Análise do Perfil",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroTransporte.tsx",
    "title": "Análise da Operação",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SegurosGuarulhosBairros.tsx",
    "title": "Seguro Auto",
    "headline": null,
    "h1": "Corretora de seguros em : atendimento local"
  },
  {
    "file": "src/pages/SeoSeguroCondominioGuarulhos.tsx",
    "title": "Incêndio, Raio e Explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroEmpresarialGuarulhos.tsx",
    "title": "Incêndio e Explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroMotoGuarulhos.tsx",
    "title": "Cobertura Compreensiva",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroResidencialGuarulhos.tsx",
    "title": "Incêndio, Raio e Explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroVidaGuarulhos.tsx",
    "title": "Morte por Qualquer Causa",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSegurosPmeGuarulhos.tsx",
    "title": "Seguro Empresarial",
    "headline": null,
    "h1": "Seguros Empresariais para PME em Guarulhos"
  }
]
--- Same Title/H1 ---
[]
--- Missing H1 ---
[
  {
    "file": "src/pages/BlogArticle.tsx",
    "title": "Artigo não encontrado",
    "headline": null,
    "h1": ""
  },
  {
    "file": "src/pages/BlogAuthor.tsx",
    "title": null,
    "headline": null,
    "h1": ""
  },
  {
    "file": "src/pages/BlogCategory.tsx",
    "title": null,
    "headline": null,
    "h1": ""
  },
  {
    "file": "src/pages/BlogCluster.tsx",
    "title": null,
    "headline": null,
    "h1": ""
  },
  {
    "file": "src/pages/CentralDeSinistro.tsx",
    "title": "Atendimento Colisão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/ComparativoCategoria.tsx",
    "title": null,
    "headline": null,
    "h1": ""
  },
  {
    "file": "src/pages/ConsorcioCarro.tsx",
    "title": "O Custo da Imparcialidade vs. Juros Bancários",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/ConsorcioGuarulhosVertical.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/ConsorcioImoveis.tsx",
    "title": "Sem Juros Bancários",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/ConsorcioVeiculosPesados.tsx",
    "title": "Sem Juros",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/CotacaoAutoRedirect.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/DynamicLandingPage.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/GuiaPilar.tsx",
    "title": null,
    "headline": null,
    "h1": ""
  },
  {
    "file": "src/pages/LandingConsorcio.tsx",
    "title": "Zero juros",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LandingPlanoSaude.tsx",
    "title": "Comparativo real",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LandingSeguroAcidentesPessoais.tsx",
    "title": "Morte acidental",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LandingSeguroAuto.tsx",
    "title": "Cotação em 2 horas",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LandingSeguroCelular.tsx",
    "title": "Roubo e furto",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LandingSeguroEmpresarial.tsx",
    "title": "Proteção patrimonial",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LandingSeguroGalpaoAlugado.tsx",
    "title": "Conformidade Contratual",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LandingSeguroGalpoes.tsx",
    "title": "Incêndio e explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LandingSeguroMoto.tsx",
    "title": "Proteção contra roubo",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LandingSeguroMotoristaApp.tsx",
    "title": "Cobertura válida durante corridas",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LandingSeguroResidencial.tsx",
    "title": "Incêndio e explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LandingSeguroVida.tsx",
    "title": "Proteção familiar",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LongtailCotacaoSeguroResidencialOnline.tsx",
    "title": "Básica (Incêndio, Raio, Explosão)",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LongtailMelhorSeguroUberGuarulhos.tsx",
    "title": "Cláusula Expressa para App",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LongtailPlanosSaudeGuarulhosComparativo.tsx",
    "title": "Ambulatorial",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/LongtailValorSeguroBydDolphin.tsx",
    "title": "Bateria de Tração (Blade Battery)",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/MaterialDetalhe.tsx",
    "title": null,
    "headline": null,
    "h1": ""
  },
  {
    "file": "src/pages/NotFound.tsx",
    "title": null,
    "headline": null,
    "h1": ""
  },
  {
    "file": "src/pages/PatroPrivate.tsx",
    "title": "Veículos premium",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoOdontologicoGuarulhos.tsx",
    "title": "Análise das necessidades",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoOdontologicoGuarulhosCanonical.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoPet.tsx",
    "title": "Escolha do Plano",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoSaudeClinicasOdontologicas.tsx",
    "title": "Cobertura Ambulatorial",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoSaudeClinicasVeterinarias.tsx",
    "title": "Atendimento Nacional ou Regional",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoSaudeEmpresarial.tsx",
    "title": "Análise da Empresa",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoSaudeEmpresarialGuarulhos.tsx",
    "title": "Diagnóstico da empresa",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoSaudeEmpresarialGuarulhosCanonical.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoSaudeFamiliarGuarulhos.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoSaudeGuarulhosVertical.tsx",
    "title": "Rede Credenciada Premium",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoSaudeIdososGuarulhos.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoSaudeIndividualGuarulhos.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoSaudeMeiGuarulhos.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanoSaudePmeGuarulhos.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PlanosSaudeSeniorGuarulhos.tsx",
    "title": "Diagnóstico do beneficiário",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/PrevidenciaPrivada.tsx",
    "title": "Definição de Objetivos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroAcidentesPessoais.tsx",
    "title": "Análise do Perfil",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroAmbiental.tsx",
    "title": "Diagnóstico Ambiental",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroArmazenagem.tsx",
    "title": "Incêndio e Explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroAvioes.tsx",
    "title": "Casco da Aeronave",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroBike.tsx",
    "title": "Informações da bike",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroCafe.tsx",
    "title": "Geada",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroCaminhao.tsx",
    "title": "Perfil do Caminhão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroCartaVerde.tsx",
    "title": "Informe o destino e as datas",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroCelular.tsx",
    "title": "Informe os dados do aparelho",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroClinicaEsteticaGuarulhos.tsx",
    "title": "Equipamentos estéticos e eletrônicos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroClinicaOdontologica.tsx",
    "title": "Cobertura Patrimonial Ampla",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroClinicaPequenaGuarulhos.tsx",
    "title": "Incêndio, raio, explosão e danos elétricos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroClinicaVeterinaria.tsx",
    "title": "Análise de Risco",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroColhedoraAlgodao.tsx",
    "title": "Ficha Técnica Premium",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroColhedoraCana.tsx",
    "title": "Levantamento de Ativos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroColheitadeiraGraos.tsx",
    "title": "Cadastro Técnico",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroCondominio.tsx",
    "title": "Levantamento do Condomínio",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroCondominioEmpresarial.tsx",
    "title": "Diagnóstico Predial",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroCondominioResidencial.tsx",
    "title": "Análise da Convenção",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroConsultorioGuarulhos.tsx",
    "title": "Consultório Odontológico",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroConsultorioMedicoGuarulhos.tsx",
    "title": "Equipamentos médicos e eletrônicos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroConsultorioOdontologico.tsx",
    "title": "Incêndio e Danos Elétricos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroConsultorioOdontologicoGuarulhos.tsx",
    "title": "Equipamentos odontológicos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroConsultorioVeterinarioGuarulhos.tsx",
    "title": "Equipamentos veterinários e eletrônicos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroCyber.tsx",
    "title": "Avaliação de Risco Digital",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroDecesso.tsx",
    "title": "Definição do Plano",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroDroneAgricola.tsx",
    "title": "Dados do Drone",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroEmbarcacoes.tsx",
    "title": "Casco e Máquinas",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroEmpresarial.tsx",
    "title": "Análise de Risco do Negócio",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroEmpresarialSegmento.tsx",
    "title": "Análise da Operação",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroEngenharia.tsx",
    "title": "Análise do Projeto",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroEquipamentosAgricolas.tsx",
    "title": "Incêndio e Raio",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroEquipamentosConsultorioGuarulhos.tsx",
    "title": "Equipamentos fixos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroEquipamentosOdontologicos.tsx",
    "title": "Roubo e Furto Qualificado",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroEquipamentosVeterinarios.tsx",
    "title": "Danos Elétricos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroEstagiario.tsx",
    "title": "Dados da Empresa",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroFianca.tsx",
    "title": "Análise de Crédito",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroFiancaGuarulhos.tsx",
    "title": "Inquilino sem fiador aprovado em 22 horas",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroFiancaLocaticia.tsx",
    "title": "Envio de Documentos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroFlatGuarulhos.tsx",
    "title": "Flat para moradia própria",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroFrota.tsx",
    "title": "Mapeamento da Frota",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroFuneral.tsx",
    "title": "Escolha o plano ideal",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroGalpao.tsx",
    "title": "Análise de Risco em Hubs Logísticos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroGalpaoCumbica.tsx",
    "title": "Incêndio em galpão vizinho com propagação parcial",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroGalpoesIndustriais.tsx",
    "title": "Incêndio, Raio e Explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroGeada.tsx",
    "title": "Geada de Radiação",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroGeradorEnergia.tsx",
    "title": "Levantamento Técnico",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroGranja.tsx",
    "title": "Incêndio",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroHelicopteros.tsx",
    "title": "Casco e Motor",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroHospitalVeterinario.tsx",
    "title": "RC Estabelecimento e Profissional",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroImobiliario.tsx",
    "title": "Análise do imóvel",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroLojasShopping.tsx",
    "title": "Análise da Loja",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroMaquinas.tsx",
    "title": "Inventário de Máquinas",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroMaquinasAgricolas.tsx",
    "title": "Incêndio e Explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroMaquinasIndustriais.tsx",
    "title": "Quebra de Máquinas",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroMaquinasLinhaAmarela.tsx",
    "title": "Inventário de Máquinas",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroMicroOnibus.tsx",
    "title": "Perfil do Transporte",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroMoto.tsx",
    "title": "Análise do Perfil do Motociclista",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroMotoristaApp.tsx",
    "title": "Declaração do Uso Profissional",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroOdonto.tsx",
    "title": "Análise de Necessidades",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroParaDentistas.tsx",
    "title": "Diagnóstico",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroParaVeterinarios.tsx",
    "title": "RC Profissional (E&O)",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroPecuario.tsx",
    "title": "Morte por Doença",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroPetshop.tsx",
    "title": "RC Animais sob Custódia",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroPlacaSolar.tsx",
    "title": "Danos aos Painéis",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroPropriedadeRural.tsx",
    "title": "Mapeamento Patrimonial",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroPulverizadorAgricola.tsx",
    "title": "Dados do Equipamento",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRC.tsx",
    "title": "Análise de Riscos Completa",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCAdvogados.tsx",
    "title": "Análise do Perfil",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCDentistas.tsx",
    "title": "Análise da Especialidade",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCEngenheiros.tsx",
    "title": "Análise do Perfil",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCEventos.tsx",
    "title": "Detalhamento do Evento",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCExecutivos.tsx",
    "title": "Análise da Estrutura Societária",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCMedicos.tsx",
    "title": "Análise da Especialidade",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCObras.tsx",
    "title": "Análise do Projeto",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCPrestacaoServicos.tsx",
    "title": "Análise da Atividade",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCProfissional.tsx",
    "title": "Identificação da Profissão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRCVeterinarios.tsx",
    "title": "Erro Médico e Diagnóstico",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroResidencial.tsx",
    "title": "Avaliação do Imóvel e Bens",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRestaurante.tsx",
    "title": "Perfil Gastronômico",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroRural.tsx",
    "title": "Análise da Propriedade",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroSalaComercialGuarulhos.tsx",
    "title": "Consultórios médicos",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroSaude.tsx",
    "title": "Análise do Perfil",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroSiloAgricola.tsx",
    "title": "Levantamento de Estrutura",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroTaxiGuarulhos.tsx",
    "title": "Sinistro com passageiro coberto pela RCF-V",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroTransporte.tsx",
    "title": "Análise da Operação",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroTransporteAgro.tsx",
    "title": "Roubo e Furto de Carga",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroTransporteCargaGuarulhos.tsx",
    "title": "Diagnóstico da operação",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroTratorAgricola.tsx",
    "title": "Ficha Técnica",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroTratorIndustrial.tsx",
    "title": "Levantamento de Frota",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroViagem.tsx",
    "title": "Conte-nos sobre sua viagem",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroVida.tsx",
    "title": "Análise das Necessidades",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroVidaClinicasOdontologicas.tsx",
    "title": "Morte por Qualquer Causa",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroVidaClinicasVeterinarias.tsx",
    "title": "Invalidez Profissional",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroVidaPME.tsx",
    "title": "Morte Natural ou Acidental",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeguroVistoriadoraVeicular.tsx",
    "title": "Seguro empresarial / patrimonial",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SegurosQuotePage.tsx",
    "title": null,
    "headline": null,
    "h1": ""
  },
  {
    "file": "src/pages/SeoAutoPosVistoriaGuarulhos.tsx",
    "title": "Cobertura Total",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoDespachantesVistoriasGuarulhos.tsx",
    "title": "Indenização por Multa Detran",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoECVGuarulhos.tsx",
    "title": "Defesa em Processo de Laudo",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoInspecaoVeicularGuarulhos.tsx",
    "title": "Dano Elétrico em Frenômetro",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoLocalPage.tsx",
    "title": "Case de Sucesso",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoParceriaVistoriaGuarulhos.tsx",
    "title": "Renda Extra",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroAutoGuarulhos.tsx",
    "title": "Cobertura Compreensiva",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroCondominioGuarulhos.tsx",
    "title": "Incêndio, Raio e Explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroEmpresaGuarulhos.tsx",
    "title": "Cobertura Patrimonial Compreensiva",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroEmpresarialGuarulhos.tsx",
    "title": "Incêndio e Explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroFrotaGuarulhos.tsx",
    "title": "Cobertura Compreensiva para Frota",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroMotoGuarulhos.tsx",
    "title": "Cobertura Compreensiva",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroMotoristaAppGuarulhos.tsx",
    "title": "Cobertura Durante Corridas e Entregas",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroResidencialGuarulhos.tsx",
    "title": "Incêndio, Raio e Explosão",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroUberGuarulhos.tsx",
    "title": "Cobertura Durante Corridas",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroVidaGuarulhos.tsx",
    "title": "Morte por Qualquer Causa",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSeguroVidaSaudeGuarulhos.tsx",
    "title": "Seguro de Vida Individual",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoSegurosShoppingMaiaCidadeMaia.tsx",
    "title": "Seguro Empresarial para Lojas e Quiosques do Shopping Maia",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoTransferenciaVeicularGuarulhos.tsx",
    "title": "Indenização por Erro de Chassi",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoVistoriaCautelarGuarulhos.tsx",
    "title": "Indenização por Batida Oculta",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SeoVistoriaVeicularGuarulhos.tsx",
    "title": "Responsabilidade Civil Profissional",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/SpecializedVerticalPage.tsx",
    "title": "Proteção Sob Medida",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/b2b/B2bInsurerRoute.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/b2b/B2bIntentRoute.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/lp/SeguroCiberneticoEmpresas.tsx",
    "title": "E-mail corporativo comprometido",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/lp/SeguroGalpoesCentrosDistribuicao.tsx",
    "title": "Prédio e instalações",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/lp/SeguroLocadorasEquipamentos.tsx",
    "title": "Preparação",
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/premium/ProtecaoPatrimonialFamiliarGuarulhos.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/premium/SeguroAutoPremiumGuarulhos.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/premium/SeguroCarroBlindadoGuarulhos.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/premium/SeguroCarrosLuxoGuarulhos.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/premium/SeguroResidencialAltoPadraoGuarulhos.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/premium/SegurosParaEmpresariosGuarulhos.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/saude/Alice.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/saude/Amil.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/saude/Bradesco.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/saude/CarePlus.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/saude/Hapvida.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/saude/Medsenior.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/saude/Omint.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/saude/PortoSaude.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/saude/PreventSenior.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/saude/Sami.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/saude/SulAmerica.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/saude/Unimed.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/seguradoras/Allianz.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/seguradoras/AzulSeguros.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/seguradoras/Bradesco.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/seguradoras/HDI.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/seguradoras/Itau.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/seguradoras/Mapfre.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/seguradoras/Mitsui.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/seguradoras/PortoSeguro.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/seguradoras/Suhai.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/seguradoras/TokioMarine.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/seguradoras/Yellum.tsx",
    "title": null,
    "headline": null,
    "h1": null
  },
  {
    "file": "src/pages/seguradoras/Zurich.tsx",
    "title": null,
    "headline": null,
    "h1": null
  }
]

```

---
*Relatório de Auditoria Técnica - Patro Seguros - Gerado automaticamente via motor de SEO.*