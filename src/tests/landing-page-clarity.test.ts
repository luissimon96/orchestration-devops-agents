import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

/**
 * RNF1 — Clareza Test Suite
 * 
 * Tests that the landing page clearly communicates the Boss value proposition
 * with proper Azure terminology, concise copy, and mobile-responsive design.
 */

describe('RNF1 — Clareza: Landing Page Clarity', () => {
  let page: HtmlPage;

  beforeEach(() => {
    page = new HtmlPage();
  });

  describe('AC1: Hero Copy — Under 100 characters', () => {
    it('should have a hero headline under 100 characters', () => {
      const headline = page.getHeroHeadline();
      expect(headline).toBeDefined();
      expect(headline.length).toBeLessThan(100);
      expect(headline.toLowerCase()).toContain('boss');
    });

    it('should present Boss as an orchestrator', () => {
      const headline = page.getHeroHeadline();
      expect(
        headline.toLowerCase().includes('orquestra') ||
        headline.toLowerCase().includes('orchestrat')
      ).toBe(true);
    });
  });

  describe('AC2: Elevator Pitch — Max 3 sentences, Clear for DevOps', () => {
    it('should have elevator pitch with max 3 sentences', () => {
      const pitch = page.getElevatorPitch();
      expect(pitch).toBeDefined();
      const sentenceCount = pitch.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
      expect(sentenceCount).toBeLessThanOrEqual(3);
    });

    it('should mention agents or specialists', () => {
      const pitch = page.getElevatorPitch();
      expect(pitch.toLowerCase()).toMatch(/agent|specialist|especialista/i);
    });

    it('should mention DevOps or infrastructure', () => {
      const pitch = page.getElevatorPitch();
      expect(pitch.toLowerCase()).toMatch(/devops|infrastructure|infraestrutura|automation/i);
    });
  });

  describe('AC3: Azure-First Terminology in Hero Section', () => {
    it('should NOT contain AWS terms in hero section', () => {
      const heroContent = page.getHeroSection();
      expect(heroContent.toLowerCase()).not.toContain('aws');
      expect(heroContent.toLowerCase()).not.toContain('eks');
      expect(heroContent.toLowerCase()).not.toContain('vpc ');
      expect(heroContent.toLowerCase()).not.toContain('alb ');
    });

    it('should contain Azure or Azure-equivalent terms', () => {
      const heroContent = page.getHeroSection();
      const hasAzure = heroContent.toLowerCase().includes('azure') ||
                      heroContent.toLowerCase().includes('openshift') ||
                      heroContent.toLowerCase().includes('terraform');
      expect(hasAzure).toBe(true);
    });

    it('should NOT duplicate AWS->Azure mapping without conversion', () => {
      const heroContent = page.getHeroSection();
      // Example: should not have "VPC (Virtual Network)" but just appropriate terms
      expect(heroContent).not.toContain('VPC (');
      expect(heroContent).not.toContain('EKS (');
    });
  });

  describe('AC4: Landing Page Renders Correctly', () => {
    it('should generate valid HTML', () => {
      const html = page.render();
      expect(html).toBeDefined();
      expect(html.length).toBeGreaterThan(100);
      expect(html).toContain('<!DOCTYPE');
      expect(html).toContain('</html>');
    });

    it('should include responsive meta viewport tag', () => {
      const html = page.render();
      expect(html).toContain('viewport');
      expect(html).toContain('device-width');
    });

    it('should have semantic HTML5 structure', () => {
      const html = page.render();
      expect(html).toContain('<header');
      expect(html).toContain('<main');
      expect(html).toContain('<section');
      expect(html).toContain('<footer');
    });

    it('should include CSS for styling', () => {
      const html = page.render();
      expect(html).toContain('<style') || expect(html).toContain('href=');
    });

    it('should render without fatal errors', () => {
      expect(() => page.render()).not.toThrow();
    });
  });

  describe('Integration: Full page clarity validation', () => {
    it('should have all clarity elements present', () => {
      expect(page.getHeroHeadline()).toBeDefined();
      expect(page.getElevatorPitch()).toBeDefined();
      expect(page.getHeroSection()).toBeDefined();
      expect(page.render()).toBeDefined();
    });

    it('should pass all clarity criteria', () => {
      const checks = {
        heroUnder100: page.getHeroHeadline().length < 100,
        pitchUnder3Sentences: page.getElevatorPitch().split(/[.!?]+/).filter(s => s.trim().length > 0).length <= 3,
        noAWSTerms: !page.getHeroSection().toLowerCase().includes('aws') &&
                   !page.getHeroSection().toLowerCase().includes('eks'),
        rendersCorrectly: !!page.render(),
      };
      
      expect(Object.values(checks).every(v => v)).toBe(true);
    });
  });
});
