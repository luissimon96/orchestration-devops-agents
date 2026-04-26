import { describe, it, expect } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('node_ce6e2dbda324 — Definicao da arquitetura ARO: CI/CD e GitOps', () => {
  const html = new HtmlPage().render();
  const sections = html.split(/<section/i);
  const delivSection = sections.find(s => /<h2[^>]*>[^<]*recebe[^<]*<\/h2>/i.test(s));
  const azSection = sections.find(s => /<h2[^>]*>[^<]*arquitetura azure[^<]*<\/h2>/i.test(s));
  const combined = (delivSection ?? '') + (azSection ?? '');

  it('AC1 — menciona GitHub Actions como pipeline CI/CD', () => {
    const lower = combined.toLowerCase();
    expect(lower).toMatch(/github actions/);
    expect(lower).toMatch(/terraform|apply|pipeline/);
  });

  it('AC2 — menciona Argo CD com bootstrap no cluster ARO', () => {
    const lower = combined.toLowerCase();
    expect(lower).toMatch(/argo cd|argocd/);
    expect(lower).toMatch(/bootstrap|gitops|sync/);
  });

  it('AC3 — define sync policy: auto-sync ou manual', () => {
    const lower = combined.toLowerCase();
    expect(lower).toMatch(/auto.?sync|sync policy|sincroniz|manual.*aprova/);
  });

  it('AC4 — descreve layout do repositório GitOps', () => {
    expect(combined).toMatch(/apps\/|infra\/|clusters\/|gitops.*repo|repositório.*gitops/i);
  });

  it('AC5 — menciona pelo menos 3 componentes CI/CD/GitOps', () => {
    const lower = combined.toLowerCase();
    const components = ['github actions', 'argo cd', 'argocd', 'sync', 'pipeline', 'workflow', 'repositório', 'repositorio', 'gitops'];
    const found = components.filter(c => lower.includes(c));
    expect(found.length).toBeGreaterThanOrEqual(3);
  });
});
