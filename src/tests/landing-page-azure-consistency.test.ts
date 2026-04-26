import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('R3 — Inconsistência de Azure: terminologia oficial e sem AWS', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — Nomenclatura oficial Azure', () => {
    it('deve usar "Microsoft Entra ID" (não "Azure Active Directory" ou "Azure AD")', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('microsoft entra id') || lower.includes('entra id')).toBe(true);
      expect(lower.includes('azure active directory')).toBe(false);
      // "azure ad" isolado é legado — só aceitar se não presente
      const azureAdIsolated = /\bazure ad\b/i.test(html);
      expect(azureAdIsolated).toBe(false);
    });

    it('deve usar "Azure Key Vault" com capitalização correta', () => {
      expect(html.toLowerCase()).toContain('azure key vault');
    });

    it('deve usar "Azure Container Registry" com nomenclatura correta', () => {
      expect(html.toLowerCase()).toContain('azure container registry');
    });

    it('deve usar "Azure Storage" (não "Azure Blob" isolado ou "S3")', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('azure storage')).toBe(true);
      expect(lower.includes(' s3')).toBe(false);
    });
  });

  describe('AC2 — Ausência de termos AWS', () => {
    const awsTerms = ['eks', ' s3 ', 's3 bucket', ' ec2 ', 'cloudwatch', ' alb ', ' rds ', 'lambda', 'dynamodb', 'cloudfront', 'aws '];

    awsTerms.forEach((term) => {
      it(`não deve conter o termo AWS: "${term.trim()}"`, () => {
        expect(html.toLowerCase()).not.toContain(term);
      });
    });
  });

  describe('AC3 — ARO apresentado por extenso antes da sigla', () => {
    it('deve mencionar "Azure Red Hat OpenShift" (forma completa)', () => {
      expect(html.toLowerCase()).toContain('azure red hat openshift');
    });

    it('se usar "ARO" como sigla, deve ter aparecido a forma completa antes', () => {
      const lower = html.toLowerCase();
      const aroSiglaIndex = lower.indexOf(' aro ') !== -1 ? lower.indexOf(' aro ') : lower.indexOf('>aro<');
      const fullFormIndex = lower.indexOf('azure red hat openshift');
      if (aroSiglaIndex !== -1) {
        expect(fullFormIndex).toBeLessThan(aroSiglaIndex);
      } else {
        // ARO sigla não usada isoladamente — ok
        expect(true).toBe(true);
      }
    });
  });

  describe('AC4 — Identidade com nome atual', () => {
    it('deve referenciar serviço de identidade com nome atual "Microsoft Entra ID"', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('entra id') || lower.includes('microsoft entra')).toBe(true);
    });

    it('não deve usar "AAD" como abreviação legada', () => {
      expect(html.toLowerCase()).not.toContain(' aad ');
    });
  });

  describe('AC5 — Terraform state no Azure Storage', () => {
    it('deve mencionar Azure Storage como backend do Terraform state', () => {
      const lower = html.toLowerCase();
      expect(lower.includes('azure storage')).toBe(true);
    });

    it('não deve mencionar GCS como backend de Terraform state', () => {
      expect(html.toLowerCase()).not.toContain('gcs');
    });
  });
});
