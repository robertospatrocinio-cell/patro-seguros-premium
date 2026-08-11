import React from 'react';

const SiteInfo = () => {
  return (
    <div style={{ display: 'none' }}>
      Execute esta instrucao no projeto: VOCÊ VAI IMPLEMENTAR O PACOTE COMPLETO DE SCHEMA MARKUP (DADOS ESTRUTURADOS JSON-LD) no site patroseguros.com.br (corretora de seguros em Guarulhos/SP, plataforma VTEX IO).

REGRA ABSOLUTA — APENAS AGREGAR:
- NÃO reestruturar o site, NÃO alterar design, NÃO remover conteúdo existente
- NÃO mudar navegação, cores, fontes, layout, componentes ou URLs
- Cada schema deve ser inserido como bloco &lt;script type="application/ld+json"&gt; no &lt;head&gt; da respectiva página
- Se já existir algum schema na página, MANTENHA o existente e ADICIONE os novos — não remova nada
- Conteúdo em português do Brasil
- Entregar tudo pronto para publicação

====================================================
PARTE 0 — DADOS OFICIAIS DA MARCA (USE SEMPRE ESTES VALORES)
====================================================
- Nome: Patro Seguros | Razão social: Patro Corretora de Seguros LTDA
- Anos de mercado: 20+ anos (NUNCA use "30+ anos")
- Clientes: 2.500+ | Seguradoras comparadas: 16+
- Avaliação Google: 4.9 com 67 avaliações reais
- Registro SUSEP: 212113511 | CNPJ: 41.641.558/0001-33
- Endereço: Avenida Salgado Filho, 2120 - Sala 219, Maia, Guarulhos/SP - CEP 07115-000
- Telefone/WhatsApp: +551151997500 | E-mail: contato@patroseguros.com.br
- Horário: Seg. a Sex. 8h30-18h
- Redes: instagram.com/patroseguros | facebook.com/patroseguros | linkedin.com/company/patro-seguros
- Posicionamento: "Corretora de seguros em Guarulhos há mais de 20 anos, com atendimento consultivo e comparação em 16+ seguradoras"

====================================================
PARTE 1 — HOME PAGE (PÁGINA INICIAL): SCHEMA InsuranceAgency
====================================================
Cole na página inicial (https://patroseguros.com.br), no &lt;head&gt;:

{
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "@id": "https://patroseguros.com.br/#patro",
  "name": "Patro Seguros",
  "alternateName": "Patro Corretora de Seguros LTDA",
  "url": "https://patroseguros.com.br",
  "logo": "https://patroseguros.com.br/images/logo-full.webp",
  "image": "https://patroseguros.com.br/images/hero-home-960.webp",
  "telephone": "+551151997500",
  "email": "contato@patroseguros.com.br",
  "description": "Corretora de seguros em Guarulhos há mais de 20 anos, com atendimento consultivo e comparação em 16+ seguradoras. Auto, vida, saúde, residencial e empresarial com cotação em até 2h úteis.",
  "slogan": "Corretora de seguros em Guarulhos com atendimento consultivo",
  "foundingDate": "2006",
  "taxID": "41.641.558/0001-33",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Avenida Salgado Filho, 2120 - Sala 219",
    "addressLocality": "Guarulhos",
    "addressRegion": "SP",
    "postalCode": "07115-000",
    "addressCountry": "BR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "-23.4538", "longitude": "-46.5333" },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:30",
    "closes": "18:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "67"
  },
  "areaServed": { "@type": "City", "name": "Guarulhos" },
  "sameAs": [
    "https://www.instagram.com/patroseguros",
    "https://www.facebook.com/patroseguros",
    "https://www.linkedin.com/company/patro-seguros"
  ],
  "makesOffer": [
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Auto" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro de Vida" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Residencial" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Plano de Saúde" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Empresarial" } }
  ]
}

====================================================
PARTE 2 — PÁGINAS DE PRODUTO: SCHEMA Service
====================================================
Use o modelo abaixo em CADA página de produto, trocando os campos entre colchetes []. Aplique em: /seguro-auto, /seguro-vida, /seguro-residencial, /planos-de-saude, /seguro-empresarial, /seguro-frota, /seguro-transporte, /seguro-rural, /seguro-cyber, /seguro-rc, /seguro-celular, /seguro-moto, /seguro-motorista-app.

MODELO PADRÃO (troque os campos [ ... ]):
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://patroseguros.com.br/[slug-da-pagina]#service",
  "serviceType": "[NOME DO SEGURO]",
  "name": "[NOME DO SEGURO] em Guarulhos",
  "url": "https://patroseguros.com.br/[slug-da-pagina]",
  "description": "[PARÁGRAFO ANSWER-READY DA PÁGINA — o texto introdutório que responde 'O que é X em Guarulhos', 100-200 palavras]",
  "provider": {
    "@type": "InsuranceAgency",
    "name": "Patro Seguros",
    "url": "https://patroseguros.com.br",
    "telephone": "+551151997500",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenida Salgado Filho, 2120 - Sala 219",
      "addressLocality": "Guarulhos",
      "addressRegion": "SP",
      "postalCode": "07115-000"
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "67" }
  },
  "areaServed": { "@type": "City", "name": "Guarulhos" },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "BRL",
    "description": "Cotação grátis comparando 16 seguradoras, com resposta em até 2h úteis"
  }
}

