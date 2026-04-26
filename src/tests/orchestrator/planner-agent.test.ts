import { describe, it, expect } from 'vitest';
import { PlannerAgent } from '../../orchestrator/agents/planner-agent';
import { AgentRegistry } from '../../orchestrator/base-agent';

describe('PlannerAgent', () => {
  it('should have id = planner and implement BaseAgent', () => {
    const agent = new PlannerAgent();
    expect(agent.id).toBe('planner');
    expect(typeof agent.name).toBe('string');
    expect(typeof agent.execute).toBe('function');
    expect(typeof agent.getCapabilities).toBe('function');
  });

  it('should be registerable in AgentRegistry', () => {
    const registry = new AgentRegistry();
    const agent = new PlannerAgent();
    registry.register(agent);
    expect(registry.get('planner')).toBe(agent);
  });

  it('should generate tasks with agentIds for ARO intent', async () => {
    const agent = new PlannerAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'provisionar openshift no Azure', context: {}, dependencies: [] });
    const plan = JSON.parse(output.artifacts['plan.json'] as string) as { agentId: string; dependsOn: string[] }[];
    const agentIds = plan.map(t => t.agentId);
    expect(agentIds).toContain('network');
    expect(agentIds).toContain('identity');
    expect(agentIds).toContain('openshift');
    expect(agentIds).toContain('terraform');
    expect(agentIds).toContain('cicd');
    expect(agentIds).toContain('validation');
  });

  it('should have network and identity with no dependencies', async () => {
    const agent = new PlannerAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO cluster', context: {}, dependencies: [] });
    const plan = JSON.parse(output.artifacts['plan.json'] as string) as { agentId: string; dependsOn: string[] }[];
    const network = plan.find(t => t.agentId === 'network')!;
    const identity = plan.find(t => t.agentId === 'identity')!;
    expect(network.dependsOn).toHaveLength(0);
    expect(identity.dependsOn).toHaveLength(0);
  });

  it('should have correct dependency chain: openshift→network+identity, terraform→openshift, cicd→terraform, validation→cicd', async () => {
    const agent = new PlannerAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO cluster', context: {}, dependencies: [] });
    const plan = JSON.parse(output.artifacts['plan.json'] as string) as { id: string; agentId: string; dependsOn: string[] }[];

    const byAgent = Object.fromEntries(plan.map(t => [t.agentId, t]));
    expect(byAgent['openshift'].dependsOn).toContain(byAgent['network'].id);
    expect(byAgent['openshift'].dependsOn).toContain(byAgent['identity'].id);
    expect(byAgent['terraform'].dependsOn).toContain(byAgent['openshift'].id);
    expect(byAgent['cicd'].dependsOn).toContain(byAgent['terraform'].id);
    expect(byAgent['validation'].dependsOn).toContain(byAgent['cicd'].id);
  });
});
