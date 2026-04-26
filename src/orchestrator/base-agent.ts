/** Capability advertised by an agent. */
export interface AgentCapability {
  name: string;
  description: string;
}

/** Input passed to an agent when executing a task. */
export interface AgentInput {
  taskId: string;
  intent: string;
  context: Record<string, unknown>;
  dependencies: string[];
}

/** Result returned by an agent after executing a task. */
export interface AgentOutput {
  taskId: string;
  agentId: string;
  status: 'success' | 'error' | 'partial';
  artifacts: Record<string, string>;
  summary: string;
}

/** Contract every specialist agent must implement. */
export interface BaseAgent {
  readonly id: string;
  readonly name: string;
  execute(input: AgentInput): Promise<AgentOutput>;
  getCapabilities(): AgentCapability[];
}

/** Central registry for BaseAgent instances. */
export class AgentRegistry {
  private readonly agents = new Map<string, BaseAgent>();

  register(agent: BaseAgent): void {
    this.agents.set(agent.id, agent);
  }

  get(id: string): BaseAgent {
    const agent = this.agents.get(id);
    if (!agent) throw new Error(`Agent '${id}' not found in registry`);
    return agent;
  }

  getAll(): BaseAgent[] {
    return Array.from(this.agents.values());
  }
}
