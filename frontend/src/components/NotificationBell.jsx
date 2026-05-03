import React, { useState, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import { Bell } from 'lucide-react';
import { getUnreadCount, getNotifications, markAsRead } from '../api/notificationService';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const { count } = await getUnreadCount();
      setUnreadCount(count);
      const data = await getNotifications();
      setNotifications(data.slice(0, 5)); // Show last 5
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // 30s poll
    return () => clearInterval(interval);
  }, []);

  const handleRead = async (id) => {
    await markAsRead(id);
    fetchNotifications();
  };

  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button className="relative p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
        <span className="sr-only">View notifications</span>
        <Bell className="h-6 w-6" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400" />
        )}
      </Menu.Button>
      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
          <span className="font-semibold text-gray-700">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">{unreadCount} unread</span>
          )}
        </div>
        <div className="max-h-64 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">No recent notifications.</div>
          ) : (
            notifications.map((notif) => (
              <Menu.Item key={notif.id}>
                {({ active }) => (
                  <div className={`px-4 py-3 text-sm cursor-pointer ${active ? 'bg-gray-100' : ''} ${!notif.read ? 'bg-blue-50 font-medium text-gray-900' : 'text-gray-500'}`} onClick={() => handleRead(notif.id)}>
                    <p className="line-clamp-2">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDistanceToNow(new Date(notif.createdAt))} ago</p>
                  </div>
                )}
              </Menu.Item>
            ))
          )}
        </div>
        <div className="px-4 py-2 border-t border-gray-100 text-center">
          <Link to="/notifications" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all</Link>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default NotificationBell;
