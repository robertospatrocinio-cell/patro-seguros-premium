import { EXACT_REDIRECTS, PATTERN_REDIRECTS, GONE_PATTERNS } from './redirects';
import fs from 'fs';
import path from 'path';

console.log('--- Iniciando Auditoria de Redirecionamentos ---');

// 1. Validar redirecionamentos infinitos ou cadeias
EXACT_REDIRECTS.forEach(r => {
  const next = EXACT_REDIRECTS.find(nr => nr.from === r.to);
  if (next) {
    console.error(`ERRO: Cadeia de redirect detectada: ${r.from} -> ${r.to} -> ${next.to}`);
  }
  if (r.from === r.to) {
    console.error(`ERRO: Loop de redirect detectado: ${r.from} redireciona para si mesmo.`);
  }
});

console.log(`Total de redirects exatos: ${EXACT_REDIRECTS.length}`);
console.log(`Total de padrões de 410: ${GONE_PATTERNS.length}`);
