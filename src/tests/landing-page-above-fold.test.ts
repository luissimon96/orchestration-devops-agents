import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('AC1 — Primeira dobra: promessa clara above the fold', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — h1 comunica o que Boss faz em uma frase', () => {
    it('h1 existe e contém "Boss"', () => {
      const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
      expect(h1Match).toBeTruthy();
      expect(h1Match![1].toLowerCase()).toContain('boss');
    });

    it('h1 menciona DevOps ou orquestrador ou agents', () => {
      const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
      const h1Text = h1Match![1].toLowerCase();
      const hasContext =
        h1Text.includes('devops') ||
        h1Text.includes('orquestrador') ||
        h1Text.includes('agent') ||
        h1Text.includes('azure');
      expect(hasContext).toBe(true);
    });

    it('h1 tem menos de 100 caracteres (escaneável rapidamente)', () => {
      expect(page.getHeroHeadline().length).toBeLessThan(100);
    });
  });

  describe('AC2 — Proposta de valor aparece no header (above the fold)', () => {
    it('o elevator pitch está dentro do <header>', () => {
      const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
      expect(headerMatch).toBeTruthy();
      const headerHtml = headerMatch![0];
      const pitchText = page.getElevatorPitch().slice(0, 30);
      expect(headerHtml).toContain(pitchText);
    });

    it('o pitch tem no máximo 3 sentenças (< 4 pontos finais)', () => {
      const pitch = page.getElevatorPitch();
      const sentences = pitch.split(/[.!?]+/).filter((s) => s.trim().length > 0);
      expect(sentences.length).toBeLessThanOrEqual(3);
    });
  });

  describe('AC3 — CTA visível no header (above the fold)', () => {
    it('o botão CTA está dentro do <header>', () => {
      const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
      expect(headerMatch).toBeTruthy();
      expect(headerMatch![0]).toContain('cta-button');
    });

    it('o CTA tem texto de ação (não vazio)', () => {
      const ctaMatch = html.match(/<button[^>]*class="cta-button"[^>]*>(.*?)<\/button>/i);
      expect(ctaMatch).toBeTruthy();
      expect(ctaMatch![1].trim().length).toBeGreaterThan(0);
    });
  });

  describe('AC4 — Hero menciona ARO + Terraform sem jargão excessivo', () => {
    it('o pitch menciona Terraform como output', () => {
      expect(page.getElevatorPitch().toLowerCase()).toContain('terraform');
    });

    it('o pitch menciona OpenShift/ARO como plataforma alvo', () => {
      const pitch = page.getElevatorPitch().toLowerCase();
      expect(pitch.includes('openshift') || pitch.includes('aro')).toBe(true);
    });

    it('o pitch não usa mais de 3 acrônimos diferentes', () => {
      const pitch = page.getElevatorPitch();
      const acronyms = (pitch.match(/\b[A-Z]{2,5}\b/g) || []);
      const unique = new Set(acronyms);
      expect(unique.size).toBeLessThanOrEqual(3);
    });
  });

  describe('AC5 — Inteligível sem contexto em 10 segundos', () => {
    it('o header sozinho (h1 + pitch) contém os termos essenciais: Boss, DevOps, Azure', () => {
      const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
      const headerText = headerMatch![0].toLowerCase();
      expect(headerText).toContain('boss');
      expect(headerText).toContain('devops');
      expect(headerText).toContain('azure');
    });

    it('o header não tem mais de 200 palavras (escaneável)', () => {
      const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
      const text = headerMatch![0].replace(/<[^>]+>/g, ' ').trim();
      const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
      expect(wordCount).toBeLessThanOrEqual(200);
    });
  });
});
