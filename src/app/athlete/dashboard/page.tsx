'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { 
  CalendarIcon, 
  TrophyIcon, 
  ClockIcon,
  FireIcon,
} from '@heroicons/react/24/outline';

export default function AthleteDashboardPage() {
  // Mock data - will be replaced with real data later
  const stats = [
    { name: 'Workouts This Week', value: '4', icon: CalendarIcon, color: 'text-emerald-600' },
    { name: 'Total Workouts', value: '47', icon: TrophyIcon, color: 'text-blue-600' },
    { name: 'Hours Trained', value: '23.5', icon: ClockIcon, color: 'text-purple-600' },
    { name: 'Calories Burned', value: '1,840', icon: FireIcon, color: 'text-orange-600' },
  ];

  const upcomingWorkouts = [
    {
      id: 1,
      name: 'Lower Body Strength',
      coach: 'John Coach',
      time: 'Today, 6:00 PM',
      duration: '45 mins',
      status: 'scheduled',
    },
    {
      id: 2,
      name: 'Interval Training',
      coach: 'John Coach',
      time: 'Tomorrow, 7:00 AM',
      duration: '30 mins',
      status: 'scheduled',
    },
    {
      id: 3,
      name: 'Recovery Run',
      coach: 'John Coach',
      time: 'Friday, 6:30 AM',
      duration: '40 mins',
      status: 'scheduled',
    },
  ];

  const recentWorkouts = [
    {
      id: 1,
      name: 'Upper Body Strength',
      completedAt: '2 hours ago',
      duration: '42 mins',
      notes: 'Great session! Increased weight on bench press.',
      status: 'completed',
    },
    {
      id: 2,
      name: '5K Run Training',
      completedAt: 'Yesterday',
      duration: '28 mins',
      notes: 'New personal best! Sub-25 minute 5K.',
      status: 'completed',
    },
    {
      id: 3,
      name: 'Core & Flexibility',
      completedAt: '2 days ago',
      duration: '35 mins',
      notes: 'Feeling more flexible. Great stretching session.',
      status: 'completed',
    },
  ];

  const messages = [
    {
      id: 1,
      from: 'John Coach',
      preview: 'Great job on your 5K time! Let\'s work on...',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      from: 'John Coach',
      preview: 'Your workout plan for next week is ready.',
      time: '1 day ago',
      unread: false,
    },
    {
      id: 3,
      from: 'John Coach',
      preview: 'Don\'t forget to upload your .FIT file...',
      time: '3 days ago',
      unread: false,
    },
  ];

  const progressMetrics = [
    { name: 'Weekly Goal', current: 4, target: 5, unit: 'workouts' },
    { name: 'Monthly Goal', current: 16, target: 20, unit: 'workouts' },
    { name: 'Weight Loss', current: 8, target: 15, unit: 'lbs' },
  ];

  return (
    <DashboardLayout title="Athlete Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="ml-4 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Workouts */}
          <div className="lg:col-span-2 bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Workouts</h3>
              <button className="text-sm text-emerald-600 hover:text-emerald-500 font-medium">
                View all
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {upcomingWorkouts.map((workout) => (
                <div key={workout.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {workout.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {workout.time} • {workout.duration}
                      </p>
                      <p className="text-xs text-gray-400">
                        Coach: {workout.coach}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {workout.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Metrics */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Progress</h3>
            </div>
            <div className="p-6 space-y-6">
              {progressMetrics.map((metric) => (
                <div key={metric.name}>
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>{metric.name}</span>
                    <span>{metric.current}/{metric.target} {metric.unit}</span>
                  </div>
                  <div className="mt-1">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all"
                        style={{ width: `${(metric.current / metric.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Workouts */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Workouts</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentWorkouts.map((workout) => (
                <div key={workout.id} className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {workout.name}
                      </p>
                      <p className="text-sm text-gray-500 mb-1">
                        {workout.completedAt} • {workout.duration}
                      </p>
                      <p className="text-xs text-gray-600">
                        {workout.notes}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {workout.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm text-emerald-600 hover:text-emerald-500 font-medium">
                View workout history
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Messages</h3>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  1 new
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {messages.map((message) => (
                <div key={message.id} className={`px-6 py-4 ${message.unread ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${message.unread ? 'text-blue-900' : 'text-gray-900'}`}>
                        {message.from}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {message.preview}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                      <span className="text-xs text-gray-400">
                        {message.time}
                      </span>
                      {message.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm text-emerald-600 hover:text-emerald-500 font-medium">
                View all messages
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                Start Workout
              </button>
              <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Upload .FIT File
              </button>
              <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Message Coach
              </button>
              <button className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium">
                View Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 