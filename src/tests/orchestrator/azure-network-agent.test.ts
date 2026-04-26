import { describe, it, expect } from 'vitest';
import { AzureNetworkAgent } from '../../orchestrator/agents/azure-network-agent';
import { AgentRegistry } from '../../orchestrator/base-agent';

describe('AzureNetworkAgent', () => {
  it('should have id = network and implement BaseAgent', () => {
    const agent = new AzureNetworkAgent();
    expect(agent.id).toBe('network');
    expect(typeof agent.name).toBe('string');
    expect(typeof agent.execute).toBe('function');
    expect(typeof agent.getCapabilities).toBe('function');
  });

  it('should be registerable in AgentRegistry', () => {
    const registry = new AgentRegistry();
    const agent = new AzureNetworkAgent();
    registry.register(agent);
    expect(registry.get('network')).toBe(agent);
  });

  it('should return artifacts with network.tf key', async () => {
    const agent = new AzureNetworkAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'provisionar ARO', context: {}, dependencies: [] });
    expect(output.status).toBe('success');
    expect(output.artifacts).toHaveProperty('network.tf');
    expect(typeof output.artifacts['network.tf']).toBe('string');
  });

  it('should contain azurerm_virtual_network in HCL', async () => {
    const agent = new AzureNetworkAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'provisionar ARO', context: {}, dependencies: [] });
    const hcl = output.artifacts['network.tf'] as string;
    expect(hcl).toContain('azurerm_virtual_network');
  });

  it('should contain two azurerm_subnet blocks (masters and workers)', async () => {
    const agent = new AzureNetworkAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'provisionar ARO', context: {}, dependencies: [] });
    const hcl = output.artifacts['network.tf'] as string;
    const subnetMatches = [...hcl.matchAll(/resource\s+"azurerm_subnet"/g)];
    expect(subnetMatches.length).toBeGreaterThanOrEqual(2);
    expect(hcl).toContain('masters');
    expect(hcl).toContain('workers');
  });

  it('should contain azurerm_network_security_group', async () => {
    const agent = new AzureNetworkAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'provisionar ARO', context: {}, dependencies: [] });
    const hcl = output.artifacts['network.tf'] as string;
    expect(hcl).toContain('azurerm_network_security_group');
  });

  it('should have a summary describing VNet CIDR, subnets and NSG', async () => {
    const agent = new AzureNetworkAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'provisionar ARO', context: {}, dependencies: [] });
    expect(output.summary).toContain('VNet');
    expect(output.summary.length).toBeGreaterThan(20);
  });
});
