"use client";

import { KanbanBoard } from "@/components/kanban-board";
import { MetricsBar } from "@/components/metrics-bar";
import { tasks } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export default function TasksPage() {
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

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks Board</h1>
          <div className="mt-2">
            <MetricsBar metrics={metrics} />
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>
      <div className="flex-1 min-h-0">
        <KanbanBoard columns={columns} />
      </div>
    </div>
  );
}
