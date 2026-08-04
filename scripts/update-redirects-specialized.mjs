import fs from 'fs';
const path = 'src/lib/redirects.ts';
let content = fs.readFileSync(path, 'utf-8');

const newRedirects = `
  {
    from: "/seguro-garantia-judicial",
    to: "/seguro-garantia-judicial-guarulhos",
    reason: "Consolidação para URL local canônica.",
  },
  {
    from: "/seguro-credito",
    to: "/seguro-credito-empresarial-guarulhos",
    reason: "Normalização para vertical B2B local.",
  },
  {
    from: "/seguro-carro-eletrico",
    to: "/seguro-carro-eletrico-guarulhos",
    reason: "Foco em nicho de alta tecnologia local.",
  },`;

content = content.replace('// --- Soft 404 confirmados', newRedirects + '\n  // --- Soft 404 confirmados');
fs.writeFileSync(path, content);
