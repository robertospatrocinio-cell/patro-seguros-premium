#!/usr/bin/env node
/**
 * Script de pré-build que executa detectores de inconsistência e aplica correções automáticas (backfill).
 * Evita falhas no postbuild ao garantir que os dados estejam consistentes antes da build final.
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function runCommand(command, description, failOnError = false) {
  console.log(`\n[PRE-BUILD] ${description}...`);
  try {
    execSync(command, { cwd: ROOT, encoding: 'utf-8', stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`\n[PRE-BUILD] Erro em: ${description}`);
    if (failOnError) {
      process.exit(1);
    }
    return false;
  }
}

console.log('🚀 Iniciando rotina de pré-build e auto-correção...');

// 1. Sincronização de redirecionamentos (existente)
runCommand('node scripts/sync-htaccess-redirects.mjs', 'Sincronizando .htaccess', true);

// 2. FAQ Backfill - Detecta posts com < 2 Q&A e aplica sugestões automaticamente
// Rodamos com --ci para que, se mesmo após o apply não atingir o mínimo, o build pare aqui.
runCommand('node scripts/detect-faq-underfilled.mjs --apply --ci', 'Verificando e aplicando backfill de FAQ (Min: 2)', true);

// 3. Imagens e OG (existente)
runCommand('node scripts/generate-og-images.mjs', 'Gerando imagens OG');

// 4. Validação de contagem de palavras na origem
runCommand('node scripts/validate-source-word-count.mjs', 'Validando contagem de palavras (source)');

console.log('\n✅ Pré-build concluído com sucesso.');
process.exit(0);
