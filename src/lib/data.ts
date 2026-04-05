"use client";

import { supabase, isSupabaseConfigured } from "./supabase/client";
import * as mock from "./mock-data";
import type { Agent, Task, ContentItem, ScheduledTask, MemoryEntry, Project } from "./supabase/types";
export type { Agent, Task, ContentItem, ScheduledTask, MemoryEntry, Project };

// Agents
export async function getAgents(): Promise<Agent[]> {
  if (!isSupabaseConfigured) return mock.agents;
  const { data, error } = await supabase!.from("agents").select("*").order("created_at");
  if (error || !data) return mock.agents;
  return data;
}

export async function getAgentById(id: string): Promise<Agent | undefined> {
  if (!isSupabaseConfigured) return mock.getAgentById(id);
  const { data } = await supabase!.from("agents").select("*").eq("id", id).single();
  return data ?? mock.getAgentById(id);
}

// Tasks
export async function getTasks(): Promise<(Task & { agent?: Agent | null })[]> {
  if (!isSupabaseConfigured) {
    return mock.tasks.map((t) => ({
      ...t,
      agent: t.agent_id ? mock.agents.find((a) => a.id === t.agent_id) ?? null : null,
    }));
  }
  const { data, error } = await supabase!
    .from("tasks")
    .select("*, agent:agents(*)")
    .order("created_at", { ascending: false });
  if (error || !data) {
    return mock.tasks.map((t) => ({
      ...t,
      agent: t.agent_id ? mock.agents.find((a) => a.id === t.agent_id) ?? null : null,
    }));
  }
  return data;
}

export async function createTask(task: Partial<Task>): Promise<Task | null> {
  if (!isSupabaseConfigured) return null;
  const { data } = await supabase!.from("tasks").insert(task).select().single();
  return data;
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
  if (!isSupabaseConfigured) return null;
  const { data } = await supabase!
    .from("tasks")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  return data;
}

// Content
export async function getContentItems(): Promise<ContentItem[]> {
  if (!isSupabaseConfigured) return mock.contentItems;
  const { data, error } = await supabase!
    .from("content_items")
    .select("*, agent:agents(*)")
    .order("created_at", { ascending: false });
  if (error || !data) return mock.contentItems;
  return data;
}

export async function updateContentItem(id: string, updates: Partial<ContentItem>): Promise<ContentItem | null> {
  if (!isSupabaseConfigured) {
    const item = mock.contentItems.find((c) => c.id === id);
    if (item) Object.assign(item, updates, { updated_at: new Date().toISOString() });
    return item ?? null;
  }
  const { data } = await supabase!
    .from("content_items")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  return data;
}

// Scheduled Tasks
export async function getScheduledTasks(): Promise<ScheduledTask[]> {
  if (!isSupabaseConfigured) return mock.scheduledTasks;
  const { data, error } = await supabase!
    .from("scheduled_tasks")
    .select("*")
    .order("next_run_at");
  if (error || !data) return mock.scheduledTasks;
  return data;
}

// Projects
export async function getProjects(): Promise<(Project & { owner?: Agent | null })[]> {
  if (!isSupabaseConfigured) {
    return mock.projects.map((p) => ({
      ...p,
      owner: p.owner_agent_id ? mock.agents.find((a) => a.id === p.owner_agent_id) ?? null : null,
    }));
  }
  const { data, error } = await supabase!
    .from("projects")
    .select("*, owner:agents(*)")
    .order("created_at");
  if (error || !data) {
    return mock.projects.map((p) => ({
      ...p,
      owner: p.owner_agent_id ? mock.agents.find((a) => a.id === p.owner_agent_id) ?? null : null,
    }));
  }
  return data;
}

export async function getProjectBySlug(slug: string): Promise<(Project & { owner?: Agent | null }) | undefined> {
  if (!isSupabaseConfigured) {
    const p = mock.projects.find((p) => p.slug === slug);
    if (!p) return undefined;
    return { ...p, owner: p.owner_agent_id ? mock.agents.find((a) => a.id === p.owner_agent_id) ?? null : null };
  }
  const { data } = await supabase!
    .from("projects")
    .select("*, owner:agents(*)")
    .eq("slug", slug)
    .single();
  if (!data) {
    const p = mock.projects.find((p) => p.slug === slug);
    if (!p) return undefined;
    return { ...p, owner: p.owner_agent_id ? mock.agents.find((a) => a.id === p.owner_agent_id) ?? null : null };
  }
  return data;
}

export async function createProject(project: Partial<Project>): Promise<Project | null> {
  if (!isSupabaseConfigured) {
    const newProject: Project = {
      id: `p${Date.now()}`,
      name: project.name || "Untitled",
      slug: (project.name || "untitled").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      description: project.description || null,
      status: project.status || "active",
      color: project.color || "#8b5cf6",
      owner_agent_id: project.owner_agent_id || null,
      health_score: project.health_score ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mock.projects.push(newProject);
    return newProject;
  }
  const slug = (project.name || "untitled").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const { data } = await supabase!
    .from("projects")
    .insert({ ...project, slug })
    .select()
    .single();
  return data;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  if (!isSupabaseConfigured) {
    const p = mock.projects.find((p) => p.id === id);
    if (p) Object.assign(p, updates, { updated_at: new Date().toISOString() });
    return p ?? null;
  }
  const { data } = await supabase!
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  return data;
}

// Memory
export async function getMemoryEntries(search?: string): Promise<MemoryEntry[]> {
  if (!isSupabaseConfigured) {
    if (!search) return mock.memoryEntries;
    const q = search.toLowerCase();
    return mock.memoryEntries.filter(
      (e) =>
        e.content.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
    );
  }
  let query = supabase!
    .from("memory_entries")
    .select("*, agent:agents(*)")
    .order("created_at", { ascending: false });
  if (search) {
    query = query.ilike("content", `%${search}%`);
  }
  const { data, error } = await query;
  if (error || !data) return mock.memoryEntries;
  return data;
}
