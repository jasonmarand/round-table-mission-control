"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProjectBySlug, getTasks, getAgents } from "@/lib/data";
import type { Project, Task, Agent } from "@/lib/supabase/types";
import { AgentBadge } from "@/components/agent-badge";
import { KanbanBoard } from "@/components/kanban-board";
import { ArrowLeft, Loader2, BarChart3, CheckSquare, Activity } from "lucide-react";

const statusColors: Record<string, { bg: string; text: string }> = {
  active: { bg: "bg-emerald-500/20", text: "text-emerald-300" },
  paused: { bg: "bg-amber-500/20", text: "text-amber-300" },
  completed: { bg: "bg-blue-500/20", text: "text-blue-300" },
  archived: { bg: "bg-gray-500/20", text: "text-gray-400" },
};

const taskStatuses = [
  { id: "recurring", label: "Recurring", color: "#8b5cf6" },
  { id: "backlog", label: "Backlog", color: "#6b7280" },
  { id: "in_progress", label: "In Progress", color: "#3b82f6" },
  { id: "review", label: "Review", color: "#f59e0b" },
  { id: "done", label: "Done", color: "#10b981" },
] as const;

function healthColor(score: number | null): string {
  if (score === null) return "#6b7280";
  if (score >= 70) return "#10b981";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "activity", label: "Activity", icon: Activity },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [project, setProject] = useState<(Project & { owner?: Agent | null }) | null>(null);
  const [tasks, setTasks] = useState<(Task & { agent?: Agent | null })[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  useEffect(() => {
    Promise.all([getProjectBySlug(slug), getTasks(), getAgents()]).then(
      ([p, t, a]) => {
        setProject(p ?? null);
        setTasks(t);
        setAgents(a);
        setLoading(false);
      }
    );
  }, [slug]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  const projectTasks = tasks.filter((t) => t.project === project.name);
  const sc = statusColors[project.status] || statusColors.active;

  // Agents involved (unique agents assigned to project tasks)
  const involvedAgentIds = [...new Set(projectTasks.map((t) => t.agent_id).filter(Boolean))];
  const involvedAgents = involvedAgentIds
    .map((id) => agents.find((a) => a.id === id))
    .filter(Boolean) as Agent[];

  // Task breakdown by status
  const statusBreakdown = taskStatuses.map((s) => ({
    ...s,
    count: projectTasks.filter((t) => t.status === s.id).length,
  }));
  const totalTasks = projectTasks.length;

  // Kanban columns for Tasks tab
  const kanbanColumns = taskStatuses.map((s) => ({
    id: s.id,
    label: s.label,
    color: s.color,
    items: projectTasks.filter((t) => t.status === s.id).map((t) => ({
      ...t,
      agent: t.agent_id ? agents.find((a) => a.id === t.agent_id) ?? null : null,
    })),
  }));

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/projects")}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div
            className="w-3 h-10 rounded-sm"
            style={{ backgroundColor: project.color }}
          />
          <div>
            <h1 className="text-xl font-bold text-white">{project.name}</h1>
            <p className="text-sm text-gray-400">{project.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1 rounded-full ${sc.bg} ${sc.text}`}>
            {project.status}
          </span>
          {project.owner && (
            <AgentBadge
              name={project.owner.name}
              color={project.owner.color}
              size="md"
            />
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#222] mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-h-0 overflow-auto">
        {activeTab === "overview" && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Project Info */}
            <div className="p-5 rounded-xl bg-[#1a1a1a] border border-[#222]">
              <h3 className="text-sm font-medium text-white mb-4">Project Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Status</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Owner</span>
                  <span className="text-sm text-white">
                    {project.owner?.name || "Unassigned"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Created</span>
                  <span className="text-sm text-gray-300">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Last Updated</span>
                  <span className="text-sm text-gray-300">
                    {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                </div>
                {project.health_score !== null && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-400">Health</span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: healthColor(project.health_score) }}
                      >
                        {project.health_score}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
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
              </div>
            </div>

            {/* Task Breakdown */}
            <div className="p-5 rounded-xl bg-[#1a1a1a] border border-[#222]">
              <h3 className="text-sm font-medium text-white mb-4">
                Task Breakdown
                <span className="ml-2 text-gray-500 font-normal">({totalTasks} total)</span>
              </h3>
              {totalTasks === 0 ? (
                <p className="text-sm text-gray-500">No tasks yet</p>
              ) : (
                <div className="space-y-3">
                  {statusBreakdown.map((s) => (
                    <div key={s.id}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: s.color }}
                          />
                          <span className="text-xs text-gray-400">{s.label}</span>
                        </div>
                        <span className="text-xs text-gray-300">{s.count}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: totalTasks > 0 ? `${(s.count / totalTasks) * 100}%` : "0%",
                            backgroundColor: s.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Assigned Agents */}
            <div className="p-5 rounded-xl bg-[#1a1a1a] border border-[#222] lg:col-span-2">
              <h3 className="text-sm font-medium text-white mb-4">
                Assigned Agents
                <span className="ml-2 text-gray-500 font-normal">
                  ({involvedAgents.length})
                </span>
              </h3>
              {involvedAgents.length === 0 ? (
                <p className="text-sm text-gray-500">No agents assigned yet</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {involvedAgents.map((agent) => {
                    const agentTaskCount = projectTasks.filter(
                      (t) => t.agent_id === agent.id
                    ).length;
                    return (
                      <div
                        key={agent.id}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#111] border border-[#2a2a2a]"
                      >
                        <AgentBadge
                          name={agent.name}
                          color={agent.color}
                          size="md"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            {agent.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {agentTaskCount} task{agentTaskCount !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="h-full">
            {projectTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <CheckSquare className="w-10 h-10 text-purple-400/30 mb-3" />
                <p className="text-gray-500 text-sm">No tasks for this project</p>
                <p className="text-gray-600 text-xs mt-1">
                  Create tasks on the Tasks board and assign them to this project
                </p>
              </div>
            ) : (
              <KanbanBoard columns={kanbanColumns} />
            )}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="flex flex-col items-center justify-center py-20">
            <Activity className="w-10 h-10 text-purple-400/30 mb-3" />
            <p className="text-gray-500 text-sm">Activity log coming soon</p>
            <p className="text-gray-600 text-xs mt-1">
              Project history, changes, and agent actions will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
