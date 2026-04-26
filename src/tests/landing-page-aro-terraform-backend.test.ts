import { describe, it, expect } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('node_364e8c5859f2 — Definicao da arquitetura ARO: Terraform e backend', () => {
  const html = new HtmlPage().render();
  const sections = html.split(/<section/i);
  // Check both deliverables section and architecture section
  const delivSection = sections.find(s => /<h2[^>]*>[^<]*recebe[^<]*<\/h2>/i.test(s));
  const azSection = sections.find(s => /<h2[^>]*>[^<]*arquitetura azure[^<]*<\/h2>/i.test(s));

  it('AC1 — menciona módulos Terraform: rede, identidade, cluster ARO', () => {
    const combined = (delivSection ?? '') + (azSection ?? '');
    const lower = combined.toLowerCase();
    expect(lower).toMatch(/terraform/);
    expect(lower).toMatch(/módulo|modulo|module/);
    expect(lower).toMatch(/rede|network/);
    expect(lower).toMatch(/identidade|identity/);
    expect(lower).toMatch(/aro|cluster/);
  });

  it('AC2 — menciona backend Terraform em Azure Storage Blob com lease locking', () => {
    const combined = (delivSection ?? '') + (azSection ?? '');
    const lower = combined.toLowerCase();
    expect(lower).toMatch(/backend|azure storage|blob/);
    expect(lower).toMatch(/lock|locking|lease/);
  });

  it('AC3 — menciona variáveis de entrada principais', () => {
    const combined = (delivSection ?? '') + (azSection ?? '');
    expect(combined).toMatch(/subscription_id|resource_group|location|cluster_name/);
  });

  it('AC4 — menciona outputs Terraform para CI/CD', () => {
    const combined = (delivSection ?? '') + (azSection ?? '');
    const lower = combined.toLowerCase();
    expect(lower).toMatch(/output|kubeconfig|endpoint|acr/);
  });

  it('AC5 — menciona pelo menos 3 artefatos Terraform', () => {
    const combined = (delivSection ?? '') + (azSection ?? '');
    const lower = combined.toLowerCase();
    const artifacts = ['módulo', 'modulo', 'module', 'state', 'backend', 'variável', 'variavel', 'variable', 'output'];
    const found = artifacts.filter(a => lower.includes(a));
    expect(found.length).toBeGreaterThanOrEqual(3);
  });
});
