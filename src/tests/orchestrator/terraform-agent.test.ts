import { describe, it, expect } from 'vitest';
import { TerraformAgent } from '../../orchestrator/agents/terraform-agent';
import { AgentRegistry } from '../../orchestrator/base-agent';

describe('TerraformAgent', () => {
  it('should have id = terraform and implement BaseAgent', () => {
    const agent = new TerraformAgent();
    expect(agent.id).toBe('terraform');
    expect(typeof agent.execute).toBe('function');
    expect(typeof agent.getCapabilities).toBe('function');
  });

  it('should be registerable in AgentRegistry', () => {
    const registry = new AgentRegistry();
    const agent = new TerraformAgent();
    registry.register(agent);
    expect(registry.get('terraform')).toBe(agent);
  });

  it('should return all three artifact files', async () => {
    const agent = new TerraformAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO', context: {}, dependencies: [] });
    expect(output.status).toBe('success');
    expect(output.artifacts).toHaveProperty('main.tf');
    expect(output.artifacts).toHaveProperty('backend.tf');
    expect(output.artifacts).toHaveProperty('variables.tf');
  });

  it('should contain terraform block with required_providers azurerm in main.tf', async () => {
    const agent = new TerraformAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO', context: {}, dependencies: [] });
    const hcl = output.artifacts['main.tf'] as string;
    expect(hcl).toContain('required_providers');
    expect(hcl).toContain('azurerm');
    expect(hcl).toContain('provider "azurerm"');
  });

  it('should contain backend azurerm with storage fields in backend.tf', async () => {
    const agent = new TerraformAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO', context: {}, dependencies: [] });
    const hcl = output.artifacts['backend.tf'] as string;
    expect(hcl).toContain('backend "azurerm"');
    expect(hcl).toContain('storage_account_name');
    expect(hcl).toContain('container_name');
    expect(hcl).toContain('key');
  });

  it('should contain at least 4 variable blocks in variables.tf', async () => {
    const agent = new TerraformAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO', context: {}, dependencies: [] });
    const hcl = output.artifacts['variables.tf'] as string;
    const vars = [...hcl.matchAll(/variable\s+"/g)];
    expect(vars.length).toBeGreaterThanOrEqual(4);
    expect(hcl).toContain('subscription_id');
    expect(hcl).toContain('location');
    expect(hcl).toContain('resource_group');
    expect(hcl).toContain('cluster_name');
  });
});
