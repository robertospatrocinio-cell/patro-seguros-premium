import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

/**
 * scripts/submit-sitemaps-incremental.mjs
 * 
 * Implementa reindexação incremental: dispara submissões para GSC/Bing apenas
 * quando houver mudanças REAIS nos arquivos de sitemap (detectado por hash).
 */

const CANONICAL_HOST = "https://www.patroseguros.com.br";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.log("⚠️ Credenciais Supabase não encontradas. Pulando submissão incremental.");
  process.exit(0);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function getFileHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(content).digest("hex");
}

async function shouldSubmit(filename, hash) {
  const { data, error } = await supabase
    .from("sitemap_history")
    .select("id")
    .eq("filename", filename)
    .eq("hash", hash)
    .limit(1);

  if (error) {
    console.error(`❌ Erro ao consultar histórico para ${filename}:`, error.message);
    return true; // Na dúvida, submete
  }

  return data.length === 0;
}

async function recordSubmission(filename, hash) {
  const { error } = await supabase
    .from("sitemap_history")
    .insert([{ filename, hash }]);

  if (error) {
    console.error(`❌ Erro ao registrar submissão para ${filename}:`, error.message);
  }
}

async function notifyGSC(sitemapUrl) {
  try {
    // Ping legacy do Google (embora depreciado, ainda é útil como sinal imediato para alguns bots)
    const resp = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    return resp.ok;
  } catch (e) {
    console.error(`❌ Erro ao notificar GSC para ${sitemapUrl}:`, e.message);
    return false;
  }
}

async function notifyBing(sitemapUrl) {
  try {
    const resp = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    return resp.ok;
  } catch (e) {
    console.error(`❌ Erro ao notificar Bing para ${sitemapUrl}:`, e.message);
    return false;
  }
}

async function main() {
  const distDir = path.resolve(process.cwd(), "dist");
  if (!fs.existsSync(distDir)) {
    console.error("❌ Diretório dist/ não encontrado.");
    process.exit(1);
  }

  const sitemaps = [
    "sitemap-index.xml",
    "sitemap-pages.xml",
    "sitemap-blog.xml",
    "sitemap-seguros.xml",
    "sitemap-bairros.xml",
    "sitemap-images.xml"
  ];

  console.log("🚀 Iniciando submissão incremental de sitemaps...");

  let submittedCount = 0;

  for (const filename of sitemaps) {
    const filePath = path.join(distDir, filename);
    const hash = getFileHash(filePath);

    if (!hash) continue;

    const changed = await shouldSubmit(filename, hash);

    if (changed) {
      const sitemapUrl = `${CANONICAL_HOST}/${filename}`;
      console.log(`📡 Mudança detectada em ${filename}. Notificando buscadores...`);
      
      const gscOk = await notifyGSC(sitemapUrl);
      const bingOk = await notifyBing(sitemapUrl);

      if (gscOk || bingOk) {
        await recordSubmission(filename, hash);
        submittedCount++;
        console.log(`✅ Submetido: ${filename}`);
      }
    } else {
      console.log(`⏭️ Sem mudanças em ${filename}. Ignorando submissão.`);
    }
  }

  if (submittedCount === 0) {
    console.log("✨ Nenhum sitemap precisou de reindexação nesta rodada.");
  } else {
    console.log(`✨ ${submittedCount} sitemaps foram reindexados.`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
