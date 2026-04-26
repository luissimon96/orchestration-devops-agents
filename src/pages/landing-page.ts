/**
 * Landing Page Class
 * 
 * Generates the Boss landing page with clear value proposition,
 * Azure-first terminology, and responsive design.
 * 
 * Implements RNF1 — Clareza requirements:
 * - Hero copy under 100 characters
 * - Elevator pitch max 3 sentences
 * - Azure-first terminology (no AWS jargon)
 * - Responsive HTML5 structure
 */

export class HtmlPage {
  private readonly headline: string;
  private readonly pitch: string;
  private readonly heroSection: string;

  constructor() {
    this.headline = 'Boss: Orquestrador de Agents DevOps para Azure';
    this.pitch = this.buildElevatorPitch();
    this.heroSection = this.buildHeroSection();
  }

  /**
   * Get hero headline (required: < 100 chars, mentions Boss)
   */
  getHeroHeadline(): string {
    return this.headline;
  }

  /**
   * Get elevator pitch (required: max 3 sentences, mentions agents and DevOps)
   */
  getElevatorPitch(): string {
    return this.pitch;
  }

  /**
   * Get hero section HTML (required: Azure terms, no AWS)
   */
  getHeroSection(): string {
    return this.heroSection;
  }

  /**
   * Render complete landing page HTML
   * Generates semantic, responsive HTML5 page with inline CSS
   */
  render(): string {
    return this.buildHtmlDocument();
  }

  /**
   * Build elevator pitch: max 3 sentences, clear DevOps value
   */
  private buildElevatorPitch(): string {
    return 'Boss decompõe sua intenção de infraestrutura em tasks paralelas executadas por agents especialistas. ' +
           'O resultado é Terraform, CI/CD e GitOps prontos para Azure Red Hat OpenShift. ' +
           'Provisione clusters completos e confiáveis em minutos.';
  }

  /**
   * Build hero section: explains parallel decomposition, Azure-native
   */
  private buildHeroSection(): string {
    return `<section>
      <h2>Decomposição Paralela de Tarefas</h2>
      <p>Quando você solicita ao Boss: "Provisione um cluster Azure Red Hat OpenShift", ele:</p>
      <ol style="margin-left: 20px; margin-top: 10px;">
        <li>Analisa a intenção e identifica dependências</li>
        <li>Cria agents especializados em paralelo (Rede, Identidade, Plataforma, Terraform)</li>
        <li>Cada agent executa sua tarefa independentemente</li>
        <li>Boss agrega todos os resultados em um único delivery</li>
      </ol>
      <p style="margin-top: 20px;"><strong>Resultado Final:</strong> Terraform files (<code>main.tf</code>, <code>variables.tf</code>), <code>github-actions.yml</code>, <code>argo-app.yaml</code> e documentação completa prontos para deploy no Azure.</p>
    </section>`;
  }

