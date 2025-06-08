'use client';

import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  UserGroupIcon, 
  CalendarIcon, 
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  PlusIcon,
  ClockIcon,
  FireIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

export default function CoachDashboardPage() {
  // Mock data - will be replaced with real data later
  const stats = [
    { name: 'Total Athletes', value: '12', icon: UserGroupIcon, color: 'text-blue-600' },
    { name: 'Active Workouts', value: '24', icon: CalendarIcon, color: 'text-emerald-600' },
    { name: 'Unread Messages', value: '3', icon: ChatBubbleLeftRightIcon, color: 'text-yellow-600' },
    { name: 'This Month Revenue', value: '$2,840', icon: ChartBarIcon, color: 'text-purple-600' },
  ];

  const recentActivities = [
    {
      id: 1,
      athlete: 'Sarah Johnson',
      action: 'Completed workout',
      workout: 'Upper Body Strength',
      time: '2 hours ago',
    },
    {
      id: 2,
      athlete: 'Mike Wilson',
      action: 'Uploaded .FIT file',
      workout: '5K Run Training',
      time: '4 hours ago',
    },
    {
      id: 3,
      athlete: 'Emily Davis',
      action: 'Asked a question',
      workout: 'About nutrition plan',
      time: '6 hours ago',
    },
    {
      id: 4,
      athlete: 'James Brown',
      action: 'Started new program',
      workout: 'Marathon Prep',
      time: '1 day ago',
    },
  ];

  const upcomingWorkouts = [
    {
      id: 1,
      athlete: 'Sarah Johnson',
      workout: 'Lower Body Strength',
      time: 'Today, 6:00 PM',
      status: 'scheduled',
    },
    {
      id: 2,
      athlete: 'Mike Wilson',
      workout: 'Interval Training',
      time: 'Tomorrow, 7:00 AM',
      status: 'scheduled',
    },
    {
      id: 3,
      athlete: 'Emily Davis',
      workout: 'Yoga Flow',
      time: 'Tomorrow, 8:00 AM',
      status: 'scheduled',
    },
  ];

  return (
    <DashboardLayout title="">
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Quick Actions */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Good morning! 👋</h1>
                <p className="text-gray-600 mt-1">Ready to help your athletes crush their goals today?</p>
              </div>
              <div className="flex space-x-3">
                <Link href="/coach/workouts/create">
                  <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Create Workout
                  </button>
                </Link>
                <button className="flex items-center px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  Add Athlete
                </button>
              </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={stat.name} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-white shadow-sm`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Today's Focus */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Today's Focus</h2>
                  <span className="text-sm text-gray-500">3 athletes need attention</span>
                </div>
                
                <div className="space-y-4">
                  {upcomingWorkouts.map((workout, index) => (
                    <div key={workout.id} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-all">
                          <ClockIcon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{workout.athlete}</p>
                            <p className="text-sm text-gray-600">{workout.workout}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{workout.time}</p>
                            <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700">
                              Ready to start
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link href="/coach/workouts/create">
                    <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all border-2 border-dashed border-blue-200 hover:border-blue-300">
                      <PlusIcon className="h-5 w-5 mr-2" />
                      Create new workout for your athletes
                    </button>
                  </Link>
                </div>
              </div>

              {/* Recent Activity Stream */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">What's Happening</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <TrophyIcon className="h-5 w-5 text-emerald-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">{activity.athlete}</span> {activity.action.toLowerCase()}
                        </p>
                        <p className="text-sm text-gray-500">{activity.workout}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Quick Actions & Insights */}
            <div className="space-y-6">
              {/* Quick Workout Templates */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Start</h3>
                <div className="space-y-3">
                  <Link href="/coach/workouts/create?type=strength">
                    <button className="w-full flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all group">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FireIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3 text-left">
                        <p className="font-semibold text-gray-900">Strength Workout</p>
                        <p className="text-xs text-gray-600">Sets, reps & weights</p>
                      </div>
                    </button>
                  </Link>
                  
                  <Link href="/coach/workouts/create?type=running">
                    <button className="w-full flex items-center p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all group">
                      <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ClockIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3 text-left">
                        <p className="font-semibold text-gray-900">Running Workout</p>
                        <p className="text-xs text-gray-600">Intervals & pacing</p>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>

              {/* This Week */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">This Week</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Workouts created</span>
                    <span className="text-xl font-bold text-gray-900">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Completed sessions</span>
                    <span className="text-xl font-bold text-emerald-600">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Athlete messages</span>
                    <span className="text-xl font-bold text-blue-600">12</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <TrophyIcon className="h-4 w-4 mr-1 text-emerald-500" />
                    94% completion rate this week
                  </div>
                </div>
              </div>

              {/* Messages Preview */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Messages</h3>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">3 new</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-emerald-700">SJ</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                      <p className="text-xs text-gray-500 truncate">Questions about form...</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-blue-700">MW</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Mike Wilson</p>
                      <p className="text-xs text-gray-500 truncate">Workout feedback</p>
                    </div>
                  </div>
                </div>
                <Link href="/coach/messages">
                  <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all messages
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 