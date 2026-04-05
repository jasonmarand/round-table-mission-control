import type { Agent, Task, ContentItem, ScheduledTask, MemoryEntry } from "./supabase/types";

export const agents: Agent[] = [
  { id: "a1", name: "Arthur", role: "Chief Executive Orchestrator", description: "Executive command, strategic coordination, and final decision-maker of the Round Table.", color: "#f59e0b", avatar_url: null, is_active: true, created_at: "2026-04-01T00:00:00Z" },
  { id: "a2", name: "Merlin", role: "Strategic Intelligence", description: "Research, strategy, market insight, synthesis, and opportunity design.", color: "#8b5cf6", avatar_url: null, is_active: true, created_at: "2026-04-01T00:00:00Z" },
  { id: "a3", name: "Lancelot", role: "Build & Ship", description: "Build, write, implement, and ship execution. Turns plans into artifacts.", color: "#3b82f6", avatar_url: null, is_active: true, created_at: "2026-04-01T00:00:00Z" },
  { id: "a4", name: "Gawain", role: "Operations & Workflow", description: "Workflow, operations, sequencing, coordination, and launch execution.", color: "#10b981", avatar_url: null, is_active: true, created_at: "2026-04-01T00:00:00Z" },
  { id: "a5", name: "Percival", role: "Testing & QA", description: "Testing, validation, verification, and quality assurance.", color: "#06b6d4", avatar_url: null, is_active: true, created_at: "2026-04-01T00:00:00Z" },
  { id: "a6", name: "Galahad", role: "Standards & Governance", description: "Standards, safety, policy, governance, and operational cleanliness.", color: "#e5e7eb", avatar_url: null, is_active: true, created_at: "2026-04-01T00:00:00Z" },
  { id: "a7", name: "Mordred", role: "Adversarial Review", description: "Adversarial testing, stress testing, challenge, and weakness finding.", color: "#ef4444", avatar_url: null, is_active: true, created_at: "2026-04-01T00:00:00Z" },
  { id: "a8", name: "Guinevere", role: "UX & Polish", description: "UX clarity, polish, presentation quality, and external readiness.", color: "#ec4899", avatar_url: null, is_active: true, created_at: "2026-04-01T00:00:00Z" },
];

export const tasks: Task[] = [
  { id: "t1", title: "Daily standup summary", description: "Compile standup notes from all agents", status: "recurring", agent_id: "a4", project: "Operations", priority: "medium", created_at: "2026-04-03T09:00:00Z", updated_at: "2026-04-03T09:00:00Z" },
  { id: "t2", title: "Build Mission Control dashboard", description: "Full Next.js dashboard with Supabase backend", status: "in_progress", agent_id: "a3", project: "Mission Control", priority: "high", created_at: "2026-04-05T12:00:00Z", updated_at: "2026-04-05T12:00:00Z" },
  { id: "t3", title: "Research competitor positioning", description: "Analyze ValidatorAI, IdeaProof, and Stratup.ai feature sets", status: "in_progress", agent_id: "a2", project: "Strategy", priority: "high", created_at: "2026-04-04T10:00:00Z", updated_at: "2026-04-04T14:00:00Z" },
  { id: "t4", title: "ContentReforge Stripe integration", description: "Wire up Stripe subscription tiers for paid users", status: "backlog", agent_id: "a3", project: "ContentReforge", priority: "medium", created_at: "2026-04-02T08:00:00Z", updated_at: "2026-04-02T08:00:00Z" },
  { id: "t5", title: "Pre-train local model for voice", description: "Fine-tune local Whisper + Piper for Arthur's voice pipeline", status: "backlog", agent_id: "a3", project: "Voice", priority: "low", created_at: "2026-04-01T12:00:00Z", updated_at: "2026-04-01T12:00:00Z" },
  { id: "t6", title: "Security audit — auth flow", description: "Review Supabase Auth RLS policies and token handling", status: "review", agent_id: "a6", project: "Mission Control", priority: "high", created_at: "2026-04-04T16:00:00Z", updated_at: "2026-04-05T10:00:00Z" },
  { id: "t7", title: "Stress test API endpoints", description: "Load test /api/repurpose with 100 concurrent requests", status: "review", agent_id: "a7", project: "ContentReforge", priority: "medium", created_at: "2026-04-04T11:00:00Z", updated_at: "2026-04-05T09:00:00Z" },
  { id: "t8", title: "Migrate memory to Supabase", description: "Move MEMORY.md and daily files to structured DB", status: "done", agent_id: "a3", project: "Mission Control", priority: "medium", created_at: "2026-04-01T08:00:00Z", updated_at: "2026-04-03T15:00:00Z" },
  { id: "t9", title: "Build Calendar View", description: "Scheduled tasks calendar with weekly grid", status: "done", agent_id: "a3", project: "Mission Control", priority: "medium", created_at: "2026-04-02T10:00:00Z", updated_at: "2026-04-04T12:00:00Z" },
  { id: "t10", title: "Add Global Search", description: "Cross-entity search across tasks, memory, and content", status: "done", agent_id: "a3", project: "Mission Control", priority: "low", created_at: "2026-04-03T08:00:00Z", updated_at: "2026-04-05T08:00:00Z" },
  { id: "t11", title: "Build Chat Interface", description: "Real-time council chat between agents", status: "done", agent_id: "a3", project: "Mission Control", priority: "medium", created_at: "2026-04-01T10:00:00Z", updated_at: "2026-04-03T18:00:00Z" },
  { id: "t12", title: "Launch TikTok campaign — ContentReforge", description: "Slideshow posts via Postiz for ContentReforge launch", status: "in_progress", agent_id: "a8", project: "Marketing", priority: "medium", created_at: "2026-04-04T09:00:00Z", updated_at: "2026-04-05T11:00:00Z" },
];

