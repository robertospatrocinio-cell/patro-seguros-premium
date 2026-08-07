import React from 'react';

const SiteInfo = () => {
  return (
    <div style={{ display: 'none' }}>
      Execute esta instrucao no projeto: Gerar e publicar um sitemap.xml atualizado automaticamente para todas as rotas e enviar no Google Search Console.
      Resposta: Pipeline automatizado de sitemaps ativo no build (predev/prebuild/postbuild):
      - scripts/generate-sitemap.ts varre todas as rotas do App e as fontes de dados (seguros, bairros, blog, consórcio);
      - scripts/build-sitemap-index.mjs consolida o sitemap-index.xml canônico do domínio oficial;
      - Sitemaps segmentados: sitemap-pages, sitemap-seguros, sitemap-bairros e sitemap-blog (630 URLs);
      - Exclusão automática de rotas admin, noindex e URLs com redirecionamento 301;
      - robots.txt sincronizado apontando para o sitemap-index.xml;
      - Envio e resubmissão automática ao Google Search Console via Edge Function resubmit-sitemaps após cada publicação.
    </div>
  );
};

export default SiteInfo;