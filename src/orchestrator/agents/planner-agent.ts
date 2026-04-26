import { randomUUID } from 'crypto';
import type { BaseAgent, AgentInput, AgentOutput, AgentCapability } from '../base-agent';

interface TaskSpec {
  id: string;
  title: string;
  agentId: string;
  dependsOn: string[];
}

/** Decomposes a natural-language intent into an ordered list of specialist tasks. */
export class PlannerAgent implements BaseAgent {
  readonly id = 'planner';
  readonly name = 'Planner Agent';

  getCapabilities(): AgentCapability[] {
    return [{ name: 'decompose', description: 'Decomposes intent into specialist task graph' }];
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    const tasks = this.decompose(input.intent);
    return {
      taskId: input.taskId,
      agentId: this.id,
      status: 'success',
      artifacts: { 'plan.json': JSON.stringify(tasks, null, 2) },
      summary: `Plano gerado: ${tasks.length} tasks para "${input.intent}"`,
    };
  }

  private decompose(intent: string): TaskSpec[] {
    const lower = intent.toLowerCase();
    if (lower.includes('openshift') || lower.includes('aro') || lower.includes('kubernetes')) {
      return this.buildAROPlan();
    }
    const id = randomUUID();
    return [{ id, title: 'Processar pedido genérico', agentId: 'planner', dependsOn: [] }];
  }

  private buildAROPlan(): TaskSpec[] {
    const networkId = randomUUID();
    const identityId = randomUUID();
    const openshiftId = randomUUID();
    const terraformId = randomUUID();
    const cicdId = randomUUID();
    const validationId = randomUUID();

    return [
      { id: networkId, title: 'Provisionar VNet e subnets', agentId: 'network', dependsOn: [] },
      { id: identityId, title: 'Configurar identidade e RBAC', agentId: 'identity', dependsOn: [] },
      { id: openshiftId, title: 'Provisionar cluster ARO', agentId: 'openshift', dependsOn: [networkId, identityId] },
      { id: terraformId, title: 'Gerar módulos Terraform', agentId: 'terraform', dependsOn: [openshiftId] },
      { id: cicdId, title: 'Configurar CI/CD e GitOps', agentId: 'cicd', dependsOn: [terraformId] },
      { id: validationId, title: 'Validar artefatos e compliance', agentId: 'validation', dependsOn: [cicdId] },
    ];
  }
}
