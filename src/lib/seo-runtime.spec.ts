import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8080';
const CANONICAL_BASE = 'https://www.patroseguros.com.br';

test.describe('SEO Runtime & Infrastructure Validation', () => {
  
  test('indexable pages should have correct self-referencing canonicals', async ({ page }) => {
    // List of diverse indexable routes
    const routes = [
      '/', 
      '/seguro-auto', 
      '/plano-de-saude-guarulhos', 
      '/blog',
      '/sobre'
    ];
    
    for (const route of routes) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded' });
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      
      // Home is special (bare domain), others have path
      const expected = route === '/' 
        ? CANONICAL_BASE 
        : `${CANONICAL_BASE}${route}`;
        
      expect(canonical).toBe(expected);
      
      // Verify no indexation block on these routes
      const robots = await page.locator('meta[name="robots"]').getAttribute('content').catch(() => 'index');
      if (robots) {
        expect(robots.toLowerCase()).not.toContain('noindex');
      }
    }
  });

  test('301 redirects should execute in a single hop (client-side check)', async ({ page }) => {
    const testCases = [
      { from: '/artigos/5-dicas-baratear-seguro-auto', to: '/blog/5-dicas-baratear-seguro-auto' },
      { from: '/previdencia', to: '/previdencia-privada' },
      { from: '/odonto-personal', to: '/seguro-odonto' }
    ];

    for (const { from, to } of testCases) {
      await page.goto(`${BASE_URL}${from}`, { waitUntil: 'networkidle' });
      // SPA navigate or server redirect both end up at the 'to' URL
      expect(page.url()).toContain(to);
    }
  });

  test('Gone (410) routes should show "Removido" UI and have noindex', async ({ page }) => {
    const goneRoutes = ['/tag/seguros', '/category/auto', '/blog/feed'];
    
    for (const route of goneRoutes) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded' });
      
      // Check for visual indicator defined in NotFound.tsx / redirects.ts logic
      const content = await page.textContent('body');
      expect(content).toMatch(/Removido|Descontinuado|Gone/i);
      
      // Verify noindex is present
      const robots = await page.locator('meta[name="robots"]').getAttribute('content');
      expect(robots.toLowerCase()).toContain('noindex');
    }
  });

  test('404 fallback should show Not Found UI', async ({ page }) => {
    await page.goto(`${BASE_URL}/esta-rota-nao-existe-aleatoria-123`, { waitUntil: 'domcontentloaded' });
    const content = await page.textContent('body');
    expect(content).toMatch(/404|não encontrada/i);
  });

  test('No tracking parameters (origem=) in internal links on Home', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    const count = await page.locator('a[href*="origem="]').count();
    expect(count).toBe(0);
  });
});