export const contentItems: ContentItem[] = [
  { id: "c1", title: "I just spent $20,000 on AI agents. Here's why.", description: "Deep dive into building an autonomous AI operating system and what it actually costs.", stage: "thumbnail", touches: 3, agent_id: "a8", created_at: "2026-04-03T14:00:00Z", updated_at: "2026-04-05T10:00:00Z" },
  { id: "c2", title: "How I replaced my entire team with AI", description: "Story of Round Table OS — 8 specialized agents running a business.", stage: "ideas", touches: 0, agent_id: null, created_at: "2026-04-05T08:00:00Z", updated_at: "2026-04-05T08:00:00Z" },
  { id: "c3", title: "The future of solo founders", description: "Why AI-native operating systems change the economics of startups.", stage: "scripting", touches: 1, agent_id: "a2", created_at: "2026-04-04T10:00:00Z", updated_at: "2026-04-05T09:00:00Z" },
  { id: "c4", title: "ContentReforge demo walkthrough", description: "Screen recording showing 1 blog post → 6 formats in 30 seconds.", stage: "filming", touches: 2, agent_id: "a3", created_at: "2026-04-02T15:00:00Z", updated_at: "2026-04-04T16:00:00Z" },
];

export const scheduledTasks: ScheduledTask[] = [
  { id: "s1", name: "Mission control check", description: "Health check across all systems", schedule_type: "always", cron_expression: "*/30 * * * *", frequency_label: "Every 30 min", color: "#f59e0b", next_run_at: "2026-04-05T17:30:00Z", last_run_at: "2026-04-05T17:00:00Z", is_active: true, created_at: "2026-04-01T00:00:00Z" },
  { id: "s2", name: "Morning brief", description: "Daily summary of priorities and blockers", schedule_type: "cron", cron_expression: "0 8 * * *", frequency_label: "Daily at 8 AM", color: "#ef4444", next_run_at: "2026-04-06T12:00:00Z", last_run_at: "2026-04-05T12:00:00Z", is_active: true, created_at: "2026-04-01T00:00:00Z" },
  { id: "s3", name: "Competitor YouTube scan", description: "Scan competitor YouTube channels for new content", schedule_type: "cron", cron_expression: "0 14 * * *", frequency_label: "Daily at 2 PM", color: "#8b5cf6", next_run_at: "2026-04-05T18:00:00Z", last_run_at: "2026-04-04T18:00:00Z", is_active: true, created_at: "2026-04-01T00:00:00Z" },
  { id: "s4", name: "AI scarcity research", description: "Monitor AI industry news and trends", schedule_type: "cron", cron_expression: "0 22 * * *", frequency_label: "Daily at 10 PM", color: "#6b7280", next_run_at: "2026-04-06T02:00:00Z", last_run_at: "2026-04-05T02:00:00Z", is_active: true, created_at: "2026-04-01T00:00:00Z" },
  { id: "s5", name: "Competitor mentions", description: "Track mentions of competitors across social media", schedule_type: "cron", cron_expression: "0 16 * * 1,3,5", frequency_label: "Mon/Wed/Fri at 4 PM", color: "#10b981", next_run_at: "2026-04-07T20:00:00Z", last_run_at: "2026-04-04T20:00:00Z", is_active: true, created_at: "2026-04-01T00:00:00Z" },
  { id: "s6", name: "Newsletter reminder", description: "Draft and review weekly newsletter", schedule_type: "cron", cron_expression: "0 10 * * 4", frequency_label: "Thursdays at 10 AM", color: "#ec4899", next_run_at: "2026-04-10T14:00:00Z", last_run_at: "2026-04-03T14:00:00Z", is_active: true, created_at: "2026-04-01T00:00:00Z" },
];

