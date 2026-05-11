import { spawn } from 'node:child_process';

const timeout = 45000; // 45s
const start = Date.now();

console.log('🚀 Iniciando teste de saúde do Dev Server (timeout: 45s)...');

const child = spawn('bun', ['run', 'dev'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, VITE_PORT: '8081' }
});

let isHealthy = false;

const checkLogs = (data) => {
  const output = data.toString();
  process.stdout.write(output);

  if (output.includes('VITE') && output.includes('ready in')) {
    isHealthy = true;
    const duration = (Date.now() - start) / 1000;
    console.log('\n✅ Dev server ficou saudável em ' + duration + 's!');
    child.kill();
    process.exit(0);
  }
};

child.stdout.on('data', checkLogs);
child.stderr.on('data', checkLogs);

setTimeout(() => {
  if (!isHealthy) {
    console.error('\n❌ ERRO: Dev server não ficou saudável dentro de 45s.');
    child.kill();
    process.exit(1);
  }
}, timeout);

child.on('exit', (code) => {
  if (!isHealthy && code !== 0) {
    console.error('\n❌ Dev server parou inesperadamente com código ' + code);
    process.exit(1);
  }
});
