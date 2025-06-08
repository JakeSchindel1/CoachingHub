'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  Bars3Icon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface AthleteStats {
  totalWorkouts: number;
  completedWorkouts: number;
  completionRate: number;
  averageRating: number;
  currentStreak: number;
  lastWorkout: string;
}

interface RecentWorkout {
  id: string;
  name: string;
  date: string;
  rating: number;
  completed: boolean;
  duration: number;
}

interface Athlete {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatar?: string;
  joinedDate: string;
  status: 'active' | 'inactive' | 'trial';
  stats: AthleteStats;
  recentWorkouts: RecentWorkout[];
  goals: string[];
  notes?: string;
  lastActivity: string;
  unreadMessages: number;
}

export default function AthletesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock athletes data
  const athletes: Athlete[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      initials: 'SJ',
      joinedDate: '2023-11-15',
      status: 'active',
      lastActivity: '2 hours ago',
      unreadMessages: 0,
      goals: ['Increase bench press', 'Improve endurance', 'Lose 10 lbs'],
      notes: 'Very motivated athlete. Prefers morning workouts. Has previous shoulder injury - avoid overhead movements until cleared.',
      stats: {
        totalWorkouts: 45,
        completedWorkouts: 42,
        completionRate: 93,
        averageRating: 4.2,
        currentStreak: 7,
        lastWorkout: 'Upper Body Strength'
      },
      recentWorkouts: [
        { id: '1', name: 'Upper Body Strength', date: '2024-01-15', rating: 4, completed: true, duration: 75 },
        { id: '2', name: 'HIIT Cardio', date: '2024-01-13', rating: 5, completed: true, duration: 30 },
        { id: '3', name: 'Lower Body Power', date: '2024-01-11', rating: 3, completed: true, duration: 60 }
      ]
    },
    {
      id: '2',
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      initials: 'MW',
      joinedDate: '2023-12-01',
      status: 'active',
      lastActivity: '1 day ago',
      unreadMessages: 2,
      goals: ['Build muscle mass', 'Increase squat PR', 'Better sleep habits'],
      notes: 'Experienced lifter. Focus on progressive overload. Available evenings only.',
      stats: {
        totalWorkouts: 38,
        completedWorkouts: 35,
        completionRate: 92,
        averageRating: 4.5,
        currentStreak: 12,
        lastWorkout: 'Full Body Circuit'
      },
      recentWorkouts: [
        { id: '4', name: 'Full Body Circuit', date: '2024-01-14', rating: 5, completed: true, duration: 60 },
        { id: '5', name: 'Upper Body Strength', date: '2024-01-12', rating: 4, completed: true, duration: 45 },
        { id: '6', name: 'Recovery & Mobility', date: '2024-01-10', rating: 4, completed: true, duration: 35 }
      ]
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      initials: 'ED',
      joinedDate: '2024-01-08',
      status: 'trial',
      lastActivity: '3 days ago',
      unreadMessages: 1,
      goals: ['Weight loss', 'Tone arms', 'Build confidence'],
      notes: 'New to fitness. Start with bodyweight exercises. Very enthusiastic but needs encouragement.',
      stats: {
        totalWorkouts: 8,
        completedWorkouts: 6,
        completionRate: 75,
        averageRating: 3.8,
        currentStreak: 2,
        lastWorkout: 'HIIT Cardio Blast'
      },
      recentWorkouts: [
        { id: '7', name: 'HIIT Cardio Blast', date: '2024-01-12', rating: 4, completed: true, duration: 30 },
        { id: '8', name: 'Beginner Strength', date: '2024-01-10', rating: 3, completed: true, duration: 40 },
        { id: '9', name: 'Flexibility Flow', date: '2024-01-09', rating: 5, completed: true, duration: 25 }
      ]
    },
    {
      id: '4',
      name: 'James Brown',
      email: 'james.brown@email.com',
      initials: 'JB',
      joinedDate: '2023-10-20',
      status: 'inactive',
      lastActivity: '2 weeks ago',
      unreadMessages: 0,
      goals: ['Marathon training', 'Injury prevention', 'Consistency'],
      notes: 'Runner with knee issues. Focus on low-impact exercises. Missed several sessions recently - check in needed.',
      stats: {
        totalWorkouts: 52,
        completedWorkouts: 38,
        completionRate: 73,
        averageRating: 3.5,
        currentStreak: 0,
        lastWorkout: 'Recovery & Mobility'
      },
      recentWorkouts: [
        { id: '10', name: 'Recovery & Mobility', date: '2024-01-01', rating: 4, completed: true, duration: 35 },
        { id: '11', name: 'Core Stability', date: '2023-12-28', rating: 3, completed: false, duration: 0 },
        { id: '12', name: 'Low Impact Cardio', date: '2023-12-25', rating: 4, completed: true, duration: 45 }
      ]
    }
  ];

  // Filter and sort athletes
  const filteredAthletes = athletes
    .filter(athlete => {
      const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           athlete.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || athlete.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'joinedDate':
          return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
        case 'completionRate':
          return b.stats.completionRate - a.stats.completionRate;
        case 'lastActivity':
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700';
      case 'trial':
        return 'bg-blue-100 text-blue-700';
      case 'inactive':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 90) return 'text-emerald-600';
    if (rate >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout title="Athletes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Athletes</h2>
            <p className="text-sm text-gray-500">Manage your athlete roster and track their progress</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Athlete
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search athletes..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="joinedDate">Newest First</option>
              <option value="completionRate">Completion Rate</option>
              <option value="lastActivity">Last Activity</option>
            </select>

            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm font-medium ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm font-medium ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Athletes</p>
                <p className="text-2xl font-semibold text-gray-900">{athletes.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {athletes.filter(a => a.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Completion</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Math.round(athletes.reduce((sum, a) => sum + a.stats.completionRate, 0) / athletes.length)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <ChatBubbleLeftIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Unread Messages</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {athletes.reduce((sum, a) => sum + a.unreadMessages, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Athletes Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAthletes.map((athlete) => (
              <div key={athlete.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{athlete.initials}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{athlete.name}</h3>
                      <p className="text-sm text-gray-500">{athlete.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {athlete.unreadMessages > 0 && (
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                        {athlete.unreadMessages}
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(athlete.status)}`}>
                      {athlete.status}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{athlete.stats.completedWorkouts}</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${getCompletionColor(athlete.stats.completionRate)}`}>
                      {athlete.stats.completionRate}%
                    </p>
                    <p className="text-xs text-gray-500">Success Rate</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Recent Workouts</p>
                    <div className="flex items-center">
                      {[1,2,3,4,5].map(star => (
                        <StarIcon key={star} className={`h-3 w-3 ${star <= athlete.stats.averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    {athlete.recentWorkouts.slice(0, 2).map(workout => (
                      <div key={workout.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 truncate">{workout.name}</span>
                        <div className="flex items-center space-x-1">
                          {workout.completed ? (
                            <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-gray-400">{workout.date.split('-')[2]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link href={`/coach/athletes/${athlete.id}`} className="flex-1">
                    <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      View Profile
                    </button>
                  </Link>
                  <Link href="/coach/messages" className="relative">
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <ChatBubbleLeftIcon className="h-4 w-4" />
                    </button>
                    {athlete.unreadMessages > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {athlete.unreadMessages}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="divide-y divide-gray-200">
              {filteredAthletes.map((athlete) => (
                <div key={athlete.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{athlete.initials}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{athlete.name}</h3>
                        <p className="text-sm text-gray-500">{athlete.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-900">{athlete.stats.completedWorkouts}</p>
                        <p className="text-xs text-gray-500">Workouts</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-sm font-semibold ${getCompletionColor(athlete.stats.completionRate)}`}>
                          {athlete.stats.completionRate}%
                        </p>
                        <p className="text-xs text-gray-500">Success</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-900">{athlete.stats.currentStreak}</p>
                        <p className="text-xs text-gray-500">Streak</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">{athlete.lastActivity}</p>
                        <p className="text-xs text-gray-500">Last seen</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(athlete.status)}`}>
                        {athlete.status}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link href={`/coach/athletes/${athlete.id}`}>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View athlete">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                      </Link>
                      <Link href="/coach/messages">
                        <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors relative" title="Message athlete">
                          <ChatBubbleLeftIcon className="h-4 w-4" />
                          {athlete.unreadMessages > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                              {athlete.unreadMessages}
                            </span>
                          )}
                        </button>
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <EllipsisVerticalIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredAthletes.length === 0 && (
          <div className="text-center py-12">
            <UserGroupIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No athletes found</h3>
            <p className="text-gray-500 mb-6">
              {athletes.length === 0 
                ? "Get started by adding your first athlete to begin coaching."
                : "Try adjusting your search or filters to find athletes."
              }
            </p>
            {athletes.length === 0 && (
              <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Your First Athlete
              </button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 