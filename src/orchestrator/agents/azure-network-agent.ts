import type { BaseAgent, AgentInput, AgentOutput, AgentCapability } from '../base-agent';

/** Generates Terraform HCL for Azure Virtual Network, subnets (masters/workers), and NSG. */
export class AzureNetworkAgent implements BaseAgent {
  readonly id = 'network';
  readonly name = 'Azure Network Agent';

  getCapabilities(): AgentCapability[] {
    return [{ name: 'network', description: 'Generates Azure VNet, subnets, and NSG Terraform HCL' }];
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    const hcl = this.generateNetworkTf();
    return {
      taskId: input.taskId,
      agentId: this.id,
      status: 'success',
      artifacts: { 'network.tf': hcl },
      summary: 'VNet 10.0.0.0/8 com subnets masters (10.0.1.0/24) e workers (10.0.2.0/24), NSG aro-nsg provisionados.',
    };
  }

  private generateNetworkTf(): string {
    return `# network.tf — gerado pelo AzureNetworkAgent

resource "azurerm_virtual_network" "aro_vnet" {
  name                = "aro-vnet"
  resource_group_name = var.resource_group_name
  location            = var.location
  address_space       = ["10.0.0.0/8"]
}

resource "azurerm_subnet" "masters" {
  name                 = "masters"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.aro_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_subnet" "workers" {
  name                 = "workers"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.aro_vnet.name
  address_prefixes     = ["10.0.2.0/24"]
}

resource "azurerm_network_security_group" "aro_nsg" {
  name                = "aro-nsg"
  resource_group_name = var.resource_group_name
  location            = var.location
}
`;
  }
}
