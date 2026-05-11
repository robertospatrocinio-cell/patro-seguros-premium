import fs from 'fs';

let content = fs.readFileSync('src/components/InsurancePageTemplate.tsx', 'utf8');

// Section extraction logic
const sections = {
  'Hero': {
    start: '{/* Hero */}',
    end: '</section>',
    props: ['title', 'subtitle', 'icon', 'badge', 'quoteUrl', 'heroImage']
  },
  'FeatureList': {
    start: '{/* Coberturas */}',
    end: '</section>',
    props: ['title', 'coverages']
  },
  'FAQSection': {
    start: '{/* FAQ */}',
    end: '</section>',
    props: ['title', 'faqs', 'geoTitle', 'linkedKeywords', 'location']
  }
};

// This is a simplified refactoring script to demonstrate the split
// Real implementation would create new files for each component

console.log('✅ Template component ready for splitting.');
