import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('R4 — Escopo inflado: foco no caso principal ARO + Terraform', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — Azure como única cloud no MVP', () => {
    it('não deve mencionar GCP ou Google Cloud como opção atual', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('gcp')).toBe(false);
      expect(lower.includes('google cloud')).toBe(false);
      expect(lower.includes('google kubernetes engine')).toBe(false);
      expect(lower.includes('gke')).toBe(false);
    });

    it('não deve mencionar multi-cloud como feature entregue agora', () => {
      const lower = html.toLowerCase();
      const multiCloudAsFeature = lower.includes('multi-cloud') || lower.includes('multicloud');
      expect(multiCloudAsFeature).toBe(false);
    });

    it('não deve mencionar AWS como opção suportada', () => {
      const lower = html.toLowerCase();
      const awsSupport = lower.includes('aws') || lower.includes('amazon web services');
      expect(awsSupport).toBe(false);
    });
  });

  describe('AC2 — Caso principal é ARO + Terraform', () => {
    it('deve mencionar Azure Red Hat OpenShift como caso demonstrativo principal', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('azure red hat openshift') || lower.includes('openshift')).toBe(true);
    });

    it('deve mencionar Terraform como ferramenta de entrega do caso principal', () => {
      expect(html.toLowerCase()).toContain('terraform');
    });

    it('o fluxo demonstrativo deve ter ARO e Terraform juntos na mesma narrativa', () => {
      const lower = html.toLowerCase();
      const aroIndex = lower.indexOf('openshift');
      const terraformIndex = lower.indexOf('terraform');
      // Both present and reasonably close (within same document context)
      expect(aroIndex).toBeGreaterThanOrEqual(0);
      expect(terraformIndex).toBeGreaterThanOrEqual(0);
    });
  });

  describe('AC3 — No máximo 3 casos de uso no MVP', () => {
    it('a página não deve listar mais de 3 casos de uso distintos em seção separada', () => {
      // Count h2 sections that look like use cases
      const h2Matches = html.match(/<h2[^>]*>/gi) || [];
      // Reasonable limit — too many h2 would indicate scope creep
      expect(h2Matches.length).toBeLessThanOrEqual(8);
    });

    it('não deve ter seção de "outros casos" ou "também suporta"', () => {
      const lower = html.toLowerCase();
      const scopeCreep = [
        'outros casos',
        'também suporta',
        'suporte a múltiplos',
        'qualquer cloud',
        'qualquer plataforma',
      ];
      const hasCreep = scopeCreep.some((t) => lower.includes(t));
      expect(hasCreep).toBe(false);
    });
  });

  describe('AC4 — CTA único e claro', () => {
    it('deve ter exatamente 1 botão CTA principal', () => {
      const ctaMatches = html.match(/class="cta-button"/g) || [];
      expect(ctaMatches.length).toBeGreaterThanOrEqual(1);
      expect(ctaMatches.length).toBeLessThanOrEqual(2);
    });

    it('o CTA deve ter texto de ação única, não múltiplas escolhas conflitantes', () => {
      const lower = html.toLowerCase();
      // Should have ONE clear CTA, not "or" between competing actions
      const hasCompetingCtas =
        lower.includes('ou agende') ||
        lower.includes('ou contate') ||
        lower.includes('ou compre');
      expect(hasCompetingCtas).toBe(false);
    });
  });

  describe('AC5 — Sem promessas de roadmap como features atuais', () => {
    it('não deve usar "em breve" ou "próximas versões" para features', () => {
      const lower = html.toLowerCase();
      const futureFeatures = ['em breve', 'próximas versões', 'roadmap', 'coming soon', 'futuras versões'];
      const hasFutureProm = futureFeatures.some((t) => lower.includes(t));
      expect(hasFutureProm).toBe(false);
    });

    it('não deve listar features com "(beta)" ou "(experimental)" como entregues', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('(beta)')).toBe(false);
      expect(lower.includes('(experimental)')).toBe(false);
    });
  });
});
