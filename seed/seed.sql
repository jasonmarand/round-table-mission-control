-- Round Table Mission Control — Supabase Schema + Seed Data

-- Agents
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  color TEXT NOT NULL,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
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

-- Content Items
CREATE TABLE IF NOT EXISTS content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  stage TEXT NOT NULL DEFAULT 'ideas' CHECK (stage IN ('ideas', 'scripting', 'thumbnail', 'filming', 'editing', 'published')),
  touches INTEGER DEFAULT 0,
  agent_id UUID REFERENCES agents(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scheduled Tasks
CREATE TABLE IF NOT EXISTS scheduled_tasks (
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

-- Memory Entries
CREATE TABLE IF NOT EXISTS memory_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id),
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (permissive for now)
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on agents" ON agents FOR ALL USING (true);
CREATE POLICY "Allow all on tasks" ON tasks FOR ALL USING (true);
CREATE POLICY "Allow all on content_items" ON content_items FOR ALL USING (true);
CREATE POLICY "Allow all on scheduled_tasks" ON scheduled_tasks FOR ALL USING (true);
CREATE POLICY "Allow all on memory_entries" ON memory_entries FOR ALL USING (true);

-- Seed: Agents
INSERT INTO agents (name, role, description, color) VALUES
  ('Arthur', 'Chief Executive Orchestrator', 'Executive command, strategic coordination, and final decision-maker of the Round Table.', '#f59e0b'),
  ('Merlin', 'Strategic Intelligence', 'Research, strategy, market insight, synthesis, and opportunity design.', '#8b5cf6'),
  ('Lancelot', 'Build & Ship', 'Build, write, implement, and ship execution. Turns plans into artifacts.', '#3b82f6'),
  ('Gawain', 'Operations & Workflow', 'Workflow, operations, sequencing, coordination, and launch execution.', '#10b981'),
  ('Percival', 'Testing & QA', 'Testing, validation, verification, and quality assurance.', '#06b6d4'),
  ('Galahad', 'Standards & Governance', 'Standards, safety, policy, governance, and operational cleanliness.', '#e5e7eb'),
  ('Mordred', 'Adversarial Review', 'Adversarial testing, stress testing, challenge, and weakness finding.', '#ef4444'),
  ('Guinevere', 'UX & Polish', 'UX clarity, polish, presentation quality, and external readiness.', '#ec4899');
