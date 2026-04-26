import { describe, it, expect } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('node_6ef0c10a47ca — Definicao visual e tonal do Boss brand', () => {
  const html = new HtmlPage().render();
  const lower = html.toLowerCase();

  it('AC1 — paleta de cores própria com pelo menos 2 cores nomeadas', () => {
    // CSS vars or hex colors for Boss brand
    const hasCssVars = /--boss-(primary|accent|dark|light|bg|text|secondary)/i.test(html);
    const hasHexColors = (html.match(/#[0-9a-fA-F]{3,6}/g) || []).length >= 2;
    expect(hasCssVars || hasHexColors).toBe(true);
  });

  it('AC2 — tipografia consistente com font-family explícita', () => {
    expect(html).toMatch(/font-family/i);
  });

  it('AC3 — tom de voz DevOps-first com terminologia técnica', () => {
    const techTerms = ['cluster', 'provisionamento', 'provisionar', 'iac', 'terraform', 'kubernetes', 'openshift'];
    const found = techTerms.filter(t => lower.includes(t));
    expect(found.length).toBeGreaterThanOrEqual(3);
  });

  it('AC4 — Boss tem identidade visual própria: nome e tagline visíveis', () => {
    expect(html).toMatch(/Boss/);
    // Must have a tagline or slogan — not just generic "Boss" heading
    expect(lower).toMatch(/orquestrador|devops|azure|agentes|especialistas/);
  });

  it('AC5 — elemento de brand: logo textual Boss ou tagline técnica', () => {
    // Logo, tagline or slogan text containing "Boss"
    const hasBrandElement =
      /class="[^"]*logo[^"]*"[^>]*>.*?Boss|Boss.*?orquestrador|<title>[^<]*Boss/i.test(html) ||
      /tagline|slogan|brand/i.test(html) ||
      html.includes('Boss —') ||
      html.includes('Boss:') ||
      /Boss\s*[-–—]\s*\w/.test(html);
    expect(hasBrandElement).toBe(true);
  });
});
