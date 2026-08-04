import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8080';

test.describe('Production SEO Runtime Validation', () => {
  
  test('indexable pages should have self-referencing canonicals', async ({ page }) => {
    const routes = ['/', '/seguro-auto', '/plano-de-saude-guarulhos', '/blog'];
    
    for (const route of routes) {
      await page.goto(`${BASE_URL}${route}`);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      
      // Expected: Absolute, HTTPS, www, no trailing slash (except home)
      const expected = route === '/' 
        ? 'https://www.patroseguros.com.br' 
        : `https://www.patroseguros.com.br${route}`;
        
      expect(canonical).toBe(expected);
    }
  });

  test('non-existent routes should show 404 page (visual check)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/rota-que-nao-existe-12345`);
    // Note: In SPA, we check for the presence of 404 UI since the server might return 200 for the index.html
    await expect(page.locator('h1')).toContainText(/404|Página não encontrada/i);
    
    // Canonical of a 404 in this project should usually point to home or be absent to avoid indexing
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://www.patroseguros.com.br');
  });

  test('gone routes should show the "Removido" UI', async ({ page }) => {
    await page.goto(`${BASE_URL}/tag/qualquer-coisa`);
    await expect(page.locator('body')).toContainText(/Conteúdo Removido/i);
    
    const noindex = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(noindex).toContain('noindex');
  });

  test('internal links should not contain tracking parameters like origem=', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const links = await page.locator('a[href*="origem="]').count();
    expect(links).toBe(0);
  });
});
