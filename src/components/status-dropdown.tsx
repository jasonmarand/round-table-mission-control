"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const statusOptions = [
  { value: "recurring", label: "Recurring", color: "#8b5cf6" },
  { value: "backlog", label: "Backlog", color: "#6b7280" },
  { value: "in_progress", label: "In Progress", color: "#3b82f6" },
  { value: "review", label: "Review", color: "#f59e0b" },
  { value: "done", label: "Done", color: "#10b981" },
];

interface StatusDropdownProps {
  currentStatus: string;
  onChangeStatus: (status: string) => void;
}

export function StatusDropdown({ currentStatus, onChangeStatus }: StatusDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = statusOptions.find((s) => s.value === currentStatus);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#333] transition-colors"
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: current?.color || "#6b7280" }}
        />
        {current?.label || currentStatus}
        <ChevronDown className="w-2.5 h-2.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl py-1 min-w-[120px]">
          {statusOptions.map((s) => (
            <button
              key={s.value}
              onClick={(e) => {
                e.stopPropagation();
                onChangeStatus(s.value);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left transition-colors ${
                s.value === currentStatus
                  ? "text-white bg-[#2a2a2a]"
                  : "text-gray-400 hover:text-white hover:bg-[#222]"
              }`}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
