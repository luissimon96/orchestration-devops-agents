import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('Diagrama e fluxo visual do caso ARO', () => {
  let html: string;
  let lower: string;

  beforeEach(() => {
    html = new HtmlPage().render();
    lower = html.toLowerCase();
  });

  it('AC1 — página exibe elemento de diagrama visual (SVG, figure, pre ou div com role diagram)', () => {
    expect(html).toMatch(/<svg|<figure|<pre[^>]*class="[^"]*diagram|<div[^>]*class="[^"]*diagram/i);
  });

  it('AC2 — pedido inicial do usuário é o ponto de entrada do diagrama', () => {
    // The diagram/flow section mentions the user request as input
    const diagramSection = html.match(/<section[^>]*>([\s\S]*?)<\/section>/gi)
      ?.find(s => /diagrama|fluxo|como funciona/i.test(s));
    expect(diagramSection).toBeTruthy();
    expect(diagramSection!.toLowerCase()).toMatch(/pedido|usu[aá]rio|entrada|input/);
  });

  it('AC3 — fluxo paralelo com mínimo 3 agents especializados visíveis', () => {
    const diagramSection = html.match(/<section[^>]*>([\s\S]*?)<\/section>/gi)
      ?.find(s => /diagrama|fluxo|como funciona/i.test(s));
    expect(diagramSection).toBeTruthy();
    // Must show at least 3 distinct agent labels
    const agentMatches = diagramSection!.match(/agent[\w\s-]*(rede|identidade|plataforma|terraform|network|infra|security)/gi) ?? [];
    expect(agentMatches.length).toBeGreaterThanOrEqual(3);
  });

  it('AC4 — consolidação final dos artefatos representada como saída', () => {
    const diagramSection = html.match(/<section[^>]*>([\s\S]*?)<\/section>/gi)
      ?.find(s => /diagrama|fluxo|como funciona/i.test(s));
    expect(diagramSection).toBeTruthy();
    expect(diagramSection!.toLowerCase()).toMatch(/consolid|sa[íi]da|output|artefatos|entrega final/);
  });

  it('AC5 — componentes Azure (ARO, VNet, Entra ID, ACR) no diagrama ou legenda', () => {
    const diagramSection = html.match(/<section[^>]*>([\s\S]*?)<\/section>/gi)
      ?.find(s => /diagrama|fluxo|como funciona/i.test(s));
    expect(diagramSection).toBeTruthy();
    const content = diagramSection!.toLowerCase();
    const azureComponents = ['aro', 'vnet', 'entra', 'acr'].filter(c => content.includes(c));
    expect(azureComponents.length).toBeGreaterThanOrEqual(3);
  });
});
