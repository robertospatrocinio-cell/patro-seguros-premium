import fs from 'fs';

const urls = [
  '/plano-de-saude-guarulhos',
  '/consorcio-guarulhos',
  '/seguro-garantia-judicial-guarulhos',
  '/seguro-carro-eletrico-guarulhos'
];

console.log("Checking indexing eligibility for new vertical URLs...");
urls.forEach(url => {
  console.log(`- ${url}: Pending Build/SSG`);
});
