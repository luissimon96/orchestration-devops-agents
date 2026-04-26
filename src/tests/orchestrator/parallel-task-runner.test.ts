import { describe, it, expect, vi } from 'vitest';
import { ParallelTaskRunner } from '../../orchestrator/parallel-task-runner';
import type { RunResult, TaskResult } from '../../orchestrator/parallel-task-runner';
import type { ExecutionPlan, TaskNode } from '../../orchestrator/boss-orchestrator';
import { AgentRegistry } from '../../orchestrator/base-agent';
import type { BaseAgent, AgentInput, AgentOutput, AgentCapability } from '../../orchestrator/base-agent';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function makeAgent(id: string, delayMs = 0): BaseAgent {
  return {
    id,
    name: `Agent ${id}`,
    getCapabilities(): AgentCapability[] { return [{ name: id, description: id }]; },
    async execute(input: AgentInput): Promise<AgentOutput> {
      if (delayMs > 0) await new Promise(r => setTimeout(r, delayMs));
      return { taskId: input.taskId, agentId: id, status: 'success', artifacts: { [`${id}.tf`]: `# ${id}` }, summary: `${id} done` };
    },
  };
}

function makeTask(id: string, agentId: string, dependsOn: string[] = []): TaskNode {
  return { id, title: `Task ${id}`, agentId, dependsOn, status: 'pending' };
}

function makePlan(tasks: TaskNode[]): ExecutionPlan {
  return { id: 'plan-1', intent: 'test', tasks, createdAt: new Date() };
}

// ─── Tests ────────────────────────────────────────────────────────────────────
describe('ParallelTaskRunner', () => {
  it('should export run() method', () => {
    const runner = new ParallelTaskRunner();
    expect(typeof runner.run).toBe('function');
  });

  it('should return RunResult with required fields', async () => {
    const registry = new AgentRegistry();
    registry.register(makeAgent('network'));
    const plan = makePlan([makeTask('t1', 'network')]);
    const runner = new ParallelTaskRunner();

    const result: RunResult = await runner.run(plan, registry);

    expect(result.planId).toBe('plan-1');
    expect(Array.isArray(result.tasks)).toBe(true);
    expect(result.completedAt).toBeInstanceOf(Date);
    expect(['success', 'partial', 'error']).toContain(result.overallStatus);
  });

  it('should run independent tasks in parallel', async () => {
    const order: string[] = [];
    const registry = new AgentRegistry();

    ['network', 'identity'].forEach(id => {
      registry.register({
        id, name: id,
        getCapabilities: () => [],
        async execute(input) {
          order.push(`start-${id}`);
          await new Promise(r => setTimeout(r, 10));
          order.push(`end-${id}`);
          return { taskId: input.taskId, agentId: id, status: 'success', artifacts: {}, summary: id };
        },
      });
    });

    const plan = makePlan([makeTask('t1', 'network'), makeTask('t2', 'identity')]);
    const runner = new ParallelTaskRunner();
    await runner.run(plan, registry);

    // Both start before either ends (parallel)
    expect(order[0]).toMatch(/^start-/);
    expect(order[1]).toMatch(/^start-/);
  });

  it('should wait for dependencies before executing dependent task', async () => {
    const order: string[] = [];
    const registry = new AgentRegistry();

    ['a', 'b', 'c'].forEach(id => {
      registry.register({
        id, name: id,
        getCapabilities: () => [],
        async execute(input) {
          order.push(id);
          return { taskId: input.taskId, agentId: id, status: 'success', artifacts: {}, summary: id };
        },
      });
    });

    const tasks = [
      makeTask('t-a', 'a', []),
      makeTask('t-b', 'b', []),
      makeTask('t-c', 'c', ['t-a', 't-b']),
    ];
    const runner = new ParallelTaskRunner();
    await runner.run(makePlan(tasks), registry);

    const cIndex = order.indexOf('c');
    expect(order.indexOf('a')).toBeLessThan(cIndex);
    expect(order.indexOf('b')).toBeLessThan(cIndex);
  });

  it('should return TaskResult for each task', async () => {
    const registry = new AgentRegistry();
    registry.register(makeAgent('network'));
    const plan = makePlan([makeTask('t1', 'network')]);
    const runner = new ParallelTaskRunner();

    const result = await runner.run(plan, registry);
    const taskResult: TaskResult = result.tasks[0];

    expect(taskResult.taskId).toBe('t1');
    expect(taskResult.agentId).toBe('network');
    expect(['success', 'error', 'partial']).toContain(taskResult.status);
    expect(taskResult.artifacts).toBeDefined();
  });
});
