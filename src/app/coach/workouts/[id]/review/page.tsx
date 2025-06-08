'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import {
  ArrowLeftIcon,
  ClockIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon,
  FireIcon,
  TrophyIcon,
  PlayIcon,
  ExclamationTriangleIcon,
  StarIcon,
  HeartIcon,
  ThumbsUpIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

interface CompletedSet {
  id: string;
  reps: number;
  weight: number;
  restPeriod: number;
  completed: boolean;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  notes?: string;
  completionTime?: string;
  form_issues?: string[];
  comments: SetComment[];
}

interface SetComment {
  id: string;
  author: 'coach' | 'athlete';
  authorName: string;
  content: string;
  timestamp: string;
  type: 'general' | 'form' | 'question' | 'encouragement';
}

interface CompletedExercise {
  id: string;
  name: string;
  muscleGroup: string;
  description: string;
  sets: CompletedSet[];
  overallNotes?: string;
  difficulty_rating?: number; // 1-5 stars
  form_video_url?: string;
}

interface WorkoutComment {
  id: string;
  author: 'coach' | 'athlete';
  authorName: string;
  content: string;
  timestamp: string;
  type: 'general' | 'performance' | 'question' | 'form_check';
}

interface CompletedWorkout {
  id: string;
  name: string;
  description: string;
  athleteName: string;
  athleteInitials: string;
  completedDate: string;
  startTime: string;
  endTime: string;
  totalDuration: number; // in minutes
  exercises: CompletedExercise[];
  overallRating?: number; // 1-5 stars
  overallNotes?: string;
  energyLevel?: number; // 1-5
  soreness_level?: number; // 1-5 
  comments: WorkoutComment[];
}

