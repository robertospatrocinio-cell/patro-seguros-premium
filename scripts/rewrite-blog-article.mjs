import fs from 'fs';

const content = fs.readFileSync('src/pages/BlogArticle.tsx', 'utf8');

// Identify the markers for replacement
const articlesContentStart = "const articlesContent: Record<string, { title: string; content: string; faqs: { q: string; a: string }[] }> = {";
const extraFaqsBySlugStart = "const extraFaqsBySlug: Record<string, any> = {";

function findEndIndex(startIndex, fullText) {
  let openBraces = 0;
  let started = false;
  for (let i = startIndex; i < fullText.length; i++) {
    if (fullText[i] === '{') {
      openBraces++;
      started = true;
    }
    if (fullText[i] === '}') {
      openBraces--;
      if (started && openBraces === 0) return i + 2; // +1 for brace, +1 for semicolon
    }
  }
  return -1;
}

const acIndex = content.indexOf(articlesContentStart);
const acEndIndex = findEndIndex(acIndex + articlesContentStart.length - 1, content);

const efIndex = content.indexOf(extraFaqsBySlugStart);
const efEndIndex = findEndIndex(efIndex + extraFaqsBySlugStart.length - 1, content);

let newContent = content.substring(0, acIndex) + 
                 content.substring(acEndIndex, efIndex) + 
                 content.substring(efEndIndex);

// Add imports
newContent = 'import { articlesContent } from "@/data/blogArticlesContent";\n' + 
             'import { extraFaqsBySlug } from "@/data/blogExtraData";\n' + 
             newContent;

fs.writeFileSync('src/pages/BlogArticle.tsx', newContent);
console.log('✅ BlogArticle.tsx refactored.');