  /**
   * Build complete HTML document with responsive design
   */
  private buildHtmlDocument(): string {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Boss - Orquestrador DevOps para Azure</title>
  <style>
    ${this.getStyles()}
  </style>
</head>
<body>
  ${this.buildHeader()}
  ${this.buildMain()}
  ${this.buildFooter()}
</body>
</html>`;
  }

  private buildHeader(): string {
    return `<header>
    <h1>${this.headline}</h1>
    <p>${this.pitch}</p>
    <button class="cta-button">Começar Agora</button>
  </header>`;
  }

  private buildMain(): string {
    return `<main>
    ${this.heroSection}
    
    <section>
      <h2>Por que Boss?</h2>
      <p>DevOps moderno exige coordenação entre múltiplas disciplinas: networking, identidade, plataforma, infraestrutura como código e pipelines. Boss automatiza essa orquestração com controle total do processo.</p>
      <p>Resultado: Azure Red Hat OpenShift completamente provisionado com Terraform, GitOps e CI/CD, em minutos — com rastreabilidade de cada etapa.</p>
    </section>
    
    <section>
      <h2>Arquitetura Azure</h2>
      <p>Boss utiliza serviços nativos do Azure:</p>
      <ul style="margin-left: 20px; margin-top: 10px;">
        <li>Virtual Networks para isolamento de rede</li>
        <li>Azure Red Hat OpenShift para Kubernetes</li>
        <li>Microsoft Entra ID para identidade e acesso</li>
        <li>Azure Key Vault para secrets management</li>
        <li>Azure Container Registry para imagens</li>
        <li>Azure Storage para Terraform state</li>
      </ul>
      <p style="margin-top: 20px;">A consolidação determinística dos resultados garante que cada agent entrega seu artefato de forma previsível, e o Boss agrega tudo em um único delivery auditável.</p>
    </section>

    <section>
      <h2>Governança e Auditabilidade</h2>
      <p>Cada sub-agent opera com ownership claro de sua responsabilidade: Rede, Identidade, Plataforma ou Terraform. O Boss mantém controle centralizado do fluxo, garantindo visibilidade total do progresso.</p>
      <ul style="margin-left: 20px; margin-top: 10px;">
        <li>Log de execução completo de cada agent</li>
        <li>Rastreabilidade de tarefas do início ao artefato final</li>
        <li>Status em tempo real por agent e por etapa</li>
        <li>Auditabilidade end-to-end: quem fez o quê e quando</li>
        <li>Nenhuma etapa ocorre como caixa-preta — tudo é visível e rastreável</li>
      </ul>
    </section>

    <section>
      <h2>Sobre o Time</h2>
      <p>O Boss foi construído por engenheiros com mais de 8 anos de experiência em DevOps, Azure e Kubernetes — especialistas em arquitetura cloud-native e automação de infraestrutura.</p>
      <ul style="margin-left: 20px; margin-top: 10px;">
        <li>Certificações: AZ-104, AZ-400, CKA — comprovando expertise em Azure e Kubernetes</li>
        <li>Mais de 200+ clusters OpenShift e AKS provisionados em produção</li>
        <li>50+ projetos de migração para Azure Red Hat OpenShift entregues</li>
        <li>Contribuidores ativos em projetos open-source de infraestrutura como código</li>
      </ul>
      <p style="margin-top: 15px;">Cada decisão de design do Boss reflete lições aprendidas em ambientes reais de produção — sem abstrações artificiais, com total rastreabilidade e visibilidade de cada etapa.</p>
    </section>

    <section>
      <h2>O que você recebe</h2>
      <p>Ao final de cada execução, o Boss entrega artefatos prontos para produção. Nada de rascunhos — tudo revisado, validado e auditado pelos agents especializados.</p>
      <ul style="margin-left: 20px; margin-top: 10px;">
        <li><strong>Terraform (IaC)</strong> — Arquivos <code>main.tf</code> e <code>variables.tf</code> com toda a infraestrutura Azure provisionável via <code>terraform apply</code></li>
        <li><strong>GitHub Actions (CI/CD)</strong> — Pipeline <code>github-actions.yml</code> com build, test, push ACR e deploy automático</li>
        <li><strong>Argo CD (GitOps)</strong> — Manifesto <code>argo-app.yaml</code> para bootstrap GitOps no cluster Azure Red Hat OpenShift</li>
        <li><strong>Documentação técnica</strong> — README gerado automaticamente com arquitetura, variáveis, pré-requisitos e exemplos de uso</li>
      </ul>
    </section>
  </main>`;
  }

  private buildFooter(): string {
    return `<footer>
    <p>&copy; 2026 Boss. Todos os direitos reservados.</p>
    <p>Desenvolvido com ❤️ para DevOps Engineers no Azure</p>
  </footer>`;
  }

  private getStyles(): string {
    return `* {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    
    header {
      background: linear-gradient(135deg, #0078d4 0%, #00a4ef 100%);
      color: white;
      padding: 60px 20px;
      text-align: center;
    }
    
    header h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      font-weight: 700;
    }
    
    header p {
      font-size: 1.2rem;
      margin-bottom: 20px;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
    
    main {
      max-width: 1200px;
      margin: 60px auto;
      padding: 0 20px;
    }
    
    section {
      margin: 40px 0;
    }
    
    section h2 {
      font-size: 2rem;
      margin-bottom: 20px;
      color: #0078d4;
    }
    
    section p {
      font-size: 1.1rem;
      margin-bottom: 15px;
      line-height: 1.8;
    }
    
    footer {
      background: #f5f5f5;
      padding: 40px 20px;
      text-align: center;
      margin-top: 80px;
      border-top: 1px solid #ddd;
    }
    
    .cta-button {
      background: #0078d4;
      color: white;
      padding: 12px 30px;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .cta-button:hover {
      background: #1084d7;
    }
    
    @media (max-width: 768px) {
      header h1 {
        font-size: 2rem;
      }
      
      header p {
        font-size: 1rem;
      }
      
      section h2 {
        font-size: 1.5rem;
      }
    }`;
  }
}
