"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAgents } from "@/lib/data";
import { agentFilesMap, type AgentFile } from "@/lib/agent-files";
import { agentSkillsMap, type AgentSkill } from "@/lib/agent-skills";
import type { Agent } from "@/lib/supabase/types";
import { AgentBadge } from "@/components/agent-badge";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  Plus,
  Play,
  Pause,
  FileText,
  Loader2,
  Activity,
  Settings,
  Zap,
  BarChart3,
  BookOpen,
} from "lucide-react";

const tabs = [
  { id: "instructions", label: "Instructions", icon: BookOpen },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "configuration", label: "Configuration", icon: Settings },
  { id: "runs", label: "Runs", icon: Activity },
  { id: "budget", label: "Budget", icon: BarChart3 },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const agentName = decodeURIComponent(params.name as string);

  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("instructions");
  const [selectedFile, setSelectedFile] = useState<AgentFile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const files = agentFilesMap[agentName] || [];

  function handleEdit() {
    if (selectedFile) {
      setEditContent(selectedFile.content);
      setIsEditing(true);
      // Focus textarea after render
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }

  function handleCancel() {
    setIsEditing(false);
    setEditContent("");
  }

  function handleSave() {
    if (selectedFile) {
      // Update local mock data (in production this writes to Supabase / filesystem)
      selectedFile.content = editContent;
      setIsEditing(false);
      setEditContent("");
    }
  }

  function handleFileSelect(file: AgentFile) {
    if (isEditing) {
      // Discard edits when switching files
      setIsEditing(false);
      setEditContent("");
    }
    setSelectedFile(file);
  }

  useEffect(() => {
    getAgents().then((agents) => {
      const found = agents.find(
        (a) => a.name.toLowerCase() === agentName.toLowerCase()
      );
      setAgent(found || null);
      setLoading(false);
    });
  }, [agentName]);

  useEffect(() => {
    if (files.length > 0 && !selectedFile) {
      setSelectedFile(files[0]);
    }
  }, [files, selectedFile]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Agent not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/team")}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <AgentBadge name={agent.name} color={agent.color} size="lg" />
          <div>
            <h1 className="text-xl font-bold text-white">{agent.name}</h1>
            <p className="text-sm text-gray-400">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm hover:bg-emerald-500/30 transition-colors">
            <Plus className="w-4 h-4" />
            Assign Task
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm hover:bg-purple-500/30 transition-colors">
            <Play className="w-4 h-4" />
            Run Heartbeat
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-gray-400 text-sm hover:text-white transition-colors">
            <Pause className="w-4 h-4" />
            Pause
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#222] mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {activeTab === "instructions" && (
          <div className="flex gap-6 h-full">
            {/* File Sidebar */}
            <div className="w-64 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300">Files</h3>
                <button className="p-1 rounded text-gray-600 hover:text-gray-300 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                {files.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => handleFileSelect(file)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedFile?.name === file.name
                        ? "bg-[#1e1e1e] border border-[#333] text-white"
                        : "text-gray-400 hover:bg-[#1a1a1a] hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 shrink-0 text-gray-500" />
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ml-2 ${
                        file.label === "ENTRY"
                          ? "bg-purple-500/20 text-purple-300"
                          : "text-gray-600"
                      }`}
                    >
                      {file.label || file.size}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* File Content */}
            <div className="flex-1 min-w-0 overflow-auto relative">
              {selectedFile ? (
                <div className="h-full flex flex-col">
                  <div className="mb-4 pb-3 border-b border-[#222] flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium text-white">
                        {selectedFile.name}
                      </h3>
                      <p className="text-xs text-gray-600">markdown file</p>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={handleEdit}
                        className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-sm text-gray-400 hover:text-white hover:border-[#555] transition-colors"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="flex-1 flex flex-col min-h-0">
                      <textarea
                        ref={textareaRef}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="flex-1 w-full bg-[#111] border border-[#333] rounded-lg p-4 text-sm text-gray-200 font-mono leading-relaxed resize-none focus:outline-none focus:border-purple-500/50 placeholder-gray-600"
                        spellCheck={false}
                      />
                      {/* Sticky Cancel/Save bar */}
                      <div className="sticky bottom-0 flex items-center justify-end gap-3 py-3 mt-3 border-t border-[#222] bg-[#0a0a0a]">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={handleEdit}
                      className="flex-1 cursor-text prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-code:text-purple-300 prose-code:bg-[#1a1a1a] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-[#333] prose-blockquote:border-l-purple-500 prose-blockquote:text-gray-400 prose-a:text-purple-400 prose-hr:border-[#333]"
                    >
                      <ReactMarkdown>{selectedFile.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p className="text-sm">Select a file to view</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <SkillsTab agentName={agent.name} />
        )}

        {activeTab === "configuration" && (
          <div className="max-w-2xl space-y-6">
            <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#222]">
              <h3 className="text-sm font-medium text-white mb-3">General</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Name</span>
                  <span className="text-sm text-white">{agent.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Role</span>
                  <span className="text-sm text-white">{agent.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Status</span>
                  <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Color</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: agent.color }}
                    />
                    <span className="text-sm text-gray-300 font-mono">
                      {agent.color}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#222]">
              <h3 className="text-sm font-medium text-white mb-3">
                Heartbeat
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Provider</span>
                  <span className="text-sm text-white">Ollama</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Model</span>
                  <span className="text-sm text-white font-mono text-xs">
                    llama3.2:1b
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Interval</span>
                  <span className="text-sm text-white">60s</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "runs" && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Activity className="w-10 h-10 text-purple-400/30 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No recent runs</p>
              <p className="text-gray-600 text-xs mt-1">
                Agent execution history will appear here
              </p>
            </div>
          </div>
        )}

        {activeTab === "budget" && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <BarChart3 className="w-10 h-10 text-purple-400/30 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Budget tracking coming soon</p>
              <p className="text-gray-600 text-xs mt-1">
                Token usage, API costs, and budget limits
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────── Skills Tab ─────────────────────────────── */

function SkillsTab({ agentName }: { agentName: string }) {
  const skills = agentSkillsMap[agentName] || [];
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const installed = skills.filter((s) => s.source === "installed");
  const custom = skills.filter((s) => s.source === "custom");
  const enabledCount = skills.filter((s) => s.enabled).length;

  return (
    <div className="h-full flex flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-5">
        <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
          View company skills library →
        </button>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm hover:bg-emerald-500/30 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <div className="flex-1 overflow-auto space-y-6">
        {/* Installed Skills */}
        {installed.length > 0 && (
          <SkillGroup
            title="Installed Skills"
            badge={`${installed.length}`}
            skills={installed}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        )}

        {/* Custom Skills */}
        {custom.length > 0 && (
          <SkillGroup
            title="Custom Skills"
            badge={`${custom.length}`}
            skills={custom}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        )}
      </div>

      {/* Footer summary */}
      <div className="mt-4 pt-4 border-t border-[#222]">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-8">
            <div>
              <span className="text-gray-500">Adapter</span>
              <span className="ml-3 text-white font-medium">OpenClaw (local)</span>
            </div>
            <div>
              <span className="text-gray-500">Skills applied</span>
              <span className="ml-3 text-white font-medium">Applied when the agent runs</span>
            </div>
          </div>
          <div>
            <span className="text-gray-500">Selected skills</span>
            <span className="ml-3 text-white font-bold">{enabledCount}</span>
          </div>
        </div>
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <AddSkillModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

function SkillGroup({
  title,
  badge,
  skills,
  expanded,
  setExpanded,
}: {
  title: string;
  badge: string;
  skills: AgentSkill[];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] text-xs text-gray-400">
          {title}
        </div>
        <span className="text-[10px] text-gray-600">{badge} skills</span>
      </div>
      <div className="border border-[#2a2a2a] rounded-xl overflow-hidden divide-y divide-[#222]">
        {skills.map((skill) => (
          <div key={skill.id}>
            <div
              className="flex items-center justify-between px-4 py-3 hover:bg-[#111] transition-colors cursor-pointer"
              onClick={() => setExpanded(expanded === skill.id ? null : skill.id)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  skill.enabled ? "bg-emerald-400" : "bg-gray-600"
                }`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{skill.name}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    Will be linked into the effective agent skills directory on the next run.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1a1a1a] border border-[#333] text-gray-500">
                  v{skill.version}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(expanded === skill.id ? null : skill.id);
                  }}
                  className="text-sm text-gray-500 hover:text-purple-400 transition-colors"
                >
                  View
                </button>
              </div>
            </div>

            {/* Expanded detail */}
            {expanded === skill.id && (
              <div className="px-4 pb-4 bg-[#111] border-t border-[#1a1a1a]">
                <div className="pt-3 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-600">Description</span>
                    <p className="text-sm text-gray-300 mt-1 leading-relaxed">{skill.description}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-600">Source</span>
                      <p className="text-sm text-gray-300 mt-1 capitalize">{skill.source}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-600">Version</span>
                      <p className="text-sm text-gray-300 mt-1">{skill.version}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-600">Status</span>
                      <p className={`text-sm mt-1 ${skill.enabled ? "text-emerald-400" : "text-gray-500"}`}>
                        {skill.enabled ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <button className="px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs hover:bg-purple-500/30 transition-colors">
                      View SKILL.md
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-gray-400 text-xs hover:text-white transition-colors">
                      {skill.enabled ? "Disable" : "Enable"}
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs hover:bg-rose-500/20 transition-colors ml-auto">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AddSkillModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        <h2 className="text-lg font-bold text-white mb-1">Add Skill</h2>
        <p className="text-sm text-gray-500 mb-6">Install a skill from ClawHub or create a custom one.</p>

        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-purple-500/30 transition-colors text-left group">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">Browse ClawHub</p>
              <p className="text-xs text-gray-500">Search and install community skills from clawhub.com</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-emerald-500/30 transition-colors text-left group">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">Create Custom Skill</p>
              <p className="text-xs text-gray-500">Write a SKILL.md from scratch or describe what you need</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-amber-500/30 transition-colors text-left group">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors">Import from File</p>
              <p className="text-xs text-gray-500">Upload a SKILL.md or skill directory from your machine</p>
            </div>
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
