import type { BaseAgent, AgentInput, AgentOutput, AgentCapability } from '../base-agent';

/** Generates Terraform HCL for Azure Red Hat OpenShift (ARO) cluster and outputs. */
export class OpenShiftPlatformAgent implements BaseAgent {
  readonly id = 'openshift';
  readonly name = 'OpenShift Platform Agent';

  getCapabilities(): AgentCapability[] {
    return [{ name: 'openshift', description: 'Generates ARO cluster and outputs Terraform HCL' }];
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    return {
      taskId: input.taskId,
      agentId: this.id,
      status: 'success',
      artifacts: {
        'aro.tf': this.generateAroTf(),
        'outputs.tf': this.generateOutputsTf(),
      },
      summary: 'Cluster ARO provisionado com azurerm_redhat_openshift_cluster, outputs api_server_url e ingress_ip.',
    };
  }

  private generateAroTf(): string {
    return `# aro.tf — gerado pelo OpenShiftPlatformAgent

resource "azurerm_redhat_openshift_cluster" "aro" {
  name                = "aro-cluster"
  location            = var.location
  resource_group_name = var.resource_group_name

  cluster_profile {
    domain       = var.aro_domain
    version      = "4.13.40"
    pull_secret  = var.pull_secret
  }

  network_profile {
    pod_cidr     = "10.128.0.0/14"
    service_cidr = "172.30.0.0/16"
  }

  master_profile {
    vm_size   = "Standard_D8s_v3"
    network_subnet_id = azurerm_subnet.masters.id
  }

  worker_profile {
    vm_size      = "Standard_D4s_v3"
    disk_size_gb = 128
    node_count   = 3
    network_subnet_id = azurerm_subnet.workers.id
  }

  api_server_profile {
    visibility = "Public"
  }

  ingress_profile {
    visibility = "Public"
  }

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.aro_identity.id]
  }
}
`;
  }

  private generateOutputsTf(): string {
    return `# outputs.tf — gerado pelo OpenShiftPlatformAgent

output "api_server_url" {
  description = "URL do API server do cluster ARO"
  value       = azurerm_redhat_openshift_cluster.aro.api_server_profile[0].url
}

output "ingress_ip" {
  description = "IP do ingress controller do cluster ARO"
  value       = azurerm_redhat_openshift_cluster.aro.ingress_profile[0].ip
}
`;
  }
}
