import React from 'react';

import { notificationSchemaType } from '@/lib/schemas';

interface NotificationsListProps {
  newNotifications?: notificationSchemaType[];
}

const NotificationsList = ({ newNotifications }: NotificationsListProps) => {
  return (
    <div>
      {newNotifications?.map((notification) => {
        return (
          <div key={notification.notf_id}>
            <p>{notification.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationsList;
