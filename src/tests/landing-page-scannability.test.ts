import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

/**
 * RNF3 — Escaneabilidade Test Suite
 *
 * Validates that the landing page is easy to scan on desktop and mobile,
 * with clear visual hierarchy, short text blocks, and logical progression.
 */

describe('RNF3 — Escaneabilidade: Page Scannability', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1: Visual hierarchy — h1 in header, at least 3 h2 sections', () => {
    it('should have exactly one h1 in the header', () => {
      const h1Matches = html.match(/<h1[^>]*>/gi) ?? [];
      expect(h1Matches.length).toBe(1);
      expect(html).toContain('<header');
      const headerBlock = html.slice(html.indexOf('<header'), html.indexOf('</header>'));
      expect(headerBlock).toContain('<h1');
    });

    it('should have at least 3 h2 headings in the main sections', () => {
      const h2Matches = html.match(/<h2[^>]*>/gi) ?? [];
      expect(h2Matches.length).toBeGreaterThanOrEqual(3);
    });

    it('should not use h3 or deeper without an h2 parent in the same section', () => {
      const hasH3WithoutH2 = html.includes('<h3') && !html.includes('<h2');
      expect(hasH3WithoutH2).toBe(false);
    });
  });

  describe('AC2: Mobile responsiveness — media query for small screens', () => {
    it('should contain a media query targeting mobile breakpoint', () => {
      expect(html).toMatch(/@media\s*\(\s*max-width\s*:\s*(768|767|600|480)px\s*\)/i);
    });

    it('should reduce h1 font-size on mobile', () => {
      const mediaBlock = extractMediaQueryBlock(html);
      expect(mediaBlock.toLowerCase()).toContain('h1');
      expect(mediaBlock.toLowerCase()).toContain('font-size');
    });

    it('should reduce h2 font-size on mobile', () => {
      const mediaBlock = extractMediaQueryBlock(html);
      expect(mediaBlock.toLowerCase()).toContain('h2');
      expect(mediaBlock.toLowerCase()).toContain('font-size');
    });
  });

  describe('AC3: No excessively long text blocks', () => {
    it('should not have any paragraph with more than 200 words', () => {
      const paragraphMatches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) ?? [];
      for (const para of paragraphMatches) {
        const text = para.replace(/<[^>]+>/g, '').trim();
        const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
        expect(wordCount).toBeLessThanOrEqual(200);
      }
    });

    it('should have at least 4 separate paragraphs to break content into small blocks', () => {
      const paragraphMatches = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) ?? [];
      expect(paragraphMatches.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('AC4: Lists used in at least 2 sections', () => {
    it('should contain at least 2 lists (ul or ol)', () => {
      const ulCount = (html.match(/<ul[^>]*>/gi) ?? []).length;
      const olCount = (html.match(/<ol[^>]*>/gi) ?? []).length;
      const totalLists = ulCount + olCount;
      expect(totalLists).toBeGreaterThanOrEqual(2);
    });

    it('should have list items (li) across different sections', () => {
      const liMatches = html.match(/<li[^>]*>/gi) ?? [];
      expect(liMatches.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('AC5: Logical content progression', () => {
    it('should have header before main before footer', () => {
      const headerIdx = html.indexOf('<header');
      const mainIdx = html.indexOf('<main');
      const footerIdx = html.indexOf('<footer');
      expect(headerIdx).toBeLessThan(mainIdx);
      expect(mainIdx).toBeLessThan(footerIdx);
    });

    it('should have decomposition section before benefits section', () => {
      const htmlLower = html.toLowerCase();
      const decomposicaoIdx = htmlLower.indexOf('decomposição') !== -1
        ? htmlLower.indexOf('decomposição')
        : htmlLower.indexOf('decomposi');
      const beneficiosIdx = htmlLower.indexOf('por que boss') !== -1
        ? htmlLower.indexOf('por que boss')
        : htmlLower.indexOf('benefício');
      if (decomposicaoIdx !== -1 && beneficiosIdx !== -1) {
        expect(decomposicaoIdx).toBeLessThan(beneficiosIdx);
      }
    });

    it('should have architecture section present in main', () => {
      const mainBlock = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
      const hasArch = mainBlock.toLowerCase().includes('arquitetura') ||
                      mainBlock.toLowerCase().includes('azure');
      expect(hasArch).toBe(true);
    });
  });

  describe('Integration: Full scannability check', () => {
    it('should pass all scannability criteria simultaneously', () => {
      const h2Count = (html.match(/<h2[^>]*>/gi) ?? []).length;
      const listCount = (html.match(/<[uo]l[^>]*>/gi) ?? []).length;
      const hasMobileQuery = /@media\s*\(\s*max-width/i.test(html);
      const headerBeforeMain = html.indexOf('<header') < html.indexOf('<main');
      const mainBeforeFooter = html.indexOf('<main') < html.indexOf('<footer');

      const criteria = {
        hasEnoughSections: h2Count >= 3,
        hasLists: listCount >= 2,
        hasMobileResponsiveness: hasMobileQuery,
        hasLogicalOrder: headerBeforeMain && mainBeforeFooter,
      };

      const failures = Object.entries(criteria)
        .filter(([, v]) => !v)
        .map(([k]) => k);

      expect(failures).toHaveLength(0);
    });
  });
});

function extractMediaQueryBlock(html: string): string {
  const match = html.match(/@media[^{]+\{([\s\S]*?)\}\s*<\/style>/);
  return match ? match[1] : '';
}
