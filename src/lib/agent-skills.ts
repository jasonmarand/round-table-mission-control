export interface AgentSkill {
  id: string;
  name: string;
  description: string;
  version: string;
  source: "installed" | "clawhub" | "custom";
  enabled: boolean;
}

// Real skills from the OpenClaw workspace, mapped to agents by role

const systemSkills: AgentSkill[] = [
  { id: "github", name: "github", description: "GitHub operations via gh CLI: issues, PRs, CI runs, code review, API queries.", version: "1.0.0", source: "installed", enabled: true },
  { id: "coding-agent", name: "coding-agent", description: "Delegate coding tasks to Codex, Claude Code, or Pi agents via background process.", version: "1.0.0", source: "installed", enabled: true },
  { id: "gemini", name: "gemini", description: "Gemini CLI for one-shot Q&A, summaries, and generation.", version: "1.0.0", source: "installed", enabled: true },
];

export const agentSkillsMap: Record<string, AgentSkill[]> = {
  Arthur: [
    ...systemSkills,
    { id: "venture-factory", name: "venture-factory", description: "Design and run multi-agent business-building pipelines for app factory, website factory, online business factory, service business factory, research/scraping workflows, idea evaluation, wireframing, MVP build, testing, iteration, deployment, marketing, social media operations, and reply workflows.", version: "1.0.0", source: "installed", enabled: true },
    { id: "gh-issues", name: "gh-issues", description: "Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs, then monitor and address PR review comments.", version: "1.0.0", source: "installed", enabled: true },
    { id: "skill-creator", name: "skill-creator", description: "Create, edit, improve, or audit AgentSkills and SKILL.md files.", version: "1.0.0", source: "installed", enabled: true },
    { id: "clawhub", name: "clawhub", description: "Use the ClawHub CLI to search, install, update, and publish agent skills from clawhub.com.", version: "1.0.0", source: "installed", enabled: true },
    { id: "healthcheck", name: "healthcheck", description: "Host security hardening and risk-tolerance configuration for OpenClaw deployments.", version: "1.0.0", source: "installed", enabled: true },
    { id: "weather", name: "weather", description: "Get current weather and forecasts via wttr.in or Open-Meteo. No API key needed.", version: "1.0.0", source: "installed", enabled: true },
    { id: "mcporter", name: "mcporter", description: "List, configure, auth, and call MCP servers/tools directly (HTTP or stdio), including ad-hoc servers, config edits, and CLI/type generation.", version: "1.0.0", source: "installed", enabled: true },
    { id: "model-usage", name: "model-usage", description: "Summarize per-model usage and cost data from CodexBar for Codex or Claude.", version: "1.0.0", source: "installed", enabled: true },
    { id: "node-connect", name: "node-connect", description: "Diagnose OpenClaw node connection and pairing failures for Android, iOS, and macOS companion apps.", version: "1.0.0", source: "installed", enabled: true },
    { id: "clawflow", name: "clawflow", description: "Runtime substrate for detached tasks with flow identity, waiting, outputs, and user-facing emergence.", version: "1.0.0", source: "installed", enabled: true },
  ],
  Merlin: [
    ...systemSkills,
    { id: "merlin", name: "merlin", description: "Strategic intelligence, research, synthesis, idea evaluation, market framing, and opportunity design for Round Table OS.", version: "1.0.0", source: "custom", enabled: true },
    { id: "venture-factory", name: "venture-factory", description: "Design and run multi-agent business-building pipelines. Idea evaluation, scoring, market research.", version: "1.0.0", source: "installed", enabled: true },
    { id: "exa-search", name: "exa-search", description: "Use Exa MCP for web search, advanced web search, crawling, and code-context retrieval when Exa is preferred over the default web search provider.", version: "1.0.0", source: "installed", enabled: true },
    { id: "qmd", name: "qmd", description: "Local hybrid search for markdown notes and docs. Search notes, find related content, or retrieve documents from indexed collections.", version: "1.0.0", source: "installed", enabled: true },
  ],
  Lancelot: [
    ...systemSkills,
    { id: "lancelot", name: "lancelot", description: "Build, write, implement, and ship execution skill for Round Table OS. Turns plans into concrete artifacts, MVPs, codebases, and deployments, especially on a Next.js + Vercel stack.", version: "1.0.0", source: "custom", enabled: true },
    { id: "gh-issues", name: "gh-issues", description: "Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs.", version: "1.0.0", source: "installed", enabled: true },
    { id: "skill-creator", name: "skill-creator", description: "Create, edit, improve, or audit AgentSkills and SKILL.md files.", version: "1.0.0", source: "installed", enabled: true },
    { id: "video-frames", name: "video-frames", description: "Extract frames or short clips from videos using ffmpeg.", version: "1.0.0", source: "installed", enabled: true },
  ],
  Gawain: [
    ...systemSkills,
    { id: "gawain", name: "gawain", description: "Workflow, operations, sequencing, coordination, and launch execution skill for Round Table OS.", version: "1.0.0", source: "custom", enabled: true },
    { id: "clawflow", name: "clawflow", description: "Runtime substrate for detached tasks with flow identity, waiting, outputs, and user-facing emergence.", version: "1.0.0", source: "installed", enabled: true },
    { id: "clawflow-inbox-triage", name: "clawflow-inbox-triage", description: "ClawFlow authoring pattern for inbox triage with intent-based routing, immediate notifications, waiting on outside answers, and rolling summaries.", version: "1.0.0", source: "installed", enabled: true },
  ],
  Percival: [
    ...systemSkills,
    { id: "percival", name: "percival", description: "Testing, validation, verification, and quality assurance skill for Round Table OS. Check, test, validate, measure, or verify before release.", version: "1.0.0", source: "custom", enabled: true },
    { id: "healthcheck", name: "healthcheck", description: "Host security hardening and risk-tolerance configuration for OpenClaw deployments.", version: "1.0.0", source: "installed", enabled: true },
  ],
  Galahad: [
    ...systemSkills,
    { id: "galahad", name: "galahad", description: "Standards, safety, policy, governance, and cleanliness skill for Round Table OS. Review systems, workflows, content, or operations for standards, risk posture, compliance boundaries, and governance quality.", version: "1.0.0", source: "custom", enabled: true },
    { id: "healthcheck", name: "healthcheck", description: "Host security hardening and risk-tolerance configuration for OpenClaw deployments.", version: "1.0.0", source: "installed", enabled: true },
  ],
  Mordred: [
    ...systemSkills,
    { id: "mordred", name: "mordred", description: "Adversarial review, stress testing, challenge, downside analysis, and attack-minded evaluation skill for Round Table OS. Expose weaknesses before they reach production.", version: "1.0.0", source: "custom", enabled: true },
    { id: "healthcheck", name: "healthcheck", description: "Host security hardening and risk-tolerance configuration for OpenClaw deployments.", version: "1.0.0", source: "installed", enabled: true },
  ],
  Guinevere: [
    ...systemSkills,
    { id: "guinevere", name: "guinevere", description: "UX clarity, polish, presentation quality, messaging refinement, and external readiness skill for Round Table OS.", version: "1.0.0", source: "custom", enabled: true },
    { id: "tiktok-app-marketing", name: "tiktok-app-marketing", description: "Automate TikTok slideshow marketing: competitor research, AI images, text overlays, posting via Postiz, analytics tracking, hook testing, CTA optimization, and conversion tracking with RevenueCat.", version: "1.0.0", source: "installed", enabled: true },
  ],
};
