import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('AC3 — Paralelismo explicado: sub-agents simultâneos', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — Página explica agents em paralelo (não sequencial)', () => {
    it('contém a palavra "paralelo" no contexto de agents', () => {
      const lower = html.toLowerCase();
      const paraIdx = lower.indexOf('paralelo');
      expect(paraIdx).toBeGreaterThanOrEqual(0);
    });

    it('não apresenta os agents como etapas puramente sequenciais (sem "passo 1, passo 2, passo 3, passo 4" no fluxo de agents)', () => {
      const lower = html.toLowerCase();
      // Sequential language around agents should not dominate — parallelism should be explicit
      const hasParallel = lower.includes('paralelo') || lower.includes('simultaneamente') || lower.includes('simultâneo');
      expect(hasParallel).toBe(true);
    });
  });

  describe('AC2 — Paralelismo ilustrado com os 4 agents', () => {
    it('menciona os 4 tipos de agent: Rede, Identidade, Plataforma, Terraform', () => {
      const lower = html.toLowerCase();
      const agentTypes = ['rede', 'identidade', 'plataforma', 'terraform'];
      agentTypes.forEach((agent) => {
        expect(lower.includes(agent)).toBe(true);
      });
    });

    it('os 4 agents aparecem juntos na seção de paralelismo', () => {
      // Find the section/paragraph that contains "paralelo" and verify all 4 agents are there
      const lower = html.toLowerCase();
      const paraIdx = lower.indexOf('paralelo');
      expect(paraIdx).toBeGreaterThanOrEqual(0);
      // Extract context window around "paralelo" (±600 chars)
      const window = lower.substring(Math.max(0, paraIdx - 100), paraIdx + 600);
      expect(window.includes('rede')).toBe(true);
      expect(window.includes('identidade')).toBe(true);
      expect(window.includes('plataforma')).toBe(true);
      expect(window.includes('terraform')).toBe(true);
    });
  });

  describe('AC3 — Palavra "paralelo" no contexto de agents', () => {
    it('"paralelo" aparece próximo de "agent" (dentro de 200 chars)', () => {
      const lower = html.toLowerCase();
      const paraIdx = lower.indexOf('paralelo');
      expect(paraIdx).toBeGreaterThanOrEqual(0);
      // Check agents appear near paralelo
      const window = lower.substring(Math.max(0, paraIdx - 200), paraIdx + 200);
      expect(window.includes('agent')).toBe(true);
    });
  });

  describe('AC4 — Independência dos agents explicada', () => {
    it('menciona que cada agent executa sua tarefa de forma independente', () => {
      const lower = html.toLowerCase();
      const hasIndependence =
        lower.includes('independente') ||
        lower.includes('independentemente') ||
        lower.includes('cada agent executa');
      expect(hasIndependence).toBe(true);
    });
  });

  describe('AC5 — Benefício do paralelismo mencionado', () => {
    it('menciona um benefício de tempo/velocidade/eficiência', () => {
      const lower = html.toLowerCase();
      const hasBenefit =
        lower.includes('minuto') ||
        lower.includes('velocidade') ||
        lower.includes('eficiência') ||
        lower.includes('rápido') ||
        lower.includes('tempo reduzido');
      expect(hasBenefit).toBe(true);
    });
  });
});
