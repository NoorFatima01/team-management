import { z } from 'zod';

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  updated_at: z.string().default(new Date().toISOString()),
  username: z.string(),
  full_name: z.string(),
  avatar_url: z.string(),
  email: z.string().email(),
  role: z.enum(['USER', 'TEAM_MEMBER', 'TEAM_HEAD']),
});

export const memberFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const memberSchema = z.object({
  member_id: z.string().uuid(),
  created_at: z.string().default(new Date().toISOString()),
  open_to_work: z.boolean().default(true),
});

export const teamFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  team_head: z.string(),
  members: z.array(z.string().uuid()),
});

export const teamSchema = z.object({
  team_id: z.string().uuid(),
  created_at: z.string().default(new Date().toISOString()),
  name: z.string(),
  description: z.string(),
  projects_done: z.number().default(0),
  projects_in_progress: z.number().default(0),
  team_head: z.string().uuid(),
});

export const memberTableSchema = z.object({
  member_id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
});

export const messageSchema = z.object({
  msg_id: z.string().uuid(),
  text: z.string(),
  created_at: z.string().default(new Date().toISOString()),
});

export type userProfileSchemaType = z.infer<typeof userProfileSchema>;
export type memberFormSchemaType = z.infer<typeof memberFormSchema>;
export type memberSchemaType = z.infer<typeof memberSchema>;
export type teamFormSchemaType = z.infer<typeof teamFormSchema>;
export type teamSchemaType = z.infer<typeof teamSchema>;
export type memberTableSchemaType = z.infer<typeof memberTableSchema>;
