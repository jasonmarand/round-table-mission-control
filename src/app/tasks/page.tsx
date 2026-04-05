"use client";

import { useEffect, useState, useCallback } from "react";
import { KanbanBoard } from "@/components/kanban-board";
import { MetricsBar } from "@/components/metrics-bar";
import { NewTaskModal } from "@/components/new-task-modal";
import { getTasks, getAgents, getProjects, updateTask } from "@/lib/data";
import { notifyAgent } from "@/lib/agent-dispatch";
import type { Task, Agent, Project } from "@/lib/supabase/types";
import { Plus, Loader2 } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<(Task & { agent?: Agent | null })[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);

  const loadData = useCallback(async () => {
    const [t, a, p] = await Promise.all([getTasks(), getAgents(), getProjects()]);
    setTasks(t);
    setAgents(a);
    setProjects(p);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChangeStatus = async (taskId: string, newStatus: string) => {
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: newStatus as Task["status"] } : t
      )
    );
    await updateTask(taskId, { status: newStatus as Task["status"] });
  };

  const byStatus = (status: string) => tasks.filter((t) => t.status === status);
  const inProgress = byStatus("in_progress");
  const done = byStatus("done");
  const total = tasks.length;
  const completion = total > 0 ? Math.round((done.length / total) * 100) : 0;

  const columns = [
    { id: "recurring", label: "Recurring", color: "#8b5cf6", items: byStatus("recurring") },
    { id: "backlog", label: "Backlog", color: "#6b7280", items: byStatus("backlog") },
    { id: "in_progress", label: "In Progress", color: "#3b82f6", items: inProgress },
    { id: "review", label: "Review", color: "#f59e0b", items: byStatus("review") },
    { id: "done", label: "Done", color: "#10b981", items: done },
  ];

  const metrics = [
    { label: "In progress", value: inProgress.length, color: "#3b82f6" },
    { label: "Total", value: total },
    { label: "Completion", value: `${completion}%`, color: "#10b981" },
  ];

  const handleTaskCreated = useCallback(
    async (task: Task | null) => {
      if (!task) {
        await loadData();
        return;
      }

      const agent = task.agent_id
        ? task.agent ?? agents.find((a) => a.id === task.agent_id) ?? null
        : null;
      const withAgent = { ...task, agent };

      setTasks((prev) => [withAgent, ...prev]);

      if (withAgent.agent_id) {
        const acknowledged = await notifyAgent(withAgent);
        if (acknowledged) {
          const nextStatus: Task["status"] = withAgent.status === "backlog" ? "in_progress" : withAgent.status;
          setTasks((prev) =>
            prev.map((t) => (t.id === withAgent.id ? { ...t, status: nextStatus } : t))
          );
          if (nextStatus !== withAgent.status) {
            await updateTask(withAgent.id, { status: nextStatus });
          }
        }
      }
    },
    [agents, loadData]
  );

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
          <h1 className="text-2xl font-bold text-white">Tasks Board</h1>
          <div className="mt-2">
            <MetricsBar metrics={metrics} />
          </div>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>
      <div className="flex-1 min-h-0">
        <KanbanBoard columns={columns} onChangeTaskStatus={handleChangeStatus} />
      </div>

      {showNewModal && (
        <NewTaskModal
          agents={agents}
          projects={projects}
          onClose={() => setShowNewModal(false)}
          onCreated={handleTaskCreated}
        />
      )}
    </div>
  );
}
