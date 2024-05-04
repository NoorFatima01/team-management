export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

// Supabase
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'sth';
export const SUPABASE_URL = isProd
  ? process.env.NEXT_PUBLIC_SUPABASE_PROD_URL
  : process.env.NEXT_PUBLIC_SUPABASE_URL;

//Pusher
export const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY ?? 'sth';
export const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? 'sth';
export const PUSHER_APP_ID = process.env.PUSHER_APP_ID ?? 'sth';
export const PUSHER_SECRET = process.env.PUSHER_SECRET ?? 'sth';

// Resend
export const RESEND_KEY = process.env.RESEND_KEY ?? 'sth';
