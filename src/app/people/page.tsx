"use client";

import { Users } from "lucide-react";

export default function PeoplePage() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-6">
          <Users className="w-10 h-10 text-purple-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">People</h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Contacts, collaborators, and stakeholders connected to your operations.
        </p>
      </div>
    </div>
  );
}
