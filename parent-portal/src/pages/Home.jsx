import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { childrenAPI } from '../services/api';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import {
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bus,
  User,
  ChevronRight,
  Bell,
  Shield,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

export default function Home() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const response = await childrenAPI.getAll();
      setChildren(response.data?.children || []);
    } catch (error) {
      console.error('Failed to fetch children:', error);
      // Mock data for demo with Four-Step status
      setChildren([
        {
          _id: '1',
          name: 'John Smith Jr.',
          grade: '5th',
          status: 'at_school',
          lastScan: { type: 'morning_dropoff', time: new Date(Date.now() - 3600000), bus: 'BUS-101' },
          bus: { busNumber: 'BUS-101', driver: 'Robert Johnson' },
        },
        {
          _id: '2',
          name: 'Emily Smith',
          grade: '3rd',
          status: 'on_bus',
          lastScan: { type: 'morning_pickup', time: new Date(Date.now() - 1800000), bus: 'BUS-101' },
          bus: { busNumber: 'BUS-101', driver: 'Robert Johnson' },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useGSAP(() => {
    if (loading) return;

    gsap.fromTo('.stagger-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );
  }, { scope: containerRef, dependencies: [loading] });

  const getStatusInfo = (status) => {
    // Four-Step Commute Logic status mapping with strict monochrome dark mode
    switch (status) {
      case 'not_boarded':
        return { label: 'Waiting', color: 'bg-gray-100 text-gray-700 dark:bg-[#222] dark:text-gray-300', icon: Clock };
      case 'morning_picked_up':
      case 'on_bus':
        return { label: 'On Bus to School', color: 'bg-gray-200 text-gray-800 dark:bg-[#333] dark:text-gray-200', icon: Bus };
      case 'at_school':
        return { label: 'At School', color: 'bg-black text-white dark:bg-white dark:text-black', icon: CheckCircle2 };
      case 'evening_picked_up':
        return { label: 'On Bus Home', color: 'bg-gray-200 text-gray-800 dark:bg-[#333] dark:text-gray-200', icon: Bus };
      case 'dropped_home':
      case 'at_home':
        return { label: 'Home Safe', color: 'bg-black text-white dark:bg-white dark:text-black', icon: Shield };
      case 'absent':
        return { label: 'Absent', color: 'bg-gray-100 text-gray-700 dark:bg-[#222] dark:text-gray-300', icon: AlertTriangle };
      default:
        return { label: 'Unknown', color: 'bg-gray-50 text-gray-500 dark:bg-[#1a1a1a] dark:text-gray-500', icon: AlertTriangle };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-black dark:border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto" ref={containerRef}>
      {/* Welcome Header */}
      <div className="stagger-card section-card bg-black dark:bg-[#fcfcfc] rounded-3xl p-6 sm:p-8 text-white dark:text-black relative overflow-hidden shadow-xl shadow-black/10 dark:shadow-none border border-black dark:border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Good {getGreeting()}, {user?.name?.split(' ')[0] || 'Parent'}!</h1>
        <p className="text-gray-400 dark:text-gray-600 mt-2 text-sm sm:text-base">Stay updated with your children's live transportation status.</p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-[#1a1a1a] dark:bg-white border border-[#333] dark:border-gray-200 rounded-2xl p-4 shadow-sm group hover:border-[#555] dark:hover:border-gray-300 transition-colors">
            <p className="text-3xl sm:text-4xl font-black">{children.length}</p>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mt-1">Children</p>
          </div>
          <div className="bg-[#1a1a1a] dark:bg-white border border-[#333] dark:border-gray-200 rounded-2xl p-4 shadow-sm group hover:border-[#555] dark:hover:border-gray-300 transition-colors">
            <p className="text-3xl sm:text-4xl font-black">{children.filter(c => c.status === 'at_school').length}</p>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mt-1">At School</p>
          </div>
          <div className="bg-[#1a1a1a] dark:bg-white border border-[#333] dark:border-gray-200 rounded-2xl p-4 shadow-sm group hover:border-[#555] dark:hover:border-gray-300 transition-colors">
            <p className="text-3xl sm:text-4xl font-black">{children.filter(c => c.status === 'on_bus' || c.status === 'morning_picked_up' || c.status === 'evening_picked_up').length}</p>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mt-1">On Bus</p>
          </div>
          <div className="bg-[#1a1a1a] dark:bg-white border border-[#333] dark:border-gray-200 rounded-2xl p-4 shadow-sm group hover:border-[#555] dark:hover:border-gray-300 transition-colors">
            <p className="text-3xl sm:text-4xl font-black">0</p>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mt-1">Alerts</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Children Status Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-black dark:text-white">Active Status</h2>
            <Link to="/children" className="text-sm text-gray-500 hover:text-black dark:hover:text-white font-medium transition-colors bg-gray-50 dark:bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#333]">
              Manage Profiles
            </Link>
          </div>

          <div className="space-y-4">
            {children.map((child) => {
              const statusInfo = getStatusInfo(child.status);
              const StatusIcon = statusInfo.icon;

              return (
                <Link
                  key={child._id}
                  to={`/tracking?child=${child._id}`}
                  className="stagger-card block bg-white dark:bg-[#111] rounded-3xl border border-gray-100 dark:border-[#222] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] p-5 sm:p-6 hover:shadow-lg hover:border-black/10 dark:hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] flex items-center justify-center text-black dark:text-white text-xl font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
                      {child.name?.charAt(0) || 'C'}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-black dark:text-white truncate">{child.name}</h3>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-transparent ${statusInfo.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusInfo.label}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-500">{child.grade} Grade</p>

                      {child.lastScan && (
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#222] flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                            <Clock className="w-4 h-4 text-black dark:text-white" />
                            {getScanTypeLabel(child.lastScan.type)}
                            <span className="text-gray-400 dark:text-gray-600">•</span>
                            {formatDistanceToNow(new Date(child.lastScan.time), { addSuffix: true })}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                            <Bus className="w-4 h-4 text-black dark:text-white" />
                            {child.lastScan.bus}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="hidden sm:flex self-center w-10 h-10 rounded-full bg-gray-50 dark:bg-[#1a1a1a] items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors shrink-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-black dark:text-white mb-6">Quick Navigation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
            <Link
              to="/tracking"
              className="stagger-card flex items-center gap-4 p-4 bg-white dark:bg-[#111] rounded-2xl border border-gray-100 dark:border-[#222] hover:shadow-md hover:border-black/10 dark:hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <MapPin className="w-5 h-5 text-current" />
              </div>
              <div>
                <p className="font-bold text-black dark:text-white">Live Tracking</p>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Track maps in real-time</p>
              </div>
            </Link>
            
            <Link
              to="/history"
              className="stagger-card flex items-center gap-4 p-4 bg-white dark:bg-[#111] rounded-2xl border border-gray-100 dark:border-[#222] hover:shadow-md hover:border-black/10 dark:hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <Clock className="w-5 h-5 text-current" />
              </div>
              <div>
                <p className="font-bold text-black dark:text-white">Trip History</p>
                <p className="text-xs font-medium text-gray-500 mt-0.5">View past route activity</p>
              </div>
            </Link>
            
            <Link
              to="/notifications"
              className="stagger-card flex items-center gap-4 p-4 bg-white dark:bg-[#111] rounded-2xl border border-gray-100 dark:border-[#222] hover:shadow-md hover:border-black/10 dark:hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <Bell className="w-5 h-5 text-current" />
              </div>
              <div>
                <p className="font-bold text-black dark:text-white">Notifications</p>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Review recent messages</p>
              </div>
            </Link>
            
            <Link
              to="/children"
              className="stagger-card flex items-center gap-4 p-4 bg-white dark:bg-[#111] rounded-2xl border border-gray-100 dark:border-[#222] hover:shadow-md hover:border-black/10 dark:hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <User className="w-5 h-5 text-current" />
              </div>
              <div>
                <p className="font-bold text-black dark:text-white">My Profile</p>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Manage family details</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

function getScanTypeLabel(scanType) {
  const labels = {
    morning_pickup: 'Picked up from home',
    morning_dropoff: 'Dropped at school',
    evening_pickup: 'Picked up from school',
    evening_dropoff: 'Dropped at home',
    pickup: 'Picked up',
    dropoff: 'Dropped off',
  };
  return labels[scanType] || scanType;
}
