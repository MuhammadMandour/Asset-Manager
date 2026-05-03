import React, { useState, useEffect } from 'react';
import { getNotifications, markAllAsRead, markAsRead } from '../api/notificationService';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { formatDistanceToNow } from 'date-fns';
import { CheckCheck } from 'lucide-react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    await markAllAsRead();
    fetchNotifications();
  };

  const handleMarkRead = async (id) => {
    await markAsRead(id);
    fetchNotifications();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        {notifications.some(n => !n.read) && (
          <button onClick={handleMarkAllRead} className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md">
            <CheckCheck className="w-4 h-4 mr-2" /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState title="No notifications" message="You're all caught up!" />
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {notifications.map((notif) => (
              <li key={notif.id} className={`${!notif.read ? 'bg-blue-50' : 'bg-white'}`}>
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <p className={`text-sm ${!notif.read ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{notif.message}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatDistanceToNow(new Date(notif.createdAt))} ago • <span className="uppercase text-xs tracking-wider">{notif.type.replace('_', ' ')}</span>
                    </p>
                  </div>
                  {!notif.read && (
                    <button onClick={() => handleMarkRead(notif.id)} className="text-sm text-indigo-600 hover:text-indigo-900 whitespace-nowrap">
                      Mark read
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
