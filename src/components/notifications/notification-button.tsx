'use client';
import React from 'react';

import { pusherClient } from '@/lib/pusher';
import { notificationSchemaType } from '@/lib/schemas';
import { useDotVisibilityStore } from '@/lib/store';
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
  const { setDotVisibility } = useDotVisibilityStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const session = useSession();
  const user = session?.user;
  const username = user?.user_metadata.full_name;
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

  React.useEffect(() => {
    if (!oldNotifications || !newNotifications) {
      // Check if either oldNotifications or newNotifications is undefined
      return;
    }

    if (oldNotifications.length === 0 && newNotifications.length === 0) {
      return;
    }
    let allNotifications;
    if (oldNotifications.length === 0) {
      allNotifications = newNotifications;
    }
    if (newNotifications.length === 0) {
      allNotifications = oldNotifications;
    } else {
      allNotifications = [...oldNotifications, ...newNotifications];
    }
    const hasUnread = allNotifications.some(
      (notification) => !notification.read
    );
    setDotVisibility(hasUnread);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldNotifications, newNotifications]);

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
                  username={username}
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
