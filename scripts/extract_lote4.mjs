import { articles } from '../src/lib/blogData.ts';
import { blogContentIndex } from '../src/data/blogContentIndex.ts';
const wanted = new Set(['Dicas','RC','Seguro Residencial']);
const list = articles.filter(a => wanted.has(a.category) && !blogContentIndex[a.slug]);
console.log(JSON.stringify(list, null, 2));
