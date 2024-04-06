import React, { useEffect } from 'react';

import { pusherClient } from '@/lib/pusher';
import { useDotVisibilityStore } from '@/lib/store';

import { Icons } from '@/components/icons';

const NotificationBell = () => {
  const { dotVisibility, setDotVisibility } = useDotVisibilityStore();
  const [visiblity, setVisiblity] = React.useState(
    dotVisibility ? 'visible' : 'hidden'
  );

  useEffect(() => {
    pusherClient.subscribe('bell-dot');
    pusherClient.bind(
      'pink-dot',
      function () {
        setVisiblity('visible');
        setDotVisibility(true);
      },
      pusherClient.unbind('pink-dot')
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setVisiblity(dotVisibility ? 'visible' : 'hidden');
  }, [dotVisibility]);

  return (
    <div className='relative'>
      <Icons.bell className='size-6' />
      <div
        className={`absolute ${visiblity} top-0 right-0 w-2 h-2 bg-pink-500 rounded-full`}
      ></div>
    </div>
  );
};

export default NotificationBell;
