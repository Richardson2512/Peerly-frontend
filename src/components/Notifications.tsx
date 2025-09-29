import React, { useState } from 'react';
import { Heart, MessageCircle, Users, Briefcase, Newspaper, Check, Trash2 } from 'lucide-react';
import { User, Notification } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface NotificationsProps {
  user: User;
}

const Notifications: React.FC<NotificationsProps> = ({ user }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      title: 'Sarah Chen liked your post',
      message: 'Sarah Chen liked your post about the hackathon experience',
      timestamp: new Date('2024-01-15T14:30:00'),
      read: false
    },
    {
      id: '2',
      type: 'comment',
      title: 'New comment on your post',
      message: 'Mike Johnson commented: "Great insights! Thanks for sharing your experience."',
      timestamp: new Date('2024-01-15T12:45:00'),
      read: false
    },
    {
      id: '3',
      type: 'connection',
      title: 'New connection request',
      message: 'Emily Davis wants to connect with you',
      timestamp: new Date('2024-01-15T10:15:00'),
      read: true
    },
    {
      id: '4',
      type: 'internship',
      title: 'New internship posted',
      message: 'Google posted a new Software Engineering Intern position that matches your interests',
      timestamp: new Date('2024-01-14T16:20:00'),
      read: true
    },
    {
      id: '5',
      type: 'news',
      title: 'University announcement',
      message: 'Stanford University: New AI research lab opening next semester',
      timestamp: new Date('2024-01-14T11:30:00'),
      read: true
    },
    {
      id: '6',
      type: 'like',
      title: 'Alex Rodriguez liked your post',
      message: 'Alex Rodriguez liked your post about internship tips',
      timestamp: new Date('2024-01-13T18:45:00'),
      read: true
    },
    {
      id: '7',
      type: 'internship',
      title: 'Application update',
      message: 'Your application for Microsoft Cybersecurity Intern has been reviewed',
      timestamp: new Date('2024-01-13T15:20:00'),
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return Heart;
      case 'comment': return MessageCircle;
      case 'connection': return Users;
      case 'internship': return Briefcase;
      case 'news': return Newspaper;
      default: return Newspaper;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'like': return 'text-red-500 bg-red-50';
      case 'comment': return 'text-blue-500 bg-blue-50';
      case 'connection': return 'text-emerald-500 bg-emerald-50';
      case 'internship': return 'text-purple-500 bg-purple-50';
      case 'news': return 'text-orange-500 bg-orange-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-purple-600 mt-1">
              You have <span className="font-semibold">{unreadCount}</span> unread notifications
            </p>
          )}
        </div>
        <div className="flex space-x-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center px-4 py-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const colorClass = getNotificationColor(notification.type);
            
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-lg border p-4 hover:shadow-md transition-all duration-200 ${
                  !notification.read ? 'border-l-4 border-l-purple-500 bg-purple-50/30' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                        </span>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex space-x-3">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                          >
                            Mark as read
                          </button>
                        )}
                        {notification.actionUrl && (
                          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                            View
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Newspaper className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-600">You're all caught up! Check back later for new updates.</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;