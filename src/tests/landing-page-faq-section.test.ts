import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('Seção FAQ e garantia', () => {
  let page: HtmlPage;
  let html: string;
  let lower: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
    lower = html.toLowerCase();
  });

  describe('AC1 — Mínimo 5 perguntas e respostas', () => {
    it('contém pelo menos 5 perguntas (h3 ou dt ou summary dentro da FAQ)', () => {
      // Count h3 or <dt> or <summary> elements as question indicators
      const h3Count = (html.match(/<h3>/g) || []).length;
      const dtCount = (html.match(/<dt>/g) || []).length;
      const summaryCount = (html.match(/<summary>/g) || []).length;
      expect(h3Count + dtCount + summaryCount).toBeGreaterThanOrEqual(5);
    });
  });

  describe('AC2 — Perguntas cobrem tópicos essenciais', () => {
    it('aborda o que é o Boss', () => {
      expect(lower.includes('o que é') || lower.includes('o que e ') || lower.includes('what is')).toBe(true);
    });

    it('aborda como funciona ou como começar', () => {
      expect(
        lower.includes('como funciona') ||
        lower.includes('como começar') ||
        lower.includes('como comecar') ||
        lower.includes('como usar')
      ).toBe(true);
    });

    it('aborda o que é entregue ou quais artefatos', () => {
      expect(
        lower.includes('entregue') ||
        lower.includes('entregável') ||
        lower.includes('artefato') ||
        lower.includes('recebo')
      ).toBe(true);
    });

    it('aborda suporte a Azure', () => {
      expect(lower).toContain('azure');
    });
  });

  describe('AC3 — H2 identificável para FAQ', () => {
    it('tem h2 com FAQ ou Perguntas ou Dúvidas', () => {
      expect(html).toMatch(/<h2>[^<]*(faq|perguntas|d[úu]vidas|frequentes)[^<]*<\/h2>/i);
    });
  });

  describe('AC4 — Informação de contato ou suporte', () => {
    it('menciona contato, suporte, email ou GitHub', () => {
      expect(
        lower.includes('contato') ||
        lower.includes('suporte') ||
        lower.includes('email') ||
        lower.includes('github') ||
        lower.includes('comunidade')
      ).toBe(true);
    });
  });

  describe('AC5 — Estrutura semântica', () => {
    it('usa tags semânticas: details/summary, dl/dt/dd ou h3+p', () => {
      const hasDetails = html.includes('<details>');
      const hasDl = html.includes('<dl>');
      const hasH3 = html.includes('<h3>');
      expect(hasDetails || hasDl || hasH3).toBe(true);
    });
  });
});
