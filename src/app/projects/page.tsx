"use client";

import { FolderOpen } from "lucide-react";

const projects = [
  { name: "Mission Control", status: "Active", tasks: 5, color: "#8b5cf6" },
  { name: "ContentReforge", status: "Active", tasks: 3, color: "#3b82f6" },
  { name: "Strategy", status: "Active", tasks: 1, color: "#f59e0b" },
  { name: "Marketing", status: "Active", tasks: 1, color: "#ec4899" },
  { name: "Voice", status: "Backlog", tasks: 1, color: "#10b981" },
  { name: "Operations", status: "Active", tasks: 1, color: "#06b6d4" },
];

export default function ProjectsPage() {
  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FolderOpen className="w-6 h-6 text-purple-400" />
          Projects
        </h1>
        <p className="text-gray-400 text-sm mt-1">Active initiatives and ventures</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.name}
            className="p-4 rounded-xl bg-[#1a1a1a] border border-[#222] hover:border-[#444] transition-all cursor-pointer"
            style={{ borderLeftColor: project.color, borderLeftWidth: "3px" }}
          >
            <h3 className="text-sm font-bold text-white">{project.name}</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                {project.status}
              </span>
              <span className="text-xs text-gray-500">{project.tasks} tasks</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
