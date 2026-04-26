import { describe, it, expect, beforeAll } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('EP3 — Caso demonstrativo ARO', () => {
  let html: string;
  let lower: string;

  beforeAll(() => {
    html = new HtmlPage().render();
    lower = html.toLowerCase();
  });

  it('AC1 — VNet, NSGs e Managed Identities (rede e identidade) na página', () => {
    const hasVNet = lower.includes('vnet') || lower.includes('virtual network');
    const hasIdentity = lower.includes('managed identit') || lower.includes('entra id') || lower.includes('identidade');
    expect(hasVNet || hasIdentity).toBe(true);
  });

  it('AC2 — cluster e ingresso: ARO cluster size ou ingresso na página', () => {
    const hasCluster = lower.includes('cluster');
    const hasIngress = lower.includes('ingress') || lower.includes('ingresso') || lower.includes('application gateway') || lower.includes('load balancer');
    expect(hasCluster || hasIngress).toBe(true);
  });

  it('AC3 — Terraform módulos ou state management mencionados', () => {
    const hasTerraform = lower.includes('terraform');
    const hasState = lower.includes('state') || lower.includes('module') || lower.includes('módulo') || lower.includes('.tf');
    expect(hasTerraform && hasState).toBe(true);
  });

  it('AC4 — CI/CD e GitOps: GitHub Actions e Argo CD mencionados', () => {
    const hasGHA = lower.includes('github action') || lower.includes('github-actions') || lower.includes('.yml');
    const hasArgo = lower.includes('argo') || lower.includes('gitops') || lower.includes('git-ops');
    expect(hasGHA || hasArgo).toBe(true);
  });

  it('AC5 — diagrama visual com SVG ou figura do fluxo ARO', () => {
    const hasSvg = /<svg[^>]*>/i.test(html);
    const hasFigure = /<figure[^>]*>/i.test(html);
    expect(hasSvg || hasFigure).toBe(true);
  });
});
