import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

import {
  PUSHER_APP_ID,
  PUSHER_CLUSTER,
  PUSHER_KEY,
  PUSHER_SECRET,
} from '@/constant/env';

export const pusherServer = new PusherServer({
  appId: PUSHER_APP_ID as string,
  key: PUSHER_KEY as string,
  secret: PUSHER_SECRET as string,
  cluster: PUSHER_CLUSTER,
  useTLS: true,
});

export const pusherClient = new PusherClient(PUSHER_KEY as string, {
  cluster: PUSHER_CLUSTER,
});
