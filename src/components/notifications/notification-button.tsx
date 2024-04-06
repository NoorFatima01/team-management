'use client';
import React from 'react';

import { pusherClient } from '@/lib/pusher';
import { notificationSchemaType } from '@/lib/schemas';
import useSession from '@/lib/supabase/use-session';

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
  const [oldNotifications, setOldNotifications] = React.useState<
    notificationSchemaType[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const session = useSession();
  const user = session?.user;
  const userId = user?.id;

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

  //using fetch and not react query because we dont want to cache the old notifications or refetch the data again since any new notifications will be shown in real time so no need to refetch all the notifications from the database
  React.useEffect(() => {
    async function fetchOldNotifications() {
      if (!userId) {
        return;
      }
      setIsLoading(true);
      const response = await fetch(`/api/notifications/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setOldNotifications(data.data);
      setIsLoading(false);
    }

    fetchOldNotifications();
  }, [userId]);

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

            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <NotificationsList
                  oldNotifications={oldNotifications}
                  newNotifications={newNotifications}
                />
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationButton;
