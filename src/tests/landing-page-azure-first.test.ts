import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('C2 — Azure-first: MVP inteiramente Azure', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — Exemplos de infra usam somente Azure', () => {
    it('não menciona serviços AWS de infra (EKS, VPC, Route53, ELB)', () => {
      const lower = html.toLowerCase();
      ['eks', 'vpc', 'route53', 'elb', 'amazon'].forEach((term) => {
        expect(lower.includes(term)).toBe(false);
      });
    });

    it('não menciona serviços GCP de infra (GKE, Cloud Run, Pub/Sub)', () => {
      const lower = html.toLowerCase();
      ['gke', 'cloud run', 'pub/sub', 'bigquery', 'google cloud'].forEach((term) => {
        expect(lower.includes(term)).toBe(false);
      });
    });

    it('usa serviços Azure como exemplos de networking, Kubernetes e identidade', () => {
      const lower = html.toLowerCase();
      const azureServices = ['virtual network', 'azure red hat openshift', 'microsoft entra id'];
      azureServices.forEach((svc) => {
        expect(lower.includes(svc)).toBe(true);
      });
    });
  });

  describe('AC2 — Primeira menção de cloud é Azure', () => {
    it('a primeira ocorrência de "cloud" ou nome de provedor deve ser Azure', () => {
      const lower = html.toLowerCase();
      const azureIdx = lower.indexOf('azure');
      const awsIdx = lower.indexOf('aws');
      const gcpIdx = lower.indexOf('gcp');
      // Azure must appear; competitors must not appear before it (or at all)
      expect(azureIdx).toBeGreaterThanOrEqual(0);
      if (awsIdx !== -1) expect(azureIdx).toBeLessThan(awsIdx);
      if (gcpIdx !== -1) expect(azureIdx).toBeLessThan(gcpIdx);
    });
  });

  describe('AC3 — Título e headline incluem Azure', () => {
    it('a headline do hero inclui "Azure"', () => {
      expect(page.getHeroHeadline()).toContain('Azure');
    });

    it('o <title> da página inclui "Azure"', () => {
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      expect(titleMatch).toBeTruthy();
      expect(titleMatch![1].toLowerCase()).toContain('azure');
    });
  });

  describe('AC4 — Sem referências a clouds concorrentes', () => {
    it('não contém links ou menções a Oracle Cloud', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('oracle cloud')).toBe(false);
      expect(lower.includes('oci')).toBe(false);
    });

    it('não contém referências a IBM Cloud ou outros provedores', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('ibm cloud')).toBe(false);
      expect(lower.includes('digitalocean')).toBe(false);
    });
  });

  describe('AC5 — Kubernetes, rede e identidade com terminologia Azure', () => {
    it('usa "Azure Red Hat OpenShift" ou "ARO" para Kubernetes, não EKS/GKE', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('openshift') || lower.includes('aro')).toBe(true);
    });

    it('usa "Virtual Network" para networking, não VPC', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('virtual network')).toBe(true);
      expect(lower.includes(' vpc ')).toBe(false);
    });

    it('usa "Microsoft Entra ID" para identidade, não IAM/Cognito', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('entra id') || lower.includes('microsoft entra')).toBe(true);
      expect(lower.includes(' iam ')).toBe(false);
      expect(lower.includes('cognito')).toBe(false);
    });
  });
});
