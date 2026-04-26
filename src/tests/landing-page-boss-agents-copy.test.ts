import { describe, it, expect } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('node_e92f991b19e7 — Copy: Especialistas e agents do Boss', () => {
  const html = new HtmlPage().render();
  const lower = html.toLowerCase();

  it('AC1 — lista pelo menos 4 agents especialistas nomeados', () => {
    const agentNames = [
      /agent.*rede|agent.*network|rede.*agent|network.*agent/,
      /agent.*identidade|agent.*identity|identidade.*agent/,
      /agent.*plataforma|agent.*openshift|agent.*aro|plataforma.*agent/,
      /agent.*terraform|terraform.*agent/,
      /agent.*ci\/cd|agent.*cicd|agent.*pipeline/,
    ];
    const found = agentNames.filter(r => r.test(lower));
    expect(found.length).toBeGreaterThanOrEqual(4);
  });

  it('AC2 — cada agent tem responsabilidade única', () => {
    // Rede covers VNet/subnets, Identidade covers Entra ID/RBAC, Plataforma covers ARO/ACR
    expect(lower).toMatch(/vnet|subnet/);
    expect(lower).toMatch(/entra id|rbac/);
    expect(lower).toMatch(/aro|openshift/);
  });

  it('AC3 — sem gaps: rede, identidade, cluster e IaC cobertos', () => {
    expect(lower).toMatch(/rede|network/);
    expect(lower).toMatch(/identidade|identity/);
    expect(lower).toMatch(/cluster|openshift|aro/);
    expect(lower).toMatch(/terraform|iac|infraestrutura como c/);
  });

  it('AC4 — agents apresentados como subagents do Boss', () => {
    // Should describe agents as subordinates to Boss
    expect(lower).toMatch(/sub.?agent|subagent|boss.*agent|agent.*boss|especialista/);
  });

  it('AC5 — seção usa termos Azure específicos', () => {
    const azureTerms = ['vnet', 'entra id', 'aro', 'openshift', 'terraform', 'azure'];
    const found = azureTerms.filter(t => lower.includes(t));
    expect(found.length).toBeGreaterThanOrEqual(3);
  });
});
