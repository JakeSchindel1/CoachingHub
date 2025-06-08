'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import {
  ArrowLeftIcon,
  PencilIcon,
  ChatBubbleLeftIcon,
  CalendarIcon,
  ChartBarIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  BoltIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  FlagIcon,
  TrophyIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

interface WorkoutHistory {
  id: string;
  name: string;
  date: string;
  completed: boolean;
  rating?: number;
  duration: number;
  exerciseCount: number;
  completionRate: number;
  avgRPE?: number;
  notes?: string;
}

interface ProgressMetric {
  date: string;
  weight?: number;
  bodyFat?: number;
  muscle?: number;
  benchPress?: number;
  squat?: number;
  deadlift?: number;
}

interface AthleteProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  initials: string;
  joinedDate: string;
  status: 'active' | 'inactive' | 'trial';
  lastActivity: string;
  unreadMessages: number;
  
  // Personal Details
  age?: number;
  height?: string;
  weight?: number;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  
  // Fitness Details
  goals: string[];
  medicalNotes?: string;
  coachNotes?: string;
  experience: 'beginner' | 'intermediate' | 'advanced';
  preferredWorkoutTime: string;
  
  // Stats
  stats: {
    totalWorkouts: number;
    completedWorkouts: number;
    completionRate: number;
    averageRating: number;
    currentStreak: number;
    longestStreak: number;
    totalHours: number;
    avgSessionDuration: number;
  };
  
  // Recent Data
  workoutHistory: WorkoutHistory[];
  progressMetrics: ProgressMetric[];
}

