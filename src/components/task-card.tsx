"use client";

import { AgentBadge } from "./agent-badge";
import { StatusDropdown } from "./status-dropdown";

interface TaskCardProps {
  title: string;
  description?: string | null;
  agentName?: string;
  agentColor?: string;
  project?: string | null;
  timestamp?: string;
  status?: string;
  onChangeStatus?: (status: string) => void;
}

export function TaskCard({
  title,
  description,
  agentName,
  agentColor,
  project,
  timestamp,
  status,
  onChangeStatus,
}: TaskCardProps) {
  return (
    <div className="bg-[#1e1e1e] border border-[#333] rounded-lg p-3 hover:border-[#555] transition-colors cursor-pointer group">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors line-clamp-2">
          {title}
        </h4>
        {agentName && agentColor && (
          <AgentBadge name={agentName} color={agentColor} size="sm" />
        )}
      </div>
      {description && (
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>
      )}
      <div className="flex items-center gap-2 mt-2">
        {project && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
            {project}
          </span>
        )}
        {status && onChangeStatus && (
          <StatusDropdown currentStatus={status} onChangeStatus={onChangeStatus} />
        )}
        {timestamp && (
          <span className="text-[10px] text-gray-600 ml-auto">
            {new Date(timestamp).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}
