"use client";

import { TaskCard } from "./task-card";
import { EmptyState } from "./empty-state";
import { Plus } from "lucide-react";

interface KanbanItem {
  id: string;
  title: string;
  description?: string | null;
  status?: string;
  agent_id?: string | null;
  agent?: { name: string; color: string } | null;
  project?: string | null;
  created_at?: string;
}

interface KanbanColumn {
  id: string;
  label: string;
  color: string;
  items: KanbanItem[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onChangeTaskStatus?: (taskId: string, newStatus: string) => void;
}

export function KanbanBoard({ columns, onChangeTaskStatus }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-full">
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-72">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: column.color }} />
              <h3 className="text-sm font-medium text-gray-300">{column.label}</h3>
              <span className="text-xs text-gray-600 bg-[#2a2a2a] px-2 py-0.5 rounded-full">
                {column.items.length}
              </span>
            </div>
            <button className="text-gray-600 hover:text-gray-300 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {column.items.length === 0 ? (
              <EmptyState message="No items" />
            ) : (
              column.items.map((item) => (
                <TaskCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  agentName={item.agent?.name}
                  agentColor={item.agent?.color}
                  project={item.project}
                  timestamp={item.created_at}
                  status={item.status}
                  onChangeStatus={
                    onChangeTaskStatus
                      ? (newStatus) => onChangeTaskStatus(item.id, newStatus)
                      : undefined
                  }
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
