"use client";

import { useEffect, useState } from "react";
import { getAgents } from "@/lib/data";
import type { Agent } from "@/lib/supabase/types";
import { AgentBadge } from "@/components/agent-badge";
import { Loader2 } from "lucide-react";

export default function TeamPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAgents().then((data) => {
      setAgents(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
      </div>
    );
  }

  const arthur = agents.find((a) => a.name === "Arthur");
  const others = agents.filter((a) => a.name !== "Arthur");

  return (
    <div className="h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Meet the Team</h1>
        <p className="text-gray-400 text-sm mt-1">The Round Table — your elite autonomous operating council</p>
      </div>

      {arthur && (
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20">
          <div className="flex items-start gap-4">
            <AgentBadge name="Arthur" color="#f59e0b" size="lg" />
            <div>
              <h2 className="text-lg font-bold text-white">Arthur</h2>
              <p className="text-sm text-amber-300 mb-2">{arthur.role}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{arthur.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {others.map((agent) => (
          <div
            key={agent.id}
            className="p-4 rounded-xl bg-[#1a1a1a] border border-[#222] hover:border-[#444] transition-all cursor-pointer group"
            style={{ borderTopColor: agent.color, borderTopWidth: "2px" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <AgentBadge name={agent.name} color={agent.color} size="md" />
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">{agent.name}</h3>
                <p className="text-xs" style={{ color: agent.color }}>{agent.role}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{agent.description}</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: agent.is_active ? "#10b981" : "#6b7280" }} />
              <span className="text-[10px] text-gray-600">{agent.is_active ? "Active" : "Inactive"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