export default function AthleteProfilePage() {
  const params = useParams();
  const athleteId = params.id as string;
  
  const [activeTab, setActiveTab] = useState<'overview' | 'workouts' | 'progress' | 'goals'>('overview');
  const [newGoal, setNewGoal] = useState('');
  const [newNote, setNewNote] = useState('');

  // Mock athlete profile data - in real app this would come from API
  const athlete: AthleteProfile = {
    id: athleteId,
    name: athleteId === '1' ? 'Sarah Johnson' : 
          athleteId === '2' ? 'Mike Wilson' :
          athleteId === '3' ? 'Emily Davis' : 'James Brown',
    email: athleteId === '1' ? 'sarah.johnson@email.com' :
           athleteId === '2' ? 'mike.wilson@email.com' :
           athleteId === '3' ? 'emily.davis@email.com' : 'james.brown@email.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    initials: athleteId === '1' ? 'SJ' : 
              athleteId === '2' ? 'MW' :
              athleteId === '3' ? 'ED' : 'JB',
    joinedDate: athleteId === '1' ? '2023-11-15' :
                athleteId === '2' ? '2023-12-01' :
                athleteId === '3' ? '2024-01-08' : '2023-10-20',
    status: athleteId === '1' || athleteId === '2' ? 'active' :
            athleteId === '3' ? 'trial' : 'inactive',
    lastActivity: athleteId === '1' ? '2 hours ago' :
                  athleteId === '2' ? '1 day ago' :
                  athleteId === '3' ? '3 days ago' : '2 weeks ago',
    unreadMessages: athleteId === '2' ? 2 : athleteId === '3' ? 1 : 0,
    
    age: athleteId === '1' ? 28 : athleteId === '2' ? 34 : athleteId === '3' ? 25 : 31,
    height: athleteId === '1' ? "5'6\"" : athleteId === '2' ? "6'1\"" : athleteId === '3' ? "5'4\"" : "5'10\"",
    weight: athleteId === '1' ? 135 : athleteId === '2' ? 185 : athleteId === '3' ? 128 : 170,
    
    emergencyContact: {
      name: 'John Johnson',
      phone: '+1 (555) 987-6543',
      relationship: 'Spouse'
    },
    
    goals: athleteId === '1' ? ['Increase bench press to 150lbs', 'Improve endurance', 'Lose 10 lbs', 'Better sleep habits'] :
           athleteId === '2' ? ['Build muscle mass', 'Increase squat PR to 400lbs', 'Better sleep habits', 'Reduce stress'] :
           athleteId === '3' ? ['Weight loss (20lbs)', 'Tone arms', 'Build confidence', 'Run a 5K'] :
           ['Marathon training', 'Injury prevention', 'Consistency', 'Improve speed'],
           
    medicalNotes: athleteId === '1' ? 'Previous shoulder injury - avoid overhead movements until cleared by PT' :
                  athleteId === '4' ? 'Knee issues - focus on low-impact exercises' : undefined,
                  
    coachNotes: athleteId === '1' ? 'Very motivated athlete. Prefers morning workouts. Responds well to positive reinforcement.' :
                athleteId === '2' ? 'Experienced lifter. Focus on progressive overload. Available evenings only.' :
                athleteId === '3' ? 'New to fitness. Start with bodyweight exercises. Very enthusiastic but needs encouragement.' :
                'Runner with knee issues. Missed several sessions recently - check in needed.',
                
    experience: athleteId === '1' ? 'intermediate' :
                athleteId === '2' ? 'advanced' :
                athleteId === '3' ? 'beginner' : 'intermediate',
                
    preferredWorkoutTime: athleteId === '1' ? 'Morning (7-9 AM)' :
                          athleteId === '2' ? 'Evening (6-8 PM)' :
                          athleteId === '3' ? 'Afternoon (2-4 PM)' : 'Morning (6-8 AM)',
    
    stats: {
      totalWorkouts: athleteId === '1' ? 45 : athleteId === '2' ? 38 : athleteId === '3' ? 8 : 52,
      completedWorkouts: athleteId === '1' ? 42 : athleteId === '2' ? 35 : athleteId === '3' ? 6 : 38,
      completionRate: athleteId === '1' ? 93 : athleteId === '2' ? 92 : athleteId === '3' ? 75 : 73,
      averageRating: athleteId === '1' ? 4.2 : athleteId === '2' ? 4.5 : athleteId === '3' ? 3.8 : 3.5,
      currentStreak: athleteId === '1' ? 7 : athleteId === '2' ? 12 : athleteId === '3' ? 2 : 0,
      longestStreak: athleteId === '1' ? 15 : athleteId === '2' ? 18 : athleteId === '3' ? 4 : 22,
      totalHours: athleteId === '1' ? 67 : athleteId === '2' ? 58 : athleteId === '3' ? 5 : 78,
      avgSessionDuration: athleteId === '1' ? 58 : athleteId === '2' ? 62 : athleteId === '3' ? 38 : 45
    },
    
    workoutHistory: [
      {
        id: '1',
        name: 'Upper Body Strength',
        date: '2024-01-15',
        completed: true,
        rating: 4,
        duration: 75,
        exerciseCount: 3,
        completionRate: 100,
        avgRPE: 7.5,
        notes: 'Great session! Felt strong today.'
      },
      {
        id: '2',
        name: 'HIIT Cardio',
        date: '2024-01-13',
        completed: true,
        rating: 5,
        duration: 30,
        exerciseCount: 4,
        completionRate: 100,
        avgRPE: 8.2
      },
      {
        id: '3',
        name: 'Lower Body Power',
        date: '2024-01-11',
        completed: true,
        rating: 3,
        duration: 60,
        exerciseCount: 5,
        completionRate: 80,
        avgRPE: 9.1,
        notes: 'Struggled with squats, knee felt tight.'
      },
      {
        id: '4',
        name: 'Recovery & Mobility',
        date: '2024-01-09',
        completed: false,
        duration: 0,
        exerciseCount: 6,
        completionRate: 0,
        notes: 'Skipped due to illness'
      },
      {
        id: '5',
        name: 'Full Body Circuit',
        date: '2024-01-07',
        completed: true,
        rating: 4,
        duration: 55,
        exerciseCount: 7,
        completionRate: 85,
        avgRPE: 7.8
      }
    ],
    
    progressMetrics: [
      { date: '2024-01-15', weight: 135, bodyFat: 22, benchPress: 125, squat: 185, deadlift: 225 },
      { date: '2024-01-01', weight: 138, bodyFat: 24, benchPress: 120, squat: 175, deadlift: 215 },
      { date: '2023-12-15', weight: 142, bodyFat: 26, benchPress: 115, squat: 165, deadlift: 205 },
      { date: '2023-12-01', weight: 145, bodyFat: 28, benchPress: 110, squat: 155, deadlift: 195 },
      { date: '2023-11-15', weight: 148, bodyFat: 30, benchPress: 105, squat: 145, deadlift: 185 }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'trial': return 'bg-blue-100 text-blue-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'beginner': return 'bg-yellow-100 text-yellow-700';
      case 'intermediate': return 'bg-blue-100 text-blue-700';
      case 'advanced': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    // In real app, this would update the backend
    console.log('Adding goal:', newGoal);
    setNewGoal('');
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    // In real app, this would update the backend
    console.log('Adding note:', newNote);
    setNewNote('');
  };

  const updateGoal = (goalId: number, updates: Partial<{ title: string; target: string; deadline: string; notes: string }>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    ));
  };

  return (
    <DashboardLayout title="">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/coach/athletes" className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Athletes
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{athlete.initials}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{athlete.name}</h1>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(athlete.status)}`}>
                      {athlete.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getExperienceColor(athlete.experience)}`}>
                      {athlete.experience}
                    </span>
                    <span className="text-sm text-gray-500">Joined {new Date(athlete.joinedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/coach/messages">
                <button className="relative px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                  Message
                  {athlete.unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {athlete.unreadMessages}
                    </span>
                  )}
                </button>
              </Link>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: UserIcon },
                { id: 'workouts', name: 'Workout History', icon: CalendarIcon },
                { id: 'progress', name: 'Progress Tracking', icon: ChartBarIcon },
                { id: 'goals', name: 'Goals & Notes', icon: FlagIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'workouts' | 'progress' | 'goals')}
                  className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <>
                  {/* Key Stats */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Overview</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">{athlete.stats.completedWorkouts}</p>
                        <p className="text-sm text-gray-500">Workouts Completed</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-emerald-600">{athlete.stats.completionRate}%</p>
                        <p className="text-sm text-gray-500">Success Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-yellow-600">{athlete.stats.currentStreak}</p>
                        <p className="text-sm text-gray-500">Current Streak</p>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center items-center mb-1">
                          {[1,2,3,4,5].map(star => (
                            <StarIcon key={star} className={`h-5 w-5 ${star <= athlete.stats.averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">Avg Rating</p>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="text-gray-900">{athlete.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <PhoneIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Phone</p>
                            <p className="text-gray-900">{athlete.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Location</p>
                            <p className="text-gray-900">{athlete.address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Age</p>
                          <p className="text-gray-900">{athlete.age} years old</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Height & Weight</p>
                          <p className="text-gray-900">{athlete.height}, {athlete.weight} lbs</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Preferred Workout Time</p>
                          <p className="text-gray-900">{athlete.preferredWorkoutTime}</p>
                        </div>
                      </div>
                    </div>

                    {athlete.emergencyContact && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Emergency Contact</h4>
                        <p className="text-gray-700">{athlete.emergencyContact.name} ({athlete.emergencyContact.relationship})</p>
                        <p className="text-gray-600">{athlete.emergencyContact.phone}</p>
                      </div>
                    )}
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Workout History</h3>
                    <div className="space-y-4">
                      {athlete.workoutHistory.slice(0, 5).map((workout) => (
                        <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              workout.completed ? 'bg-emerald-100' : 'bg-red-100'
                            }`}>
                              {workout.completed ? (
                                <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
                              ) : (
                                <XCircleIcon className="h-6 w-6 text-red-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{workout.name}</h4>
                              <p className="text-sm text-gray-500">{workout.date} • {workout.duration} min</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {workout.rating && (
                              <div className="flex items-center">
                                {[1,2,3,4,5].map(star => (
                                  <StarIcon key={star} className={`h-4 w-4 ${star <= workout.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                              </div>
                            )}
                            <Link href={`/coach/workouts/${workout.id}/review`}>
                              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Review
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Workouts Tab */}
              {activeTab === 'workouts' && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Complete Workout History</h2>
                    <div className="text-sm text-gray-500">
                      {athlete.stats.completedWorkouts} of {athlete.stats.totalWorkouts} completed
                    </div>
                  </div>
                  <div className="space-y-4">
                    {athlete.workoutHistory.map((workout) => (
                      <div key={workout.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              workout.completed ? 'bg-emerald-100' : 'bg-red-100'
                            }`}>
                              {workout.completed ? (
                                <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                              ) : (
                                <XCircleIcon className="h-5 w-5 text-red-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{workout.name}</h3>
                              <p className="text-sm text-gray-500">{workout.date}</p>
                            </div>
                          </div>
                          {workout.completed && (
                            <Link href={`/coach/workouts/${workout.id}/review`}>
                              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                                Review
                              </button>
                            </Link>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="text-center">
                            <p className="text-lg font-bold text-gray-900">{workout.duration}</p>
                            <p className="text-xs text-gray-500">Minutes</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-gray-900">{workout.exerciseCount}</p>
                            <p className="text-xs text-gray-500">Exercises</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-gray-900">{workout.completionRate}%</p>
                            <p className="text-xs text-gray-500">Completed</p>
                          </div>
                          {workout.avgRPE && (
                            <div className="text-center">
                              <p className="text-lg font-bold text-gray-900">{workout.avgRPE}</p>
                              <p className="text-xs text-gray-500">Avg RPE</p>
                            </div>
                          )}
                        </div>

                        {workout.rating && (
                          <div className="flex items-center mb-2">
                            <span className="text-sm text-gray-500 mr-2">Rating:</span>
                            {[1,2,3,4,5].map(star => (
                              <StarIcon key={star} className={`h-4 w-4 ${star <= workout.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        )}

                        {workout.notes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{workout.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Tab */}
              {activeTab === 'progress' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Strength Progress</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{athlete.progressMetrics[0]?.benchPress || 0} lbs</p>
                        <p className="text-sm text-gray-600">Bench Press</p>
                        <p className="text-xs text-emerald-600">+20 lbs from start</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{athlete.progressMetrics[0]?.squat || 0} lbs</p>
                        <p className="text-sm text-gray-600">Squat</p>
                        <p className="text-xs text-emerald-600">+40 lbs from start</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">{athlete.progressMetrics[0]?.deadlift || 0} lbs</p>
                        <p className="text-sm text-gray-600">Deadlift</p>
                        <p className="text-xs text-emerald-600">+40 lbs from start</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Body Composition</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-emerald-50 rounded-lg">
                        <p className="text-3xl font-bold text-emerald-600">{athlete.progressMetrics[0]?.weight || athlete.weight} lbs</p>
                        <p className="text-sm text-gray-600">Current Weight</p>
                        <p className="text-xs text-emerald-600">-13 lbs from start</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <p className="text-3xl font-bold text-yellow-600">{athlete.progressMetrics[0]?.bodyFat || 25}%</p>
                        <p className="text-sm text-gray-600">Body Fat</p>
                        <p className="text-xs text-emerald-600">-8% from start</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Timeline</h3>
                    <div className="space-y-4">
                      {athlete.progressMetrics.map((metric) => (
                        <div key={metric.date} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{metric.date}</p>
                            <p className="text-sm text-gray-500">Progress check-in</p>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{metric.weight} lbs</p>
                              <p className="text-xs text-gray-500">Weight</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{metric.bodyFat}%</p>
                              <p className="text-xs text-gray-500">Body Fat</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{metric.benchPress} lbs</p>
                              <p className="text-xs text-gray-500">Bench</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Goals Tab */}
              {activeTab === 'goals' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-900">Goals</h2>
                      <button 
                        onClick={() => {/* Open add goal modal */}}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Add Goal
                      </button>
                    </div>
                    <div className="space-y-3">
                      {athlete.goals.map((goal, index) => (
                        <div key={`goal-${index}`} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FlagIcon className="h-5 w-5 text-blue-600" />
                            <span className="text-gray-900">{goal}</span>
                          </div>
                          <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add new goal..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                      />
                      <button
                        onClick={addGoal}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Coach Notes */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Coach Notes</h3>
                    {athlete.coachNotes && (
                      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                        <p className="text-gray-700">{athlete.coachNotes}</p>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <textarea
                        placeholder="Add coaching notes..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows={3}
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                      />
                      <button
                        onClick={addNote}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors self-start"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Medical Notes */}
                  {athlete.medicalNotes && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Medical Notes</h3>
                      <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                        <div className="flex">
                          <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
                          <p className="text-red-700">{athlete.medicalNotes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <Link href="/coach/workouts/create">
                    <button className="w-full flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Create Workout
                    </button>
                  </Link>
                  <Link href="/coach/messages">
                    <button className="w-full flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                      <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                      Send Message
                    </button>
                  </Link>
                  <button className="w-full flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Schedule Session
                  </button>
                </div>
              </div>

              {/* Recent Stats */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Quick Stats</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Hours</span>
                    <span className="font-bold text-gray-900">{athlete.stats.totalHours}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg Session</span>
                    <span className="font-bold text-gray-900">{athlete.stats.avgSessionDuration}min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Longest Streak</span>
                    <span className="font-bold text-gray-900">{athlete.stats.longestStreak} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Activity</span>
                    <span className="font-bold text-gray-900">{athlete.lastActivity}</span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Recent Achievements</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <TrophyIcon className="h-6 w-6 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">7-Day Streak</p>
                      <p className="text-xs text-gray-500">Consistency champion</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <BoltIcon className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Strength Gains</p>
                      <p className="text-xs text-gray-500">20lbs bench increase</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                    <HeartIcon className="h-6 w-6 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Weight Loss</p>
                      <p className="text-xs text-gray-500">13 lbs lost</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 