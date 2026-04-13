import { useState, useEffect, useRef } from 'react';
import { notificationsAPI } from '../services/api';
import { formatDistanceToNow } from 'date-fns';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Bell,
  Check,
  CheckCheck,
  Bus,
  MapPin,
  AlertTriangle,
  Info,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const containerRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationsAPI.getAll();
      setNotifications(response.data?.notifications || []);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      // Mock data
      setNotifications([
        {
          _id: '1',
          type: 'pickup',
          title: 'Child Picked Up',
          message: 'John Smith Jr. was picked up from Home Stop by BUS-101',
          time: new Date(Date.now() - 3600000).toISOString(),
          read: false,
        },
        {
          _id: '2',
          type: 'dropoff',
          title: 'Child Dropped Off',
          message: 'John Smith Jr. was safely dropped off at School',
          time: new Date(Date.now() - 7200000).toISOString(),
          read: false,
        },
        {
          _id: '3',
          type: 'delay',
          title: 'Bus Delay Alert',
          message: 'BUS-101 is running 10 minutes behind schedule due to traffic',
          time: new Date(Date.now() - 86400000).toISOString(),
          read: true,
        },
        {
          _id: '4',
          type: 'info',
          title: 'Schedule Update',
          message: 'Tomorrow\'s pickup time has been changed to 7:45 AM',
          time: new Date(Date.now() - 172800000).toISOString(),
          read: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await notificationsAPI.markRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error('Failed to mark as read:', error);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationsAPI.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success('All notifications marked as read', {
        className: 'dark:bg-[#1a1a1a] dark:text-white dark:border dark:border-[#333]',
      });
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success('All notifications marked as read', {
        className: 'dark:bg-[#1a1a1a] dark:text-white dark:border dark:border-[#333]',
      });
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'pickup':
        return { icon: Bus, color: 'bg-black text-white dark:bg-white dark:text-black border-transparent' };
      case 'dropoff':
        return { icon: MapPin, color: 'bg-black text-white dark:bg-white dark:text-black border-transparent' };
      case 'delay':
        return { icon: AlertTriangle, color: 'bg-white dark:bg-[#111] text-black dark:text-white border-gray-200 dark:border-[#444]' };
      default:
        return { icon: Info, color: 'bg-gray-50 dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#333]' };
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'alerts') return n.type === 'delay' || n.type === 'alert';
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  useGSAP(() => {
    if (loading) return;
    gsap.fromTo('.stagger-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    );
  }, { scope: containerRef, dependencies: [loading, filter, notifications.length] });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-black dark:border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto" ref={containerRef}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white tracking-tight">Notifications</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notifications require attention` : 'All caught up! No unread notifications.'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-black bg-white dark:text-white dark:bg-[#111] border border-gray-200 dark:border-[#333] hover:border-black/20 dark:hover:border-white/20 hover:shadow-md transition-all rounded-xl"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 sm:gap-3 p-1.5 bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl w-max border border-gray-200 dark:border-[#222]">
        {[
          { value: 'all', label: 'All' },
          { value: 'unread', label: `Unread (${unreadCount})` },
          { value: 'alerts', label: 'Alerts' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === option.value
                ? 'bg-white dark:bg-[#333] text-black dark:text-white shadow-sm border border-gray-200 dark:border-[#444]'
                : 'text-gray-500 hover:text-black dark:hover:text-white transparent border border-transparent'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="stagger-card text-center py-16 bg-white dark:bg-[#111] rounded-3xl border border-gray-100 dark:border-[#222]">
          <Bell className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-black dark:text-white">No notifications</h3>
          <p className="text-gray-500 font-medium mt-2">
            {filter === 'unread' ? 'All notifications have been read.' : 'You have no notifications in this category.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification, index) => {
            const { icon: Icon, color } = getIcon(notification.type);

            return (
              <div
                key={notification._id}
                className={`stagger-card rounded-3xl border shadow-sm p-5 sm:p-6 transition-all duration-300 ${
                  notification.read 
                    ? 'bg-white dark:bg-[#111] border-gray-100 dark:border-[#222] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]' 
                    : 'bg-gray-50 dark:bg-[#1a1a1a] border-black/10 dark:border-white/20 shadow-md ring-1 ring-black/5 dark:ring-white/10'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-1.5">
                      <div className="flex items-center gap-3">
                        {!notification.read && (
                           <span className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white shrink-0 block" />
                        )}
                        <h3 className="text-lg font-bold text-black dark:text-white tracking-tight">{notification.title}</h3>
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 whitespace-nowrap">
                        {formatDistanceToNow(new Date(notification.time), { addSuffix: true })}
                      </p>
                    </div>
                    
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1 pl-0 sm:pl-0 pr-8">{notification.message}</p>
                    
                    {!notification.read && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => handleMarkRead(notification._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] hover:border-black/20 dark:hover:border-white/20 text-xs font-bold uppercase tracking-widest text-black dark:text-white rounded-lg transition-all"
                          title="Mark as read"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Mark Read
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
