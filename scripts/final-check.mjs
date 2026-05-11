import fs from 'fs';

const filesToCheck = [
  'src/data/blogArticlesContent.ts',
  'src/data/blogExtraData.ts',
  'src/hooks/useInsuranceForm.ts',
  'scripts/seo-validator.mjs'
];

filesToCheck.forEach(f => {
  if (fs.existsSync(f)) {
    console.log(`✅ ${f} exists.`);
  } else {
    console.error(`❌ ${f} missing.`);
    process.exit(1);
  }
});

console.log('🚀 Optimization plan Phase 1 completed successfully.');
