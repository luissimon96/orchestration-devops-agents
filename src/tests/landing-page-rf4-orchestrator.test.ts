import { describe, it, expect, beforeAll } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('RF4 — Explicacao do Boss como orquestrador', () => {
  let html: string;
  let lower: string;

  beforeAll(() => {
    html = new HtmlPage().render();
    lower = html.toLowerCase();
  });

  it('AC1 — página contém "decompõe" ou "interpreta" descrevendo como Boss processa pedidos', () => {
    const hasDecompose = lower.includes('decomp');
    const hasInterpret = lower.includes('interpreta');
    expect(hasDecompose || hasInterpret).toBe(true);
  });

  it('AC2 — "subagent" ou "agents especialistas" aparece no contexto de criação pelo Boss', () => {
    const hasSubagent = lower.includes('subagent');
    const hasAgentEspecialista = lower.includes('agent') && (lower.includes('especialista') || lower.includes('especializado'));
    expect(hasSubagent || hasAgentEspecialista).toBe(true);
  });

  it('AC3 — "paralelo" aparece próximo a "controle" ou "dependência" (± 300 chars)', () => {
    const paraIdx = lower.indexOf('paralelo');
    expect(paraIdx).toBeGreaterThanOrEqual(0);
    const window = lower.substring(Math.max(0, paraIdx - 300), paraIdx + 300);
    const hasControl = window.includes('controle') || window.includes('depend') || window.includes('simultane');
    expect(hasControl).toBe(true);
  });

  it('AC4 — "consolida" ou "resultado final" descreve o output do Boss', () => {
    const hasConsolida = lower.includes('consolida');
    const hasResultadoFinal = lower.includes('resultado final');
    expect(hasConsolida || hasResultadoFinal).toBe(true);
  });

  it('AC5 — pelo menos 4 dos 5 termos-chave estão presentes', () => {
    const terms = [
      lower.includes('decomp') || lower.includes('interpreta'),
      lower.includes('subagent') || lower.includes('agent'),
      lower.includes('paralelo'),
      lower.includes('depend'),
      lower.includes('consolida') || lower.includes('resultado final'),
    ];
    const count = terms.filter(Boolean).length;
    expect(count).toBeGreaterThanOrEqual(4);
  });
});
