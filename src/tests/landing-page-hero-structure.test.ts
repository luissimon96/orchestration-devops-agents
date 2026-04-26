import { describe, it, expect } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('node_d087b713ce06 — Estrutura HTML/CSS da landing page hero', () => {
  const html = new HtmlPage().render();
  const lower = html.toLowerCase();

  it('AC1 — hero section contém h1 com Boss e tagline sobre orquestração', () => {
    expect(html).toMatch(/<h1[^>]*>[\s\S]*?Boss[\s\S]*?<\/h1>/i);
    expect(lower).toMatch(/orquestrador|orquestra|agent|devops/);
  });

  it('AC2 — CTA primário com texto de ação claro', () => {
    expect(html).toMatch(/<a[^>]*href[^>]*>[\s\S]*?(conhecer|iniciar|demo|começar|saiba|ver|acessar)[\s\S]*?<\/a>/i);
  });

  it('AC3 — mensagem Azure-first evidente no hero', () => {
    // Extract hero section content
    const heroMatch = html.match(/<(header|section)[^>]*class="[^"]*hero[^"]*"[^>]*>([\s\S]*?)<\/(header|section)>/i)
      || html.match(/<header[^>]*>([\s\S]*?)<\/header>/i)
      || html.match(/<section[^>]*>([\s\S]*?)<\/section>/i);
    const heroContent = heroMatch ? heroMatch[0].toLowerCase() : lower.substring(0, 2000);
    expect(heroContent).toMatch(/azure|aro|openshift/);
  });

  it('AC4 — hero inclui elemento visual (SVG, imagem, badge)', () => {
    const hasSvg = /<svg[\s\S]*?<\/svg>/i.test(html);
    const hasImg = /<img[^>]+>/i.test(html);
    const hasBadge = /badge|ilustra|logo|icon/i.test(html);
    expect(hasSvg || hasImg || hasBadge).toBe(true);
  });

  it('AC5 — markup semântico: header ou section com aria', () => {
    const hasHeader = /<header[\s\S]*?<\/header>/i.test(html);
    const hasSectionAria = /<section[^>]*(aria-label|role)[^>]*>/i.test(html);
    const hasSectionClass = /<section[^>]*class="[^"]*hero[^"]*"/i.test(html);
    expect(hasHeader || hasSectionAria || hasSectionClass).toBe(true);
  });
});
