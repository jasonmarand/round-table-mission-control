export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "recurring" | "backlog" | "in_progress" | "review" | "done";
  agent_id: string | null;
  project: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  created_at: string;
  updated_at: string;
  agent?: Agent | null;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  stage: "ideas" | "scripting" | "thumbnail" | "filming" | "editing" | "published";
  touches: number;
  agent_id: string | null;
  created_at: string;
  updated_at: string;
  agent?: Agent | null;
}

export interface ScheduledTask {
  id: string;
  name: string;
  description: string | null;
  schedule_type: "always" | "cron" | "once";
  cron_expression: string | null;
  frequency_label: string | null;
  color: string;
  next_run_at: string | null;
  last_run_at: string | null;
  is_active: boolean;
  created_at: string;
}

export interface MemoryEntry {
  id: string;
  agent_id: string | null;
  content: string;
  category: string;
  metadata: Record<string, unknown>;
  created_at: string;
  agent?: Agent | null;
}
