import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('AC5 — Entregáveis tangíveis: artefatos com destaque', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — Nomes de arquivo concretos', () => {
    it('menciona main.tf como artefato concreto', () => {
      expect(html).toContain('main.tf');
    });

    it('menciona github-actions.yml como artefato concreto', () => {
      expect(html.toLowerCase()).toContain('github-actions.yml');
    });

    it('menciona argo-app.yaml como artefato concreto', () => {
      expect(html.toLowerCase()).toContain('argo-app.yaml');
    });
  });

  describe('AC2 — Destaque visual nos artefatos', () => {
    it('usa <code> ou <strong> para destacar artefatos', () => {
      expect(html.includes('<code>') || html.includes('<strong>')).toBe(true);
    });

    it('artefatos estão dentro de tags <code>', () => {
      expect(html).toMatch(/<code>[^<]*\.(tf|yml|yaml)[^<]*<\/code>/);
    });
  });

  describe('AC3 — Pelo menos 3 artefatos distintos', () => {
    it('lista pelo menos 3 artefatos na seção de resultado', () => {
      const lower = html.toLowerCase();
      const artifacts = ['.tf', '.yml', '.yaml', 'terraform', 'github-actions', 'argo'];
      const found = artifacts.filter((a) => lower.includes(a));
      expect(found.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('AC4 — 3 categorias de artefatos', () => {
    it('cobre IaC com Terraform (.tf)', () => {
      expect(html.toLowerCase()).toContain('.tf');
    });

    it('cobre CI/CD com GitHub Actions (.yml)', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('github-actions') || lower.includes('github actions')).toBe(true);
    });

    it('cobre GitOps com Argo CD (.yaml)', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('argo') || lower.includes('gitops')).toBe(true);
    });
  });

  describe('AC5 — Artefatos prontos para uso', () => {
    it('indica que os artefatos estão prontos para uso ou deploy', () => {
      const lower = html.toLowerCase();
      expect(
        lower.includes('prontos para') ||
        lower.includes('pronto para') ||
        lower.includes('ready to') ||
        lower.includes('production-ready')
      ).toBe(true);
    });

    it('seção de resultado final é visível e com destaque (Resultado Final)', () => {
      expect(html.toLowerCase()).toContain('resultado final');
    });
  });
});
