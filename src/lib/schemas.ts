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

export type userProfileSchemaType = z.infer<typeof userProfileSchema>;
export type memberSchemaType = z.infer<typeof memberSchema>;
