import fs from "fs";
import path from "path";
import { XMLParser } from "fast-xml-parser";

async function validateSitemap(filePath: string) {
  // Ignorar se o arquivo não existir (alguns clusters podem estar vazios ou não gerados em dev)
  if (!fs.existsSync(filePath)) {
    return;
  }

   const buffer = fs.readFileSync(filePath);
   const content = buffer.toString("utf-8");
 
   // 1. Validar UTF-8 sem BOM e sem Caracteres de Controle (C0/C1)
   // UTF-8 BOM is \xEF\xBB\xBF
   if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
     console.error(`❌ Erro: ${path.basename(filePath)} contém UTF-8 BOM, que não é recomendado para sitemaps.`);
     process.exit(1);
   }
 
   const controlChars = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/;
   const match = content.match(controlChars);
   if (match) {
     const charCode = match[0].charCodeAt(0).toString(16).toUpperCase();
     console.error(`❌ Erro: ${path.basename(filePath)} contém caractere de controle inválido (U+${charCode.padStart(4, '0')}).`);
     process.exit(1);
   }

  // 2. Validar Estrutura XML
  const parser = new XMLParser({
    allowBooleanAttributes: false,
    ignoreAttributes: false,
  });

  try {
    parser.parse(content);
    console.log(`✅ ${path.basename(filePath)}: XML e UTF-8 válidos.`);
  } catch (err) {
    console.error(`❌ Erro: ${path.basename(filePath)} possui sintaxe XML inválida.`);
    console.error(err);
    process.exit(1);
  }
}

async function main() {
  const distDir = path.resolve(process.cwd(), "dist");
  const publicDir = path.resolve(process.cwd(), "public");
  
  // Validar tanto no /dist quanto no /public para garantir integridade total
  const dirs = [distDir, publicDir];
  
  const sitemapFiles = [
    "sitemap.xml",
    "sitemap-index.xml",
    "sitemap_index.xml",
    "sitemap-guarulhos.xml",
    "sitemap-bairros.xml",
    "sitemap-auto.xml",
    "sitemap-vida-saude.xml",
    "sitemap-empresarial.xml",
    "sitemap-geral.xml"
  ];

  console.log("🚀 Iniciando validação rigorosa de sitemaps...");
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of sitemapFiles) {
      await validateSitemap(path.join(dir, file));
    }
  }
  
  console.log("✨ Validação concluída!");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
