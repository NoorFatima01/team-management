import React from 'react';

import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

import MessageField from '@/components/message-field';
import Messages from '@/components/messages';

import { messageUIType } from '@/types';

interface TeamInboxPageProps {
  params: { team: string };
}

export default async function TeamInboxPage({ params }: TeamInboxPageProps) {
  const { team } = params;
  const serverSupabase = createSupabaseServerClient();
  const decodedTeamName = decodeURIComponent(team);
  const { data: teamData } = await serverSupabase
    .from('teams')
    .select('*')
    .eq('name', decodedTeamName);

  const team_id = teamData && teamData[0].team_id;

  const { data: oldChat } = await serverSupabase
    .from('teamChatRoom')
    .select('*')
    .eq('team_id', team_id);

  async function fetchOldChatData() {
    const oldChatData: messageUIType[] = await Promise.all(
      (oldChat || []).map(async (chat) => {
        const sender_name = await serverSupabase
          .from('profiles')
          .select('username')
          .eq('id', chat.sender_id);
        const message = await serverSupabase
          .from('messages')
          .select('text')
          .eq('msg_id', chat.msg_id);
        return {
          message: message.data ? message.data[0].text : '',
          sender_name: sender_name.data ? sender_name.data[0].username : '',
          sender_id: chat.sender_id,
        };
      })
    );
    return oldChatData;
  }

  return (
    <div className='container flex flex-col'>
      <Messages teamId={team_id} oldChatData={await fetchOldChatData()} />
      <MessageField teamId={team_id} />
    </div>
  );
}
