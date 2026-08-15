import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const distDir = path.resolve('dist');

async function validateImages() {
  console.log('🚀 Iniciando auditoria de performance de imagens...');
  
  if (!fs.existsSync(distDir)) {
    console.error('❌ Diretório dist não encontrado. Rode o build primeiro.');
    process.exit(1);
  }

  const htmlFiles = [];
  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.html')) {
        htmlFiles.push(fullPath);
      }
    }
  }
  walk(distDir);

  let totalImages = 0;
  let lazyImages = 0;
  let eagerImages = 0;
  let missingAlt = 0;
  let missingDimension = 0;
  let webpAvifCount = 0;

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    
    // Check for img tags
    const imgMatches = content.matchAll(/<img[^>]+>/g);
    for (const match of imgMatches) {
      const tag = match[0];
      totalImages++;
      
      if (tag.includes('loading="lazy"')) lazyImages++;
      if (tag.includes('loading="eager"')) eagerImages++;
      if (!tag.includes('alt=')) missingAlt++;
      if (!tag.includes('width=') || !tag.includes('height=')) missingDimension++;
      if (tag.includes('.webp') || tag.includes('.avif')) webpAvifCount++;
    }

    // Check for picture/source tags
    if (content.includes('<picture') || content.includes('<source')) {
       const sourceMatches = content.matchAll(/<source[^>]+type="image\/(webp|avif)"/g);
       for (const _ of sourceMatches) {
         webpAvifCount++;
       }
    }
  }

  console.log(`\n📊 Relatório de Imagens (${htmlFiles.length} páginas analisadas):`);
  console.log(`- Total de <img> encontradas: ${totalImages}`);
  console.log(`- Imagens com Lazy Loading: ${lazyImages} (${((lazyImages/totalImages)*100).toFixed(1)}%)`);
  console.log(`- Imagens com Eager Loading (LCP candidates): ${eagerImages}`);
  console.log(`- Imagens em formatos modernos (WebP/AVIF): ${webpAvifCount}`);
  console.log(`- Imagens sem ALT (SEO Issue): ${missingAlt}`);
  console.log(`- Imagens sem Width/Height (CLS Issue): ${missingDimension}`);

  if (missingAlt > 0 || missingDimension > totalImages * 0.2) {
    console.warn('\n⚠️  Atenção: Algumas imagens ainda carecem de atributos de acessibilidade ou dimensões fixas.');
  } else {
    console.log('\n✅ Performance de imagens validada com sucesso.');
  }
}

validateImages().catch(console.error);
