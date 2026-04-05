import { NextResponse } from "next/server";
import * as mockData from "@/lib/mock-data";

interface AgentDispatchRequest {
  taskId: string;
  agentId: string;
  agentName?: string | null;
  title: string;
  description?: string | null;
  status: string;
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Partial<AgentDispatchRequest>;

    if (!payload.taskId || !payload.agentId || !payload.title) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const safePayload: AgentDispatchRequest = {
      taskId: payload.taskId,
      agentId: payload.agentId,
      agentName: payload.agentName ?? null,
      title: payload.title,
      description: payload.description ?? null,
      status: payload.status ?? "backlog",
    };

    const webhookUrl = process.env.OPENCLAW_AGENT_WEBHOOK;
    const webhookToken = process.env.OPENCLAW_AGENT_WEBHOOK_TOKEN;

    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(webhookToken ? { Authorization: `Bearer ${webhookToken}` } : {}),
        },
        body: JSON.stringify(safePayload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Agent webhook failed", res.status, text);
        return NextResponse.json({ ok: false, error: "Agent webhook failed" }, { status: res.status });
      }
    } else {
      promoteMockTask(safePayload);
      console.info("[AgentDispatch] mock runner", safePayload);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Agent dispatch error", error);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}

function promoteMockTask(payload: AgentDispatchRequest) {
  try {
    const match = mockData.tasks.find((t) => t.id === payload.taskId);
    if (match) {
      if (match.status === "backlog") {
        match.status = "in_progress";
      }
      match.updated_at = new Date().toISOString();
    }
  } catch (error) {
    console.error("Failed to update mock task", error);
  }
}
