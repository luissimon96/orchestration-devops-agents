import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

/**
 * RNF2 — Credibilidade Técnica Test Suite
 *
 * Validates that the landing page uses correct and consistent Azure,
 * Terraform, OpenShift and DevOps terminology throughout.
 */

describe('RNF2 — Credibilidade Técnica: Technical Terminology', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render().toLowerCase();
  });

  describe('AC1: Azure service names are correct', () => {
    it('should contain the correct Azure OpenShift service name', () => {
      const hasARO = html.includes('azure red hat openshift') || html.includes('aro');
      expect(hasARO).toBe(true);
    });

    it('should reference at least 3 distinct Azure services', () => {
      const azureServices = [
        'azure red hat openshift',
        'virtual network',
        'microsoft entra',
        'azure key vault',
        'azure container registry',
        'azure storage',
        'azure monitor',
        'azure application gateway',
      ];
      const found = azureServices.filter(svc => html.includes(svc));
      expect(found.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('AC2: No AWS terms appear anywhere in the page', () => {
    const awsTerms = ['eks', ' s3 ', ' ec2 ', ' iam ', 'cloudwatch', ' alb ', 'amazon web services'];

    awsTerms.forEach(term => {
      it(`should NOT contain AWS term: "${term.trim()}"`, () => {
        expect(html).not.toContain(term);
      });
    });

    it('should NOT contain the "aws" acronym', () => {
      expect(html).not.toMatch(/\baws\b/);
    });
  });

  describe('AC3: Terraform referenced with concrete concepts', () => {
    it('should mention terraform', () => {
      expect(html).toContain('terraform');
    });

    it('should reference at least one Terraform concept (init, plan, apply, state, backend, modules)', () => {
      const terraformConcepts = ['terraform init', 'terraform plan', 'terraform apply', 'terraform state', 'terraform backend', 'terraform modules', 'state backend', 'tfstate'];
      const found = terraformConcepts.some(concept => html.includes(concept));
      expect(found).toBe(true);
    });

    it('should mention what Terraform delivers (modules or configuration)', () => {
      const deliverables = ['terraform modules', 'terraform configuration', 'terraform code', 'terraform files', 'terraform templates'];
      const found = deliverables.some(d => html.includes(d));
      expect(found).toBe(true);
    });
  });

  describe('AC4: OpenShift referenced with Azure platform name', () => {
    it('should use Azure-specific OpenShift name, not just generic "openshift"', () => {
      const hasAzureOpenShift =
        html.includes('azure red hat openshift') ||
        html.includes('aro ') ||
        html.includes('(aro)');
      expect(hasAzureOpenShift).toBe(true);
    });

    it('should NOT reference generic "kubernetes" without Azure context nearby', () => {
      if (html.includes('kubernetes')) {
        const idx = html.indexOf('kubernetes');
        const surrounding = html.slice(Math.max(0, idx - 80), idx + 80);
        const hasAzureContext =
          surrounding.includes('azure') ||
          surrounding.includes('aro') ||
          surrounding.includes('openshift');
        expect(hasAzureContext).toBe(true);
      }
    });
  });

  describe('AC5: DevOps mentioned with correct related terms', () => {
    it('should mention DevOps', () => {
      expect(html).toContain('devops');
    });

    it('should pair DevOps with at least one of: CI/CD, pipeline, GitOps, IaC, automation', () => {
      const pairTerms = ['ci/cd', 'pipeline', 'gitops', 'iac', 'infraestrutura como código', 'automação', 'automacao'];
      const found = pairTerms.some(term => html.includes(term));
      expect(found).toBe(true);
    });

    it('should mention GitOps or CI/CD as part of the deliverable', () => {
      const hasGitOpsOrCICD = html.includes('gitops') || html.includes('ci/cd') || html.includes('github actions');
      expect(hasGitOpsOrCICD).toBe(true);
    });
  });

  describe('Integration: Full terminology consistency check', () => {
    it('should pass all 5 credibility criteria simultaneously', () => {
      const criteria = {
        hasAROName: html.includes('azure red hat openshift') || html.includes('aro'),
        noAWSTerms: !html.match(/\baws\b/) && !html.includes('eks') && !html.includes('cloudwatch'),
        hasTerraform: html.includes('terraform'),
        hasDevOps: html.includes('devops'),
        hasDeliverable: html.includes('gitops') || html.includes('ci/cd') || html.includes('pipeline'),
      };

      const failures = Object.entries(criteria)
        .filter(([, v]) => !v)
        .map(([k]) => k);

      expect(failures).toHaveLength(0);
    });
  });
});
