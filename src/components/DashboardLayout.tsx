'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current?: boolean;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { auth, signOut } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle redirect in useEffect to avoid SSR issues
  useEffect(() => {
    if (!auth.loading && !auth.user) {
      router.push('/auth/signin');
    }
  }, [auth.loading, auth.user, router]);

  // Show loading while checking auth or if no user
  if (auth.loading || !auth.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Define navigation items based on user role
  const getNavigation = (): NavItem[] => {
    if (auth.user?.role === 'coach') {
      return [
        { name: 'Dashboard', href: '/coach/dashboard', icon: HomeIcon },
        { name: 'Athletes', href: '/coach/athletes', icon: UserGroupIcon },
        { name: 'Workouts', href: '/coach/workouts', icon: CalendarIcon },
        { name: 'Messages', href: '/coach/messages', icon: ChatBubbleLeftRightIcon },
        { name: 'Settings', href: '/coach/settings', icon: Cog6ToothIcon },
      ];
    } else {
      return [
        { name: 'Dashboard', href: '/athlete/dashboard', icon: HomeIcon },
        { name: 'Workouts', href: '/athlete/workouts', icon: CalendarIcon },
        { name: 'Messages', href: '/athlete/messages', icon: ChatBubbleLeftRightIcon },
        { name: 'Settings', href: '/athlete/settings', icon: Cog6ToothIcon },
      ];
    }
  };

  const navigation = getNavigation();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-emerald-600">CoachingApp</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{auth.user.name}</p>
                  <p className="text-xs font-medium text-gray-500 capitalize">{auth.user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className={`text-xl font-bold ${auth.user.role === 'coach' ? 'text-blue-600' : 'text-emerald-600'}`}>
                  CoachingApp
                </h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">{auth.user.name}</p>
                      <p className="text-xs font-medium text-gray-500 capitalize">{auth.user.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
                    title="Sign out"
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top nav */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Welcome back, {auth.user.name}</span>
                  <button
                    onClick={handleSignOut}
                    className="md:hidden bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 