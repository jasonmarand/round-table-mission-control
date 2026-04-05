"use client";

import { useEffect, useState } from "react";
import { getContentItems, getAgents } from "@/lib/data";
import type { ContentItem, Agent } from "@/lib/supabase/types";
import { AgentBadge } from "@/components/agent-badge";
import { EmptyState } from "@/components/empty-state";
import { Plus, Eye, Loader2 } from "lucide-react";

const stages = [
  { id: "ideas", label: "Ideas", color: "#f59e0b" },
  { id: "scripting", label: "Scripting", color: "#f97316" },
  { id: "thumbnail", label: "Thumbnail", color: "#8b5cf6" },
  { id: "filming", label: "Filming", color: "#6b7280" },
  { id: "editing", label: "Editing", color: "#ec4899" },
] as const;

export default function ContentPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getContentItems(), getAgents()]).then(([c, a]) => {
      setItems(c);
      setAgents(a);
      setLoading(false);
    });
  }, []);

  const findAgent = (id: string | null) => agents.find((a) => a.id === id);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Content Pipeline</h1>
        <p className="text-gray-400 text-sm mt-1">Ideas → Scripts → Thumbnails → Published</p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 flex-1 min-h-0">
        {stages.map((stage) => {
          const stageItems = items.filter((c) => c.stage === stage.id);
          return (
            <div key={stage.id} className="flex-shrink-0 w-72">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
                  <h3 className="text-sm font-medium text-gray-300">{stage.label}</h3>
                  <span className="text-xs text-gray-600 bg-[#2a2a2a] px-2 py-0.5 rounded-full">{stageItems.length}</span>
                </div>
                <button className="text-gray-600 hover:text-gray-300 transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="space-y-2">
                {stageItems.length === 0 ? (
                  <EmptyState message="No items" />
                ) : (
                  stageItems.map((item) => {
                    const agent = findAgent(item.agent_id);
                    return (
                      <div key={item.id} className="bg-[#1e1e1e] border border-[#333] rounded-lg p-3 hover:border-[#555] transition-colors cursor-pointer group">
                        <h4 className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors line-clamp-2">{item.title}</h4>
                        {item.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>}
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-[10px] text-gray-500">{item.touches} touches</span>
                          <button className="ml-auto flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors">
                            <Eye className="w-3 h-3" />View
                          </button>
                          {agent && <AgentBadge name={agent.name} color={agent.color} size="sm" />}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
