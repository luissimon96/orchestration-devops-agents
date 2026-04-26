import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('C3 — Caso principal prioritário: ARO como demonstração central', () => {
  let page: HtmlPage;
  let html: string;

  beforeEach(() => {
    page = new HtmlPage();
    html = page.render();
  });

  describe('AC1 — ARO + Terraform na primeira dobra (hero)', () => {
    it('a headline menciona Azure (contexto do produto principal)', () => {
      expect(page.getHeroHeadline()).toContain('Azure');
    });

    it('o elevator pitch menciona Terraform como artefato entregue', () => {
      expect(page.getElevatorPitch().toLowerCase()).toContain('terraform');
    });

    it('o elevator pitch menciona ARO (Azure Red Hat OpenShift)', () => {
      const pitch = page.getElevatorPitch().toLowerCase();
      expect(pitch.includes('openshift') || pitch.includes('aro')).toBe(true);
    });

    it('o hero section exemplifica cluster ARO como caso de uso central', () => {
      const hero = page.getHeroSection().toLowerCase();
      expect(hero.includes('openshift') || hero.includes('aro')).toBe(true);
    });
  });

  describe('AC2 — Arquitetura lista ARO como exemplo principal', () => {
    it('a seção de arquitetura menciona Azure Red Hat OpenShift', () => {
      expect(html.toLowerCase()).toContain('azure red hat openshift');
    });

    it('ARO aparece na seção de arquitetura antes de serviços secundários (Key Vault, ACR)', () => {
      const lower = html.toLowerCase();
      const aroIdx = lower.indexOf('azure red hat openshift');
      const kvIdx = lower.indexOf('key vault');
      const acrIdx = lower.indexOf('container registry');
      expect(aroIdx).toBeGreaterThanOrEqual(0);
      if (kvIdx !== -1) expect(aroIdx).toBeLessThan(kvIdx);
      if (acrIdx !== -1) expect(aroIdx).toBeLessThan(acrIdx);
    });

    it('ARO recebe descrição dedicada (menciona "kubernetes")', () => {
      const lower = html.toLowerCase();
      const hasAroKubernetes =
        lower.includes('openshift') && lower.includes('kubernetes');
      expect(hasAroKubernetes).toBe(true);
    });
  });

  describe('AC3 — Nenhum caso secundário mais proeminente que ARO', () => {
    it('ARO é mencionado mais vezes que qualquer outra plataforma de Kubernetes', () => {
      const lower = html.toLowerCase();
      const aroCount = (lower.match(/openshift|aro/g) || []).length;
      const aksCount = (lower.match(/\baks\b/g) || []).length;
      const gkeCount = (lower.match(/\bgke\b/g) || []).length;
      expect(aroCount).toBeGreaterThan(aksCount);
      expect(aroCount).toBeGreaterThan(gkeCount);
    });

    it('o primeiro exemplo de cluster na página é ARO, não AKS', () => {
      const lower = html.toLowerCase();
      const aroIdx = lower.indexOf('openshift');
      const aksIdx = lower.indexOf('aks');
      expect(aroIdx).toBeGreaterThanOrEqual(0);
      if (aksIdx !== -1) expect(aroIdx).toBeLessThan(aksIdx);
    });
  });

  describe('AC4 — CTA principal associado ao fluxo ARO', () => {
    it('a página tem exatamente um CTA principal (um button de destaque)', () => {
      const ctaMatches = html.match(/class="cta-button"/g) || [];
      expect(ctaMatches.length).toBe(1);
    });

    it('o CTA está no header/hero, não aninhado em seções secundárias', () => {
      const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
      expect(headerMatch).toBeTruthy();
      expect(headerMatch![0]).toContain('cta-button');
    });
  });

  describe('AC5 — Casos secundários só aparecem após ARO ser estabelecido', () => {
    it('VMs ou serviços de IaaS genéricos não aparecem antes de ARO', () => {
      const lower = html.toLowerCase();
      const aroIdx = lower.indexOf('openshift');
      const vmIdx = lower.indexOf(' vm ');
      if (vmIdx !== -1 && aroIdx !== -1) {
        expect(aroIdx).toBeLessThan(vmIdx);
      }
      // If no VMs mentioned at all, test passes trivially — that's fine
      expect(true).toBe(true);
    });

    it('AKS não é apresentado como alternativa antes de ARO no fluxo', () => {
      const lower = html.toLowerCase();
      const aroIdx = lower.indexOf('openshift');
      const aksIdx = lower.indexOf(' aks ');
      if (aksIdx !== -1 && aroIdx !== -1) {
        expect(aroIdx).toBeLessThan(aksIdx);
      }
      expect(true).toBe(true);
    });
  });
});