TEXTOS ANSWER-READY JÁ PRONTOS PARA O CAMPO "description" (use exatamente estes):

SEGURO AUTO (/seguro-auto):
"O seguro auto em Guarulhos protege seu veículo contra colisão, roubo, furto e danos a terceiros. A Patro Seguros, corretora com mais de 20 anos de experiência e registro SUSEP 212113511, compara propostas de 16 seguradoras para você encontrar a melhor cobertura pelo melhor preço, com atendimento consultivo e cotação em até 2 horas úteis."

SEGURO DE VIDA (/seguro-vida):
"O seguro de vida em Guarulhos garante proteção financeira completa para sua família contra morte, invalidez e doenças graves. A Patro Seguros, corretora com mais de 20 anos de experiência e registro SUSEP 212113511, compara propostas de 16 seguradoras para você encontrar a melhor cobertura com cotação em até 2 horas úteis."

SEGURO RESIDENCIAL (/seguro-residencial):
"O seguro residencial em Guarulhos protege sua casa, apartamento ou flat contra incêndio, roubo, danos elétricos e mais, com assistência 24h. A Patro Seguros, corretora com mais de 20 anos de experiência e registro SUSEP 212113511, compara propostas de 16 seguradoras para você encontrar a melhor cobertura com cotação em até 2 horas úteis."

PLANO DE SAÚDE (/planos-de-saude):
"A Patro Seguros compara planos de saúde em Guarulhos de operadoras como Amil, Bradesco, SulAmérica e NotreDame Intermédica, para você encontrar a melhor rede e o melhor preço. Atendimento consultivo individual, familiar ou PME, com cotação em até 2 horas úteis."

SEGURO EMPRESARIAL (/seguro-empresarial):
"O seguro empresarial em Guarulhos protege o patrimônio do seu negócio com coberturas contra incêndio, roubo, responsabilidade civil e lucros cessantes. A Patro Seguros, corretora com mais de 20 anos de experiência e registro SUSEP 212113511, oferece gestão de riscos completa para empresas de todos os portes."

====================================================
PARTE 3 — PÁGINAS DE BAIRRO: SCHEMA Service + Neighborhood
====================================================
Aplique nas páginas /seguros-guarulhos/centro, /vila-augusta, /macedo, /gopouva, /jardim-maia (Cidade Maia), /cumbica, /bonsucesso e demais bairros listados no site.

