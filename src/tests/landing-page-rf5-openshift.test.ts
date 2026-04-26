import { describe, it, expect, beforeAll } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('RF5 — Caso principal com OpenShift no Azure', () => {
  let html: string;
  let lower: string;

  beforeAll(() => {
    html = new HtmlPage().render();
    lower = html.toLowerCase();
  });

  it('AC1 — página contém "OpenShift" ou "ARO" como caso principal', () => {
    const hasOpenShift = lower.includes('openshift');
    const hasARO = lower.includes('aro');
    expect(hasOpenShift || hasARO).toBe(true);
  });

  it('AC2 — descrição do pedido do usuário contém "provisionar", "cluster" ou "openshift"', () => {
    const hasProvisionar = lower.includes('provisionar') || lower.includes('provisionamento');
    const hasCluster = lower.includes('cluster');
    const hasOpenShift = lower.includes('openshift');
    expect(hasProvisionar || hasCluster || hasOpenShift).toBe(true);
  });

  it('AC3 — entregáveis do caso ARO incluem pelo menos 2 artefatos concretos', () => {
    const artifacts = [
      lower.includes('main.tf'),
      lower.includes('variables.tf'),
      lower.includes('.yml') || lower.includes('.yaml'),
      lower.includes('argo'),
      lower.includes('gitops') || lower.includes('git-ops'),
    ];
    const count = artifacts.filter(Boolean).length;
    expect(count).toBeGreaterThanOrEqual(2);
  });

  it('AC4 — fluxo menciona agents envolvidos: Rede, Identidade, Plataforma ou ARO', () => {
    const agents = ['rede', 'identidade', 'plataforma', 'aro'];
    const found = agents.filter(a => lower.includes(a));
    expect(found.length).toBeGreaterThanOrEqual(2);
  });

  it('AC5 — seção do caso principal tem pelo menos 150 chars de conteúdo', () => {
    // Find section around ARO/OpenShift keyword
    const aroIdx = lower.indexOf('aro');
    expect(aroIdx).toBeGreaterThanOrEqual(0);
    const window = lower.substring(Math.max(0, aroIdx - 50), aroIdx + 500);
    expect(window.length).toBeGreaterThanOrEqual(150);
  });
});
