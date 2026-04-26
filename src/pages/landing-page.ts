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
      <p style="margin-top: 20px;"><strong>Resultado Final:</strong> Terraform modules, GitHub Actions pipeline, Argo CD GitOps, e documentação completa prontos para deploy no Azure.</p>
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
      <p>DevOps moderno exige coordenação entre múltiplas disciplinas: networking, identidade, plataforma, infraestrutura como código e pipelines. Boss automatiza essa orquestração.</p>
      <p>Resultado: Azure Red Hat OpenShift completamente provisionado com Terraform, GitOps e CI/CD, em minutos.</p>
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
