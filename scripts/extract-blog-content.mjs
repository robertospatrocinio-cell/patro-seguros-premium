import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('src/pages/BlogArticle.tsx', 'utf8');
const startMatch = content.match(/const articlesContent: Record<string, { title: string; content: string; faqs: { q: string; a: string }\[] }> = {/);
if (!startMatch) {
  console.error('articlesContent not found');
  process.exit(1);
}

const startIndex = startMatch.index;
let openBraces = 0;
let endIndex = -1;

for (let i = startIndex + startMatch[0].length - 1; i < content.length; i++) {
  if (content[i] === '{') openBraces++;
  if (content[i] === '}') {
    openBraces--;
    if (openBraces === 0) {
      endIndex = i + 1;
      break;
    }
  }
}

const articlesContentRaw = content.substring(startIndex, endIndex);

const dataFileContent = `/**
 * Blog articles detailed content.
 * Extracted from BlogArticle.tsx to reduce file size and improve HMR.
 */
export const articlesContent: Record<string, { title: string; content: string; faqs: { q: string; a: string }[] }> = ${articlesContentRaw.substring(articlesContentRaw.indexOf('{'))};
`;

fs.writeFileSync('src/data/blogArticlesContent.ts', dataFileContent);

// Also extract extraFaqsBySlug
const extraFaqStartMatch = content.match(/const extraFaqsBySlug: Record<string, any> = {/);
if (extraFaqStartMatch) {
  const efStartIndex = extraFaqStartMatch.index;
  let efOpenBraces = 0;
  let efEndIndex = -1;
  for (let i = efStartIndex + extraFaqStartMatch[0].length - 1; i < content.length; i++) {
    if (content[i] === '{') efOpenBraces++;
    if (content[i] === '}') {
      efOpenBraces--;
      if (efOpenBraces === 0) {
        efEndIndex = i + 1;
        break;
      }
    }
  }
  const extraFaqsRaw = content.substring(efStartIndex, efEndIndex);
  const extraFaqFileContent = `/**
 * Extra SEO-rich data for blog articles (FAQ clusters, timelines, comparisons).
 */
export const extraFaqsBySlug: Record<string, any> = ${extraFaqsRaw.substring(extraFaqsRaw.indexOf('{'))};
`;
  fs.writeFileSync('src/data/blogExtraData.ts', extraFaqFileContent);
}

console.log('✅ Blog content extracted successfully.');
