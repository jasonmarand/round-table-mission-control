import { NextResponse } from "next/server";

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

    const webhookUrl = process.env.OPENCLAW_AGENT_WEBHOOK;
    const webhookToken = process.env.OPENCLAW_AGENT_WEBHOOK_TOKEN;

    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(webhookToken ? { Authorization: `Bearer ${webhookToken}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Agent webhook failed", res.status, text);
        return NextResponse.json({ ok: false, error: "Agent webhook failed" }, { status: res.status });
      }
    } else {
      console.info("[AgentDispatch]", payload);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Agent dispatch error", error);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