export default function WorkoutReviewPage() {
  const params = useParams();
  const workoutId = params.id as string;
  
  const [newComment, setNewComment] = useState('');
  const [newSetComment, setNewSetComment] = useState<{[key: string]: string}>({});
  const [commentType, setCommentType] = useState<'general' | 'performance' | 'question' | 'form_check'>('general');

  // Mock completed workout data
  const completedWorkout: CompletedWorkout = {
    id: workoutId,
    name: 'Upper Body Strength',
    description: 'Focus on compound movements with progressive overload',
    athleteName: 'Sarah Johnson',
    athleteInitials: 'SJ',
    completedDate: '2024-01-15',
    startTime: '09:00 AM',
    endTime: '10:15 AM',
    totalDuration: 75,
    overallRating: 4,
    energyLevel: 4,
    soreness_level: 2,
    overallNotes: 'Felt strong today! The bench press felt easier than last week. Looking forward to increasing weight next session.',
    exercises: [
      {
        id: '1',
        name: 'Bench Press',
        muscleGroup: 'Chest',
        description: 'Lie on bench, grip bar shoulder-width apart, lower to chest, press up explosively.',
        difficulty_rating: 4,
        sets: [
          {
            id: '1-1',
            reps: 8,
            weight: 135,
            restPeriod: 2,
            completed: true,
            rpe: 7,
            notes: 'Good form, felt controlled',
            completionTime: '9:05 AM',
            comments: [
              {
                id: 'c1',
                author: 'coach',
                authorName: 'Coach Mike',
                content: 'Excellent depth on your reps! Your form looked solid throughout the set.',
                timestamp: '2 hours ago',
                type: 'form'
              }
            ]
          },
          {
            id: '1-2', 
            reps: 8,
            weight: 135,
            restPeriod: 2,
            completed: true,
            rpe: 8,
            completionTime: '9:08 AM',
            comments: []
          },
          {
            id: '1-3',
            reps: 6,
            weight: 135,
            restPeriod: 2,
            completed: true,
            rpe: 9,
            notes: 'Struggled on last 2 reps',
            form_issues: ['elbow_flare', 'incomplete_lockout'],
            completionTime: '9:11 AM',
            comments: [
              {
                id: 'c2',
                author: 'athlete',
                authorName: 'Sarah Johnson',
                content: 'Should I lower the weight? The last set was really challenging.',
                timestamp: '1 hour ago',
                type: 'question'
              },
              {
                id: 'c3',
                author: 'coach',
                authorName: 'Coach Mike',
                content: 'That\'s actually perfect! RPE 9 on your last set means we\'re right where we want to be. Your strength is improving.',
                timestamp: '45 minutes ago',
                type: 'encouragement'
              }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'Pull-ups',
        muscleGroup: 'Back',
        description: 'Hang from bar, pull body up until chin over bar, lower with control.',
        difficulty_rating: 5,
        sets: [
          {
            id: '2-1',
            reps: 6,
            weight: 0,
            restPeriod: 2,
            completed: true,
            rpe: 8,
            completionTime: '9:18 AM',
            comments: []
          },
          {
            id: '2-2',
            reps: 5,
            weight: 0,
            restPeriod: 2,
            completed: true,
            rpe: 9,
            notes: 'Used assistance band',
            completionTime: '9:21 AM',
            comments: []
          },
          {
            id: '2-3',
            reps: 4,
            weight: 0,
            restPeriod: 2,
            completed: true,
            rpe: 10,
            notes: 'Really difficult, form broke down',
            form_issues: ['kipping', 'incomplete_rom'],
            completionTime: '9:24 AM',
            comments: []
          }
        ]
      },
      {
        id: '3',
        name: 'Overhead Press',
        muscleGroup: 'Shoulders',
        description: 'Press barbell from shoulders to overhead, keep core tight.',
        difficulty_rating: 3,
        sets: [
          {
            id: '3-1',
            reps: 10,
            weight: 65,
            restPeriod: 1.5,
            completed: true,
            rpe: 6,
            completionTime: '9:32 AM',
            comments: []
          },
          {
            id: '3-2',
            reps: 10,
            weight: 65,
            restPeriod: 1.5,
            completed: true,
            rpe: 7,
            completionTime: '9:35 AM',
            comments: []
          },
          {
            id: '3-3',
            reps: 8,
            weight: 65,
            restPeriod: 1.5,
            completed: true,
            rpe: 8,
            notes: 'Core felt weak',
            completionTime: '9:38 AM',
            comments: []
          }
        ]
      }
    ],
    comments: [
      {
        id: 'w1',
        author: 'athlete',
        authorName: 'Sarah Johnson',
        content: 'Overall great workout! Felt strong on bench but pull-ups are still my weakness. Any tips for improving?',
        timestamp: '2 hours ago',
        type: 'performance'
      },
      {
        id: 'w2',
        author: 'coach',
        authorName: 'Coach Mike',
        content: 'Amazing progress Sarah! Your bench is getting stronger each week. For pull-ups, let\'s add some negative reps and lat pulldowns to build that strength.',
        timestamp: '1 hour ago',
        type: 'performance'
      }
    ]
  };

  const addWorkoutComment = () => {
    if (!newComment.trim()) return;
    
    const comment: WorkoutComment = {
      id: Date.now().toString(),
      author: 'coach', // In real app, this would be determined by auth
      authorName: 'Coach Mike',
      content: newComment,
      timestamp: 'Just now',
      type: commentType
    };
    
    // In real app, this would update the backend
    console.log('Adding workout comment:', comment);
    setNewComment('');
  };

  const addSetComment = (setId: string) => {
    const comment = newSetComment[setId];
    if (!comment?.trim()) return;
    
    const setComment: SetComment = {
      id: Date.now().toString(),
      author: 'coach',
      authorName: 'Coach Mike', 
      content: comment,
      timestamp: 'Just now',
      type: 'general'
    };
    
    // In real app, this would update the backend
    console.log('Adding set comment:', setComment);
    setNewSetComment(prev => ({ ...prev, [setId]: '' }));
  };

  const getRpeColor = (rpe?: number) => {
    if (!rpe) return 'bg-gray-100 text-gray-600';
    if (rpe <= 6) return 'bg-green-100 text-green-700';
    if (rpe <= 8) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getFormIssueIcon = (issue: string) => {
    switch (issue) {
      case 'elbow_flare': return '💪';
      case 'incomplete_lockout': return '⬆️';
      case 'kipping': return '🔄';
      case 'incomplete_rom': return '📏';
      default: return '⚠️';
    }
  };

  const getFormIssueText = (issue: string) => {
    switch (issue) {
      case 'elbow_flare': return 'Elbow flare';
      case 'incomplete_lockout': return 'Incomplete lockout';
      case 'kipping': return 'Kipping motion';
      case 'incomplete_rom': return 'Incomplete range of motion';
      default: return issue;
    }
  };

  return (
    <DashboardLayout title="">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/coach/workouts" className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Workouts
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{completedWorkout.name}</h1>
                <p className="text-gray-600 mt-1">Completed by {completedWorkout.athleteName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">{completedWorkout.athleteInitials}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Workout Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Workout Summary</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-emerald-600">
                      <CheckCircleIcon className="h-5 w-5 mr-1" />
                      <span className="font-medium">Completed</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <CalendarIcon className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold text-gray-900">{completedWorkout.completedDate}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <ClockIcon className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">{completedWorkout.totalDuration} min</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <FireIcon className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Energy Level</p>
                    <div className="flex justify-center">
                      {[1,2,3,4,5].map(star => (
                        <StarIcon key={star} className={`h-4 w-4 ${star <= (completedWorkout.energyLevel || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <TrophyIcon className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Overall Rating</p>
                    <div className="flex justify-center">
                      {[1,2,3,4,5].map(star => (
                        <StarIcon key={star} className={`h-4 w-4 ${star <= (completedWorkout.overallRating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {completedWorkout.overallNotes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Athlete Notes</h4>
                    <p className="text-blue-800 text-sm">{completedWorkout.overallNotes}</p>
                  </div>
                )}
              </div>

              {/* Exercises */}
              <div className="space-y-6">
                {completedWorkout.exercises.map((exercise, exerciseIndex) => (
                  <div key={exercise.id} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">{exerciseIndex + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{exercise.name}</h3>
                          <p className="text-sm text-gray-500">{exercise.muscleGroup}</p>
                        </div>
                      </div>
                      {exercise.difficulty_rating && (
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-gray-500">Difficulty:</span>
                          {[1,2,3,4,5].map(star => (
                            <StarIcon key={star} className={`h-4 w-4 ${star <= exercise.difficulty_rating! ? 'text-red-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Sets */}
                    <div className="space-y-4">
                      {exercise.sets.map((set, setIndex) => (
                        <div key={set.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-4">
                              <span className="font-medium text-gray-700">Set {setIndex + 1}</span>
                              <div className="flex items-center space-x-3 text-sm">
                                <span className="font-medium">{set.reps} reps</span>
                                {set.weight > 0 && <span>@ {set.weight} lbs</span>}
                                <span className="text-gray-500">• {set.restPeriod} min rest</span>
                              </div>
                              {set.rpe && (
                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getRpeColor(set.rpe)}`}>
                                  RPE {set.rpe}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {set.completed ? (
                                <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <XCircleIcon className="h-5 w-5 text-red-500" />
                              )}
                              <span className="text-xs text-gray-500">{set.completionTime}</span>
                            </div>
                          </div>

                          {/* Form Issues */}
                          {set.form_issues && set.form_issues.length > 0 && (
                            <div className="mb-3">
                              <h5 className="text-sm font-medium text-red-700 mb-2">Form Notes:</h5>
                              <div className="flex flex-wrap gap-2">
                                {set.form_issues.map((issue, index) => (
                                  <span key={index} className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs rounded-lg">
                                    <span className="mr-1">{getFormIssueIcon(issue)}</span>
                                    {getFormIssueText(issue)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Set Notes */}
                          {set.notes && (
                            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">{set.notes}</p>
                            </div>
                          )}

                          {/* Set Comments */}
                          {set.comments.length > 0 && (
                            <div className="mb-3 space-y-2">
                              {set.comments.map(comment => (
                                <div key={comment.id} className={`p-3 rounded-lg text-sm ${
                                  comment.author === 'coach' ? 'bg-blue-50 border-l-4 border-blue-400' : 'bg-gray-50 border-l-4 border-gray-400'
                                }`}>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-gray-900">{comment.authorName}</span>
                                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                  </div>
                                  <p className="text-gray-700">{comment.content}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Add Set Comment */}
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Add feedback on this set..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              value={newSetComment[set.id] || ''}
                              onChange={(e) => setNewSetComment(prev => ({ ...prev, [set.id]: e.target.value }))}
                              onKeyPress={(e) => e.key === 'Enter' && addSetComment(set.id)}
                            />
                            <button
                              onClick={() => addSetComment(set.id)}
                              disabled={!newSetComment[set.id]?.trim()}
                              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                              <PaperAirplaneIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall Workout Comments */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Workout Discussion</h3>
                
                {/* Existing Comments */}
                <div className="space-y-4 mb-6">
                  {completedWorkout.comments.map(comment => (
                    <div key={comment.id} className={`p-4 rounded-lg ${
                      comment.author === 'coach' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                            comment.author === 'coach' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'
                          }`}>
                            {comment.author === 'coach' ? 'CM' : completedWorkout.athleteInitials}
                          </div>
                          <span className="font-medium text-gray-900">{comment.authorName}</span>
                          <span className={`px-2 py-1 text-xs rounded-lg ${
                            comment.type === 'performance' ? 'bg-green-100 text-green-700' :
                            comment.type === 'question' ? 'bg-yellow-100 text-yellow-700' :
                            comment.type === 'form_check' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {comment.type}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                </div>

                {/* Add New Comment */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex space-x-2 mb-3">
                    {(['general', 'performance', 'question', 'form_check'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setCommentType(type)}
                        className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                          commentType === type 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {type.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <textarea
                      placeholder="Add your feedback, questions, or coaching notes..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      onClick={addWorkoutComment}
                      disabled={!newComment.trim()}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
                    >
                      <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Quick Stats</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Sets</span>
                    <span className="font-bold text-gray-900">
                      {completedWorkout.exercises.reduce((total, ex) => total + ex.sets.length, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Completed Sets</span>
                    <span className="font-bold text-emerald-600">
                      {completedWorkout.exercises.reduce((total, ex) => 
                        total + ex.sets.filter(set => set.completed).length, 0
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average RPE</span>
                    <span className="font-bold text-gray-900">
                      {Math.round(
                        completedWorkout.exercises
                          .flatMap(ex => ex.sets)
                          .filter(set => set.rpe)
                          .reduce((sum, set, _, arr) => sum + (set.rpe || 0) / arr.length, 0)
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Form Issues</span>
                    <span className="font-bold text-red-600">
                      {completedWorkout.exercises.reduce((total, ex) => 
                        total + ex.sets.reduce((setTotal, set) => 
                          setTotal + (set.form_issues?.length || 0), 0
                        ), 0
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Muscle Groups Worked */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Muscle Groups</h4>
                <div className="space-y-2">
                  {Array.from(new Set(completedWorkout.exercises.map(ex => ex.muscleGroup))).map(muscle => (
                    <div key={muscle} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{muscle}</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
                        {completedWorkout.exercises.filter(ex => ex.muscleGroup === muscle).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Coach Actions</h4>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                    <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                    Message Athlete
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                    <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
                    Create Similar Workout
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                    <TrophyIcon className="h-4 w-4 mr-2" />
                    Add to Progress Log
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 