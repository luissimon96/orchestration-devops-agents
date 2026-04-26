import { describe, it, expect } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('node_aa73bf674934 — Definicao da arquitetura ARO: rede e identidade', () => {
  const html = new HtmlPage().render();
  const sections = html.split(/<section/i);
  const netSection = sections.find(s => /<h2[^>]*>[^<]*(rede|arquitetura azure)[^<]*<\/h2>/i.test(s));

  it('AC1 — seção de rede lista VNet e subnets com ranges CIDR', () => {
    expect(netSection).toBeDefined();
    const lower = netSection!.toLowerCase();
    expect(lower).toMatch(/vnet/);
    expect(lower).toMatch(/subnet/);
    expect(lower).toMatch(/10\.\d+\.\d+\.\d+\/\d+/);
  });

  it('AC2 — seção menciona NSG com regras para ARO', () => {
    expect(netSection).toBeDefined();
    const lower = netSection!.toLowerCase();
    expect(lower).toMatch(/nsg/);
    expect(lower).toMatch(/aro/);
  });

  it('AC3 — seção menciona Managed Identity e Entra ID', () => {
    expect(netSection).toBeDefined();
    const lower = netSection!.toLowerCase();
    expect(lower).toMatch(/managed identity|identidade gerenciada/);
    expect(lower).toMatch(/entra id/);
  });

  it('AC4 — seção menciona roles RBAC: Contributor, Network Contributor ou AcrPull', () => {
    expect(netSection).toBeDefined();
    expect(netSection).toMatch(/Contributor|AcrPull/);
  });

  it('AC5 — seção menciona pelo menos 3 componentes Azure de rede/identidade', () => {
    expect(netSection).toBeDefined();
    const lower = netSection!.toLowerCase();
    const components = ['vnet', 'subnet', 'nsg', 'entra id', 'managed identity'];
    const found = components.filter(c => lower.includes(c));
    expect(found.length).toBeGreaterThanOrEqual(3);
  });
});
