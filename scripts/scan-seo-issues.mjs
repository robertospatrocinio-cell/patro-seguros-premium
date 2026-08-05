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
      const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
      const headlineMatch = content.match(/headline:\s*["']([^"']+)["']/);
      const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
      
      results.push({
        file: fullPath,
        title: titleMatch ? titleMatch[1] : null,
        headline: headlineMatch ? headlineMatch[1] : null,
        h1: h1Match ? h1Match[1].trim() : null
      });
    }
  }
}

scanDir(pagesDir);

const titles = results.filter(r => r.title);
const duplicates = titles.filter((v, i, a) => a.findIndex(t => t.title === v.title) !== i);
const sameTitleH1 = titles.filter(r => r.title && (r.title === r.headline || r.title === r.h1));
const missingH1 = results.filter(r => !r.h1 && !r.headline && !r.file.includes('Admin') && !r.file.includes('Login'));

console.log('--- Duplicates ---');
console.log(duplicates);
console.log('--- Same Title/H1 ---');
console.log(sameTitleH1.slice(0, 15));
console.log('--- Missing H1 ---');
console.log(missingH1.slice(0, 5));
