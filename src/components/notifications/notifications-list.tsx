import React from 'react';

import { notificationSchemaType } from '@/lib/schemas';
import { useDotVisibilityStore } from '@/lib/store';
import { formatNotificationDateTime } from '@/lib/utils';

import { Icons } from '@/components/icons';

interface NotificationsListProps {
  oldNotifications?: notificationSchemaType[];
  newNotifications?: notificationSchemaType[];
}

interface ListProps {
  notifications?: notificationSchemaType[];
  readStatus: boolean[];
  handleMarkAsRead: (id: string, index: number) => void;
  formatNotificationDateTime: (created_at: string) => string;
}

const List = ({
  notifications,
  readStatus,
  handleMarkAsRead,
  formatNotificationDateTime,
}: ListProps) => {
  return (
    <div>
      {notifications?.map(
        (notification: notificationSchemaType, index: number) => (
          <div key={index} className='border-y p-1 hover:bg-gray-700'>
            <div className='flex items-center justify-between gap-2'>
              <p className='font-normal text-sm'>{notification.text}</p>
              <span>
                {readStatus[index] === false ? (
                  <button
                    onClick={() =>
                      handleMarkAsRead(notification.notf_id, index)
                    }
                    className='focus:outline-none hover:text-slate-950 hover:bg-white p-1 border-white rounded-xl'
                  >
                    <Icons.unread size={16} />
                  </button>
                ) : (
                  <Icons.read size={16} />
                )}
              </span>
            </div>
            <p className='text-[0.5rem] font-medium text-right'>
              • {formatNotificationDateTime(notification.created_at)}
            </p>
          </div>
        )
      )}
    </div>
  );
};

const NotificationsList = ({
  newNotifications,
  oldNotifications,
}: NotificationsListProps) => {
  const [readStatus, setReadStatus] = React.useState(
    oldNotifications?.map((notification) => notification.read) || []
  );
  const { setDotVisibility } = useDotVisibilityStore();

  React.useEffect(() => {
    if (newNotifications) {
      setReadStatus((prevReadStatus) => [
        ...prevReadStatus,
        ...newNotifications.map((notification) => notification.read),
      ]);
    }
  }, [newNotifications]);

  async function handleMarkAsRead(id: string, index: number) {
    await fetch(`/api/notifications/notification/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ read: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setReadStatus((prevReadStatus) => {
      const updatedReadStatus = [...prevReadStatus];
      updatedReadStatus[index] = true;
      return updatedReadStatus;
    });
  }

  React.useEffect(() => {
    const containsFalse = readStatus.some((status) => status === false);
    if (containsFalse) {
      setDotVisibility(true);
    } else {
      setDotVisibility(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readStatus]);

  return (
    <div>
      <div>
        <List
          notifications={newNotifications}
          readStatus={readStatus}
          handleMarkAsRead={handleMarkAsRead}
          formatNotificationDateTime={formatNotificationDateTime}
        />
      </div>
      <div>
        <List
          notifications={oldNotifications}
          readStatus={readStatus}
          handleMarkAsRead={handleMarkAsRead}
          formatNotificationDateTime={formatNotificationDateTime}
        />
      </div>
    </div>
  );
};

export default NotificationsList;
