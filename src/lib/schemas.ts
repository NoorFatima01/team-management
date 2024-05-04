import { z } from 'zod';

const MAX_FILE_SIZE = 700000;
function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split('.').pop();
    if (
      fileType === 'docx' ||
      fileType === 'pdf' ||
      fileType === 'jpg' ||
      fileType === 'png'
    )
      return true;
    return false;
  }
}

export const fileSchema = z.object({
  file: z
    .any()
    .refine((file: File) => file?.size !== 0, 'File is required')
    .refine((file: File) => {
      if (file?.size) {
        return file.size <= MAX_FILE_SIZE;
      }
      return false;
    }, `File size should be less than ${MAX_FILE_SIZE / 1000}KB`)
    .refine(
      (file: File) => checkFileType(file),
      'File should be of type docx or pdf'
    ),
});

export const userSignupFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  updated_at: z.string().default(new Date().toISOString()),
  username: z.string(),
  full_name: z.string(),
  avatar_url: z.string(),
  email: z.string().email(),
  role: z.enum(['USER', 'TEAM_MEMBER', 'TEAM_HEAD']).default('USER'),
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
  team_id: z.string(),
});

export const projectSchema = z.object({
  project_id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  team_id: z.string().uuid(),
  project_status: z
    .enum(['IN_PROGRESS', 'COMPLETED', 'CANCELLED'])
    .default('IN_PROGRESS'),
});

//task schema extends file schema
export const taskFormSchema = fileSchema.extend({
  title: z.string(),
  details: z.string(),
});

export const taskSchema = z.object({
  title: z.string(),
  details: z.string(),
  filePath: z.string(),
  project_id: z.string().uuid(),
});

export const fileRecordSchema = z.object({
  file_id: z.string().uuid(),
  created_at: z.string().default(new Date().toISOString()),
  path: z.string(),
  uploader_id: z.string().uuid(),
});

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      })
    )
    .optional(),
});

export type fileSchemaType = z.infer<typeof fileSchema>;
export type userSignupFormSchemaType = z.infer<typeof userSignupFormSchema>;
export type userProfileSchemaType = z.infer<typeof userProfileSchema>;
export type memberFormSchemaType = z.infer<typeof memberFormSchema>;
export type memberSchemaType = z.infer<typeof memberSchema>;
export type teamFormSchemaType = z.infer<typeof teamFormSchema>;
export type teamSchemaType = z.infer<typeof teamSchema>;
export type memberTableSchemaType = z.infer<typeof memberTableSchema>;
export type notificationSchemaType = z.infer<typeof notificationSchema>;
export type invitationSchemaType = z.infer<typeof invitationSchema>;
export type projectFormSchemaType = z.infer<typeof projectFormSchema>;
export type projectSchemaType = z.infer<typeof projectSchema>;
export type taskFormSchemaType = z.infer<typeof taskFormSchema>;
export type taskSchemaType = z.infer<typeof taskSchema>;
export type fileRecordSchemaType = z.infer<typeof fileRecordSchema>;
export type profileFormSchemaType = z.infer<typeof profileFormSchema>;
