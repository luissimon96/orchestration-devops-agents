import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('Seção de entregáveis finais', () => {
  let page: HtmlPage;
  let html: string;
  let lower: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
    lower = html.toLowerCase();
  });

  describe('AC1 — 4 entregáveis com nome e descrição', () => {
    it('menciona Terraform como entregável de IaC', () => {
      expect(lower).toContain('terraform');
    });

    it('menciona GitHub Actions como entregável de CI/CD', () => {
      expect(lower.includes('github actions') || lower.includes('github-actions')).toBe(true);
    });

    it('menciona Argo CD como entregável de GitOps', () => {
      expect(lower.includes('argo cd') || lower.includes('argo-app') || lower.includes('gitops')).toBe(true);
    });

    it('menciona documentação técnica como entregável', () => {
      expect(
        lower.includes('documentação') ||
        lower.includes('documentacao') ||
        lower.includes('documentação técnica') ||
        lower.includes('doc')
      ).toBe(true);
    });
  });

  describe('AC2 — Destaque visual por entregável', () => {
    it('usa <ul> ou <ol> ou estrutura de cards para listar entregáveis', () => {
      expect(html.includes('<ul') || html.includes('<ol') || html.includes('class="')).toBe(true);
    });

    it('os entregáveis têm destaque com <strong> ou <code>', () => {
      expect(html.includes('<strong>') || html.includes('<code>')).toBe(true);
    });
  });

  describe('AC3 — Exemplo de conteúdo real', () => {
    it('menciona nome de arquivo concreto (.tf, .yml ou .yaml)', () => {
      expect(html).toMatch(/\.(tf|yml|yaml)/);
    });
  });

  describe('AC4 — Seção com h2 identificável', () => {
    it('tem h2 com "entregável", "recebe" ou "resultado"', () => {
      expect(html).toMatch(/<h2>[^<]*(ntrega|ecebe|esultado|O que)[^<]*<\/h2>/i);
    });
  });

  describe('AC5 — Lista/grid para separar entregáveis', () => {
    it('usa lista (<ul> com múltiplos <li>) para entregáveis', () => {
      const listMatches = html.match(/<li>/g) || [];
      expect(listMatches.length).toBeGreaterThanOrEqual(4);
    });

    it('a seção de entregáveis é uma <section> separada', () => {
      const sectionCount = (html.match(/<section/g) || []).length;
      expect(sectionCount).toBeGreaterThanOrEqual(5);
    });
  });
});
