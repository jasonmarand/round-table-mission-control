"use client";

import { Search, Bell, Settings, Pause } from "lucide-react";

export function TopBar() {
  return (
    <div className="h-14 border-b border-[#222] bg-[#0a0a0a] flex items-center justify-between px-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
        />
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-sm text-gray-400 hover:text-white transition-colors">
          <Pause className="w-3.5 h-3.5" />
          Pause
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-sm text-amber-300 hover:bg-amber-500/30 transition-colors">
          <span>👑</span>
          Ping Arthur
        </button>
        <button className="p-2 text-gray-500 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
        </button>
        <button className="p-2 text-gray-500 hover:text-white transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
