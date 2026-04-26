import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('RF1 — Posicionamento Azure-first na hero section', () => {
  let page: HtmlPage;
  let html: string;
  let lower: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
    lower = html.toLowerCase();
  });

  describe('AC1 — Azure proeminente no hero (h1 ou primeiro parágrafo)', () => {
    it('o h1 contém "Azure"', () => {
      expect(html).toMatch(/<h1>[^<]*Azure[^<]*<\/h1>/i);
    });

    it('Azure aparece no header da página', () => {
      const headerMatch = html.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
      expect(headerMatch).toBeTruthy();
      expect(headerMatch![1].toLowerCase()).toContain('azure');
    });
  });

  describe('AC2 — Hero identifica agents especializados', () => {
    it('o header menciona "agents" ou "orquestrador"', () => {
      const headerMatch = html.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
      expect(headerMatch).toBeTruthy();
      const headerContent = headerMatch![1].toLowerCase();
      expect(headerContent.includes('agent') || headerContent.includes('orquestrador')).toBe(true);
    });
  });

  describe('AC3 — Proposta Azure-first acima da dobra', () => {
    it('a palavra Azure aparece antes da tag <main> no documento', () => {
      const mainIndex = html.indexOf('<main>');
      const azureIndex = lower.indexOf('azure');
      expect(azureIndex).toBeGreaterThanOrEqual(0);
      expect(azureIndex).toBeLessThan(mainIndex);
    });
  });

  describe('AC4 — DevOps mencionado no h1 ou pitch', () => {
    it('o h1 ou parágrafo do header menciona DevOps', () => {
      const headerMatch = html.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
      expect(headerMatch).toBeTruthy();
      expect(headerMatch![1].toLowerCase()).toContain('devops');
    });
  });

  describe('AC5 — Azure antes de outros conceitos técnicos', () => {
    it('Azure aparece antes de "Terraform" no documento', () => {
      const azureIdx = lower.indexOf('azure');
      const terraformIdx = lower.indexOf('terraform');
      expect(azureIdx).toBeLessThan(terraformIdx);
    });

    it('Azure aparece antes de "Kubernetes" no documento', () => {
      const azureIdx = lower.indexOf('azure');
      const k8sIdx = lower.indexOf('kubernetes');
      expect(azureIdx).toBeLessThan(k8sIdx);
    });
  });
});
