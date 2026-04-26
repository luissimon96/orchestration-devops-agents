import type { BaseAgent, AgentInput, AgentOutput, AgentCapability } from '../base-agent';

/** Generates Terraform HCL for Azure Managed Identity, RBAC role assignments, and Key Vault. */
export class IdentitySecurityAgent implements BaseAgent {
  readonly id = 'identity';
  readonly name = 'Identity Security Agent';

  getCapabilities(): AgentCapability[] {
    return [{ name: 'identity', description: 'Generates Azure managed identity, RBAC, and Key Vault Terraform HCL' }];
  }

  async execute(input: AgentInput): Promise<AgentOutput> {
    return {
      taskId: input.taskId,
      agentId: this.id,
      status: 'success',
      artifacts: {
        'identity.tf': this.generateIdentityTf(),
        'keyvault.tf': this.generateKeyVaultTf(),
      },
      summary: 'Managed Identity, role assignment Contributor e Key Vault aro-kv provisionados.',
    };
  }

  private generateIdentityTf(): string {
    return `# identity.tf — gerado pelo IdentitySecurityAgent

resource "azurerm_user_assigned_identity" "aro_identity" {
  name                = "aro-identity"
  resource_group_name = var.resource_group_name
  location            = var.location
}

resource "azurerm_role_assignment" "aro_contributor" {
  scope                = data.azurerm_subscription.current.id
  role_definition_name = "Contributor"
  principal_id         = azurerm_user_assigned_identity.aro_identity.principal_id
}
`;
  }

  private generateKeyVaultTf(): string {
    return `# keyvault.tf — gerado pelo IdentitySecurityAgent

resource "azurerm_key_vault" "aro_kv" {
  name                = "aro-kv"
  resource_group_name = var.resource_group_name
  location            = var.location
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = azurerm_user_assigned_identity.aro_identity.principal_id

    secret_permissions = ["Get", "List", "Set", "Delete"]
  }
}
`;
  }
}
