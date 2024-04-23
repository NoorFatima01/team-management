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

export const notificationSchema = z.object({
  notf_id: z.string().uuid(),
  text: z.string(),
  created_at: z.string().default(new Date().toISOString()),
  read: z.boolean().default(false),
});

export const invitationSchema = z.object({
  inv_id: z.string().uuid(),
  teamHead_id: z.string().uuid(),
  member_id: z.string().uuid(),
  text: z.string(),
  inv_status: z.enum(['ACCEPTED', 'REJECTED', 'PENDING']).default('PENDING'),
  team_id: z.string().uuid(),
});

export const projectFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  start_date: z.date(),
  end_date: z.date(),
  team: z.string(),
});

export type userProfileSchemaType = z.infer<typeof userProfileSchema>;
export type memberFormSchemaType = z.infer<typeof memberFormSchema>;
export type memberSchemaType = z.infer<typeof memberSchema>;
export type teamFormSchemaType = z.infer<typeof teamFormSchema>;
export type teamSchemaType = z.infer<typeof teamSchema>;
export type memberTableSchemaType = z.infer<typeof memberTableSchema>;
export type notificationSchemaType = z.infer<typeof notificationSchema>;
export type invitationSchemaType = z.infer<typeof invitationSchema>;
export type projectFormSchemaType = z.infer<typeof projectFormSchema>;
