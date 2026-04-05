"use client";

import { useEffect, useState } from "react";
import { getScheduledTasks } from "@/lib/data";
import type { ScheduledTask } from "@/lib/supabase/types";
import { formatRelativeTime } from "@/lib/utils";
import { Clock, Zap, Loader2 } from "lucide-react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getTaskDays(task: ScheduledTask): number[] {
  if (task.schedule_type === "always") return [0, 1, 2, 3, 4, 5, 6];
  if (!task.cron_expression) return [];
  const parts = task.cron_expression.split(" ");
  const dayPart = parts[4];
  if (dayPart === "*") return [0, 1, 2, 3, 4, 5, 6];
  return dayPart.split(",").map(Number);
}

export default function CalendarPage() {
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScheduledTasks().then((data) => {
      setTasks(data);
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

  const alwaysRunning = tasks.filter((t) => t.schedule_type === "always");
  const cronTasks = tasks.filter((t) => t.schedule_type === "cron");
  const sortedNext = [...tasks]
    .filter((t) => t.next_run_at)
    .sort((a, b) => new Date(a.next_run_at!).getTime() - new Date(b.next_run_at!).getTime());

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Scheduled Tasks</h1>
          <p className="text-gray-400 text-sm mt-1">Here&apos;s a summary of your routine</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-sm text-white">Week</button>
          <button className="px-3 py-1.5 rounded-lg bg-[#0a0a0a] border border-[#333] text-sm text-gray-400 hover:text-white transition-colors">Today</button>
        </div>
      </div>

      {alwaysRunning.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium">
              <Zap className="w-3 h-3" />Always Running
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {alwaysRunning.map((task) => (
              <div key={task.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a1a1a] border border-[#333]">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: task.color }} />
                <span className="text-sm text-white">{task.name}</span>
                <span className="text-xs text-gray-500">• {task.frequency_label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div key={day} className="text-center text-xs text-gray-500 pb-2">{day}</div>
          ))}
          {days.map((_, dayIndex) => (
            <div key={dayIndex} className="space-y-1 min-h-[120px]">
              {cronTasks
                .filter((task) => getTaskDays(task).includes(dayIndex))
                .map((task) => (
                  <div key={task.id} className="rounded-md px-2 py-1.5 text-[10px] font-medium truncate cursor-pointer hover:opacity-80 transition-opacity" style={{ backgroundColor: task.color + "20", color: task.color, borderLeft: `2px solid ${task.color}` }}>
                    {task.name}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-gray-400" />
          <h2 className="text-sm font-medium text-gray-300">Next Up</h2>
        </div>
        <div className="space-y-2">
          {sortedNext.map((task) => (
            <div key={task.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#1a1a1a] border border-[#222] hover:border-[#333] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: task.color }} />
                <span className="text-sm text-purple-300 hover:text-purple-200 cursor-pointer">{task.name}</span>
              </div>
              <span className="text-xs text-gray-500">{formatRelativeTime(task.next_run_at!)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
