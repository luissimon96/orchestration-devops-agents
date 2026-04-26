# PRD — Boss, Orquestrador de Agents DevOps para Azure

## Visao do Produto

Boss e um orquestrador especialista de agents focados em DevOps para Azure. A proposta comercial inicial e uma landing page em portugues, inspirada na estrutura da pagina de referencia, mas com narrativa original, branding proprio e posicionamento Azure-first. O objetivo e mostrar que um usuario pode pedir um resultado de alto nivel em linguagem natural e o Boss ira decompor o pedido em atividades tecnicas, criar subagents em paralelo quando houver independencia entre tarefas e devolver um pacote final consistente, principalmente Terraform e artefatos de entrega.

O caso demonstrativo principal do MVP sera um pedido como: "Boss, provisione um cluster Kubernetes OpenShift no Azure". A resposta esperada do produto e um conjunto coordenado de entregaveis para provisionamento, validacao e handoff.

## Problema

Equipes DevOps precisam coordenar varias disciplinas ao mesmo tempo para entregar infraestrutura moderna em nuvem: rede, identidade, seguranca, Kubernetes, pipelines, GitOps, observabilidade e infraestrutura como codigo. Na pratica, esse trabalho costuma ser fragmentado em scripts, checklists, especialistas separados e muito retrabalho manual. Isso aumenta tempo de entrega, risco operacional e dependencia de poucos profissionais seniors.

Ao mesmo tempo, boa parte das mensagens de mercado e dos exemplos praticos ainda sao centrados em AWS. Existe uma oportunidade clara para uma narrativa equivalente, mas nativa de Azure, com foco em automacao confiavel, Terraform e colaboracao entre agents especialistas.

## Objetivos de Negocio

Lancar uma landing page com alto potencial de conversao para uma oferta Azure-first, posicionar o Boss como camada de orquestracao para agents DevOps especialistas e transformar a promessa de IA em algo concreto por meio de um fluxo demonstravel de provisionamento no Azure. A pagina deve gerar interesse qualificado de profissionais de DevOps, cloud e plataforma que buscam acelerar entrega sem perder governanca.

## Objetivos do Usuario

O visitante deve entender rapidamente o que o Boss faz, quais problemas ele resolve e por que o enfoque em Azure e relevante. O usuario tecnico deve conseguir visualizar a decomposicao de um pedido complexo em workstreams paralelos e confiar que o resultado final tera valor pratico imediato. O usuario comprador deve perceber clareza de escopo, entregaveis e diferencas em relacao a uma automacao genérica.

## Publico-Alvo

O publico principal inclui DevOps Engineers, Cloud Engineers, Platform Engineers e consultores que atuam com Azure ou desejam migrar repertorio de AWS para Azure. O publico secundario inclui lideres tecnicos, gestores de engenharia e profissionais em transicao de carreira que querem aprender ou avaliar uma abordagem mais produtiva para entrega de infraestrutura.

## Escopo do MVP

O MVP cobre a definicao do produto e a landing page. A pagina deve reproduzir apenas a logica de conversao da referencia, sem copiar texto protegido, e apresentar o Boss com copy original. O produto descrito no MVP deve mostrar como o Boss interpreta um objetivo, divide o trabalho em especialistas, executa tarefas independentes em paralelo e consolida o resultado. O caso principal do MVP sera Azure Red Hat OpenShift com Terraform, rede, identidade, CI/CD e GitOps.

O MVP nao cobre execucao real em ambiente produtivo, multi-tenant, billing, painel administrativo completo ou runtime operacional de agentes em producao. Nesta fase, o foco e clareza de proposta, definicao funcional e direcao de arquitetura.

## Visao de Arquitetura

Boss atua como controlador central. Ele recebe a intencao do usuario, monta um plano de execucao, identifica dependencias, cria subagents para frentes independentes e acompanha o status de cada uma. Ao final, ele agrega a saida de todos os subagents e devolve um resultado unico, pronto para uso ou revisao.

Na narrativa do MVP, os principais especialistas sao: um Planner Agent para decomposicao do objetivo; um Azure Network Agent para VNet, subnets e conectividade; um Identity and Security Agent para RBAC, managed identities e segredos; um OpenShift Platform Agent para Azure Red Hat OpenShift; um Terraform Agent para modulos, backend e outputs; um CI/CD and GitOps Agent para GitHub Actions e Argo CD; e um Validation Agent para consistencia, compliance e completude.

## Traducao Azure da Narrativa de Mercado

O material precisa substituir a narrativa tradicional de AWS por equivalentes corretos em Azure. VPC deve ser tratado como Virtual Network. EKS deve ser tratado como Azure Red Hat OpenShift. IAM deve ser substituido por Microsoft Entra ID, Azure RBAC e Managed Identities. S3 para remote state deve ser apresentado como Azure Storage Account Blob backend, com locking por lease do blob. ALB e componentes de trafego devem ser posicionados como Azure Application Gateway e, quando necessario, Azure Load Balancer. Secrets Manager deve ser substituido por Azure Key Vault. Logs e metricas devem ser posicionados com Azure Monitor e Log Analytics.

## Requisitos Funcionais

### RF1 — Posicionamento Azure-first

A landing page deve deixar explicito na primeira dobra que o produto e orientado a Azure, DevOps e orquestracao de agents especialistas. O visitante nao pode confundir a oferta com um curso ou ferramenta genericamente multicloud.

### RF2 — Estrutura de pagina orientada a conversao

A pagina deve seguir uma sequencia de seções equivalente a um fluxo de conversao comprovado: hero, proposta de valor, como funciona, modulos ou arquitetura, caso principal, entregaveis, prova social ou placeholders, autoridade, FAQ e chamadas para acao.

