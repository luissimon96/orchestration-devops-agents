import { describe, it, expect } from 'vitest';
import type { BaseAgent, AgentInput, AgentOutput, AgentCapability } from '../../orchestrator/base-agent';
import { AgentRegistry } from '../../orchestrator/base-agent';

// ─── Stub agent for testing ───────────────────────────────────────────────────
class StubAgent implements BaseAgent {
  id = 'stub';
  name = 'Stub Agent';

  getCapabilities(): AgentCapability[] {
    return [{ name: 'stub', description: 'test capability' }];
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    return {
      taskId: input.taskId,
      agentId: this.id,
      status: 'success',
      artifacts: { 'stub.txt': 'stub content' },
      summary: 'Stub executed',
    };
  }
}

// ─── Tests ────────────────────────────────────────────────────────────────────
describe('BaseAgent interface', () => {
  it('should implement execute() returning AgentOutput with required fields', async () => {
    const agent = new StubAgent();
    const input: AgentInput = {
      taskId: 'task-001',
      intent: 'provision ARO',
      context: {},
      dependencies: [],
    };

    const output = await agent.execute(input);

    expect(output.taskId).toBe('task-001');
    expect(output.agentId).toBe('stub');
    expect(['success', 'error', 'partial']).toContain(output.status);
    expect(output.artifacts).toBeDefined();
    expect(typeof output.summary).toBe('string');
  });

  it('should implement getCapabilities() returning AgentCapability[]', () => {
    const agent = new StubAgent();
    const caps = agent.getCapabilities();
    expect(Array.isArray(caps)).toBe(true);
    expect(caps[0]).toHaveProperty('name');
    expect(caps[0]).toHaveProperty('description');
  });
});

describe('AgentInput type', () => {
  it('should have taskId, intent, context, dependencies fields', () => {
    const input: AgentInput = {
      taskId: 'task-abc',
      intent: 'provision cluster',
      context: { region: 'eastus' },
      dependencies: ['task-001', 'task-002'],
    };
    expect(input.taskId).toBe('task-abc');
    expect(input.intent).toBe('provision cluster');
    expect(input.context).toEqual({ region: 'eastus' });
    expect(input.dependencies).toHaveLength(2);
  });
});

describe('AgentOutput type', () => {
  it('should have taskId, agentId, status, artifacts, summary fields', () => {
    const output: AgentOutput = {
      taskId: 'task-001',
      agentId: 'network',
      status: 'success',
      artifacts: { 'network.tf': 'resource {}' },
      summary: 'VNet created',
    };
    expect(output.status).toBe('success');
    expect(output.artifacts['network.tf']).toBe('resource {}');
  });

  it('should accept all valid status values', () => {
    const statuses: AgentOutput['status'][] = ['success', 'error', 'partial'];
    statuses.forEach(status => {
      const out: AgentOutput = { taskId: 't', agentId: 'a', status, artifacts: {}, summary: '' };
      expect(out.status).toBe(status);
    });
  });
});

describe('AgentRegistry', () => {
  it('should register and retrieve an agent by id', () => {
    const registry = new AgentRegistry();
    const agent = new StubAgent();
    registry.register(agent);
    expect(registry.get('stub')).toBe(agent);
  });

  it('should return all registered agents via getAll()', () => {
    const registry = new AgentRegistry();
    registry.register(new StubAgent());
    const all = registry.getAll();
    expect(all).toHaveLength(1);
    expect(all[0].id).toBe('stub');
  });

  it('should throw when getting unregistered agent', () => {
    const registry = new AgentRegistry();
    expect(() => registry.get('nonexistent')).toThrow(/Agent 'nonexistent' not found/);
  });

  it('should overwrite existing agent on re-register', () => {
    const registry = new AgentRegistry();
    const a1 = new StubAgent();
    const a2 = new StubAgent();
    registry.register(a1);
    registry.register(a2);
    expect(registry.getAll()).toHaveLength(1);
    expect(registry.get('stub')).toBe(a2);
  });
});
