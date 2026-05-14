import fs from "fs";
import path from "path";
import { XMLParser } from "fast-xml-parser";

async function validateSitemap(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Erro: Arquivo não encontrado: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, "utf-8");

  // 1. Validar UTF-8 e Caracteres de Controle (C0/C1)
  // Google Search Console rejeita sitemaps com caracteres de controle invisíveis
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
  
  // Lista de sitemaps para validar no diretório de saída
  const sitemaps = [
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

  console.log("🚀 Validando sitemaps no diretório /dist...");
  
  for (const sitemap of sitemaps) {
    await validateSitemap(path.join(distDir, sitemap));
  }
  
  console.log("✨ Todos os sitemaps foram validados com sucesso!");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
