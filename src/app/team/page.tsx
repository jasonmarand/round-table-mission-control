"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAgents } from "@/lib/data";
import type { Agent } from "@/lib/supabase/types";
import { Loader2, Crown, Swords, Brain, Hammer, Cog, Shield, FlaskConical, Sparkles, Skull } from "lucide-react";

const agentMeta: Record<string, { title: string; icon: typeof Crown; owns: string }> = {
  Arthur:    { title: "CEO",                            icon: Crown,       owns: "Owns executive command, strategic coordination, and final decisions across the Round Table." },
  Merlin:    { title: "Chief Strategy Officer",         icon: Brain,       owns: "Owns market research, strategic synthesis, and opportunity design." },
  Lancelot:  { title: "Chief Technology Officer",       icon: Hammer,      owns: "Owns technical strategy, architecture, and shipping execution." },
  Gawain:    { title: "Chief Operating Officer",        icon: Cog,         owns: "Owns operating cadence, sequencing, coordination, and workflow." },
  Percival:  { title: "Head of Quality Assurance",      icon: FlaskConical,owns: "Owns test strategy, release validation, and verification." },
  Galahad:   { title: "Chief Risk & Compliance Officer",icon: Shield,      owns: "Owns security, compliance, governance, and standards." },
  Mordred:   { title: "Red Team Director",              icon: Skull,       owns: "Owns adversarial reviews, pre-mortems, and stress testing." },
  Guinevere: { title: "Chief Brand & Experience Officer",icon: Sparkles,   owns: "Owns UX quality, brand expression, and external readiness." },
};

function AgentCard({ agent, onClick, size = "md" }: { agent: Agent; onClick: () => void; size?: "lg" | "md" }) {
  const meta = agentMeta[agent.name] || { title: agent.role, icon: Swords, owns: agent.description || "" };
  const Icon = meta.icon;
  const isLarge = size === "lg";

  return (
    <div
      onClick={onClick}
      className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl hover:border-[#444] transition-all cursor-pointer group ${
        isLarge ? "px-8 py-6" : "px-4 py-4"
      }`}
    >
      <div className={`flex items-start gap-3 ${isLarge ? "gap-4" : ""}`}>
        {/* Icon */}
        <div
          className={`rounded-full flex items-center justify-center shrink-0 ${
            isLarge ? "w-12 h-12" : "w-10 h-10"
          }`}
          style={{ backgroundColor: agent.color + "20", border: `1px solid ${agent.color}40` }}
        >
          <Icon className={`${isLarge ? "w-6 h-6" : "w-5 h-5"}`} style={{ color: agent.color }} />
        </div>

        <div className="min-w-0">
          {/* Name */}
          <h3 className={`font-bold text-white group-hover:text-purple-300 transition-colors ${
            isLarge ? "text-lg" : "text-sm"
          }`}>
            {agent.name}
          </h3>

          {/* Title */}
          <p className={`text-gray-400 ${isLarge ? "text-sm" : "text-xs"}`}>
            {meta.title}
          </p>

          {/* Status dot */}
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: agent.is_active ? "#f87171" : "#6b7280" }}
            />
            <span className="text-[10px] text-gray-500">
              {agent.is_active ? "Online" : "Offline"}
            </span>
          </div>

          {/* Description — only on md cards */}
          {!isLarge && (
            <p className="text-[11px] text-gray-600 mt-2 line-clamp-2 leading-relaxed">
              {meta.owns}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const router = useRouter();
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
  const reports = agents.filter((a) => a.name !== "Arthur");

  return (
    <div className="h-full overflow-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">The Round Table</h1>
        <p className="text-gray-400 text-sm mt-1">
          Organizational hierarchy — click any agent to view details
        </p>
      </div>

      {/* Org Chart */}
      <div className="flex flex-col items-center">
        {/* CEO — Arthur at top */}
        {arthur && (
          <div className="w-72">
            <AgentCard
              agent={arthur}
              onClick={() => router.push(`/team/${arthur.name}`)}
              size="lg"
            />
          </div>
        )}

        {/* Connector line down from Arthur */}
        <div className="w-px h-8 bg-[#333]" />

        {/* Horizontal connector bar */}
        <div className="relative w-full max-w-6xl">
          {/* The horizontal line */}
          <div className="absolute top-0 left-[calc(100%/14)] right-[calc(100%/14)] h-px bg-[#333]" />

          {/* Vertical drops to each card */}
          <div className="grid grid-cols-7 gap-3">
            {reports.map((agent) => (
              <div key={agent.id} className="flex flex-col items-center">
                {/* Vertical connector */}
                <div className="w-px h-8 bg-[#333]" />
                {/* Agent card */}
                <AgentCard
                  agent={agent}
                  onClick={() => router.push(`/team/${agent.name}`)}
                  size="md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
