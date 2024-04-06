'use client';

import React, { useEffect } from 'react';

import { pusherClient } from '@/lib/pusher';
import useSession from '@/lib/supabase/use-session';

import { messageUIType } from '@/types';

interface MessagesProps {
  teamId: string;

  oldChatData: messageUIType[];
}

export default function Messages({ teamId, oldChatData }: MessagesProps) {
  const [incomingChats, setIncomingChats] = React.useState<messageUIType[]>([]);
  const session = useSession();
  const userId = session?.user?.id;
  useEffect(() => {
    pusherClient.subscribe(teamId);
    pusherClient.bind(
      'incoming-chat',
      function (newMessage: messageUIType) {
        setIncomingChats((prevChats) => [...prevChats, newMessage]);
      },
      pusherClient.unbind('incoming-chat')
    );
    return () => {
      pusherClient.unsubscribe(teamId);
    };
  }, [teamId]);
  //TODO: make the chats box scroll able instead of overflowing
  return (
    <div className='flex flex-col'>
      {oldChatData.map((chat, index) => (
        <div
          key={index}
          className={`m-2 flex space-y-0.5 flex-col bg-sky-900 rounded-md p-2  ${
            chat.sender_id === userId ? 'self-end' : 'self-start'
          }  max-w-1/2 inline-block`}
        >
          <p className='text-muted-foreground text-sm font-semibold'>
            {chat.sender_name}
          </p>
          <p className='text-amber-500'>{chat.message}</p>
        </div>
      ))}
      {incomingChats.map((chat, index) => (
        <div
          key={index}
          className={`m-2 flex space-y-0.5 flex-col bg-sky-900 rounded-md p-2  ${
            chat.sender_id === userId ? 'self-end' : 'self-start'
          }  max-w-1/2 inline-block`}
        >
          <p className='text-muted-foreground text-sm font-semibold'>
            {chat.sender_name}
          </p>
          <p className='text-amber-500'>{chat.message}</p>
        </div>
      ))}
    </div>
  );
}
