"use client";

import { supabase, isSupabaseConfigured } from "./supabase/client";
import * as mock from "./mock-data";
import type { Agent, Task, ContentItem, ScheduledTask, MemoryEntry } from "./supabase/types";
export type { Agent, Task, ContentItem, ScheduledTask, MemoryEntry };

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
