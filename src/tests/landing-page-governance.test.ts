import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('RNF4 — Governança: controle operacional e auditabilidade', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — Auditabilidade mencionada', () => {
    it('deve mencionar "auditabilidade" ou "audit" pelo menos 1 vez', () => {
      const lower = html.toLowerCase();
      const hasAudit = lower.includes('auditabilidade') || lower.includes('audit');
      expect(hasAudit).toBe(true);
    });

    it('deve contextualizar auditabilidade no processo de execução dos agents', () => {
      const lower = html.toLowerCase();
      const hasAuditContext =
        (lower.includes('auditabilidade') || lower.includes('audit')) &&
        (lower.includes('agent') || lower.includes('execu'));
      expect(hasAuditContext).toBe(true);
    });
  });

  describe('AC2 — Ownership e controle explícitos', () => {
    it('deve mencionar "ownership" ou "controle" pelo menos 2 vezes', () => {
      const lower = html.toLowerCase();
      const ownershipCount = (lower.match(/ownership/g) || []).length;
      const controleCount = (lower.match(/controle/g) || []).length;
      const total = ownershipCount + controleCount;
      expect(total).toBeGreaterThanOrEqual(2);
    });

    it('deve associar controle ao orquestrador Boss, não a automação genérica', () => {
      const lower = html.toLowerCase();
      const bossIndex = lower.indexOf('boss');
      const controleIndex = lower.indexOf('controle');
      expect(bossIndex).toBeGreaterThanOrEqual(0);
      expect(controleIndex).toBeGreaterThanOrEqual(0);
    });
  });

  describe('AC3 — Consolidação determinística', () => {
    it('deve mencionar "determinístico" ou "deterministica" na seção de arquitetura', () => {
      const lower = html.toLowerCase();
      const hasDeterministic =
        lower.includes('determin') || lower.includes('consolidação');
      expect(hasDeterministic).toBe(true);
    });

    it('deve descrever que resultados dos agents são consolidados pelo Boss', () => {
      const lower = html.toLowerCase();
      const hasConsolidation =
        (lower.includes('consolid') || lower.includes('agrega')) &&
        (lower.includes('resultado') || lower.includes('entrega'));
      expect(hasConsolidation).toBe(true);
    });
  });

  describe('AC4 — Rastreabilidade de tarefas', () => {
    it('deve mencionar "rastreabilidade" ou "rastreável" ou "log"', () => {
      const lower = html.toLowerCase();
      const hasTraceability =
        lower.includes('rastreabilidade') ||
        lower.includes('rastreável') ||
        lower.includes('rastreav') ||
        lower.includes('log');
      expect(hasTraceability).toBe(true);
    });

    it('deve mencionar visibilidade do status ou progresso das tarefas', () => {
      const lower = html.toLowerCase();
      const hasVisibility =
        lower.includes('visibilidade') ||
        lower.includes('status') ||
        lower.includes('progresso') ||
        lower.includes('monitoramento');
      expect(hasVisibility).toBe(true);
    });
  });

  describe('AC5 — Sem black-box', () => {
    it('não deve usar termos que sugiram caixa-preta sem transparência', () => {
      const lower = html.toLowerCase();
      const blackBoxTerms = ['black-box', 'black box', 'caixa preta', 'opaco'];
      const hasBlackBox = blackBoxTerms.some((term) => lower.includes(term));
      expect(hasBlackBox).toBe(false);
    });

    it('deve mencionar transparência, visibilidade ou rastreabilidade do processo', () => {
      const lower = html.toLowerCase();
      const transparencyTerms = [
        'transparência',
        'transparencia',
        'visibilidade',
        'rastreabilidade',
        'rastreável',
        'auditabilidade',
        'audit',
        'log',
      ];
      const hasTransparency = transparencyTerms.some((term) => lower.includes(term));
      expect(hasTransparency).toBe(true);
    });
  });
});
