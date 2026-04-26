import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('RF7 — Controle de tarefas e paralelismo', () => {
  let html: string;
  let lower: string;

  beforeEach(() => {
    html = new HtmlPage().render();
    lower = html.toLowerCase();
  });

  it('AC1 — menciona agents executando em paralelo', () => {
    expect(lower).toMatch(/paralelo|simultane|concorrente/);
    expect(lower).toMatch(/agent/);
  });

  it('AC2 — menciona ownership ou responsabilidade de cada agent', () => {
    expect(lower).toMatch(/responsável|ownership|dedicado|especializ/);
  });

  it('AC3 — menciona dependência entre tarefas ou orquestração sequencial', () => {
    expect(lower).toMatch(/depend|sequencial|orquestra|coordena/);
  });

  it('AC4 — menciona consolidação ou agregação dos resultados', () => {
    expect(lower).toMatch(/consolid|agrega|integra|reúne|une os result/);
  });

  it('AC5 — governança ou controle presente (rastreabilidade, auditoria, visibilidade)', () => {
    expect(lower).toMatch(/rastreabilidade|auditoria|visibilidade|governan/);
  });
});
