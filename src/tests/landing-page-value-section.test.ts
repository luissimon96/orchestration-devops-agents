import { describe, it, expect } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('node_3eeadb5ff27c — Secao de prova de valor e diferenciais', () => {
  const html = new HtmlPage().render();
  const lower = html.toLowerCase();

  it('AC1 — seção Por que Boss lista pelo menos 3 diferenciais', () => {
    const sectionMatch = html.match(/<section[^>]*>[\s\S]*?<h2[^>]*>[^<]*por que boss[^<]*<\/h2>([\s\S]*?)<\/section>/i);
    expect(sectionMatch).toBeTruthy();
    const sectionContent = sectionMatch![0];
    // Count list items or dt/dd or h3/h4 entries as differentials
    const liCount = (sectionContent.match(/<li[^>]*>/gi) || []).length;
    const dtCount = (sectionContent.match(/<dt[^>]*>/gi) || []).length;
    const h3Count = (sectionContent.match(/<h3[^>]*>/gi) || []).length;
    expect(liCount + dtCount + h3Count).toBeGreaterThanOrEqual(3);
  });

  it('AC2 — cada diferencial tem título e descrição única', () => {
    const sectionMatch = html.match(/<section[^>]*>[\s\S]*?<h2[^>]*>[^<]*por que boss[^<]*<\/h2>([\s\S]*?)<\/section>/i);
    const sectionContent = sectionMatch![0];
    // Get all li or h3 texts and ensure they're distinct
    const entries = (sectionContent.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [])
      .concat(sectionContent.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || []);
    const unique = new Set(entries.map(e => e.replace(/<[^>]+>/g, '').trim().toLowerCase()));
    expect(unique.size).toBeGreaterThanOrEqual(3);
  });

  it('AC3 — menciona governança, paralelo/agents e Terraform como diferenciais', () => {
    expect(lower).toMatch(/governan/);
    expect(lower).toMatch(/paralelo|agents especialistas/);
    expect(lower).toMatch(/terraform|iac/);
  });

  it('AC4 — copy Azure-first: sem menção a AWS na seção diferenciais', () => {
    const sectionMatch = html.match(/<section[^>]*>[\s\S]*?<h2[^>]*>[^<]*por que boss[^<]*<\/h2>([\s\S]*?)<\/section>/i);
    const sectionContent = (sectionMatch ? sectionMatch[0] : '').toLowerCase();
    expect(sectionContent).not.toMatch(/\baws\b|amazon web/);
    expect(sectionContent).toMatch(/azure/);
  });

  it('AC5 — estrutura visual: ul/li, dl, ou divs com classes', () => {
    const sectionMatch = html.match(/<section[^>]*>[\s\S]*?<h2[^>]*>[^<]*por que boss[^<]*<\/h2>([\s\S]*?)<\/section>/i);
    const sectionContent = sectionMatch![0];
    const hasList = /<ul[^>]*>|<ol[^>]*>|<dl[^>]*>/i.test(sectionContent);
    const hasCards = /<div[^>]*class="[^"]*card|feature|item|benefit/i.test(sectionContent);
    const hasH3s = /<h3[^>]*>/i.test(sectionContent);
    expect(hasList || hasCards || hasH3s).toBe(true);
  });
});
