import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('RF2 — Estrutura de página orientada a conversão', () => {
  let html: string;
  let lower: string;

  beforeEach(() => {
    html = new HtmlPage().render();
    lower = html.toLowerCase();
  });

  it('AC1 — hero section com h1', () => {
    expect(html).toMatch(/<h1>/i);
  });

  it('AC2 — seção de prova de valor / por que (benefícios)', () => {
    // "Por que Boss" or similar value proposition section
    expect(lower).toMatch(/por que|benefício|vantage|valor/);
  });

  it('AC3 — seção de arquitetura com componentes Azure', () => {
    // Architecture section with Azure services
    expect(lower).toMatch(/arquitetura|vnet|entra|aro|aks/);
  });

  it('AC4 — seção de entregáveis com artefatos nomeados', () => {
    // Named deliverables like .tf, .yml files
    expect(html).toMatch(/\.tf|\.yml|\.yaml/);
  });

  it('AC5 — seção de autoridade com credenciais', () => {
    // Authority section with certs or experience
    expect(lower).toMatch(/az-\d{3}|cka|certif|anos de|experi/);
  });

  it('AC6 — seção de FAQ com perguntas', () => {
    expect(lower).toMatch(/faq|perguntas frequentes|dúvidas/);
    // Must have dt or h3 as question containers
    expect(html).toMatch(/<dt>|<h3>/i);
  });

  it('AC7 — CTA com botão ou link de ação', () => {
    expect(html).toMatch(/<a\s[^>]*href[^>]*>|<button/i);
  });
});
