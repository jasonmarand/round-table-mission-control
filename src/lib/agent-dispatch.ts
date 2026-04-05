'use client';

import type { Agent, Task } from "./supabase/types";

type TaskWithAgent = Task & { agent?: Agent | null };

export async function notifyAgent(task: TaskWithAgent): Promise<boolean> {
  if (!task.agent_id) return false;

  try {
    const response = await fetch("/api/agent-dispatch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId: task.id,
        agentId: task.agent_id,
        agentName: task.agent?.name ?? null,
        title: task.title,
        description: task.description,
        status: task.status,
      }),
    });

    if (!response.ok) {
      console.error("Failed to dispatch agent", await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to dispatch agent", error);
    return false;
  }
}
