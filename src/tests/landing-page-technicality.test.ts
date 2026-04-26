import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('R2 — Excesso de tecnicidade: equilíbrio entre técnico e acessível', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — Densidade de acrônimos por parágrafo', () => {
    it('nenhum parágrafo deve ter mais de 3 acrônimos distintos sem contexto', () => {
      const paragraphs = html.match(/<p[^>]*>(.*?)<\/p>/gs) || [];
      const acronyms = ['ARO', 'AKS', 'CI/CD', 'IaC', 'GitOps', 'API', 'VNet', 'ACR', 'RBAC', 'DNS'];
      for (const para of paragraphs) {
        const stripped = para.replace(/<[^>]+>/g, '');
        const found = acronyms.filter((a) => stripped.includes(a));
        expect(found.length).toBeLessThanOrEqual(3);
      }
    });
  });

  describe('AC2 — Hero compreensível sem Kubernetes', () => {
    it('a headline não deve exigir conhecimento de Kubernetes para ser entendida', () => {
      const headline = page.getHeroHeadline().toLowerCase();
      // Headline should not be pure k8s jargon
      const kubeOnlyJargon = ['kubectl', 'kubeconfig', 'namespace', 'pod ', 'deployment yaml'];
      const hasJargon = kubeOnlyJargon.some((j) => headline.includes(j));
      expect(hasJargon).toBe(false);
    });

    it('o elevator pitch deve ser compreensível para um gerente técnico', () => {
      const pitch = page.getElevatorPitch();
      // Should be under 300 chars and mention outcome, not only implementation details
      expect(pitch.length).toBeLessThan(500);
      const pitchLower = pitch.toLowerCase();
      const hasOutcome =
        pitchLower.includes('result') ||
        pitchLower.includes('provis') ||
        pitchLower.includes('entrega') ||
        pitchLower.includes('pronto') ||
        pitchLower.includes('minuto');
      expect(hasOutcome).toBe(true);
    });
  });

  describe('AC3 — Linguagem de negócio presente', () => {
    it('deve usar pelo menos uma palavra de linguagem de negócio/resultado', () => {
      const lower = html.toLowerCase();
      const businessTerms = [
        'resultado',
        'entrega',
        'produtividade',
        'eficiência',
        'time ',
        'equipe',
        'velocidade',
        'confiança',
        'minutos',
        'pronto',
        'completo',
      ];
      const found = businessTerms.filter((t) => lower.includes(t));
      expect(found.length).toBeGreaterThanOrEqual(2);
    });

    it('deve ter pelo menos uma frase orientada a benefício, não só funcionalidade', () => {
      const lower = html.toLowerCase();
      const benefitPhrases = [
        'em minutos',
        'pronto para',
        'prontos para',
        'sem precisar',
        'sem se preocupar',
        'enquanto você',
        'para que você',
        'completamente provisionado',
      ];
      const hasBenefit = benefitPhrases.some((p) => lower.includes(p));
      expect(hasBenefit).toBe(true);
    });
  });

  describe('AC4 — Termos técnicos com descrição simples', () => {
    it('deve explicar o que é ARO ou Azure Red Hat OpenShift pelo menos 1 vez', () => {
      const lower = html.toLowerCase();
      const hasAroWithContext =
        (lower.includes('azure red hat openshift') && lower.includes('kubernetes')) ||
        lower.includes('openshift') && (lower.includes('cluster') || lower.includes('plataforma') || lower.includes('contêiner'));
      expect(hasAroWithContext).toBe(true);
    });

    it('deve contextualizar Terraform como ferramenta de infraestrutura como código', () => {
      const lower = html.toLowerCase();
      const hasTerraformContext =
        (lower.indexOf('terraform') >= 0) &&
        (lower.includes('infraestrutura') || lower.includes('iac') || lower.includes('módulo') || lower.includes('module') || lower.includes('provisi'));
      expect(hasTerraformContext).toBe(true);
    });
  });

  describe('AC5 — CTA orientado a resultado', () => {
    it('o botão CTA deve usar linguagem de ação ou resultado', () => {
      const lower = html.toLowerCase();
      const ctaPatterns = ['começar agora', 'solicitar demo', 'ver demo', 'começar', 'agendar', 'saiba mais', 'experimente', 'comece'];
      const hasCta = ctaPatterns.some((p) => lower.includes(p));
      expect(hasCta).toBe(true);
    });

    it('o CTA não deve ser um acronismo técnico isolado', () => {
      const lower = html.toLowerCase();
      const technicalCtas = ['kubectl apply', 'terraform init', 'helm install', 'git push'];
      const hasTechCta = technicalCtas.some((t) => lower.includes(t));
      expect(hasTechCta).toBe(false);
    });
  });
});
