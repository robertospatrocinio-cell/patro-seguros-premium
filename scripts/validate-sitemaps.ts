import fs from "fs";
import path from "path";
import { XMLParser } from "fast-xml-parser";

async function validateSitemap(filePath: string) {
  // Ignorar se o arquivo não existir (alguns clusters podem estar vazios ou não gerados em dev)
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");

  // 1. Validar UTF-8 e Caracteres de Controle (C0/C1)
  const controlChars = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/;
  if (controlChars.test(content)) {
    console.error(`❌ Erro: ${path.basename(filePath)} contém caracteres de controle inválidos.`);
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
