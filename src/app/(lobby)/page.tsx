import * as React from 'react';
import '@/lib/env';

import MessageField from '@/components/message-field';
import Messages from '@/components/messages';

export default function HomePage() {
  return (
    <div>
      <Messages />
      <MessageField />
    </div>
  );
}
