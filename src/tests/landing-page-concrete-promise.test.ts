import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('R1 — Promessa abstrata: a página deve ser concreta e tangível', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — Artefatos concretos listados', () => {
    it('deve mencionar Terraform como artefato de saída', () => {
      expect(html.toLowerCase()).toContain('terraform');
    });

    it('deve mencionar GitHub Actions ou pipeline CI/CD', () => {
      const lower = html.toLowerCase();
      const hasCiCd = lower.includes('github actions') || lower.includes('ci/cd') || lower.includes('pipeline');
      expect(hasCiCd).toBe(true);
    });

    it('deve mencionar Argo CD ou GitOps como artefato', () => {
      const lower = html.toLowerCase();
      const hasGitOps = lower.includes('argo cd') || lower.includes('argocd') || lower.includes('gitops');
      expect(hasGitOps).toBe(true);
    });

    it('deve listar pelo menos 3 artefatos concretos de entrega', () => {
      const lower = html.toLowerCase();
      const artifacts = ['terraform', 'github actions', 'argo cd', 'gitops', 'ci/cd', 'pipeline', 'helm', 'manifesto', 'documentação'];
      const found = artifacts.filter((a) => lower.includes(a));
      expect(found.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('AC2 — Fluxo input → output explícito', () => {
    it('deve apresentar um exemplo com pedido do usuário ao Boss', () => {
      const lower = html.toLowerCase();
      const hasRequest = lower.includes('provisione') || lower.includes('quando você solicita') || lower.includes('você pede');
      expect(hasRequest).toBe(true);
    });

    it('deve mostrar o que o Boss entrega como resultado do pedido', () => {
      const lower = html.toLowerCase();
      const hasOutput = lower.includes('resultado final') || lower.includes('resultado:') || lower.includes('entrega');
      expect(hasOutput).toBe(true);
    });

    it('deve ter um fluxo numerado ou sequencial descrevendo as etapas', () => {
      // <ol> or numbered steps
      const hasOl = html.includes('<ol');
      const hasNumberedSteps = html.includes('1.') || html.includes('1)');
      expect(hasOl || hasNumberedSteps).toBe(true);
    });
  });

  describe('AC3 — Ferramentas reais em contexto de output', () => {
    it('deve mencionar Terraform no contexto de geração/entrega, não só como marketing', () => {
      const lower = html.toLowerCase();
      const terraformIndex = lower.indexOf('terraform');
      const surroundingText = lower.substring(Math.max(0, terraformIndex - 50), terraformIndex + 100);
      const inDeliveryContext = surroundingText.includes('module') ||
        surroundingText.includes('provisi') ||
        surroundingText.includes('state') ||
        surroundingText.includes('result') ||
        surroundingText.includes('entrega') ||
        surroundingText.includes('pronto');
      expect(inDeliveryContext).toBe(true);
    });

    it('deve mencionar OpenShift no contexto de provisionamento real', () => {
      const lower = html.toLowerCase();
      const hasOpenShift = lower.includes('openshift') || lower.includes('aro') || lower.includes('azure red hat');
      expect(hasOpenShift).toBe(true);
    });
  });

  describe('AC4 — Sem frases genéricas de IA sem âncora', () => {
    it('não deve usar "inteligência artificial" sem contexto de entregável', () => {
      const lower = html.toLowerCase();
      if (lower.includes('inteligência artificial') || lower.includes('ia generativa')) {
        const iaIndex = lower.indexOf('inteligência artificial');
        const context = lower.substring(Math.max(0, iaIndex - 100), iaIndex + 200);
        const hasAnchor = context.includes('terraform') || context.includes('pipeline') || context.includes('agent');
        expect(hasAnchor).toBe(true);
      } else {
        // If no generic AI claims, that's fine
        expect(true).toBe(true);
      }
    });

    it('não deve usar "automatize tudo" ou promessas vagas sem especificidade', () => {
      const lower = html.toLowerCase();
      const vagueTerms = ['automatize tudo', 'faça tudo', 'resolve tudo'];
      const hasVague = vagueTerms.some((t) => lower.includes(t));
      expect(hasVague).toBe(false);
    });
  });

  describe('AC5 — Hero section concreta', () => {
    it('deve mencionar artefatos reais no elevator pitch ou hero', () => {
      const pitch = page.getElevatorPitch().toLowerCase();
      const heroSection = page.getHeroSection().toLowerCase();
      const combined = pitch + heroSection;
      const hasConcreteArtifact =
        combined.includes('terraform') ||
        combined.includes('gitops') ||
        combined.includes('ci/cd') ||
        combined.includes('pipeline') ||
        combined.includes('argo');
      expect(hasConcreteArtifact).toBe(true);
    });

    it('deve deixar claro que o output é infraestrutura provisionável, não apenas um relatório', () => {
      const lower = html.toLowerCase();
      const hasInfraOutput =
        lower.includes('provisi') ||
        lower.includes('deploy') ||
        lower.includes('pronto para') ||
        lower.includes('prontos para');
      expect(hasInfraOutput).toBe(true);
    });
  });
});
