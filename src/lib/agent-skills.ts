export interface AgentSkill {
  id: string;
  name: string;
  description: string;
  version: string;
  source: "installed" | "clawhub" | "custom";
  enabled: boolean;
}

// Maps agent names to their associated skills
// In production, this comes from the OpenClaw config / Supabase

const sharedSkills: AgentSkill[] = [
  { id: "github", name: "github", description: "GitHub operations via gh CLI: issues, PRs, CI runs, code review, API queries.", version: "1.0.0", source: "installed", enabled: true },
  { id: "coding-agent", name: "coding-agent", description: "Delegate coding tasks to Codex, Claude Code, or Pi agents via background process.", version: "1.0.0", source: "installed", enabled: true },
  { id: "web-search", name: "web-search", description: "Search the web using Gemini with Google Search grounding.", version: "1.0.0", source: "installed", enabled: true },
];

export const agentSkillsMap: Record<string, AgentSkill[]> = {
  Arthur: [
    ...sharedSkills,
    { id: "venture-factory", name: "venture-factory", description: "Design and run multi-agent business-building pipelines for app factory, website factory, online business factory workflows.", version: "1.0.0", source: "installed", enabled: true },
    { id: "gh-issues", name: "gh-issues", description: "Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs, then monitor and address PR review comments.", version: "1.0.0", source: "installed", enabled: true },
    { id: "skill-creator", name: "skill-creator", description: "Create, edit, improve, or audit AgentSkills and SKILL.md files.", version: "1.0.0", source: "installed", enabled: true },
    { id: "clawhub", name: "clawhub", description: "Search, install, update, and publish agent skills from clawhub.com.", version: "1.0.0", source: "installed", enabled: true },
    { id: "healthcheck", name: "healthcheck", description: "Host security hardening and risk-tolerance configuration for OpenClaw deployments.", version: "1.0.0", source: "installed", enabled: true },
    { id: "weather", name: "weather", description: "Get current weather and forecasts via wttr.in or Open-Meteo.", version: "1.0.0", source: "installed", enabled: true },
  ],
  Merlin: [
    ...sharedSkills,
    { id: "exa-search", name: "exa-search", description: "Use Exa MCP for web search, advanced web search, crawling, and code-context retrieval.", version: "1.0.0", source: "installed", enabled: true },
    { id: "qmd", name: "qmd", description: "Local hybrid search for markdown notes and docs.", version: "1.0.0", source: "installed", enabled: true },
    { id: "venture-factory", name: "venture-factory", description: "Design and run multi-agent business-building pipelines. Idea evaluation, scoring, market research.", version: "1.0.0", source: "installed", enabled: true },
  ],
  Lancelot: [
    ...sharedSkills,
    { id: "coding-agent-advanced", name: "coding-agent-advanced", description: "Advanced coding delegation with parallel worktrees, PR creation, and multi-agent builds.", version: "1.0.0", source: "installed", enabled: true },
    { id: "gh-issues", name: "gh-issues", description: "Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs.", version: "1.0.0", source: "installed", enabled: true },
    { id: "skill-creator", name: "skill-creator", description: "Create, edit, improve, or audit AgentSkills and SKILL.md files.", version: "1.0.0", source: "installed", enabled: true },
  ],
  Gawain: [
    ...sharedSkills,
    { id: "clawflow", name: "clawflow", description: "Runtime substrate for detached tasks with flow identity, waiting, outputs, and user-facing emergence.", version: "1.0.0", source: "installed", enabled: true },
    { id: "clawflow-inbox-triage", name: "clawflow-inbox-triage", description: "ClawFlow authoring pattern for inbox triage with intent-based routing.", version: "1.0.0", source: "installed", enabled: true },
  ],
  Percival: [
    ...sharedSkills,
    { id: "healthcheck", name: "healthcheck", description: "Host security hardening and risk-tolerance configuration for OpenClaw deployments.", version: "1.0.0", source: "installed", enabled: true },
  ],
  Galahad: [
    ...sharedSkills,
    { id: "healthcheck", name: "healthcheck", description: "Host security hardening and risk-tolerance configuration for OpenClaw deployments.", version: "1.0.0", source: "installed", enabled: true },
    { id: "galahad-standards", name: "galahad-standards", description: "Standards, safety, policy, governance, and cleanliness reviews for Round Table OS.", version: "1.0.0", source: "custom", enabled: true },
  ],
  Mordred: [
    ...sharedSkills,
    { id: "mordred-redteam", name: "mordred-redteam", description: "Adversarial review, stress testing, challenge, downside analysis, and attack-minded evaluation.", version: "1.0.0", source: "custom", enabled: true },
  ],
  Guinevere: [
    ...sharedSkills,
    { id: "tiktok-app-marketing", name: "tiktok-app-marketing", description: "Automate TikTok slideshow marketing: competitor research, AI images, text overlays, posting via Postiz, analytics.", version: "1.0.0", source: "installed", enabled: true },
    { id: "guinevere-polish", name: "guinevere-polish", description: "UX clarity, polish, presentation quality, messaging refinement, and external readiness.", version: "1.0.0", source: "custom", enabled: true },
  ],
};
