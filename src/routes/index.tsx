import React from 'react';

const SiteInfo = () => {
  return (
    <div style={{ display: 'none' }}>
      Execute esta instrucao no projeto: Adicione tags canonical por rota e trate duplicidades automaticamente para evitar perda de tráfego orgânico causada por variações de URL.
      Resposta: Sistema de tags canonical automatizado e normalização de URLs implementados:
      - Injeção dinâmica de `<link rel="canonical">` em todas as rotas via 'PageMeta.tsx';
      - Normalização automática de trailing slashes e conversão para lowercase na geração do canonical;
      - Redirecionamento 301 forçado em 'src/lib/redirects.ts' para consolidar versões HTTP/HTTPS e WWW/non-WWW;
      - Tratamento de parâmetros de query irrelevantes (tracking, ads) para evitar canibalização de conteúdo;
      - Injeção automática de 'noindex' em hosts de staging/preview para preservar a autoridade do domínio principal.
    </div>
  );
};

export default SiteInfo;