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
      <h2>Como funciona o fluxo Boss (Diagrama ARO)</h2>
      <p>Veja como o Boss transforma um pedido em linguagem natural em infraestrutura Azure completa:</p>
      <figure>
        <svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:13px;">
          <!-- Entrada: pedido do usuário -->
          <rect x="10" y="130" width="150" height="50" rx="8" fill="#0078d4" stroke="#005a9e" stroke-width="2"/>
          <text x="85" y="150" text-anchor="middle" fill="white" font-weight="bold">Pedido do</text>
          <text x="85" y="168" text-anchor="middle" fill="white">Usuário (input)</text>

          <!-- Seta entrada → Boss -->
          <line x1="160" y1="155" x2="210" y2="155" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>

          <!-- Boss Orquestrador -->
          <rect x="210" y="115" width="130" height="80" rx="8" fill="#106ebe" stroke="#005a9e" stroke-width="2"/>
          <text x="275" y="148" text-anchor="middle" fill="white" font-weight="bold" font-size="15">BOSS</text>
          <text x="275" y="166" text-anchor="middle" fill="#cde" font-size="11">Orquestrador</text>
          <text x="275" y="182" text-anchor="middle" fill="#cde" font-size="11">Azure-first</text>

          <!-- Setas Boss → agents (paralelo) -->
          <line x1="340" y1="135" x2="390" y2="70" stroke="#666" stroke-width="1.5" marker-end="url(#arrow)"/>
          <line x1="340" y1="155" x2="390" y2="155" stroke="#666" stroke-width="1.5" marker-end="url(#arrow)"/>
          <line x1="340" y1="175" x2="390" y2="240" stroke="#666" stroke-width="1.5" marker-end="url(#arrow)"/>

          <!-- Agent Rede -->
          <rect x="390" y="40" width="120" height="50" rx="6" fill="#50e6ff" stroke="#0099cc" stroke-width="1.5"/>
          <text x="450" y="60" text-anchor="middle" fill="#003" font-weight="bold">Agent Rede</text>
          <text x="450" y="77" text-anchor="middle" fill="#003" font-size="11">VNet · Subnets</text>

          <!-- Agent Identidade -->
          <rect x="390" y="128" width="120" height="50" rx="6" fill="#50e6ff" stroke="#0099cc" stroke-width="1.5"/>
          <text x="450" y="148" text-anchor="middle" fill="#003" font-weight="bold">Agent Identidade</text>
          <text x="450" y="165" text-anchor="middle" fill="#003" font-size="11">Entra ID · RBAC</text>

          <!-- Agent Plataforma -->
          <rect x="390" y="215" width="120" height="50" rx="6" fill="#50e6ff" stroke="#0099cc" stroke-width="1.5"/>
          <text x="450" y="235" text-anchor="middle" fill="#003" font-weight="bold">Agent Plataforma</text>
          <text x="450" y="252" text-anchor="middle" fill="#003" font-size="11">ARO · AKS · ACR</text>

          <!-- Setas agents → consolidação -->
          <line x1="510" y1="65" x2="555" y2="140" stroke="#666" stroke-width="1.5" marker-end="url(#arrow)"/>
          <line x1="510" y1="155" x2="555" y2="155" stroke="#666" stroke-width="1.5" marker-end="url(#arrow)"/>
          <line x1="510" y1="240" x2="555" y2="175" stroke="#666" stroke-width="1.5" marker-end="url(#arrow)"/>

          <!-- Consolidação / Saída -->
          <rect x="555" y="115" width="130" height="80" rx="8" fill="#107c10" stroke="#0a5e0a" stroke-width="2"/>
          <text x="620" y="148" text-anchor="middle" fill="white" font-weight="bold">Consolidação</text>
          <text x="620" y="165" text-anchor="middle" fill="#cfc" font-size="11">Terraform · CI/CD</text>
          <text x="620" y="181" text-anchor="middle" fill="#cfc" font-size="11">GitOps · Docs</text>

          <!-- Definição da seta -->
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#666"/>
            </marker>
          </defs>
        </svg>
        <figcaption style="font-size:12px;color:#666;margin-top:8px;">Fluxo paralelo: Boss decompõe o pedido e aciona agents Azure especializados (VNet, Entra ID, ARO/ACR) simultaneamente. A saída final consolida todos os artefatos.</figcaption>
      </figure>
    </section>

    <section>
      <h2>Por que Boss?</h2>
      <p>DevOps moderno exige coordenação entre múltiplas disciplinas: networking, identidade, plataforma, infraestrutura como código e pipelines. Boss automatiza essa orquestração com controle total do processo.</p>
      <p>Resultado: Azure Red Hat OpenShift completamente provisionado com Terraform, GitOps e CI/CD, em minutos — com rastreabilidade de cada etapa.</p>
    </section>
    
    <section>
      <h2>O que o Boss precisa saber</h2>
      <p>Antes de iniciar qualquer execução, o Boss coleta e valida todas as informações necessárias. Entradas incompletas não geram saída parcial — o Boss solicita os dados faltantes e aguarda confirmação antes de prosseguir.</p>
      <ul style="margin-left: 20px; margin-top: 10px;">
        <li><strong>Região Azure</strong> — ex: <code>eastus</code>, <code>brazilsouth</code>, <code>westeurope</code></li>
        <li><strong>Naming e convenção de nomenclatura</strong> — prefixo, sufixo e padrão de nomes dos recursos</li>
        <li><strong>Configuração de rede (VNet)</strong> — faixa CIDR, subnets e isolamento de rede</li>
        <li><strong>Requisitos de identidade</strong> — grupos Entra ID, RBAC roles e políticas de acesso</li>
        <li><strong>Requisitos externos</strong> — integrações, registros de container e configurações de DNS</li>
      </ul>
      <p style="margin-top: 15px;">Todas as informações são validadas antes de qualquer geração de código, garantindo artefatos completos e prontos para produção.</p>
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

      <h3 style="margin-top: 24px;">Rede: VNet e Subnets</h3>
      <p>Topologia de rede padrão para ARO no Azure:</p>
      <ul style="margin-left: 20px; margin-top: 8px;">
        <li><strong>VNet principal:</strong> 10.0.0.0/16 — espaço de endereçamento dedicado ao cluster</li>
        <li><strong>Subnet master:</strong> 10.0.1.0/24 — nós control plane do ARO</li>
        <li><strong>Subnet worker:</strong> 10.0.2.0/24 — nós worker do ARO</li>
        <li><strong>NSG master:</strong> regras de entrada para API server (443) e saída irrestrita para Azure APIs</li>
        <li><strong>NSG worker:</strong> regras de entrada entre subnets, saída para ACR e Entra ID</li>
      </ul>

      <h3 style="margin-top: 24px;">CI/CD e GitOps</h3>
      <p>Pipeline completo do código ao cluster com rastreabilidade total:</p>
      <ul style="margin-left: 20px; margin-top: 8px;">
        <li><strong>GitHub Actions:</strong> workflow de CI/CD para terraform plan e apply com aprovação por ambiente</li>
        <li><strong>Argo CD bootstrap:</strong> instalado no cluster ARO como primeiro workload, gerenciando todos os apps via GitOps</li>
        <li><strong>Sync policy:</strong> auto-sync em ambiente de desenvolvimento, aprovação manual em produção</li>
        <li><strong>Repositório GitOps:</strong> estrutura de pastas <code>apps/</code> (workloads), <code>infra/</code> (Terraform), <code>clusters/</code> (configurações por ambiente)</li>
        <li><strong>Argo CD Application:</strong> aponta para <code>clusters/production/</code>, sincroniza com o estado desejado no repositório</li>
      </ul>

      <h3 style="margin-top: 24px;">Terraform: módulos, state e outputs</h3>
      <p>Infraestrutura gerenciada como código com estrutura modular e state remoto:</p>
      <ul style="margin-left: 20px; margin-top: 8px;">
        <li><strong>Módulo rede:</strong> VNet, subnets, NSGs e peerings — <code>modules/network/</code></li>
        <li><strong>Módulo identidade:</strong> Managed Identities, RBAC roles, Entra ID groups — <code>modules/identity/</code></li>
        <li><strong>Módulo cluster ARO:</strong> cluster OpenShift, node pools, ingresso — <code>modules/aro/</code></li>
        <li><strong>Backend Azure Storage Blob:</strong> state remoto com lease locking para operações concorrentes seguras</li>
        <li><strong>Variáveis de entrada:</strong> <code>subscription_id</code>, <code>resource_group</code>, <code>location</code>, <code>cluster_name</code></li>
        <li><strong>Outputs para CI/CD:</strong> <code>kubeconfig</code>, endpoint do cluster ARO, URL do ACR, IDs de Managed Identity</li>
      </ul>

      <h3 style="margin-top: 24px;">Cluster ARO: configuração e ingresso</h3>
      <p>Especificação padrão do cluster Azure Red Hat OpenShift:</p>
      <ul style="margin-left: 20px; margin-top: 8px;">
        <li><strong>ARO versão:</strong> OpenShift 4.x — control plane gerenciado pela Microsoft/Red Hat</li>
        <li><strong>Node pool master:</strong> 3 nós Standard_D8s_v3 — alta disponibilidade do control plane</li>
        <li><strong>Node pool worker:</strong> mínimo 3 nós Standard_D4s_v3 — escalável conforme demanda</li>
        <li><strong>Load Balancer:</strong> Azure Load Balancer Standard para ingresso externo de serviços</li>
        <li><strong>Application Gateway:</strong> opcional — WAF e roteamento L7 para workloads expostos</li>
        <li><strong>TLS/Certificados:</strong> cert-manager com Let's Encrypt ou certificado corporativo via Azure Key Vault</li>
        <li><strong>Ingress Controller:</strong> OpenShift Router (HAProxy) para roteamento interno de rotas</li>
      </ul>

      <h3 style="margin-top: 24px;">Identidade: Managed Identity e RBAC</h3>
      <p>Cada agent opera com Managed Identity própria, sem credenciais estáticas:</p>
      <ul style="margin-left: 20px; margin-top: 8px;">
        <li><strong>Managed Identity — Agent Rede:</strong> role Network Contributor na VNet e subnets</li>
        <li><strong>Managed Identity — Agent Identidade:</strong> integração com Entra ID para RBAC de cluster</li>
        <li><strong>Managed Identity — Agent Plataforma:</strong> role Contributor no resource group ARO + AcrPull no ACR</li>
        <li><strong>Entra ID:</strong> grupo de segurança para administradores do cluster, sincronizado via OIDC</li>
      </ul>
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

    <section>
      <h2>Perguntas Frequentes (FAQ)</h2>
      <dl>
        <dt><h3>O que é o Boss?</h3></dt>
        <dd>Boss é um orquestrador de agents DevOps focado em Azure. Você descreve o que precisa em linguagem natural e ele cria sub-agents especializados que trabalham em paralelo para entregar a infraestrutura completa como código.</dd>

        <dt><h3>Como funciona o Boss?</h3></dt>
        <dd>Ao receber uma solicitação, o Boss analisa a intenção, decompõe em tarefas independentes e aciona agents especializados (Rede, Identidade, Plataforma, Terraform) simultaneamente. Ao final, agrega todos os resultados em um único conjunto de artefatos auditáveis.</dd>

        <dt><h3>O que recebo ao final de uma execução?</h3></dt>
        <dd>Você recebe artefatos prontos para uso: arquivos Terraform (<code>main.tf</code>, <code>variables.tf</code>), pipeline CI/CD (<code>github-actions.yml</code>), manifesto GitOps (<code>argo-app.yaml</code>) e documentação técnica gerada automaticamente.</dd>

        <dt><h3>O Boss suporta apenas Azure?</h3></dt>
        <dd>Sim. O Boss é Azure-native por design. Toda a terminologia, serviços e integrações são voltados para o ecossistema Azure — Virtual Network, Microsoft Entra ID, Azure Red Hat OpenShift, Azure Container Registry e Azure Storage.</dd>

        <dt><h3>Como começar a usar o Boss?</h3></dt>
        <dd>Clone o repositório, configure suas credenciais Azure e execute o Boss com sua solicitação em linguagem natural. Em minutos você terá todos os artefatos de infraestrutura prontos para revisar e aplicar.</dd>

        <dt><h3>Preciso de suporte ou tenho dúvidas?</h3></dt>
        <dd>Entre em contato pelo GitHub ou pelo suporte da comunidade. Abrimos issues, respondemos perguntas técnicas e mantemos documentação atualizada para cada versão lançada.</dd>
      </dl>
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
