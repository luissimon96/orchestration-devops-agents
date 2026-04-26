import { describe, it, expect } from 'vitest';
import { IdentitySecurityAgent } from '../../orchestrator/agents/identity-security-agent';
import { AgentRegistry } from '../../orchestrator/base-agent';

describe('IdentitySecurityAgent', () => {
  it('should have id = identity and implement BaseAgent', () => {
    const agent = new IdentitySecurityAgent();
    expect(agent.id).toBe('identity');
    expect(typeof agent.execute).toBe('function');
    expect(typeof agent.getCapabilities).toBe('function');
  });

  it('should be registerable in AgentRegistry', () => {
    const registry = new AgentRegistry();
    const agent = new IdentitySecurityAgent();
    registry.register(agent);
    expect(registry.get('identity')).toBe(agent);
  });

  it('should return artifacts with identity.tf and keyvault.tf', async () => {
    const agent = new IdentitySecurityAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'provisionar ARO', context: {}, dependencies: [] });
    expect(output.status).toBe('success');
    expect(output.artifacts).toHaveProperty('identity.tf');
    expect(output.artifacts).toHaveProperty('keyvault.tf');
  });

  it('should contain azurerm_user_assigned_identity in identity.tf', async () => {
    const agent = new IdentitySecurityAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO', context: {}, dependencies: [] });
    const hcl = output.artifacts['identity.tf'] as string;
    expect(hcl).toContain('azurerm_user_assigned_identity');
  });

  it('should contain azurerm_role_assignment in identity.tf', async () => {
    const agent = new IdentitySecurityAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO', context: {}, dependencies: [] });
    const hcl = output.artifacts['identity.tf'] as string;
    expect(hcl).toContain('azurerm_role_assignment');
  });

  it('should contain azurerm_key_vault in keyvault.tf', async () => {
    const agent = new IdentitySecurityAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO', context: {}, dependencies: [] });
    const hcl = output.artifacts['keyvault.tf'] as string;
    expect(hcl).toContain('azurerm_key_vault');
  });

  it('should have a summary mentioning identity and keyvault', async () => {
    const agent = new IdentitySecurityAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO', context: {}, dependencies: [] });
    const summary = output.summary.toLowerCase();
    expect(summary).toContain('identit');
    expect(summary).toContain('key vault');
  });
});
