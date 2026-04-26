import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('AC2 — Caso concreto: fluxo ARO com input→output real', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — Exemplo completo input → output presente', () => {
    it('a página mostra uma intenção em linguagem natural do usuário (comando de exemplo)', () => {
      const lower = html.toLowerCase();
      // The hero already shows: "Quando você solicita ao Boss: 'Provisione...'"
      const hasExample =
        lower.includes('provisione') ||
        lower.includes('quando você solicita') ||
        lower.includes('boss:') ||
        lower.includes('"provisione');
      expect(hasExample).toBe(true);
    });

    it('a página mostra agents especializados sendo criados no fluxo', () => {
      const lower = html.toLowerCase();
      const hasAgents =
        lower.includes('agent') &&
        (lower.includes('paralelo') || lower.includes('especializad'));
      expect(hasAgents).toBe(true);
    });
  });

  describe('AC2 — Fluxo: intenção → agents → artefatos', () => {
    it('a página lista os tipos de agents criados (Rede, Identidade, Plataforma, Terraform)', () => {
      const lower = html.toLowerCase();
      const agentTypes = ['rede', 'identidade', 'plataforma', 'terraform'];
      const foundAgents = agentTypes.filter((a) => lower.includes(a));
      expect(foundAgents.length).toBeGreaterThanOrEqual(3);
    });

    it('a página menciona um resultado/delivery final agregado', () => {
      const lower = html.toLowerCase();
      const hasDelivery =
        lower.includes('resultado final') ||
        lower.includes('delivery') ||
        lower.includes('artefato') ||
        lower.includes('entrega');
      expect(hasDelivery).toBe(true);
    });
  });

  describe('AC3 — Artefatos de saída com nomes concretos', () => {
    it('menciona "main.tf" ou arquivo .tf como artefato concreto', () => {
      expect(html.toLowerCase()).toContain('.tf');
    });

    it('menciona arquivo de GitHub Actions (.yml) como artefato concreto', () => {
      const lower = html.toLowerCase();
      const hasActions =
        lower.includes('github-actions') ||
        lower.includes('github actions') ||
        lower.includes('.yml') ||
        lower.includes('.yaml');
      expect(hasActions).toBe(true);
    });

    it('menciona Argo CD ou GitOps como artefato de entrega', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('argo') || lower.includes('gitops')).toBe(true);
    });
  });

  describe('AC4 — O caso demonstrado é ARO', () => {
    it('o exemplo usa "Azure Red Hat OpenShift" ou "ARO" como alvo do cluster', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('openshift') || lower.includes(' aro')).toBe(true);
    });

    it('o exemplo não é genérico — cita Azure como cloud de destino', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('azure')).toBe(true);
    });
  });

  describe('AC5 — Sem placeholders ou promessas vagas', () => {
    it('não contém "em breve" ou "coming soon"', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('em breve')).toBe(false);
      expect(lower.includes('coming soon')).toBe(false);
    });

    it('não contém "exemplo aqui" ou "insira aqui"', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('exemplo aqui')).toBe(false);
      expect(lower.includes('insira aqui')).toBe(false);
      expect(lower.includes('placeholder')).toBe(false);
    });

    it('a seção de resultado final não está vazia — tem pelo menos 3 artefatos listados', () => {
      // Look for list items in the result/delivery area
      const resultSection = html.match(/Resultado Final[\s\S]*?(?=<\/p>|<\/section>)/i);
      expect(resultSection).toBeTruthy();
      const resultText = resultSection![0];
      // Count commas or list items as proxies for multiple artifacts
      const commasOrItems = (resultText.match(/,|<li>/g) || []).length;
      expect(commasOrItems).toBeGreaterThanOrEqual(2);
    });
  });
});
