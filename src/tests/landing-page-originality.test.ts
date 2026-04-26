import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('C1 — Inspiração sem cópia: conteúdo original Boss/Azure', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — Texto original sem reprodução de referência', () => {
    it('não deve mencionar "DevOps na Nuvem" (marca da referência)', () => {
      expect(html.toLowerCase()).not.toContain('devops na nuvem');
    });

    it('não deve mencionar "workshop.devopsnanuvem" ou domínio de referência', () => {
      expect(html.toLowerCase()).not.toContain('devopsnanuvem');
      expect(html.toLowerCase()).not.toContain('workshop.devops');
    });

    it('não deve reproduzir slogans ou taglines associadas a terceiros', () => {
      // Known slogans from the reference domain context — checking for absence
      const thirdPartyPhrases = [
        'devops na nuvem',
        'workshop de devops',
        'seu próximo nível em devops',
      ];
      const lower = html.toLowerCase();
      const hasThirdParty = thirdPartyPhrases.some((p) => lower.includes(p));
      expect(hasThirdParty).toBe(false);
    });
  });

  describe('AC2 — Sem identidade visual de terceiros', () => {
    it('não deve referenciar logos externos ou marcas de workshop', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('devopsnanuvem')).toBe(false);
    });

    it('a identidade deve ser Boss com branding Azure (azul #0078d4)', () => {
      expect(html).toContain('#0078d4');
      expect(html.toLowerCase()).toContain('boss');
    });
  });

  describe('AC3 — Posicionamento Boss/Azure próprio', () => {
    it('o título principal deve posicionar Boss como produto, não como curso ou workshop', () => {
      const headline = page.getHeroHeadline().toLowerCase();
      expect(headline).toContain('boss');
      expect(headline).not.toContain('workshop');
      expect(headline).not.toContain('curso');
      expect(headline).not.toContain('treinamento');
    });

    it('o elevator pitch deve descrever orquestração de agents, não ensino de DevOps', () => {
      const pitch = page.getElevatorPitch().toLowerCase();
      const isProduct = pitch.includes('agent') || pitch.includes('orquestrador') || pitch.includes('boss');
      const isCourse = pitch.includes('aprenda') || pitch.includes('aula') || pitch.includes('módulo');
      expect(isProduct).toBe(true);
      expect(isCourse).toBe(false);
    });
  });

  describe('AC4 — Títulos de seções originais', () => {
    it('os h2 devem ser títulos originais do Boss, não genéricos de workshop', () => {
      const h2Texts = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gs)].map((m) =>
        m[1].replace(/<[^>]+>/g, '').toLowerCase()
      );
      const genericWorkshopTitles = ['módulo 1', 'módulo 2', 'aula ', 'lição ', 'o que você vai aprender'];
      for (const title of h2Texts) {
        const hasGeneric = genericWorkshopTitles.some((g) => title.includes(g));
        expect(hasGeneric).toBe(false);
      }
    });

    it('a página deve ter pelo menos 1 h2 que menciona Boss, agents ou Azure', () => {
      const h2Texts = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gs)]
        .map((m) => m[1].replace(/<[^>]+>/g, '').toLowerCase())
        .join(' ');
      const hasBossContext =
        h2Texts.includes('boss') ||
        h2Texts.includes('agent') ||
        h2Texts.includes('azure') ||
        h2Texts.includes('governança') ||
        h2Texts.includes('decomposição') ||
        h2Texts.includes('arquitetura');
      expect(hasBossContext).toBe(true);
    });
  });

  describe('AC5 — Copy própria, contexto Azure/DevOps nativo', () => {
    it('deve mencionar Azure pelo menos 3 vezes como contexto próprio', () => {
      const lower = html.toLowerCase();
      const azureCount = (lower.match(/azure/g) || []).length;
      expect(azureCount).toBeGreaterThanOrEqual(3);
    });

    it('deve mencionar DevOps no contexto de entrega de produto, não de aprendizado', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('devops')).toBe(true);
      // Should not be in learning context
      const learningDevOps = lower.includes('aprenda devops') || lower.includes('curso de devops');
      expect(learningDevOps).toBe(false);
    });
  });
});
