-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'archived')),
  color TEXT DEFAULT '#8b5cf6',
  owner_agent_id UUID REFERENCES agents(id),
  health_score INTEGER CHECK (health_score >= 0 AND health_score <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on projects" ON projects FOR ALL USING (true);

-- Seed projects
INSERT INTO projects (name, slug, description, status, color, health_score) VALUES
  ('Mission Control', 'mission-control', 'Executive command dashboard for Round Table OS', 'active', '#8b5cf6', 82),
  ('ContentReforge', 'contentreforge', 'AI content repurposing SaaS — 1 input, 6 optimized formats', 'active', '#3b82f6', 91),
  ('Strategy', 'strategy', 'Market research, positioning, and go-to-market planning', 'active', '#f59e0b', 65),
  ('Marketing', 'marketing', 'Cross-platform marketing campaigns and social presence', 'active', '#ec4899', 45),
  ('Voice', 'voice', 'Local AI voice pipeline — Whisper + Ollama + Piper TTS', 'paused', '#10b981', 30),
  ('Operations', 'operations', 'Internal ops, workflows, cadences, and automation', 'active', '#06b6d4', 75);
