"use client";

import { Building2, Sparkles } from "lucide-react";

export default function OfficePage() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-6">
          <Building2 className="w-10 h-10 text-purple-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">The Virtual Office</h1>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          A pixel-art virtual office where you can see your agents at their
          desks, hold council meetings, and watch work happen in real-time.
        </p>
        <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
          <Sparkles className="w-4 h-4" />
          Coming Soon — Phase 2
        </div>
      </div>
    </div>
  );
}
