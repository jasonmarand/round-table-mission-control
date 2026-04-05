// SKILL.md content for each skill (mock content matching real workspace skills)

export const skillContent: Record<string, string> = {
  github: `# GitHub Skill

GitHub operations via \`gh\` CLI: issues, PRs, CI runs, code review, API queries.

## When to Use
- Checking PR status or CI
- Creating/commenting on issues
- Listing/filtering PRs or issues
- Viewing run logs

## NOT For
- Complex web UI interactions requiring manual browser flows
- Bulk operations across many repos (script with gh api)
- When gh auth is not configured

## Commands
\`\`\`bash
gh issue list --label bug
gh pr list --state open
gh run list --limit 5
gh api repos/{owner}/{repo}/issues
\`\`\``,

  "coding-agent": `# Coding Agent

Delegate coding tasks to Codex, Claude Code, or Pi agents via background process.

## When to Use
1. Building/creating new features or apps
2. Reviewing PRs (spawn in temp dir)
3. Refactoring large codebases
4. Iterative coding that needs file exploration

## NOT For
- Simple one-liner fixes (just edit directly)
- Reading code (use read tool)
- Any work in ~/clawd workspace

## Execution Modes
- **Claude Code:** \`--print --permission-mode bypassPermissions\` (no PTY)
- **Codex/Pi/OpenCode:** \`pty:true\` required

## Pattern
\`\`\`bash
# Background task
bash workdir:~/project background:true command:"codex exec --full-auto 'Build feature X'"
# Monitor
process action:log sessionId:XXX
\`\`\``,

  gemini: `# Gemini Skill

Gemini CLI for one-shot Q&A, summaries, and generation.

## Usage
Quick answers, summarization, and content generation using Google's Gemini models.

## Commands
\`\`\`bash
gemini "Summarize this document"
gemini "Generate a marketing email for..."
\`\`\``,

  "venture-factory": `# Venture Factory

Design and run multi-agent business-building pipelines.

## Capabilities
- Apple app factory
- Website factory
- Online business factory
- Service business factory
- Research/scraping workflows
- Idea evaluation and scoring
- Wireframing and MVP build
- Testing, iteration, deployment
- Marketing and social media operations

## Pipeline Phases
1. Intake → Research → Scoring → Planning
2. Build → QA → Launch
3. Growth → Review

## Operating Model
Named executive agents with specialist capabilities, stage gates, handoffs, and reusable execution playbooks.`,

  "gh-issues": `# GitHub Issues Skill

Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs, then monitor and address PR review comments.

## Usage
\`\`\`
/gh-issues [owner/repo] [--label bug] [--limit 5]
  [--milestone v1.0] [--assignee @me]
  [--fork user/repo] [--watch]
  [--interval 5] [--reviews-only]
  [--cron] [--dry-run]
  [--model glm-5]
  [--notify-channel -1002381931352]
\`\`\`

## Workflow
1. Fetch issues matching filters
2. Spawn coding agents per issue
3. Create PRs with fixes
4. Monitor review comments
5. Address feedback automatically`,

  "skill-creator": `# Skill Creator

Create, edit, improve, or audit AgentSkills.

## When to Use
- Creating a new skill from scratch
- Improving, reviewing, or auditing an existing skill
- Editing or restructuring a skill directory
- Validating against the AgentSkills spec

## Triggers
- "create a skill"
- "author a skill"
- "tidy up a skill"
- "improve this skill"
- "review the skill"
- "clean up the skill"
- "audit the skill"`,

  clawhub: `# ClawHub

Search, install, update, and publish agent skills from clawhub.com.

## Commands
\`\`\`bash
clawhub search "keyword"
clawhub install skill-name
clawhub update skill-name
clawhub publish ./my-skill
\`\`\`

## Usage
Use when you need to fetch new skills on the fly, sync installed skills to latest or a specific version, or publish new/updated skill folders.`,

  healthcheck: `# Healthcheck

Host security hardening and risk-tolerance configuration for OpenClaw deployments.

## When to Use
- Security audits
- Firewall/SSH/update hardening
- Risk posture review
- Exposure review
- Periodic check scheduling
- Version status checks

## Covers
- Laptop, workstation, Pi, VPS environments
- OpenClaw-specific security configuration
- Cron scheduling for periodic checks`,

  weather: `# Weather

Get current weather and forecasts via wttr.in or Open-Meteo.

## When to Use
- User asks about weather, temperature, or forecasts for any location

## NOT For
- Historical weather data
- Severe weather alerts
- Detailed meteorological analysis

## No API key needed.`,

  mcporter: `# MCPorter

List, configure, auth, and call MCP servers/tools directly.

## Capabilities
- HTTP or stdio transport
- Ad-hoc server configuration
- Config edits
- CLI/type generation
- Direct tool invocation

## Usage
\`\`\`bash
mcporter list
mcporter call server-name tool-name --params '{}'
mcporter config add server-name
\`\`\``,

  "model-usage": `# Model Usage

Summarize per-model usage and cost data from CodexBar.

## When to Use
- Model-level usage/cost data needed
- Per-model summary from codexbar cost JSON
- Current (most recent) model breakdown
- Full model breakdown across providers`,

  "node-connect": `# Node Connect

Diagnose OpenClaw node connection and pairing failures.

## Platforms
- Android, iOS, macOS companion apps

## When to Use
- QR/setup code/manual connect fails
- Local Wi-Fi works but VPS/tailnet does not
- Errors mention: pairing required, unauthorized, bootstrap token invalid/expired
- Issues with gateway.bind, gateway.remote.url, Tailscale, plugins.entries.device-pair`,

  clawflow: `# ClawFlow

Runtime substrate for detached tasks with flow identity, waiting, outputs, and user-facing emergence.

## When to Use
Work that should span one or more detached tasks but still behave like one job with a single owner context.

## Design Principles
- Keep conditional logic in the caller
- Use ClawFlow for flow identity, waiting, outputs, and user-facing emergence
- ClawFlow is the runtime substrate under authoring layers like Lobster, acpx, or plain code`,

  merlin: `# Merlin — Strategic Intelligence

Strategic intelligence, research, synthesis, idea evaluation, market framing, and opportunity design for Round Table OS.

## Capabilities
- Insight and planning
- Market research and synthesis
- Idea scoring and evaluation
- Business-model framing
- Channel strategy
- Launch thesis work

## Focus
Online businesses optimized for money, autonomy, and speed.

## Output Standards
- Research must cite sources
- Scoring must use consistent frameworks
- Recommendations must include risk assessment
- Always surface the strongest counterargument`,

  "exa-search": `# Exa Search

Use Exa MCP for web search, advanced web search, crawling, and code-context retrieval.

## When to Use
When Exa is preferred over the default web search provider for higher-value external research tasks.

## Capabilities
- Web search with semantic understanding
- Advanced filtering and crawling
- Code-context retrieval
- Content extraction`,

  qmd: `# QMD — Local Search

Local hybrid search for markdown notes and docs.

## When to Use
- Searching notes
- Finding related content
- Retrieving documents from indexed collections

## Features
- Semantic + keyword hybrid search
- Markdown-aware parsing
- Collection-based indexing`,

  lancelot: `# Lancelot — Build & Ship

Build, write, implement, and ship execution skill for Round Table OS.

## Capabilities
- Turn plans into concrete artifacts
- MVP development
- Codebase implementation
- Document creation
- System deployment

## Preferred Stack
- Next.js + Vercel
- TypeScript (strict)
- Tailwind CSS
- Supabase (PostgreSQL)

## Principles
- Ship working code, not perfect code
- Every PR must build clean
- Type safety is non-negotiable
- Test happy path and error path`,

  "video-frames": `# Video Frames

Extract frames or short clips from videos using ffmpeg.

## Usage
Frame extraction, thumbnail generation, and clip cutting from video files.`,

  gawain: `# Gawain — Operations & Workflow

Workflow, operations, sequencing, coordination, and launch execution skill for Round Table OS.

## Capabilities
- Organize and stage work
- Hand off between agents
- Sequence across multiple agents and systems
- Operationalize across channels

## Principles
- Sequence by dependency, not urgency
- Coordinate handoffs explicitly
- Maintain operational cadence
- Unblock before adding new work`,

  "clawflow-inbox-triage": `# ClawFlow Inbox Triage

Example ClawFlow authoring pattern for inbox triage.

## When to Use
Messages need different treatment based on intent:
- Some routes notify immediately
- Some wait on outside answers
- Others roll into a later summary

## Pattern
Intent-based routing with conditional notification, deferred resolution, and batched summaries.`,

  percival: `# Percival — Testing & QA

Testing, validation, verification, and quality assurance for Round Table OS.

## Capabilities
- Functional and integration testing
- Release validation
- Verification before advancement
- Defect tracking and reporting

## Gate Authority
Nothing ships without Percival's verification pass.`,

  galahad: `# Galahad — Standards & Governance

Standards, safety, policy, governance, and cleanliness skill for Round Table OS.

## Scope
- Standards and risk posture review
- Compliance boundaries
- Operational hygiene
- Governance quality

## Principles
- Standards exist to protect, not obstruct
- Flag violations early
- Recommend remediation, not just findings`,

  mordred: `# Mordred — Adversarial Review

Adversarial review, stress testing, challenge, downside analysis, and attack-minded evaluation.

## Capabilities
- Stress test ideas and systems
- Challenge assumptions and plans
- Find weaknesses and single points of failure
- Pre-mortems and attack simulations

## Operating Rule
If Mordred can't break it, it's probably ready.`,

  guinevere: `# Guinevere — UX & Polish

UX clarity, polish, presentation quality, messaging refinement, and external readiness.

## Scope
- Products, pages, messages, launch assets
- Clarity, elegance, persuasiveness
- External user readiness

## Standards
- Every user-facing artifact must pass Guinevere's review
- Lead with the transformation, not the feature
- Simplify until it can't be simpler`,

  "tiktok-app-marketing": `# TikTok App Marketing

Automate TikTok slideshow marketing for any app or product.

## Pipeline
1. **Onboarding** — Get app details + warm TikTok account
2. **Competitor research** — Analyze what's working
3. **Content strategy** — Define hooks + formats
4. **Image generation** — Create slideshow slides (OpenAI gpt-image-1.5)
5. **Text overlays** — Add copy to images (node-canvas)
6. **Posting** — Upload via Postiz API
7. **Analytics** — Track performance
8. **Optimization** — Iterate based on data

## Cross-posting
Instagram Reels, YouTube Shorts, Threads

## Tracking
RevenueCat for conversion tracking, Postiz for engagement analytics`,
};
