import { describe, it, expect } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('node_94d0b25bb1ce — Definicao da arquitetura ARO: cluster e ingresso', () => {
  const html = new HtmlPage().render();
  const sections = html.split(/<section/i);
  const azSection = sections.find(s => /<h2[^>]*>[^<]*arquitetura azure[^<]*<\/h2>/i.test(s));

  it('AC1 — seção menciona ARO cluster com SKU de node', () => {
    expect(azSection).toBeDefined();
    const lower = azSection!.toLowerCase();
    expect(lower).toMatch(/aro|openshift/);
    expect(lower).toMatch(/standard_d|d4s|d8s|vm|node size|tamanho/);
  });

  it('AC2 — seção menciona node pools: master e worker com quantidade', () => {
    expect(azSection).toBeDefined();
    const lower = azSection!.toLowerCase();
    expect(lower).toMatch(/master|control.?plane/);
    expect(lower).toMatch(/worker/);
    expect(lower).toMatch(/3/);
  });

  it('AC3 — seção menciona Application Gateway ou Load Balancer para ingresso', () => {
    expect(azSection).toBeDefined();
    const lower = azSection!.toLowerCase();
    expect(lower).toMatch(/application gateway|load balancer|ingresso|ingress/);
  });

  it('AC4 — seção menciona TLS e certificados', () => {
    expect(azSection).toBeDefined();
    const lower = azSection!.toLowerCase();
    expect(lower).toMatch(/tls|certificado|certificate|https/);
  });

  it('AC5 — seção menciona pelo menos 3 componentes de cluster', () => {
    expect(azSection).toBeDefined();
    const lower = azSection!.toLowerCase();
    const components = ['aro', 'node pool', 'load balancer', 'application gateway', 'tls', 'worker', 'master'];
    const found = components.filter(c => lower.includes(c));
    expect(found.length).toBeGreaterThanOrEqual(3);
  });
});
