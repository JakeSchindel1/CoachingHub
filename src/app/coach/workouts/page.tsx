'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  CalendarIcon,
  UserGroupIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

export default function CoachWorkoutsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock workouts data (will be replaced with real data)
  const mockWorkouts = [
    {
      id: '1',
      name: 'Upper Body Strength',
      description: 'Focus on building chest, back, and shoulder strength',
      status: 'assigned',
      type: 'strength',
      scheduledDate: '2024-01-15T18:00:00',
      assignedAthletes: ['Sarah Johnson', 'Mike Wilson'],
      exerciseCount: 5,
      estimatedDuration: 45,
      createdAt: '2024-01-10T10:00:00',
    },
    {
      id: '2',
      name: 'HIIT Cardio Blast',
      description: 'High-intensity interval training for cardiovascular fitness',
      status: 'completed',
      type: 'cardio',
      scheduledDate: '2024-01-12T07:00:00',
      assignedAthletes: ['Emily Davis'],
      exerciseCount: 4,
      estimatedDuration: 30,
      createdAt: '2024-01-08T14:30:00',
    },
    {
      id: '6',
      name: 'Upper Body Strength',
      description: 'Focus on compound movements with progressive overload',
      status: 'completed',
      type: 'strength',
      scheduledDate: '2024-01-15T09:00:00',
      assignedAthletes: ['Sarah Johnson'],
      exerciseCount: 3,
      estimatedDuration: 75,
      createdAt: '2024-01-14T08:00:00',
    },
    {
      id: '3',
      name: 'Lower Body Power',
      description: 'Explosive movements for leg strength and power',
      status: 'draft',
      type: 'strength',
      scheduledDate: null,
      assignedAthletes: [],
      exerciseCount: 6,
      estimatedDuration: 50,
      createdAt: '2024-01-13T16:15:00',
    },
    {
      id: '4',
      name: 'Recovery & Mobility',
      description: 'Active recovery and flexibility work',
      status: 'assigned',
      type: 'flexibility',
      scheduledDate: '2024-01-16T10:00:00',
      assignedAthletes: ['James Brown', 'Sarah Johnson', 'Mike Wilson'],
      exerciseCount: 8,
      estimatedDuration: 35,
      createdAt: '2024-01-11T09:20:00',
    },
    {
      id: '5',
      name: 'Full Body Circuit',
      description: 'Complete body workout with circuit training',
      status: 'assigned',
      type: 'strength',
      scheduledDate: '2024-01-17T17:30:00',
      assignedAthletes: ['Emily Davis', 'James Brown'],
      exerciseCount: 7,
      estimatedDuration: 60,
      createdAt: '2024-01-12T11:45:00',
    },
  ];

  // Filter workouts based on search and filters
  const filteredWorkouts = mockWorkouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workout.status === statusFilter;
    const matchesType = typeFilter === 'all' || workout.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get status color and text
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'draft':
        return { color: 'bg-gray-100 text-gray-800', text: 'Draft' };
      case 'assigned':
        return { color: 'bg-blue-100 text-blue-800', text: 'Assigned' };
      case 'completed':
        return { color: 'bg-green-100 text-green-800', text: 'Completed' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: 'Unknown' };
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <DashboardLayout title="Workouts">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Workouts</h2>
            <p className="text-sm text-gray-500">Manage and create workouts for your athletes</p>
          </div>
          <Link
            href="/coach/workouts/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Workout
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workouts..."
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
              <option value="draft">Draft</option>
              <option value="assigned">Assigned</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="strength">Strength</option>
              <option value="cardio">Cardio</option>
              <option value="flexibility">Flexibility</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Workouts</p>
                <p className="text-2xl font-semibold text-gray-900">{mockWorkouts.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Assigned</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockWorkouts.filter(w => w.status === 'assigned').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockWorkouts.filter(w => w.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <DocumentDuplicateIcon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Drafts</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockWorkouts.filter(w => w.status === 'draft').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Workouts List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Workouts ({filteredWorkouts.length})
            </h3>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredWorkouts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No workouts found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredWorkouts.map((workout) => (
                <div key={workout.id} className={`p-6 transition-colors ${workout.status === 'completed' ? 'hover:bg-gray-50 cursor-pointer' : 'hover:bg-gray-50'}`}
                     onClick={workout.status === 'completed' ? () => window.location.href = `/coach/workouts/${workout.id}/review` : undefined}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-medium text-gray-900 truncate">
                          {workout.name}
                        </h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusDisplay(workout.status).color}`}>
                          {getStatusDisplay(workout.status).text}
                          {workout.status === 'completed' && <span className="ml-1">→</span>}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                          {workout.type}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{workout.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {workout.exerciseCount} exercises
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          ~{workout.estimatedDuration} min
                        </div>
                        <div className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 mr-1" />
                          {workout.assignedAthletes.length > 0 
                            ? `${workout.assignedAthletes.length} athletes`
                            : 'Not assigned'
                          }
                        </div>
                        {workout.scheduledDate && (
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {formatDate(workout.scheduledDate)}
                          </div>
                        )}
                      </div>
                      
                      {workout.assignedAthletes.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">
                            Assigned to: {workout.assignedAthletes.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4 flex items-center space-x-2">
                      <Link
                        href={`/coach/workouts/${workout.id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit workout"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button
                        className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                        title="Duplicate workout"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete workout"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <EllipsisVerticalIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Empty State for New Users */}
        {mockWorkouts.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first workout for your athletes.</p>
            <Link
              href="/coach/workouts/create"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create First Workout
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 