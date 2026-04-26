import { describe, it, expect } from 'vitest';
import { BossOrchestrator } from '../../orchestrator/boss-orchestrator';
import type { ExecutionPlan, TaskNode } from '../../orchestrator/boss-orchestrator';

describe('BossOrchestrator', () => {
  it('should export orchestrate() method', () => {
    const boss = new BossOrchestrator();
    expect(typeof boss.orchestrate).toBe('function');
  });

  it('should return ExecutionPlan with required fields', async () => {
    const boss = new BossOrchestrator();
    const plan: ExecutionPlan = await boss.orchestrate('provisionar ARO no Azure');

    expect(typeof plan.id).toBe('string');
    expect(plan.intent).toBe('provisionar ARO no Azure');
    expect(Array.isArray(plan.tasks)).toBe(true);
    expect(plan.createdAt).toBeInstanceOf(Date);
  });

  it('should return at least 1 TaskNode', async () => {
    const boss = new BossOrchestrator();
    const plan = await boss.orchestrate('provisionar ARO no Azure');
    expect(plan.tasks.length).toBeGreaterThanOrEqual(1);
  });

  it('should return TaskNode with required fields', async () => {
    const boss = new BossOrchestrator();
    const plan = await boss.orchestrate('provisionar ARO no Azure');
    const task: TaskNode = plan.tasks[0];

    expect(typeof task.id).toBe('string');
    expect(typeof task.title).toBe('string');
    expect(typeof task.agentId).toBe('string');
    expect(Array.isArray(task.dependsOn)).toBe(true);
    expect(['pending', 'running', 'done', 'error']).toContain(task.status);
  });

  it('should generate >= 4 tasks for ARO provisioning intent', async () => {
    const boss = new BossOrchestrator();
    const plan = await boss.orchestrate('provisionar cluster OpenShift ARO no Azure');
    expect(plan.tasks.length).toBeGreaterThanOrEqual(4);
  });
});
