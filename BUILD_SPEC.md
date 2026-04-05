# Round Table Mission Control — Build Specification

## Overview
Build a Mission Control dashboard for **Round Table OS / Camelot Mission Control**. This is an executive command dashboard for managing AI agents, tasks, content pipelines, scheduled jobs, memory, and team profiles.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4 + shadcn/ui components
- **Database:** Supabase (PostgreSQL + Realtime)
- **Auth:** Supabase Auth (email/password initially)
- **Deployment:** Vercel
- **Icons:** Lucide React
- **Charts:** Recharts (if needed for activity graphs)

## Design System
- **Theme:** Dark mode ONLY (dark gray/charcoal background ~#0a0a0a / #1a1a1a)
- **Accent colors:**
  - Primary: Purple/violet (#8b5cf6) for active states, links
  - Success: Emerald/teal (#10b981) for action buttons
  - Warning: Amber/gold (#f59e0b) for "always running" indicators
  - Danger: Rose (#f43f5e) for alerts
- **Cards:** Rounded corners, subtle dark gray backgrounds (#1e1e1e / #2a2a2a), slight border (#333)
- **Typography:** Inter or system font, white primary text, gray-400 secondary text
- **Branding:** "Round Table OS" with a crown/sword icon or ⚔️ emoji

## Navigation (Left Sidebar)
Fixed left sidebar, dark background, with icons + labels:
1. **Tasks** (CheckSquare icon) — Kanban task board
2. **Content** (FileText icon) — Content pipeline
3. **Approvals** (Shield icon) — Pending approvals
4. **Council** (MessageSquare icon) — Chat/council view (placeholder)
5. **Calendar** (Calendar icon) — Scheduled tasks view
6. **Projects** (Folder icon) — Projects list (placeholder)
7. **Memory** (Brain icon) — Memory log viewer
8. **Docs** (BookOpen icon) — Documentation (placeholder)
9. **People** (Users icon) — People/contacts (placeholder)
10. **Office** (Building icon) — Virtual office (PHASE 2 — placeholder for now)
11. **Team** (UserCircle icon) — Team/agent profiles

Active item gets a purple/violet highlight background.

At the top of sidebar: "Round Table OS" logo/text with crown icon.
At the bottom: User avatar + settings gear.

## Page 1: Tasks Board (`/tasks`)
### Header Bar
- Metrics row: `{count} No views | {count} In progress | {count} Total | {percent}% Completion`
- "+ New Task" button (green/teal)
- Filter dropdowns: Agent filter, Project filter

### Kanban Board (5 columns, horizontally scrollable)
Columns: **Recurring** | **Backlog** | **In Progress** | **Review** | **Done**
- Each column has a colored dot indicator and item count
- Task cards show:
  - Title (white, bold)
  - Description snippet (gray, truncated)
  - Agent avatar/badge (colored circle with initials)
  - Project tag (pill badge)
  - Timestamp
- Cards are draggable between columns (use @dnd-kit/core or react-beautiful-dnd)

### Supabase Schema — `tasks` table:
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'backlog' CHECK (status IN ('recurring', 'backlog', 'in_progress', 'review', 'done')),
  agent_id UUID REFERENCES agents(id),
  project TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Page 2: Content Pipeline (`/content`)
### Header
- Title: "Content Pipeline"
- Subtitle: "Ideas → Scripts → Thumbnails → Published"

### Pipeline Kanban (5 columns)
Columns: **Ideas** (orange) | **Scripting** (orange) | **Thumbnail** (purple) | **Filming** (gray) | **Editing** (pink)
- Each column shows count of items
- "+" button per column to add items
- Content cards show: Title, description, "Touches" count, "View" button
- Color-coded column headers with matching dot indicators

### Supabase Schema — `content_items` table:
```sql
CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  stage TEXT NOT NULL DEFAULT 'ideas' CHECK (stage IN ('ideas', 'scripting', 'thumbnail', 'filming', 'editing', 'published')),
  touches INTEGER DEFAULT 0,
  agent_id UUID REFERENCES agents(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Page 3: Calendar / Scheduled Tasks (`/calendar`)
### Header
- Title: "Scheduled Tasks"
- Subtitle: "Here's a summary routine"
- View toggle: "Week" | "Today" buttons
- Date navigation arrows

### Section: "Always Running"
- Yellow/gold pill badge
- Shows recurring tasks that run continuously (e.g., "mission control check • Every 30 min")

### Weekly Grid
- 7-column grid (Sun–Sat)
- Color-coded task cards placed on their scheduled days
- Cards show task name, frequency, timing

### Section: "Next Up"
- Clock icon + "Next Up" header
- List of upcoming tasks with relative time ("in 30min", "in 3 hours", etc.)
- Task names as clickable links (purple text)

### Data Source: Pull from OpenClaw cron jobs API or Supabase
```sql
CREATE TABLE scheduled_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  schedule_type TEXT NOT NULL CHECK (schedule_type IN ('always', 'cron', 'once')),
  cron_expression TEXT,
  frequency_label TEXT,
  color TEXT DEFAULT '#8b5cf6',
  next_run_at TIMESTAMPTZ,
  last_run_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Page 4: Memory (`/memory`)
### Layout
- Title: "Memory"
- Searchable, filterable log view
- Each entry shows:
  - Timestamp (e.g., "09:37 AM")
  - Agent name/avatar
  - Activity description
  - Category/type badge
- Entries sorted newest-first
- Search bar at top

### Supabase Schema — `memory_entries` table:
```sql
CREATE TABLE memory_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id),
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Page 5: Team (`/team`)
### Layout
- Title: "Meet the Team"
- Subtitle: "Build your crew and personality"

### Grid of Agent Profile Cards
Each card shows:
- Agent avatar (colored circle or pixel art)
- Agent name (bold, white)
- Role/title (gray)
- Accent color unique to each agent
- Click to expand → full profile view

### Round Table Agents (seed data):
| Name | Role | Color |
|------|------|-------|
| Arthur | Chief Executive Orchestrator | Gold (#f59e0b) |
| Merlin | Strategic Intelligence | Purple (#8b5cf6) |
| Lancelot | Build & Ship | Blue (#3b82f6) |
| Gawain | Operations & Workflow | Green (#10b981) |
| Percival | Testing & QA | Cyan (#06b6d4) |
| Galahad | Standards & Governance | White (#e5e7eb) |
| Mordred | Adversarial Review | Red (#ef4444) |
| Guinevere | UX & Polish | Pink (#ec4899) |

### Supabase Schema — `agents` table:
```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  color TEXT NOT NULL,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Page 6: Office (`/office`) — PLACEHOLDER ONLY
- Show a "Coming Soon" card with pixel art teaser
- "The virtual office is being built by the Round Table"
- DO NOT build the full pixel art office yet

## Page 7: Approvals (`/approvals`) — PLACEHOLDER
- Simple list view placeholder
- "No pending approvals" empty state

## Shared Components
1. **Sidebar** — Fixed left nav, collapsible on mobile
2. **TopBar** — Search input, "Pause" button, notification bell, user menu
3. **KanbanBoard** — Reusable for Tasks and Content (accepts columns config + items)
4. **TaskCard** — Reusable card component
5. **AgentBadge** — Small colored circle with agent initials
6. **MetricsBar** — Row of metric counters
7. **EmptyState** — "No items" placeholder with icon

## Supabase Setup
Create all tables listed above. Add Row Level Security (RLS) policies (allow all for now, auth later).
Seed the `agents` table with the 8 Round Table agents.
Seed some example tasks, content items, and memory entries for demo purposes.

## API Routes
- `/api/tasks` — CRUD for tasks
- `/api/content` — CRUD for content items
- `/api/memory` — Read memory entries (+ search)
- `/api/agents` — Read agent profiles
- `/api/scheduled-tasks` — Read scheduled tasks

Use Supabase JS client directly from server components where possible.

## Deployment
- Configure for Vercel deployment
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Add vercel.json if needed

## File Structure
```
src/
  app/
    layout.tsx          — Root layout with sidebar
    page.tsx            — Redirect to /tasks
    tasks/
      page.tsx          — Tasks kanban board
    content/
      page.tsx          — Content pipeline
    calendar/
      page.tsx          — Scheduled tasks
    memory/
      page.tsx          — Memory log
    team/
      page.tsx          — Agent profiles
    office/
      page.tsx          — Placeholder
    approvals/
      page.tsx          — Placeholder
    api/
      tasks/route.ts
      content/route.ts
      memory/route.ts
      agents/route.ts
  components/
    sidebar.tsx
    topbar.tsx
    kanban-board.tsx
    task-card.tsx
    agent-badge.tsx
    metrics-bar.tsx
    empty-state.tsx
  lib/
    supabase/
      client.ts         — Browser client
      server.ts         — Server client
      types.ts          — TypeScript types
    utils.ts
  seed/
    seed.sql            — All table creation + seed data
```

## IMPORTANT INSTRUCTIONS
1. Initialize with `npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"` (use defaults, overwrite existing files)
2. Install dependencies: `npm install @supabase/supabase-js @supabase/ssr lucide-react recharts`
3. Install shadcn: `npx shadcn@latest init` (dark theme, neutral)
4. Add shadcn components: `npx shadcn@latest add button card badge input dialog dropdown-menu`
5. Create all files as specified
6. Make sure the app builds with `npm run build` before finishing
7. Commit everything and push to origin main
8. The Supabase project needs to be created — for now, use placeholder env vars and document what needs to be set

## Quality Bar
- TypeScript strict mode
- No `any` types
- All components properly typed
- Responsive (mobile sidebar collapses)
- Keyboard navigable
- Loading states for data fetches
- Error boundaries
