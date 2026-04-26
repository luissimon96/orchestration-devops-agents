import type { BaseAgent, AgentInput, AgentOutput, AgentCapability } from '../base-agent';

/** Generates Terraform root module: main.tf, backend.tf, and variables.tf. */
export class TerraformAgent implements BaseAgent {
  readonly id = 'terraform';
  readonly name = 'Terraform Agent';

  getCapabilities(): AgentCapability[] {
    return [{ name: 'terraform', description: 'Generates Terraform root module with provider, backend, and variables' }];
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    return {
      taskId: input.taskId,
      agentId: this.id,
      status: 'success',
      artifacts: {
        'main.tf': this.generateMainTf(),
        'backend.tf': this.generateBackendTf(),
        'variables.tf': this.generateVariablesTf(),
      },
      summary: 'main.tf com provider azurerm, backend.tf com Azure Storage, variables.tf com 6 variáveis gerados.',
    };
  }

  private generateMainTf(): string {
    return `# main.tf — gerado pelo TerraformAgent

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  required_version = ">= 1.3.0"
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}
`;
  }

  private generateBackendTf(): string {
    return `# backend.tf — gerado pelo TerraformAgent

terraform {
  backend "azurerm" {
    storage_account_name = "bossarostate"
    container_name       = "tfstate"
    key                  = "aro.tfstate"
    resource_group_name  = "boss-state-rg"
  }
}
`;
  }

  private generateVariablesTf(): string {
    return `# variables.tf — gerado pelo TerraformAgent

variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "eastus"
}

variable "resource_group" {
  description = "Nome do resource group"
  type        = string
}

variable "cluster_name" {
  description = "Nome do cluster ARO"
  type        = string
  default     = "boss-aro"
}

variable "aro_domain" {
  description = "Domínio do cluster ARO"
  type        = string
}

variable "pull_secret" {
  description = "Red Hat pull secret para ARO"
  type        = string
  sensitive   = true
}
`;
  }
}
