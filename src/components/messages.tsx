'use client';

import React, { useEffect, useRef } from 'react';

import { pusherClient } from '@/lib/pusher';
import useSession from '@/lib/supabase/use-session';

import { ScrollArea } from '@/components/ui/scroll-area';

import { messageUIType } from '@/types';

interface MessagesProps {
  teamId: string;

  oldChatData: messageUIType[];
}

export default function Messages({ teamId, oldChatData }: MessagesProps) {
  const [incomingChats, setIncomingChats] = React.useState<messageUIType[]>([]);
  const session = useSession();
  const userId = session?.user?.id;
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  // Scroll to bottom whenever new messages are received
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [incomingChats]);

  return (
    <ScrollArea>
      <div className='flex flex-col'>
        {oldChatData.map((chat, index) => (
          <div
            key={index}
            className={`m-4 flex space-y-0.5 flex-col bg-sky-900 rounded-md p-3  ${
              chat.sender_id === userId ? 'self-end' : 'self-start'
            }  max-w-1/2 inline-block`}
          >
            <p className='text-muted-foreground text-sm font-semibold'>
              {chat.sender_name}
            </p>
            <p className='text-primary-foreground'>{chat.message}</p>
          </div>
        ))}
        {incomingChats.map((chat, index) => (
          <div
            key={index}
            className={`m-4 flex space-y-0.5 flex-col bg-sky-900 rounded-md p-3 ${
              chat.sender_id === userId ? 'self-end' : 'self-start'
            }  max-w-1/2 inline-block`}
          >
            <p className='text-muted-foreground text-sm font-semibold'>
              {chat.sender_name}
            </p>
            <p className='text-primary-foreground'>{chat.message}</p>
          </div>
        ))}
        {/* Empty div to scroll to when new messages arrive */}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
