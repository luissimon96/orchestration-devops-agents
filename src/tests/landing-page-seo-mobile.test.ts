import { describe, it, expect } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('node_7ee73e3a6bba — Otimizacao mobile, performance e SEO basico', () => {
  const html = new HtmlPage().render();

  it('AC1 — viewport meta tag presente', () => {
    expect(html).toMatch(/<meta[^>]*name="viewport"[^>]*content="[^"]*width=device-width[^"]*"/i);
  });

  it('AC2 — meta description com conteúdo descrevendo Boss', () => {
    const metaDesc = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i)
      || html.match(/<meta[^>]*content="([^"]+)"[^>]*name="description"/i);
    expect(metaDesc).toBeTruthy();
    expect(metaDesc![1].trim().length).toBeGreaterThan(10);
  });

  it('AC3 — meta og:title ou og:description para social sharing', () => {
    const hasOgTitle = /<meta[^>]*property="og:title"[^>]*>/i.test(html);
    const hasOgDesc = /<meta[^>]*property="og:description"[^>]*>/i.test(html);
    expect(hasOgTitle || hasOgDesc).toBe(true);
  });

  it('AC4 — CSS inclui media query para mobile', () => {
    expect(html).toMatch(/@media\s*\([^)]*max-width/i);
  });

  it('AC5 — título da página contém Boss', () => {
    expect(html).toMatch(/<title>[^<]*Boss[^<]*<\/title>/i);
  });
});
