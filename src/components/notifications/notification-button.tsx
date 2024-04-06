'use client';
import React from 'react';

import { pusherClient } from '@/lib/pusher';
import { notificationSchemaType } from '@/lib/schemas';

import NotificationBell from '@/components/notifications/notification-bell';
import NotificationsList from '@/components/notifications/notifications-list';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const NotificationButton = () => {
  const [newNotifications, setNewNotifications] = React.useState<
    notificationSchemaType[]
  >([]);

  React.useEffect(() => {
    pusherClient.subscribe('notification');
    pusherClient.bind(
      'new-notification',
      function (newNotification: notificationSchemaType) {
        setNewNotifications((prev) => [newNotification, ...prev]);
      },
      pusherClient.unbind('new-notification')
    );

    return () => {
      pusherClient.unsubscribe('notification');
    };
  }, []);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <NotificationBell />
        </PopoverTrigger>
        <PopoverContent>
          <div className='flex flex-col justify-start gap-2 p-2'>
            <div className='flex flex-col space-y-1 leading-none'>
              <p className='font-medium'>Notifications</p>
            </div>
            <NotificationsList newNotifications={newNotifications} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationButton;
