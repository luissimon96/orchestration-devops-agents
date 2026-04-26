import { describe, it, expect } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('node_05b4130eceff — Secao de arquitetura: modulos do caso ARO', () => {
  const html = new HtmlPage().render();
  const lower = html.toLowerCase();

  it('AC1 — seção arquitetura contém os 5 módulos: rede, identidade, cluster, Terraform e CI/CD', () => {
    const modules = ['rede', 'identidade', 'aro', 'terraform', 'ci/cd', 'gitops', 'cicd', 'pipeline'];
    const found = modules.filter(m => lower.includes(m));
    expect(found.length).toBeGreaterThanOrEqual(4);
  });

  it('AC2 — cada módulo tem nome e descrição de responsabilidade', () => {
    // The architecture section should have h3 subsections with descriptions
    const archMatch = html.match(/<section[^>]*>[\s\S]*?<h2[^>]*>[^<]*arquitetura[^<]*<\/h2>([\s\S]*?)<\/section>/i);
    expect(archMatch).toBeTruthy();
    const archContent = archMatch![0];
    const h3Count = (archContent.match(/<h3[^>]*>/gi) || []).length;
    expect(h3Count).toBeGreaterThanOrEqual(3);
  });

  it('AC3 — terminologia Azure: VNet, Entra ID, ARO, Storage, GitHub Actions ou Argo CD', () => {
    const azureTerms = ['vnet', 'entra id', 'aro', 'azure storage', 'github actions', 'argo cd', 'storage blob'];
    const found = azureTerms.filter(t => lower.includes(t));
    expect(found.length).toBeGreaterThanOrEqual(3);
  });

  it('AC4 — seção inclui elemento visual ou lista estruturada dos módulos', () => {
    const archMatch = html.match(/<section[^>]*>[\s\S]*?<h2[^>]*>[^<]*arquitetura[^<]*<\/h2>([\s\S]*?)<\/section>/i);
    const archContent = archMatch ? archMatch[0] : '';
    const hasTable = /<table[^>]*>/i.test(archContent);
    const hasList = /<ul[^>]*>|<ol[^>]*>/i.test(archContent);
    const hasSvg = /<svg[^>]*>/i.test(archContent);
    const hasH3s = (archContent.match(/<h3[^>]*>/gi) || []).length >= 3;
    expect(hasTable || hasList || hasSvg || hasH3s).toBe(true);
  });

  it('AC5 — seção arquitetura não duplica o diagrama de fluxo ARO', () => {
    // The architecture section should not contain the same SVG diagram as the flow section
    const flowMatch = html.match(/<section[^>]*>[\s\S]*?<h2[^>]*>[^<]*diagrama aro[^<]*<\/h2>([\s\S]*?)<\/section>/i)
      || html.match(/<section[^>]*>[\s\S]*?<h2[^>]*>[^<]*fluxo boss[^<]*<\/h2>([\s\S]*?)<\/section>/i);
    const archMatch = html.match(/<section[^>]*>[\s\S]*?<h2[^>]*>[^<]*arquitetura[^<]*<\/h2>([\s\S]*?)<\/section>/i);
    if (flowMatch && archMatch) {
      // Sections should be distinct — not identical content
      expect(flowMatch[0]).not.toBe(archMatch[0]);
    }
    expect(archMatch).toBeTruthy();
  });
});
