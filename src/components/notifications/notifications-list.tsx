import React from 'react';

import { notificationSchemaType } from '@/lib/schemas';

interface NotificationsListProps {
  oldNotifications?: notificationSchemaType[];
  newNotifications?: notificationSchemaType[];
}

const NotificationsList = ({
  newNotifications,
  oldNotifications,
}: NotificationsListProps) => {
  return (
    <div>
      {newNotifications?.map((notification) => {
        return (
          <div key={notification.notf_id}>
            <p>{notification.text}</p>
          </div>
        );
      })}
      {oldNotifications?.map((notification) => {
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
