import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('Seção de autoridade e instrutor', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — Bio do time com background DevOps/Azure', () => {
    it('contém seção "Sobre" ou "Quem somos" ou "Sobre o time"', () => {
      const lower = html.toLowerCase();
      expect(
        lower.includes('sobre o time') ||
        lower.includes('quem somos') ||
        lower.includes('sobre o boss') ||
        lower.includes('quem fez')
      ).toBe(true);
    });

    it('menciona background em DevOps', () => {
      expect(html.toLowerCase()).toContain('devops');
    });

    it('menciona background em Azure ou Kubernetes', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('azure') || lower.includes('kubernetes')).toBe(true);
    });
  });

  describe('AC2 — Credenciais e certificações', () => {
    it('lista pelo menos uma certificação Azure ou Kubernetes', () => {
      const lower = html.toLowerCase();
      const certs = ['az-104', 'az-400', 'az-305', 'cka', 'ckad', 'certif'];
      expect(certs.some((c) => lower.includes(c))).toBe(true);
    });

    it('cita anos de experiência ou número de projetos', () => {
      const lower = html.toLowerCase();
      expect(
        lower.includes('anos de experiência') ||
        lower.includes('anos de experiencia') ||
        lower.includes('projetos') ||
        lower.includes('experiência')
      ).toBe(true);
    });
  });

  describe('AC3 — Social proof', () => {
    it('contém número de usuários, clusters, ou projetos entregues', () => {
      // Match patterns like "100+", "500 projetos", "50 clusters"
      expect(html).toMatch(/\d+\+?\s*(usuário|cluster|projeto|deploy|empresa|time)/i);
    });
  });

  describe('AC4 — Título reconhecível', () => {
    it('a seção de autoridade tem h2 identificável', () => {
      expect(html).toMatch(/<h2>[^<]*([Ss]obre|[Qq]uem|[Ee]quipe|[Tt]ime|[Aa]utoridade)[^<]*<\/h2>/);
    });
  });

  describe('AC5 — Autoridade técnica em Kubernetes e Azure', () => {
    it('menciona OpenShift ou AKS como prova de expertise', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('openshift') || lower.includes('aks') || lower.includes('aro')).toBe(true);
    });

    it('a seção de autoridade existe como elemento <section>', () => {
      // Check there are at least 5 sections (hero + why + arch + governance + authority)
      const sectionCount = (html.match(/<section/g) || []).length;
      expect(sectionCount).toBeGreaterThanOrEqual(5);
    });
  });
});
