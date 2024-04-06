'use client';

import React, { useEffect } from 'react';

import { pusherClient } from '@/lib/pusher';

export default function Messages() {
  useEffect(() => {
    pusherClient.subscribe('my-channel');
    pusherClient.bind('my-event', function (data: string) {
      alert(JSON.stringify(data));
    });
    pusherClient.unbind('my-event');
  }, []);
  return <div>Messages</div>;
}