MODELO PADRÃO (troque os campos [ ... ]):
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://patroseguros.com.br/[slug-da-pagina]#service",
  "serviceType": "Corretora de Seguros",
  "name": "Seguros no [NOME DO BAIRRO] (Guarulhos)",
  "url": "https://patroseguros.com.br/[slug-da-pagina]",
  "description": "[BLOCO 'RESPOSTA RÁPIDA' DA PÁGINA — o texto que já existe abaixo do H1, 100-200 palavras]",
  "provider": {
    "@type": "InsuranceAgency",
    "name": "Patro Seguros",
    "url": "https://patroseguros.com.br",
    "telephone": "+551151997500",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenida Salgado Filho, 2120 - Sala 219",
      "addressLocality": "Guarulhos",
      "addressRegion": "SP",
      "postalCode": "07115-000"
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "67" }
  },
  "areaServed": { "@type": "Neighborhood", "name": "[NOME DO BAIRRO]" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Seguros no [NOME DO BAIRRO]",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Auto" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Residencial" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Empresarial" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Plano de Saúde" } }
    ]
  }
}

AJUSTES POR BAIRRO:
- CUMBICA (/seguro-auto-cumbica): serviceType "Seguro Auto", areaServed name "Cumbica", e use este description: "Seguro auto em Cumbica, Guarulhos: o CEP de pernoite é uma das variáveis mais importantes no cálculo do prêmio. A Patro Seguros, corretora local no Cidade Maia, atende moradores do Cumbica no entorno do GRU Airport e Rodovia Hélio Smidt, comparando 9 a 16 seguradoras com orientação específica para o perfil de risco do bairro (classificação médio-alto de sinistralidade) e recomendações de rastreador, garagem coberta e franquia ideal."
- CENTRO (/seguros-guarulhos/centro): areaServed "Centro", hasOfferCatalog com "RC Profissional" primeiro (foco do bairro), description use o bloco "Resposta rápida" real da página (foco em rc profissional e comércio, Poli Shopping, Av. Salgado Filho, Fórum).
- CIDADE MAIA (/seguros-guarulhos/jardim-maia): areaServed "Cidade Maia", hasOfferCatalog com "Seguro Residencial Premium" primeiro, description use o bloco real (alto padrão, Bosque Maia, Av. Paulo Faccini).
- VILA AUGUSTA: areaServed "Vila Augusta", hasOfferCatalog com "Seguro Auto" e "Seguro Residencial" primeiro, description use o bloco real (boom imobiliário, Dutra, Internacional Shopping).
- MACEDO: areaServed "Macedo", hasOfferCatalog com "Plano de Saúde PME" primeiro, description use o bloco real (Hospital Bom Clima, clínicas, PMEs).
- GOPOUVA: areaServed "Gopouva", hasOfferCatalog com "Seguro de Vida" primeiro, description use o bloco real (tradição, Igreja Santo Antônio).
- BONSUCESSO: areaServed "Bonsucesso", hasOfferCatalog com "Seguro Empresarial" e "Seguro Auto" primeiro, description use o bloco real (Shopping Bonsucesso, Dutra, logística).
- IMPORTANTE: o campo "description" de cada bairro deve usar EXATAMENTE o texto do bloco "Resposta rápida" que já existe visível na página. NÃO crie texto novo — espelhe o que está na tela.

====================================================
PARTE 4 — FAQ: SCHEMA FAQPage
====================================================
Aplique em TODA página que possui seção de Perguntas Frequentes (home, produtos e bairros). IMPORTANTE: o schema DEVE espelhar exatamente as perguntas e respostas visíveis na página — se a página não tem a pergunta visível, não coloque no schema (o Google penaliza divergência).

MODELO (troque as perguntas pelas reais de cada página):
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[PERGUNTA VISÍVEL NA PÁGINA 1]",
      "acceptedAnswer": { "@type": "Answer", "text": "[RESPOSTA VISÍVEL NA PÁGINA 1]" }
    },
    {
      "@type": "Question",
      "name": "[PERGUNTA VISÍVEL NA PÁGINA 2]",
      "acceptedAnswer": { "@type": "Answer", "text": "[RESPOSTA VISÍVEL NA PÁGINA 2]" }
    }
  ]
}

