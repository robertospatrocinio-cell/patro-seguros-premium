import fs from 'fs';
import path from 'path';

const pagesDir = './src/pages';
const componentsDir = './src/components';
const dataDir = './src/data';

function fixGenericAnchors(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixGenericAnchors(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const original = content;
      
      // Fix generic anchor texts
      content = content.replace(/>Saiba mais<\/Link>/g, '>Ver detalhes completos</Link>');
      content = content.replace(/>Saiba mais<\/a>/g, '>Ver detalhes completos</a>');
      content = content.replace(/>Saber mais<\/Link>/g, '>Ver coberturas e preços</Link>');
      content = content.replace(/>Saber mais<\/a>/g, '>Ver coberturas e preços</a>');
      content = content.replace(/>Clique aqui<\/Link>/g, '>Solicitar cotação grátis</Link>');
      content = content.replace(/>Clique aqui<\/a>/g, '>Solicitar cotação grátis</a>');
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Fixed anchors in ${fullPath}`);
      }
    }
  }
}

fixGenericAnchors(pagesDir);
fixGenericAnchors(componentsDir);
fixGenericAnchors(dataDir);
