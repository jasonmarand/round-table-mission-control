"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProjects, getTasks, getAgents } from "@/lib/data";
import type { Project, Task, Agent } from "@/lib/supabase/types";
import { AgentBadge } from "@/components/agent-badge";
import { MetricsBar } from "@/components/metrics-bar";
import { NewProjectModal } from "@/components/new-project-modal";
import { FolderOpen, Plus, Loader2 } from "lucide-react";

const statusColors: Record<string, { bg: string; text: string }> = {
  active: { bg: "bg-emerald-500/20", text: "text-emerald-300" },
  paused: { bg: "bg-amber-500/20", text: "text-amber-300" },
  completed: { bg: "bg-blue-500/20", text: "text-blue-300" },
  archived: { bg: "bg-gray-500/20", text: "text-gray-400" },
};

function healthColor(score: number | null): string {
  if (score === null) return "#6b7280";
  if (score >= 70) return "#10b981";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<(Project & { owner?: Agent | null })[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);

  const loadData = async () => {
    const [p, t, a] = await Promise.all([getProjects(), getTasks(), getAgents()]);
    setProjects(p);
    setTasks(t);
    setAgents(a);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const taskCountForProject = (name: string) =>
    tasks.filter((t) => t.project === name).length;

  const activeCount = projects.filter((p) => p.status === "active").length;
  const pausedCount = projects.filter((p) => p.status === "paused").length;
  const avgHealth = projects.length > 0
    ? Math.round(
        projects.reduce((sum, p) => sum + (p.health_score ?? 0), 0) / projects.length
      )
    : 0;

  const metrics = [
    { label: "Active", value: activeCount, color: "#10b981" },
    { label: "Paused", value: pausedCount, color: "#f59e0b" },
    { label: "Total", value: projects.length },
    { label: "Avg Health", value: `${avgHealth}%`, color: healthColor(avgHealth) },
  ];

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-purple-400" />
            Projects
          </h1>
          <div className="mt-2">
            <MetricsBar metrics={metrics} />
          </div>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto flex-1">
        {projects.map((project) => {
          const sc = statusColors[project.status] || statusColors.active;
          const tCount = taskCountForProject(project.name);
          return (
            <div
              key={project.id}
              onClick={() => router.push(`/projects/${project.slug}`)}
              className="p-5 rounded-xl bg-[#1a1a1a] border border-[#222] hover:border-[#444] transition-all cursor-pointer group"
              style={{ borderLeftColor: project.color, borderLeftWidth: "3px" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>
                {project.owner && (
                  <AgentBadge
                    name={project.owner.name}
                    color={project.owner.color}
                    size="sm"
                  />
                )}
              </div>

              <div className="flex items-center gap-3 mt-3">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}
                >
                  {project.status}
                </span>
                <span className="text-xs text-gray-500">{tCount} tasks</span>
              </div>

              {/* Health bar */}
              {project.health_score !== null && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-gray-600">Health</span>
                    <span
                      className="text-[10px] font-medium"
                      style={{ color: healthColor(project.health_score) }}
                    >
                      {project.health_score}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${project.health_score}%`,
                        backgroundColor: healthColor(project.health_score),
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-3 text-[10px] text-gray-600">
                Updated {new Date(project.updated_at).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      {showNewModal && (
        <NewProjectModal
          agents={agents}
          onClose={() => setShowNewModal(false)}
          onCreated={() => {
            setShowNewModal(false);
            loadData();
          }}
        />
      )}
    </div>
  );
}