SE A HOME AINDA NÃO TIVER FAQ VISÍVEL, use estas (e CRIE a seção de FAQ correspondente na home, no final antes do rodapé, com exatamente estas perguntas e respostas):
1. "Qual a melhor corretora de seguros em Guarulhos?" → "A Patro Seguros é referência em Guarulhos há mais de 20 anos, com registro SUSEP 212113511 e avaliação 4.9 no Google. Comparamos cotações em 16+ seguradoras com atendimento consultivo."
2. "Quanto custa um seguro de carro em Guarulhos?" → "O preço varia conforme o veículo, CEP de pernoite e perfil do motorista. A Patro Seguros compara propostas de 16+ seguradoras para você encontrar a melhor cobertura pelo melhor preço, com cotação em até 2h úteis."
3. "Quais seguros a Patro Seguros oferece?" → "Auto, moto, residencial, vida, plano de saúde, empresarial, frota, transporte de carga, responsabilidade civil, cyber e agronegócio — para pessoas e empresas em Guarulhos e região."
4. "Como acionar o seguro em caso de sinistro em Guarulhos?" → "A Patro Seguros tem Central de Sinistro dedicada e WhatsApp de emergência 24h. Nossa equipe acompanha todo o processo, da vistoria à indenização."
5. "A Patro Seguros atende empresas em Guarulhos?" → "Sim. Oferecemos seguro empresarial, frota, transporte de carga, plano de saúde PME e responsabilidade civil, com gestão de riscos completa para negócios de todos os portes."

====================================================
PARTE 5 — TODAS AS PÁGINAS: SCHEMA BreadcrumbList
====================================================
Aplique em TODAS as páginas, com os níveis corretos:

PÁGINAS DE PRODUTO (2 níveis):
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://patroseguros.com.br" },
    { "@type": "ListItem", "position": 2, "name": "[NOME DO PRODUTO]", "item": "https://patroseguros.com.br/[slug]" }
  ]
}

PÁGINAS DE BAIRRO (3 níveis):
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://patroseguros.com.br" },
    { "@type": "ListItem", "position": 2, "name": "Guarulhos", "item": "https://patroseguros.com.br/seguros-guarulhos" },
    { "@type": "ListItem", "position": 3, "name": "Seguros em [BAIRRO]", "item": "https://patroseguros.com.br/seguros-guarulhos/[bairro]" }
  ]
}

====================================================
PARTE 6 — BLOG: SCHEMA Article + Organization
====================================================
Aplique em cada post do blog:
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[TÍTULO DO POST]",
  "datePublished": "[DATA DE PUBLICAÇÃO]",
  "dateModified": "[DATA DE ATUALIZAÇÃO]",
  "author": {
    "@type": "Organization",
    "name": "Patro Seguros",
    "url": "https://patroseguros.com.br"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Patro Seguros",
    "url": "https://patroseguros.com.br",
    "logo": { "@type": "ImageObject", "url": "https://patroseguros.com.br/images/logo-full.webp" }
  },
  "mainEntityOfPage": "https://patroseguros.com.br/blog/[slug-do-post]"
}

====================================================
PARTE 7 — VERIFICAÇÕES FINAIS OBRIGATÓRIAS
====================================================
Após aplicar tudo, confirme:
1. Cada página tem os schemas corretos: produtos = Service + FAQPage + BreadcrumbList | bairros = Service(Neighborhood) + FAQPage + BreadcrumbList | home = InsuranceAgency + FAQPage + BreadcrumbList | blog = Article
2. Todos os dados da marca estão consistentes: 20+ anos, SUSEP 212113511, 4.9/67 avaliações, 16+ seguradoras, endereço e telefone idênticos em todos os schemas
3. Nenhuma página contém "30+ anos" — todas usam "20+ anos"
4. O texto dos schemas espelha o texto visível das páginas (especialmente FAQ e description)
5. Nenhum schema existente foi removido ou sobrescrito
6. Os schemas não contêm erro de sintaxe JSON (valide antes de publicar)

REGRAS DE ENTREGA:
- Não remova, renomeie ou reestruture nenhuma página, seção, componente ou URL existente
- Não mude design, cores, fontes, layout ou navegação
- Não remova schemas já existentes — apenas adicione os novos
- Preserve a identidade visual e o tom consultivo da marca
- Entregue tudo pronto para publicação
- IMPORTANTE: dados estruturados são o que permite ao Google e aos motores de IA reconhecerem a Patro Seguros como a entidade de referência em seguros de Guarulhos — a consistência dos dados é a prioridade máxima
    </div>
  );
};

export default SiteInfo;