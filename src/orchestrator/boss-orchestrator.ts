import { randomUUID } from 'crypto';

export interface TaskNode {
  id: string;
  title: string;
  agentId: string;
  dependsOn: string[];
  status: 'pending' | 'running' | 'done' | 'error';
}

export interface ExecutionPlan {
  id: string;
  intent: string;
  tasks: TaskNode[];
  createdAt: Date;
}

const ARO_PLAN: Omit<TaskNode, 'id'>[] = [
  { title: 'Provisionar VNet e subnets', agentId: 'network', dependsOn: [], status: 'pending' },
  { title: 'Configurar identidade e RBAC', agentId: 'identity', dependsOn: [], status: 'pending' },
  { title: 'Provisionar cluster ARO', agentId: 'openshift', dependsOn: ['network', 'identity'], status: 'pending' },
  { title: 'Gerar módulos Terraform', agentId: 'terraform', dependsOn: ['openshift'], status: 'pending' },
  { title: 'Configurar CI/CD e GitOps', agentId: 'cicd', dependsOn: ['terraform'], status: 'pending' },
  { title: 'Validar artefatos e compliance', agentId: 'validation', dependsOn: ['cicd'], status: 'pending' },
];

/** Central orchestrator — receives natural-language intent, returns an ExecutionPlan. */
export class BossOrchestrator {
  async orchestrate(intent: string): Promise<ExecutionPlan> {
    const lower = intent.toLowerCase();
    const tasks = this.planTasks(lower);
    return { id: randomUUID(), intent, tasks, createdAt: new Date() };
  }

  private planTasks(intent: string): TaskNode[] {
    if (intent.includes('openshift') || intent.includes('aro') || intent.includes('kubernetes')) {
      return ARO_PLAN.map(t => ({ ...t, id: randomUUID() }));
    }
    return [{ id: randomUUID(), title: 'Processar pedido', agentId: 'planner', dependsOn: [], status: 'pending' }];
  }
}