### RF3 — Copy original

Toda a narrativa deve ser original. A inspiracao pode ser estrutural, mas o texto precisa ser autoral, adaptado para Boss e coerente com o reposicionamento para Azure.

### RF4 — Explicacao do Boss como orquestrador

A pagina deve explicar que o Boss interpreta pedidos em linguagem natural, cria subagents por especialidade, controla tarefas independentes em paralelo, respeita dependencias e consolida a resposta final ao usuario.

### RF5 — Caso principal com OpenShift no Azure

O produto precisa mostrar um fluxo principal em que o usuario pede a provisao de um cluster OpenShift no Azure e o Boss coordena a entrega dos componentes necessarios. Esse fluxo deve ser concreto o bastante para dar credibilidade tecnica a promessa.

### RF6 — Entregaveis finais claros

A narrativa deve explicitar que o resultado final inclui Terraform organizado, configuracao base de pipeline, estrutura inicial de GitOps, sumario do que foi provisionado e indicacao dos inputs que ainda dependem do usuario.

### RF7 — Controle de tarefas e paralelismo

O produto deve comunicar que o Boss identifica quais atividades podem rodar em paralelo e quais precisam esperar dependencias. O usuario precisa entender que paralelismo nao significa ausencia de controle.

### RF8 — Coleta de informacoes faltantes

Quando houver dados ausentes, como regiao, convencao de nomes, ranges de rede, dominio ou requisitos de seguranca, o Boss deve apontar explicitamente o que falta para completar a entrega.

## Requisitos Nao Funcionais

### RNF1 — Clareza

A proposta precisa ser compreensivel em poucos minutos, com linguagem acessivel para profissionais tecnicos sem perder rigor conceitual.

### RNF2 — Credibilidade tecnica

Os termos de Azure, Terraform, OpenShift e DevOps precisam estar corretos e consistentes em toda a narrativa.

### RNF3 — Escaneabilidade

A pagina deve ser facil de ler em desktop e mobile, com blocos curtos, hierarquia visual clara e progressao logica entre seções.

### RNF4 — Governanca

O conceito do produto deve reforcar controle, auditabilidade, ownership de tarefas e consolidacao deterministica dos resultados sempre que possivel.

## Epicos Iniciais

### EP1 — Landing page de conversao

Criar a definicao de uma landing page inspirada na referencia, mas com posicionamento Boss, copy original e foco em Azure.

### EP2 — Narrativa do Boss

Definir como o Boss sera apresentado como orquestrador de agents DevOps, incluindo decomposicao de tarefas, paralelismo e agregacao de resultados.

### EP3 — Caso demonstrativo ARO

Definir o fluxo principal em que o Boss recebe um pedido para provisionar OpenShift no Azure e devolve os artefatos necessarios para provisionamento com Terraform.

## Criterios de Aceitacao

### AC1 — Primeira dobra

Na primeira dobra, o visitante deve entender que a oferta e sobre Azure, agents especialistas e DevOps.

### AC2 — Caso concreto

A pagina deve apresentar pelo menos um fluxo completo e crivel centrado em Azure Red Hat OpenShift.

### AC3 — Paralelismo explicado

O modelo de subagents paralelos e agregacao final precisa aparecer de forma explicita e compreensivel.

### AC4 — Consistencia de plataforma

As referencias inspiradas em AWS devem estar convertidas para equivalentes validos em Azure em toda a narrativa.

### AC5 — Entregaveis tangiveis

O visitante deve perceber que o resultado prometido vai alem de "usar IA" e inclui artefatos reais, especialmente Terraform e componentes de entrega.

## Metricas de Sucesso

O sucesso da landing page sera medido por cliques em CTA, inicio de checkout ou cadastro, profundidade de scroll nas secoes de arquitetura e caso principal e tempo de permanencia qualificado. O sucesso da narrativa do produto sera medido pela capacidade de visitantes descreverem o Boss corretamente, pelo interesse em demos Azure-first e pelo volume de conversas ligadas ao caso de OpenShift com Terraform.

## Riscos

### R1 — Promessa abstrata

Se a proposta ficar abstrata, o visitante nao confiara que o Boss entrega algo real.

### R2 — Excesso de tecnicidade

Se a copy ficar tecnica demais, a conversao pode cair para usuarios menos maduros.

### R3 — Inconsistencia de Azure

Se a terminologia de Azure estiver errada ou superficial, a credibilidade com o publico alvo sera prejudicada.

### R4 — Escopo inflado

Se o MVP tentar cobrir muitos cenarios alem de ARO, a mensagem perdera foco.

## Restricoes

### C1 — Inspiracao sem copia

A pagina pode ser inspirada na estrutura da referencia, mas nao deve reproduzir texto protegido nem identidade visual de forma confusamente semelhante.

### C2 — Azure-first

O MVP deve manter foco em Azure e evitar expandir para multiplas clouds neste momento.

### C3 — Caso principal prioritario

O fluxo demonstrativo principal deve permanecer centrado em Azure Red Hat OpenShift, Terraform e automacao DevOps.

## Perguntas Abertas para DESIGN

Ainda precisamos decidir se a oferta inicial sera vendida como workshop, produto SaaS ou formato hibrido. Tambem precisa ser decidido se a CTA principal levara para waitlist, demo ou checkout direto. No desenho tecnico, precisamos confirmar se a arquitetura de entrada do caso ARO usara apenas Azure Application Gateway ou uma combinacao com Azure Load Balancer. Por fim, precisa ser definido o nivel exato da promessa publica: somente Terraform ou Terraform mais pipeline e GitOps bootstrap.
