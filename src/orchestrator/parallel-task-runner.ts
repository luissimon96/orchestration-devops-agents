import type { ExecutionPlan, TaskNode } from './boss-orchestrator';
import type { AgentRegistry, AgentOutput } from './base-agent';

export interface TaskResult {
  taskId: string;
  agentId: string;
  status: 'success' | 'error' | 'partial';
  artifacts: Record<string, string>;
  summary: string;
}

export interface RunResult {
  planId: string;
  tasks: TaskResult[];
  completedAt: Date;
  overallStatus: 'success' | 'partial' | 'error';
}

/** Executes an ExecutionPlan respecting task dependencies, running independent tasks in parallel. */
export class ParallelTaskRunner {
  async run(plan: ExecutionPlan, registry: AgentRegistry): Promise<RunResult> {
    const completed = new Map<string, TaskResult>();
    const remaining = [...plan.tasks];

    while (remaining.length > 0) {
      const ready = remaining.filter(t => this.isReady(t, completed));
      if (ready.length === 0) break; // guard against unresolvable deps

      const results = await Promise.all(
        ready.map(task => this.executeTask(task, registry))
      );

      for (const result of results) {
        completed.set(result.taskId, result);
        const idx = remaining.findIndex(t => t.id === result.taskId);
        if (idx !== -1) remaining.splice(idx, 1);
      }
    }

    const tasks = Array.from(completed.values());
    const hasError = tasks.some(t => t.status === 'error');
    const hasPartial = tasks.some(t => t.status === 'partial');
    const overallStatus = hasError ? 'error' : hasPartial ? 'partial' : 'success';

    return { planId: plan.id, tasks, completedAt: new Date(), overallStatus };
  }

  private isReady(task: TaskNode, completed: Map<string, TaskResult>): boolean {
    return task.dependsOn.every(depId => completed.has(depId));
  }

  private async executeTask(task: TaskNode, registry: AgentRegistry): Promise<TaskResult> {
    try {
      const agent = registry.get(task.agentId);
      const output: AgentOutput = await agent.execute({
        taskId: task.id,
        intent: task.title,
        context: {},
        dependencies: task.dependsOn,
      });
      return {
        taskId: task.id,
        agentId: task.agentId,
        status: output.status,
        artifacts: output.artifacts,
        summary: output.summary,
      };
    } catch (err) {
      return {
        taskId: task.id,
        agentId: task.agentId,
        status: 'error',
        artifacts: {},
        summary: err instanceof Error ? err.message : String(err),
      };
    }
  }
}
