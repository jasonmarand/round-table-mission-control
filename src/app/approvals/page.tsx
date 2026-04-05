"use client";

import { Shield, CheckCircle2 } from "lucide-react";

export default function ApprovalsPage() {
  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-purple-400" />
          Approvals
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Review and approve agent actions
        </p>
      </div>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <p className="text-gray-400 text-sm">No pending approvals</p>
        <p className="text-gray-600 text-xs mt-1">
          Agent actions requiring review will appear here
        </p>
      </div>
    </div>
  );
}
