import fs from 'fs';
import path from 'path';

/**
 * Script para validar metadados SEO e integridade das páginas de bairro.
 * Bloqueia o build se encontrar metadados fora do padrão.
 */

const DATA_FILES = [
  'src/data/seoLocalAutoPages.ts',
  'src/data/seoLocalSaudePages.ts'
];

let hasErrors = false;

function validateMeta(slug, meta) {
  if (meta.length > 160) {
    console.error(`❌ [SEO ERROR] ${slug}: Meta description muito longa (${meta.length} chars). Limite: 160.`);
    hasErrors = true;
  }
  if (meta.length < 100) {
    console.warn(`⚠️ [SEO WARN] ${slug}: Meta description muito curta (${meta.length} chars). Recomendado > 100.`);
  }
}

// Simple regex extraction for a fast check without full TS parsing
DATA_FILES.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  
  // Look for metaDescription: "..."
  const matches = content.matchAll(/metaDescription:\s*["'`](.*?)["'`],/g);
  for (const match of matches) {
    validateMeta('Data Entry', match[1]);
  }
});

if (hasErrors) {
  process.exit(1);
} else {
  console.log('✅ SEO Metadata validation passed.');
}
