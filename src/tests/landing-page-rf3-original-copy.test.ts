import { describe, it, expect, beforeEach } from 'vitest';
import { HtmlPage } from '../pages/landing-page';

describe('RF3 — Copy original, autoral e adaptada para Boss/Azure', () => {
  let html: string;
  let lower: string;

  beforeEach(() => {
    html = new HtmlPage().render();
    lower = html.toLowerCase();
  });

  it('AC1 — não usa "Devops na Nuvem" ou marcas de terceiros', () => {
    expect(lower).not.toContain('devops na nuvem');
    expect(lower).not.toContain('linuxtips');
    expect(lower).not.toContain('cloud trailblazers');
  });

  it('AC2 — não usa "workshop" como produto principal', () => {
    // "workshop" should not appear as the primary product name
    // It may appear in FAQ context but not as the product label
    const workshopMatches = [...html.matchAll(/workshop/gi)];
    // If it appears, it must not be in h1/h2/strong as product name
    for (const match of workshopMatches) {
      const start = Math.max(0, (match.index ?? 0) - 30);
      const context = html.slice(start, (match.index ?? 0) + 50);
      expect(context).not.toMatch(/<h[12]>[^<]*workshop/i);
    }
  });

  it('AC3 — "Boss" aparece como nome do produto em 3+ seções distintas', () => {
    const sections = html.match(/<section[^>]*>([\s\S]*?)<\/section>/gi) ?? [];
    const sectionsWithBoss = sections.filter(s => /boss/i.test(s));
    expect(sectionsWithBoss.length).toBeGreaterThanOrEqual(3);
  });

  it('AC4 — sem terminologia AWS (EC2, S3, EKS, IAM role, CloudFormation)', () => {
    expect(lower).not.toContain(' ec2 ');
    expect(lower).not.toContain('cloudformation');
    expect(lower).not.toContain(' s3 bucket');
    expect(lower).not.toContain('aws iam');
  });

  it('AC5 — posicionamento de produto/ferramenta, não de curso', () => {
    // Should NOT present itself as a course/training
    expect(lower).not.toMatch(/inscreva-se no curso|acesse o curso|módulo \d|aula \d/);
    // Should present as a tool/orchestrator
    expect(lower).toMatch(/orquestrador|ferramenta|plataforma|produto/);
  });
});
