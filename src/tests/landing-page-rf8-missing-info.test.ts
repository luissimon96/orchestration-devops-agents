import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('RF8 — Coleta de informações faltantes', () => {
  let html: string;
  let lower: string;

  beforeEach(() => {
    html = new HtmlPage().render();
    lower = html.toLowerCase();
  });

  it('AC1 — Boss solicita informações faltantes antes de executar', () => {
    expect(lower).toMatch(/solicita|pergunta|coleta|pede|informa/);
  });

  it('AC2 — região Azure como dado de entrada', () => {
    expect(lower).toMatch(/região|region|eastus|brazilsouth|westeurope/);
  });

  it('AC3 — naming ou convenção de nomenclatura como parâmetro', () => {
    expect(lower).toMatch(/naming|nomenclatura|nome do cluster|prefixo|convenção/);
  });

  it('AC4 — configuração de rede ou VNet como entrada', () => {
    expect(lower).toMatch(/vnet|virtual network|rede|cidr|subnet/);
  });

  it('AC5 — entradas incompletas não geram saída parcial', () => {
    expect(lower).toMatch(/completo|validado|incompleto|antes de gerar|sem saída parcial|garante|todas as informações/);
  });
});
