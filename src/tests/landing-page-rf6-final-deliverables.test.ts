import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('RF6 — Entregáveis finais claros', () => {
  let html: string;
  let lower: string;

  beforeEach(() => {
    html = new HtmlPage().render();
    lower = html.toLowerCase();
  });

  // Helper: find the deliverables section by its h2 heading
  const getDelivSection = (h: string) =>
    h.match(/<section[^>]*>([\s\S]*?)<\/section>/gi)
     ?.find(s => /<h2[^>]*>[^<]*recebe[^<]*<\/h2>/i.test(s));

  it('AC1 — Terraform listado explicitamente como entregável', () => {
    const delivSection = getDelivSection(html);
    expect(delivSection).toBeTruthy();
    expect(delivSection!.toLowerCase()).toContain('terraform');
  });

  it('AC2 — Pipeline CI/CD (GitHub Actions) listado', () => {
    const delivSection = getDelivSection(html);
    expect(delivSection).toBeTruthy();
    expect(delivSection!.toLowerCase()).toMatch(/github actions|ci\/cd|pipeline/);
  });

  it('AC3 — GitOps (Argo CD) listado', () => {
    const delivSection = getDelivSection(html);
    expect(delivSection).toBeTruthy();
    expect(delivSection!.toLowerCase()).toMatch(/argo|gitops/);
  });

  it('AC4 — Documentação/sumário técnico listado como entregável', () => {
    const delivSection = getDelivSection(html);
    expect(delivSection).toBeTruthy();
    expect(delivSection!.toLowerCase()).toMatch(/documentação|readme|sumário|técnico/);
  });

  it('AC5 — Nomes de arquivo concretos (.tf, .yml, .yaml) presentes', () => {
    const delivSection = getDelivSection(html);
    expect(delivSection).toBeTruthy();
    expect(delivSection!).toMatch(/\.tf|\.yml|\.yaml/);
  });
});
