import fs from 'fs';
import path from 'path';

const pagesDir = './src/pages';
const results = [];

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Look for title prop in any component or config
      const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
      // Look for headline prop
      const headlineMatch = content.match(/headline:\s*["']([^"']+)["']/);
      // Look for explicit <h1> tag
      const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
      
      let h1Text = null;
      if (h1Match) {
        h1Text = h1Match[1].replace(/\{[^}]+\}/g, '').replace(/<[^>]+>/g, '').trim();
      }

      results.push({
        file: fullPath,
        title: titleMatch ? titleMatch[1] : null,
        headline: headlineMatch ? headlineMatch[1] : null,
        h1: h1Text
      });
    }
  }
}

scanDir(pagesDir);

const titles = results.filter(r => r.title);
const duplicates = titles.filter((v, i, a) => a.findIndex(t => t.title === v.title) !== i);

// Pages where Title and H1 (or headline) are identical
const sameTitleH1 = results.filter(r => {
  const effectiveH1 = r.headline || r.h1;
  return r.title && effectiveH1 && r.title.toLowerCase().trim() === effectiveH1.toLowerCase().trim();
});

const missingH1 = results.filter(r => 
  !r.h1 && !r.headline && 
  !r.file.includes('Admin') && 
  !r.file.includes('Login') &&
  !r.file.includes('CRM')
);

console.log('--- Duplicates ---');
console.log(JSON.stringify(duplicates, null, 2));
console.log('--- Same Title/H1 ---');
console.log(JSON.stringify(sameTitleH1, null, 2));
console.log('--- Missing H1 ---');
console.log(JSON.stringify(missingH1, null, 2));
