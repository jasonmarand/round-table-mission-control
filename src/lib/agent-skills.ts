export interface AgentSkill {
  id: string;
  name: string;
  description: string;
  version: string;
  source: "installed" | "clawhub" | "custom";
  enabled: boolean;
  skillMd: string;
}

import { skillContent } from "./skill-content";

// Helper to build a skill with auto-resolved skillMd content
function skill(id: string, name: string, description: string, version: string, source: AgentSkill["source"], enabled: boolean): AgentSkill {
  return { id, name, description, version, source, enabled, skillMd: skillContent[id] || `# ${name}\n\n${description}` };
}

// Real skills from the OpenClaw workspace, mapped to agents by role

const systemSkills: AgentSkill[] = [
  skill("github", "github", "GitHub operations via gh CLI: issues, PRs, CI runs, code review, API queries.", "1.0.0", "installed", true),
  skill("coding-agent", "coding-agent", "Delegate coding tasks to Codex, Claude Code, or Pi agents via background process.", "1.0.0", "installed", true),
  skill("gemini", "gemini", "Gemini CLI for one-shot Q&A, summaries, and generation.", "1.0.0", "installed", true),
];

export const agentSkillsMap: Record<string, AgentSkill[]> = {
  Arthur: [
    ...systemSkills,
    skill("venture-factory", "venture-factory", "Design and run multi-agent business-building pipelines for app factory, website factory, online business factory, service business factory, research/scraping workflows, idea evaluation, wireframing, MVP build, testing, iteration, deployment, marketing, social media operations, and reply workflows.", "1.0.0", "installed", true),
    skill("gh-issues", "gh-issues", "Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs, then monitor and address PR review comments.", "1.0.0", "installed", true),
    skill("skill-creator", "skill-creator", "Create, edit, improve, or audit AgentSkills and SKILL.md files.", "1.0.0", "installed", true),
    skill("clawhub", "clawhub", "Use the ClawHub CLI to search, install, update, and publish agent skills from clawhub.com.", "1.0.0", "installed", true),
    skill("healthcheck", "healthcheck", "Host security hardening and risk-tolerance configuration for OpenClaw deployments.", "1.0.0", "installed", true),
    skill("weather", "weather", "Get current weather and forecasts via wttr.in or Open-Meteo. No API key needed.", "1.0.0", "installed", true),
    skill("mcporter", "mcporter", "List, configure, auth, and call MCP servers/tools directly (HTTP or stdio), including ad-hoc servers, config edits, and CLI/type generation.", "1.0.0", "installed", true),
    skill("model-usage", "model-usage", "Summarize per-model usage and cost data from CodexBar for Codex or Claude.", "1.0.0", "installed", true),
    skill("node-connect", "node-connect", "Diagnose OpenClaw node connection and pairing failures for Android, iOS, and macOS companion apps.", "1.0.0", "installed", true),
    skill("clawflow", "clawflow", "Runtime substrate for detached tasks with flow identity, waiting, outputs, and user-facing emergence.", "1.0.0", "installed", true),
  ],
  Merlin: [
    ...systemSkills,
    skill("merlin", "merlin", "Strategic intelligence, research, synthesis, idea evaluation, market framing, and opportunity design for Round Table OS.", "1.0.0", "custom", true),
    skill("venture-factory", "venture-factory", "Design and run multi-agent business-building pipelines. Idea evaluation, scoring, market research.", "1.0.0", "installed", true),
    skill("exa-search", "exa-search", "Use Exa MCP for web search, advanced web search, crawling, and code-context retrieval when Exa is preferred over the default web search provider.", "1.0.0", "installed", true),
    skill("qmd", "qmd", "Local hybrid search for markdown notes and docs. Search notes, find related content, or retrieve documents from indexed collections.", "1.0.0", "installed", true),
  ],
  Lancelot: [
    ...systemSkills,
    skill("lancelot", "lancelot", "Build, write, implement, and ship execution skill for Round Table OS. Turns plans into concrete artifacts, MVPs, codebases, and deployments, especially on a Next.js + Vercel stack.", "1.0.0", "custom", true),
    skill("gh-issues", "gh-issues", "Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs.", "1.0.0", "installed", true),
    skill("skill-creator", "skill-creator", "Create, edit, improve, or audit AgentSkills and SKILL.md files.", "1.0.0", "installed", true),
    skill("video-frames", "video-frames", "Extract frames or short clips from videos using ffmpeg.", "1.0.0", "installed", true),
  ],
  Gawain: [
    ...systemSkills,
    skill("gawain", "gawain", "Workflow, operations, sequencing, coordination, and launch execution skill for Round Table OS.", "1.0.0", "custom", true),
    skill("clawflow", "clawflow", "Runtime substrate for detached tasks with flow identity, waiting, outputs, and user-facing emergence.", "1.0.0", "installed", true),
    skill("clawflow-inbox-triage", "clawflow-inbox-triage", "ClawFlow authoring pattern for inbox triage with intent-based routing, immediate notifications, waiting on outside answers, and rolling summaries.", "1.0.0", "installed", true),
  ],
  Percival: [
    ...systemSkills,
    skill("percival", "percival", "Testing, validation, verification, and quality assurance skill for Round Table OS. Check, test, validate, measure, or verify before release.", "1.0.0", "custom", true),
    skill("healthcheck", "healthcheck", "Host security hardening and risk-tolerance configuration for OpenClaw deployments.", "1.0.0", "installed", true),
  ],
  Galahad: [
    ...systemSkills,
    skill("galahad", "galahad", "Standards, safety, policy, governance, and cleanliness skill for Round Table OS. Review systems, workflows, content, or operations for standards, risk posture, compliance boundaries, and governance quality.", "1.0.0", "custom", true),
    skill("healthcheck", "healthcheck", "Host security hardening and risk-tolerance configuration for OpenClaw deployments.", "1.0.0", "installed", true),
  ],
  Mordred: [
    ...systemSkills,
    skill("mordred", "mordred", "Adversarial review, stress testing, challenge, downside analysis, and attack-minded evaluation skill for Round Table OS. Expose weaknesses before they reach production.", "1.0.0", "custom", true),
    skill("healthcheck", "healthcheck", "Host security hardening and risk-tolerance configuration for OpenClaw deployments.", "1.0.0", "installed", true),
  ],
  Guinevere: [
    ...systemSkills,
    skill("guinevere", "guinevere", "UX clarity, polish, presentation quality, messaging refinement, and external readiness skill for Round Table OS.", "1.0.0", "custom", true),
    skill("tiktok-app-marketing", "tiktok-app-marketing", "Automate TikTok slideshow marketing: competitor research, AI images, text overlays, posting via Postiz, analytics tracking, hook testing, CTA optimization, and conversion tracking with RevenueCat.", "1.0.0", "installed", true),
  ],
};
