import { describe, it, expect } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('node_31d8234167c9 — Copy e narrativa: Boss como orquestrador central', () => {
  const html = new HtmlPage().render();
  const lower = html.toLowerCase();

  it('AC1 — fluxo de decomposição explicado: recebe → divide → executa → consolida', () => {
    // Should explain the orchestration flow
    expect(lower).toMatch(/boss.*interpreta|boss.*decomp|boss.*divide|boss.*recebe/);
    expect(lower).toMatch(/paralelo|especialistas/);
    expect(lower).toMatch(/consolida|resultado final|artefato/);
  });

  it('AC2 — menciona paralelismo vs dependências explicitamente', () => {
    expect(lower).toMatch(/paralelo|em paralelo/);
    expect(lower).toMatch(/depend|predecessor|sequencial|aguarda/);
  });

  it('AC3 — resultado consolidado descrito como tangível', () => {
    expect(lower).toMatch(/terraform|artefato/);
    expect(lower).toMatch(/entrega|recebe|resultado/);
    expect(lower).toMatch(/terraform|github actions|argo cd|kubeconfig/);
  });

  it('AC4 — narrativa usa linguagem com Boss como sujeito', () => {
    expect(html).toMatch(/Boss (interpreta|decompõe|decomp|divide|coordena|consolida|entrega|cria|delega)/);
  });

  it('AC5 — página contém pelo menos 3 verbos de orquestração', () => {
    const verbs = ['interpreta', 'decomp', 'delega', 'coordena', 'consolida', 'divide', 'orquestra', 'agrega'];
    const found = verbs.filter(v => lower.includes(v));
    expect(found.length).toBeGreaterThanOrEqual(3);
  });
});
