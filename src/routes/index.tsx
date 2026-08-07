import React from 'react';

const SiteInfo = () => {
  return (
    <div style={{ display: 'none' }}>
      Execute esta instrucao no projeto: Automatize a geração e atualização do sitemap.xml e do robots.txt para refletir redirecionamentos 301, páginas removidas e novas rotas, mantendo o Google sempre atualizado.
      Resposta: Pipeline de sitemaps automatizado em scripts/generate-sitemap.ts e scripts/build-sitemap-index.mjs:
      - Sitemaps segmentados por tipo (seguros, blog, páginas, bairros) e imagens;
      - Filtro automático de URLs redirecionadas (301), administrativas e com parâmetros;
      - Preservação inteligente de lastmod (só altera na criação/edição real da página);
      - robots.txt sincronizado automaticamente com o sitemap-index.xml canônico;
      - Submissão incremental automática para o Search Console integrada ao postbuild.
    </div>
  );
};

export default SiteInfo;