export const memoryEntries: MemoryEntry[] = [
  { id: "m1", agent_id: "a1", content: "Dispatched Lancelot to build Mission Control dashboard. Spec includes Tasks, Content Pipeline, Calendar, Memory, Team, and Office views. Targeting Vercel deployment.", category: "mission", metadata: {}, created_at: "2026-04-05T16:30:00Z" },
  { id: "m2", agent_id: "a2", content: "Completed competitor analysis. ValidatorAI focuses on idea validation only. IdeaProof has broader scope but weak on prioritization. Our wedge: scoring by money, autonomy, and speed.", category: "research", metadata: {}, created_at: "2026-04-05T15:00:00Z" },
  { id: "m3", agent_id: "a3", content: "ContentReforge production deployment verified. All 6 output formats generating correctly. Database persistence confirmed with test ID 88d3adb9.", category: "build", metadata: {}, created_at: "2026-04-05T14:00:00Z" },
  { id: "m4", agent_id: "a4", content: "Workflow update: Paperclip hiring pipeline complete. ROU-30, ROU-31, ROU-32 all marked done. Rubric calibration approved by CTO. Interview packet and debrief template finalized.", category: "operations", metadata: {}, created_at: "2026-04-05T12:00:00Z" },
  { id: "m5", agent_id: "a5", content: "QA pass on ContentReforge API. 200 OK on production endpoint. 6 outputs saved per request. Mock mode verified for demos.", category: "testing", metadata: {}, created_at: "2026-04-04T18:00:00Z" },
  { id: "m6", agent_id: "a7", content: "Stress test flagged: /api/repurpose has no rate limiting. Recommend adding per-IP throttle before public launch. Also no input sanitization on 'text' field — XSS risk.", category: "security", metadata: {}, created_at: "2026-04-04T16:00:00Z" },
  { id: "m7", agent_id: "a6", content: "Standards review: Supabase RLS policies need tightening. Current 'allow all' is acceptable for dev but must be scoped before beta users get access.", category: "governance", metadata: {}, created_at: "2026-04-04T14:00:00Z" },
  { id: "m8", agent_id: "a8", content: "UX audit on ContentReforge landing page. CTA is clear but above-the-fold copy needs sharpening. Recommended: lead with the transformation, not the feature.", category: "ux", metadata: {}, created_at: "2026-04-04T11:00:00Z" },
  { id: "m9", agent_id: "a1", content: "Strategic decision: Position as AI startup idea scoring for solo founders. Stop guessing what to build — score business ideas by money, autonomy, and speed.", category: "strategy", metadata: {}, created_at: "2026-04-03T20:00:00Z" },
  { id: "m10", agent_id: "a2", content: "Market research complete. Three revenue paths identified: (1) Productized B2B service, (2) SaaS + DFY, (3) Digital products + affiliate. SaaS model scores highest on automation leverage and defensibility.", category: "research", metadata: {}, created_at: "2026-04-03T16:00:00Z" },
  { id: "m11", agent_id: "a3", content: "Voice chat pipeline proven end-to-end. Whisper transcription + Ollama reply + Piper TTS. Issue: dual bot polling conflict. Solution: integrate into OpenClaw native plugin.", category: "build", metadata: {}, created_at: "2026-04-02T15:00:00Z" },
  { id: "m12", agent_id: "a1", content: "X API credentials configured. Bearer token authenticated. Access tokens need regeneration for write permissions — app was in read-only mode when tokens were generated.", category: "infrastructure", metadata: {}, created_at: "2026-04-01T18:00:00Z" },
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function getTasksByStatus(status: Task["status"]): Task[] {
  return tasks.filter((t) => t.status === status);
}

export function getContentByStage(stage: ContentItem["stage"]): ContentItem[] {
  return contentItems.filter((c) => c.stage === stage);
}
