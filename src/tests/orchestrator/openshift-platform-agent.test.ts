import { describe, it, expect } from 'vitest';
import { OpenShiftPlatformAgent } from '../../orchestrator/agents/openshift-platform-agent';
import { AgentRegistry } from '../../orchestrator/base-agent';

describe('OpenShiftPlatformAgent', () => {
  it('should have id = openshift and implement BaseAgent', () => {
    const agent = new OpenShiftPlatformAgent();
    expect(agent.id).toBe('openshift');
    expect(typeof agent.execute).toBe('function');
    expect(typeof agent.getCapabilities).toBe('function');
  });

  it('should be registerable in AgentRegistry', () => {
    const registry = new AgentRegistry();
    const agent = new OpenShiftPlatformAgent();
    registry.register(agent);
    expect(registry.get('openshift')).toBe(agent);
  });

  it('should return artifacts with aro.tf and outputs.tf', async () => {
    const agent = new OpenShiftPlatformAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO cluster', context: {}, dependencies: [] });
    expect(output.status).toBe('success');
    expect(output.artifacts).toHaveProperty('aro.tf');
    expect(output.artifacts).toHaveProperty('outputs.tf');
  });

  it('should contain azurerm_redhat_openshift_cluster in aro.tf', async () => {
    const agent = new OpenShiftPlatformAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO cluster', context: {}, dependencies: [] });
    const hcl = output.artifacts['aro.tf'] as string;
    expect(hcl).toContain('azurerm_redhat_openshift_cluster');
  });

  it('should reference network_subnet_id and identity in aro.tf', async () => {
    const agent = new OpenShiftPlatformAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO cluster', context: {}, dependencies: [] });
    const hcl = output.artifacts['aro.tf'] as string;
    expect(hcl).toContain('network_subnet_id');
    expect(hcl).toContain('identity');
  });

  it('should contain api_server_url and ingress_ip outputs in outputs.tf', async () => {
    const agent = new OpenShiftPlatformAgent();
    const output = await agent.execute({ taskId: 't1', intent: 'ARO cluster', context: {}, dependencies: [] });
    const hcl = output.artifacts['outputs.tf'] as string;
    expect(hcl).toContain('api_server_url');
    expect(hcl).toContain('ingress_ip');
  });
});
