"use client";

import { memoryEntries, getAgentById } from "@/lib/mock-data";
import { AgentBadge } from "@/components/agent-badge";
import { formatTime } from "@/lib/utils";
import { Search, Brain } from "lucide-react";
import { useState } from "react";

export default function MemoryPage() {
  const [search, setSearch] = useState("");

  const filtered = memoryEntries.filter(
    (entry) =>
      entry.content.toLowerCase().includes(search.toLowerCase()) ||
      entry.category.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const categoryColors: Record<string, string> = {
    mission: "#f59e0b",
    research: "#8b5cf6",
    build: "#3b82f6",
    operations: "#10b981",
    testing: "#06b6d4",
    security: "#ef4444",
    governance: "#e5e7eb",
    ux: "#ec4899",
    strategy: "#f59e0b",
    infrastructure: "#6b7280",
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            Memory
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Complete log of agent activity and decisions
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search memories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
        />
      </div>

      {/* Entries */}
      <div className="space-y-2 overflow-y-auto flex-1">
        {sorted.map((entry) => {
          const agent = entry.agent_id ? getAgentById(entry.agent_id) : null;
          return (
            <div
              key={entry.id}
              className="flex gap-4 p-4 rounded-lg bg-[#1a1a1a] border border-[#222] hover:border-[#333] transition-colors"
            >
              <div className="flex flex-col items-center gap-1 shrink-0">
                <span className="text-[10px] text-gray-600">
                  {formatTime(entry.created_at)}
                </span>
                {agent && (
                  <AgentBadge
                    name={agent.name}
                    color={agent.color}
                    size="md"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {agent && (
                    <span className="text-xs font-medium text-white">
                      {agent.name}
                    </span>
                  )}
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        (categoryColors[entry.category] || "#6b7280") + "20",
                      color: categoryColors[entry.category] || "#6b7280",
                    }}
                  >
                    {entry.category}
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {entry.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
