import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('Copy: Tradução Azure (AWS → Azure)', () => {
  let page: HtmlPage;
  let html: string;
  let lower: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
    lower = html.toLowerCase();
  });

  describe('AC1 — VPC → VNet', () => {
    it('não menciona VPC (AWS Virtual Private Cloud)', () => {
      // Match " vpc" or "vpc " but not "devops" which contains "ops" not vpc
      expect(lower).not.toMatch(/\bvpc\b/);
    });

    it('usa Virtual Network ou VNet para rede', () => {
      expect(lower.includes('virtual network') || lower.includes('vnet')).toBe(true);
    });
  });

  describe('AC2 — EKS → ARO/AKS', () => {
    it('não menciona EKS (AWS Elastic Kubernetes Service)', () => {
      expect(lower).not.toMatch(/\beks\b/);
    });

    it('usa Azure Red Hat OpenShift ou AKS para Kubernetes', () => {
      expect(
        lower.includes('azure red hat openshift') ||
        lower.includes('openshift') ||
        lower.includes('aks')
      ).toBe(true);
    });
  });

  describe('AC3 — IAM → Entra ID + RBAC', () => {
    it('não usa IAM isolado como serviço de identidade', () => {
      // " iam " or "iam," — isolated IAM references, not "claim" or "diagram"
      expect(lower).not.toMatch(/\biam\b/);
    });

    it('usa Microsoft Entra ID para identidade', () => {
      expect(lower.includes('entra id') || lower.includes('microsoft entra')).toBe(true);
    });
  });

  describe('AC4 — S3 → Azure Storage', () => {
    it('não menciona S3 (AWS Simple Storage Service)', () => {
      expect(lower).not.toMatch(/\bs3\b/);
    });

    it('usa Azure Storage ou Azure Blob para armazenamento', () => {
      expect(lower.includes('azure storage') || lower.includes('azure blob')).toBe(true);
    });
  });

  describe('AC5 — ALB/ELB → Application Gateway', () => {
    it('não menciona ALB (AWS Application Load Balancer)', () => {
      expect(lower).not.toMatch(/\balb\b/);
    });

    it('não menciona ELB (AWS Elastic Load Balancer)', () => {
      expect(lower).not.toMatch(/\belb\b/);
    });
  });
});
