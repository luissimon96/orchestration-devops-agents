import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('AC4 — Consistência de plataforma: terminologia Azure-native', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — Kubernetes com terminologia Azure', () => {
    it('não menciona EKS (AWS Kubernetes)', () => {
      expect(html.toLowerCase()).not.toContain(' eks');
      expect(html.toLowerCase()).not.toContain('"eks"');
    });

    it('não menciona GKE (GCP Kubernetes)', () => {
      expect(html.toLowerCase()).not.toContain(' gke');
    });

    it('usa ARO ou AKS para Kubernetes', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('openshift') || lower.includes('aro') || lower.includes('aks')).toBe(true);
    });
  });

  describe('AC2 — Terraform state em Azure Storage', () => {
    it('não usa S3 como backend de Terraform state', () => {
      const lower = html.toLowerCase();
      expect(lower.includes(' s3 ')).toBe(false);
      expect(lower.includes('s3 bucket')).toBe(false);
    });

    it('não usa GCS como backend de Terraform state', () => {
      expect(html.toLowerCase()).not.toContain('gcs');
    });

    it('usa Azure Storage como backend de Terraform state', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('azure storage') || lower.includes('azure blob')).toBe(true);
    });
  });

  describe('AC3 — Identidade com Microsoft Entra ID', () => {
    it('não usa "IAM" isolado (AWS Identity)', () => {
      const lower = html.toLowerCase();
      expect(lower.includes(' iam ')).toBe(false);
    });

    it('não usa "Cognito" (AWS identity service)', () => {
      expect(html.toLowerCase()).not.toContain('cognito');
    });

    it('usa "Microsoft Entra ID" ou "Entra ID" para identidade', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('entra id') || lower.includes('microsoft entra')).toBe(true);
    });
  });

  describe('AC4 — Container registry com Azure Container Registry', () => {
    it('não usa ECR (AWS Elastic Container Registry)', () => {
      expect(html.toLowerCase()).not.toContain(' ecr');
      expect(html.toLowerCase()).not.toContain('elastic container registry');
    });

    it('não usa Artifact Registry (GCP)', () => {
      expect(html.toLowerCase()).not.toContain('artifact registry');
    });

    it('usa Azure Container Registry ou ACR', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('azure container registry') || lower.includes(' acr')).toBe(true);
    });
  });

  describe('AC5 — Narrativa 100% Azure-native', () => {
    it('não mistura terminologia de AWS em nenhuma seção', () => {
      const lower = html.toLowerCase();
      const awsTerms = ['amazon web services', 'aws lambda', 'cloudwatch', 'cloudformation', 'beanstalk'];
      awsTerms.forEach((term) => {
        expect(lower.includes(term)).toBe(false);
      });
    });

    it('não mistura terminologia de GCP em nenhuma seção', () => {
      const lower = html.toLowerCase();
      const gcpTerms = ['google cloud', 'cloud functions', 'bigquery', 'cloud spanner'];
      gcpTerms.forEach((term) => {
        expect(lower.includes(term)).toBe(false);
      });
    });

    it('a proporção de menções Azure vs outras clouds é totalmente Azure', () => {
      const lower = html.toLowerCase();
      const azureCount = (lower.match(/azure/g) || []).length;
      expect(azureCount).toBeGreaterThanOrEqual(5);
    });
  });
});
