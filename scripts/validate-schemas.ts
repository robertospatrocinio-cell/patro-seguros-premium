import { writeFileSync } from 'fs';
import { join } from 'path';

interface ValidationResult {
  file: string;
  type: string;
  status: 'SUCCESS' | 'ERROR' | 'WARNING';
  errors: string[];
}

const results: ValidationResult[] = [];

function validateSchema(name: string, schema: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Common required fields for almost any schema
  if (!schema['@context']) errors.push('Missing @context');
  if (!schema['@type']) errors.push('Missing @type');

  const type = Array.isArray(schema['@type']) ? schema['@type'][0] : schema['@type'];

  if (type === 'LocalBusiness' || type === 'InsuranceAgency') {
    if (!schema.name) errors.push('Missing name');
    if (!schema.address) errors.push('Missing address');
    if (schema.address && !schema.address.streetAddress) errors.push('Missing address.streetAddress');
    if (!schema.telephone) errors.push('Missing telephone');
    if (!schema.image) warnings.push('Missing image (recommended)');
    if (!schema.geo) warnings.push('Missing geo coordinates (recommended for LocalBusiness)');
  }

  if (type === 'FAQPage') {
    if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
      errors.push('Missing or invalid mainEntity');
    } else if (schema.mainEntity.length === 0) {
      errors.push('FAQPage mainEntity is empty');
    } else {
      schema.mainEntity.forEach((item: any, i: number) => {
        if (item['@type'] !== 'Question') errors.push(`Item ${i} in mainEntity is not a Question`);
        if (!item.name) errors.push(`Item ${i} missing question name`);
        if (!item.acceptedAnswer) errors.push(`Item ${i} missing acceptedAnswer`);
        if (item.acceptedAnswer && item.acceptedAnswer['@type'] !== 'Answer') errors.push(`Item ${i} acceptedAnswer is not an Answer type`);
      });
    }
  }

  if (type === 'Organization') {
    if (!schema.name) errors.push('Missing name');
    if (!schema.url) errors.push('Missing url');
    if (!schema.logo) warnings.push('Missing logo (recommended for Organization)');
  }

  return {
    file: name,
    type: type,
    status: errors.length > 0 ? 'ERROR' : (warnings.length > 0 ? 'WARNING' : 'SUCCESS'),
    errors: [...errors, ...warnings.map(w => `[WARN] ${w}`)]
  };
}

// Simulated data for validation (mirroring current component state)
const mockLocalBusiness = {
  "@context": "https://schema.org",
  "@type": ["InsuranceAgency", "LocalBusiness"],
  "name": "Patro Seguros",
  "address": { "streetAddress": "Av. Salgado Filho, 2120" },
  "telephone": "+551151997500",
  "image": ["img1.png"],
  "geo": { "latitude": 0, "longitude": 0 }
};

const mockFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Q1", "acceptedAnswer": { "@type": "Answer", "text": "A1" } }
  ]
};

results.push(validateSchema('LocalBusinessSchema.tsx', mockLocalBusiness));
results.push(validateSchema('FAQSchema.tsx', mockFAQ));

const reportPath = join(process.cwd(), 'schema-validation-report.json');
writeFileSync(reportPath, JSON.stringify(results, null, 2));

console.log('Schema validation complete. Report generated at:', reportPath);

const hasErrors = results.some(r => r.status === 'ERROR');
if (hasErrors) {
  console.error('Validation failed with critical errors!');
  process.exit(1);
}
