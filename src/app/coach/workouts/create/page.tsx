'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useExercises } from '@/hooks/useExercises';
import { WorkoutExercise, Exercise, RunningSegment, StrengthWorkout, RunningWorkout, RunningInterval, StrengthExercise, ExerciseSet } from '@/types';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  Bars3Icon,
  CalendarIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  ClockIcon,
  MapIcon,
  HeartIcon,
  FireIcon,
  PlayIcon,
  StopIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

type WorkoutType = 'strength' | 'running';

export default function CreateWorkoutPage() {
  const { templates, loading, filterExercises, getExerciseById, getMuscleGroups, getExerciseTypes } = useExercises();
  
  // Workout type selection
  const [selectedWorkoutType, setSelectedWorkoutType] = useState<WorkoutType | null>(null);

  // Check URL params for workout type on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') as WorkoutType;
    if (type === 'strength' || type === 'running') {
      setSelectedWorkoutType(type);
    }
  }, []);
  
  // Shared state
  const [searchTerm, setSearchTerm] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  // Mock athletes data
  const mockAthletes = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Mike Wilson' },
    { id: '3', name: 'Emily Davis' },
    { id: '4', name: 'James Brown' },
  ];

  // Strength workout state
  const [strengthWorkout, setStrengthWorkout] = useState<Partial<StrengthWorkout>>({
    name: '',
    description: '',
    type: 'strength',
    exercises: [],
    warmupExercises: [],
    assignedAthletes: [],
    notes: '',
  });

  // Running workout state
  const [runningWorkout, setRunningWorkout] = useState<Partial<RunningWorkout>>({
    name: '',
    description: '',
    type: 'running',
    segments: [],
    warmupStretches: [],
    cooldownStretches: [],
    assignedAthletes: [],
    notes: '',
  });

  if (loading) {
    return (
      <DashboardLayout title="Create Workout">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  // Workout type selection screen
  if (!selectedWorkoutType) {
    return (
      <DashboardLayout title="Create Workout">
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-5xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Create a
                <br />
                <span className="text-indigo-600">
                  Workout
                </span>
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Choose your workout type to access specialized creation tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Strength Workout Option */}
              <div 
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedWorkoutType('strength')}
              >
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <FireIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Strength Training</h3>
                <p className="text-gray-600 mb-6">
                  Build powerful workouts with sets, reps, and progressive overload. Perfect for weightlifting and resistance training.
                </p>
                <div className="space-y-3">
                  {['Sets & reps tracking', 'Weight progression', 'Rest period timing'].map((feature) => (
                    <div key={feature} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Running Workout Option */}
              <div 
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedWorkoutType('running')}
              >
                <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <MapIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Running & Cardio</h3>
                <p className="text-gray-600 mb-6">
                  Design structured cardio sessions with intervals, pacing, and heart rate zones. Built for endurance excellence.
                </p>
                <div className="space-y-3">
                  {['Interval grouping', 'Pace & HR zones', 'Distance targeting'].map((feature) => (
                    <div key={feature} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Running workout creation interface
  if (selectedWorkoutType === 'running') {
    const addRunningSegment = (type: RunningSegment['type']) => {
      const newSegment: RunningSegment = {
        id: Date.now().toString(),
        type,
        name: type === 'warmup' ? 'Warm-up' : 
              type === 'cooldown' ? 'Cool-down' :
              type === 'interval' ? 'Interval' :
              type === 'recovery' ? 'Recovery' :
              type === 'interval_group' ? 'Interval Block' : 'Main Run',
        duration: type === 'warmup' || type === 'cooldown' ? 10 : 30,
        intensityLevel: type === 'warmup' || type === 'cooldown' ? 1 : 3,
        repetitions: type === 'interval_group' ? 4 : undefined,
        intervals: type === 'interval_group' ? [
          {
            id: Date.now().toString() + '_1',
            name: 'Work',
            duration: 3,
            intensityLevel: 4,
            type: 'work'
          },
          {
            id: Date.now().toString() + '_2',
            name: 'Rest',
            duration: 1,
            intensityLevel: 1,
            type: 'rest'
          }
        ] : undefined,
      };

      setRunningWorkout(prev => ({
        ...prev,
        segments: [...(prev.segments || []), newSegment],
      }));
    };

    const updateSegment = (segmentId: string, updates: Partial<RunningSegment>) => {
      setRunningWorkout(prev => ({
        ...prev,
        segments: prev.segments?.map(segment =>
          segment.id === segmentId ? { ...segment, ...updates } : segment
        ) || [],
      }));
    };

    const removeSegment = (segmentId: string) => {
      setRunningWorkout(prev => ({
        ...prev,
        segments: prev.segments?.filter(segment => segment.id !== segmentId) || [],
      }));
    };

    const addIntervalToGroup = (groupId: string) => {
      const newInterval: RunningInterval = {
        id: Date.now().toString(),
        name: 'Interval',
        duration: 2,
        intensityLevel: 3,
        type: 'work'
      };

      setRunningWorkout(prev => ({
        ...prev,
        segments: prev.segments?.map(segment =>
          segment.id === groupId ? {
            ...segment,
            intervals: [...(segment.intervals || []), newInterval]
          } : segment
        ) || [],
      }));
    };

    const updateInterval = (groupId: string, intervalId: string, updates: Partial<RunningInterval>) => {
      setRunningWorkout(prev => ({
        ...prev,
        segments: prev.segments?.map(segment =>
          segment.id === groupId ? {
            ...segment,
            intervals: segment.intervals?.map(interval =>
              interval.id === intervalId ? { ...interval, ...updates } : interval
            )
          } : segment
        ) || [],
      }));
    };

    const removeInterval = (groupId: string, intervalId: string) => {
      setRunningWorkout(prev => ({
        ...prev,
        segments: prev.segments?.map(segment =>
          segment.id === groupId ? {
            ...segment,
            intervals: segment.intervals?.filter(interval => interval.id !== intervalId)
          } : segment
        ) || [],
      }));
    };

    // Strength workout helper functions (for when we implement strength interface)
    const addExerciseToWorkout = (exercise: Exercise) => {
      const newExercise: StrengthExercise = {
        id: Date.now().toString(),
        name: exercise.name,
        muscleGroup: exercise.muscle_groups?.[0] || 'General', // Use first muscle group or fallback
        description: exercise.instructions || exercise.description || 'No description available',
        sets: [
          {
            id: Date.now().toString() + '_set1',
            reps: 10,
            weight: 0,
            restPeriod: 2
          }
        ]
      };

      setStrengthWorkout(prev => ({
        ...prev,
        exercises: [...(prev.exercises || []), newExercise],
      }));
    };

    const removeExerciseFromWorkout = (exerciseId: string) => {
      setStrengthWorkout(prev => ({
        ...prev,
        exercises: prev.exercises?.filter(exercise => exercise.id !== exerciseId) || [],
      }));
    };

    const addSetToExercise = (exerciseId: string) => {
      const newSet: ExerciseSet = {
        id: Date.now().toString(),
        reps: 10,
        weight: 0,
        restPeriod: 2
      };

      setStrengthWorkout(prev => ({
        ...prev,
        exercises: prev.exercises?.map(exercise =>
          exercise.id === exerciseId ? {
            ...exercise,
            sets: [...(exercise.sets || []), newSet]
          } : exercise
        ) || [],
      }));
    };

    const removeSetFromExercise = (exerciseId: string, setId: string) => {
      setStrengthWorkout(prev => ({
        ...prev,
        exercises: prev.exercises?.map(exercise =>
          exercise.id === exerciseId ? {
            ...exercise,
            sets: exercise.sets?.filter(set => set.id !== setId) || []
          } : exercise
        ) || [],
      }));
    };

    const updateSet = (exerciseId: string, setId: string, updates: Partial<ExerciseSet>) => {
      setStrengthWorkout(prev => ({
        ...prev,
        exercises: prev.exercises?.map(exercise =>
          exercise.id === exerciseId ? {
            ...exercise,
            sets: exercise.sets?.map(set =>
              set.id === setId ? { ...set, ...updates } : set
            ) || []
          } : exercise
        ) || [],
      }));
    };

    return (
      <DashboardLayout title="">
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setSelectedWorkoutType(null)}
                  className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 mr-2" />
                  Back
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Running Workout</h1>
                  <p className="text-gray-600 mt-1">Build structured cardio sessions</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <MapIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Workout Name</label>
                  <input
                    type="text"
                    placeholder="5K Tempo Run"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    value={runningWorkout.name || ''}
                    onChange={(e) => setRunningWorkout(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Scheduled Date</label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    value={runningWorkout.scheduledDate || ''}
                    onChange={(e) => setRunningWorkout(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Description</label>
                  <textarea
                    placeholder="Describe the workout goals and focus..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
                    value={runningWorkout.description || ''}
                    onChange={(e) => setRunningWorkout(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Segment Builder */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="p-8 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Build Your Workout</h3>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => addRunningSegment('warmup')}
                        className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                      >
                        <PlayIcon className="h-4 w-4 mr-2" />
                        Warmup
                      </button>
                      <button
                        onClick={() => addRunningSegment('main')}
                        className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all"
                      >
                        <MapIcon className="h-4 w-4 mr-2" />
                        Main Run
                      </button>
                      <button
                        onClick={() => addRunningSegment('interval_group')}
                        className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
                      >
                        <ArrowPathIcon className="h-4 w-4 mr-2" />
                        Interval Block
                      </button>
                      <button
                        onClick={() => addRunningSegment('recovery')}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                      >
                        <HeartIcon className="h-4 w-4 mr-2" />
                        Recovery
                      </button>
                      <button
                        onClick={() => addRunningSegment('cooldown')}
                        className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                      >
                        <StopIcon className="h-4 w-4 mr-2" />
                        Cooldown
                      </button>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    {runningWorkout.segments?.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <MapIcon className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building</h3>
                        <p className="text-gray-500">Add segments to create your running workout</p>
                      </div>
                    ) : (
                      runningWorkout.segments?.map((segment, index) => (
                        <div key={segment.id} className="relative">
                          {/* Regular Segment */}
                          {segment.type !== 'interval_group' ? (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-3 h-3 rounded-full ${
                                    segment.type === 'warmup' || segment.type === 'cooldown' ? 'bg-gray-400' :
                                    segment.type === 'main' ? 'bg-emerald-500' :
                                    segment.type === 'recovery' ? 'bg-blue-500' :
                                    'bg-yellow-500'
                                  }`}></div>
                                  <input
                                    type="text"
                                    className="text-lg font-medium text-gray-900 bg-transparent border-none outline-none"
                                    value={segment.name}
                                    onChange={(e) => updateSegment(segment.id, { name: e.target.value })}
                                  />
                                </div>
                                <button
                                  onClick={() => removeSegment(segment.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <XMarkIcon className="h-5 w-5" />
                                </button>
                              </div>

                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-2">Duration (min)</label>
                                  <input
                                    type="number"
                                    min="1"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500"
                                    value={segment.duration || ''}
                                    onChange={(e) => updateSegment(segment.id, { duration: parseInt(e.target.value) || undefined })}
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-2">Distance (mi)</label>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500"
                                    value={segment.distance || ''}
                                    onChange={(e) => updateSegment(segment.id, { distance: parseFloat(e.target.value) || undefined })}
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-2">Pace</label>
                                  <input
                                    type="text"
                                    placeholder="7:30/mi"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500"
                                    value={segment.pace || ''}
                                    onChange={(e) => updateSegment(segment.id, { pace: e.target.value })}
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-2">Intensity</label>
                                  <select
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500"
                                    value={segment.intensityLevel || ''}
                                    onChange={(e) => updateSegment(segment.id, { intensityLevel: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
                                  >
                                    <option value="">Select</option>
                                    <option value={1}>1 - Easy</option>
                                    <option value={2}>2 - Light</option>
                                    <option value={3}>3 - Moderate</option>
                                    <option value={4}>4 - Hard</option>
                                    <option value={5}>5 - Max</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Interval Group */
                            <div className="bg-purple-100 rounded-xl border-2 border-purple-500 p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="number"
                                      min="1"
                                      className="w-12 text-center text-lg font-bold text-purple-700 bg-white rounded-lg border border-purple-200 py-1"
                                      value={segment.repetitions || ''}
                                      onChange={(e) => updateSegment(segment.id, { repetitions: parseInt(e.target.value) || undefined })}
                                    />
                                    <span className="text-lg font-bold text-purple-700">×</span>
                                  </div>
                                  <input
                                    type="text"
                                    className="text-lg font-medium text-purple-900 bg-transparent border-none outline-none"
                                    value={segment.name}
                                    onChange={(e) => updateSegment(segment.id, { name: e.target.value })}
                                  />
                                </div>
                                <button
                                  onClick={() => removeSegment(segment.id)}
                                  className="text-purple-400 hover:text-red-500 transition-colors"
                                >
                                  <XMarkIcon className="h-5 w-5" />
                                </button>
                              </div>

                              <div className="space-y-3">
                                {segment.intervals?.map((interval, intervalIndex) => (
                                  <div key={interval.id} className="bg-white rounded-lg border border-purple-200 p-4">
                                    <div className="flex items-center justify-between mb-3">
                                      <div className="flex items-center space-x-2">
                                        <div className={`w-2 h-2 rounded-full ${
                                          interval.type === 'work' ? 'bg-red-500' :
                                          interval.type === 'rest' ? 'bg-blue-500' :
                                          'bg-green-500'
                                        }`}></div>
                                        <input
                                          type="text"
                                          className="font-medium text-gray-900 bg-transparent border-none outline-none text-sm"
                                          value={interval.name}
                                          onChange={(e) => updateInterval(segment.id, interval.id, { name: e.target.value })}
                                        />
                                        <select
                                          className="text-xs px-2 py-1 border border-gray-200 rounded"
                                          value={interval.type}
                                          onChange={(e) => updateInterval(segment.id, interval.id, { type: e.target.value as 'work' | 'rest' | 'recovery' })}
                                        >
                                          <option value="work">Work</option>
                                          <option value="rest">Rest</option>
                                          <option value="recovery">Recovery</option>
                                        </select>
                                      </div>
                                      <button
                                        onClick={() => removeInterval(segment.id, interval.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                      >
                                        <XMarkIcon className="h-4 w-4" />
                                      </button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                      <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Duration (min)</label>
                                        <input
                                          type="number"
                                          min="0"
                                          step="0.5"
                                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-purple-500/50"
                                          value={interval.duration || ''}
                                          onChange={(e) => updateInterval(segment.id, interval.id, { duration: parseFloat(e.target.value) || undefined })}
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Pace</label>
                                        <input
                                          type="text"
                                          placeholder="7:00/mi"
                                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-purple-500/50"
                                          value={interval.pace || ''}
                                          onChange={(e) => updateInterval(segment.id, interval.id, { pace: e.target.value })}
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Intensity</label>
                                        <select
                                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-purple-500/50"
                                          value={interval.intensityLevel || ''}
                                          onChange={(e) => updateInterval(segment.id, interval.id, { intensityLevel: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
                                        >
                                          <option value="">-</option>
                                          <option value={1}>1</option>
                                          <option value={2}>2</option>
                                          <option value={3}>3</option>
                                          <option value={4}>4</option>
                                          <option value={5}>5</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                
                                <button
                                  onClick={() => addIntervalToGroup(segment.id)}
                                  className="w-full py-2 text-sm text-purple-600 border-2 border-dashed border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
                                >
                                  + Add Interval
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Heart Rate Zones */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4">HR Zones</h4>
                  <div className="space-y-3">
                    {[
                      { zone: 'Z1', name: 'Recovery', color: 'bg-gray-500 text-white' },
                      { zone: 'Z2', name: 'Aerobic', color: 'bg-blue-500 text-white' },
                      { zone: 'Z3', name: 'Tempo', color: 'bg-green-500 text-white' },
                      { zone: 'Z4', name: 'Threshold', color: 'bg-yellow-500 text-white' },
                      { zone: 'Z5', name: 'Max', color: 'bg-red-500 text-white' },
                    ].map((zone) => (
                      <div key={zone.zone} className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${zone.color}`}>
                          {zone.zone}
                        </span>
                        <span className="text-sm text-gray-700 font-medium">{zone.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Athletes */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Assign Athletes</h4>
                  <div className="space-y-3">
                    {mockAthletes.map((athlete) => (
                      <label key={athlete.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          checked={runningWorkout.assignedAthletes?.includes(athlete.id) || false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRunningWorkout(prev => ({
                                ...prev,
                                assignedAthletes: [...(prev.assignedAthletes || []), athlete.id]
                              }));
                            } else {
                              setRunningWorkout(prev => ({
                                ...prev,
                                assignedAthletes: prev.assignedAthletes?.filter(id => id !== athlete.id) || []
                              }));
                            }
                          }}
                        />
                        <span className="ml-3 text-sm text-gray-700 font-medium">{athlete.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Save Actions */}
            <div className="flex justify-between items-center mt-12">
              <div className="text-sm text-gray-500">
                Auto-saved 2 minutes ago
              </div>
              <div className="flex space-x-4">
                <button className="px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                  Save Draft
                </button>
                <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all">
                  Create Workout
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Strength Training Interface
  if (selectedWorkoutType === 'strength') {
    return (
    <DashboardLayout title="">
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setSelectedWorkoutType(null)}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XMarkIcon className="h-5 w-5 mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Strength Workout</h1>
                <p className="text-gray-600 mt-1">Build powerful training sessions</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <FireIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Basic Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Workout Name</label>
                    <input
                      type="text"
                      placeholder="Upper Body Power"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={strengthWorkout.name || ''}
                      onChange={(e) => setStrengthWorkout(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Scheduled Date</label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={strengthWorkout.scheduledDate || ''}
                      onChange={(e) => setStrengthWorkout(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Description</label>
                    <textarea
                      placeholder="Focus on compound movements with progressive overload..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                      value={strengthWorkout.description || ''}
                      onChange={(e) => setStrengthWorkout(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Exercise Builder */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-8 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Add Exercises</h3>
                  <div className="flex flex-wrap gap-3">
                    {templates.filter(ex => ex.type === 'strength').slice(0, 12).map((exercise) => (
                      <button
                        key={exercise.id}
                        onClick={() => addExerciseToWorkout(exercise)}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        {exercise.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  {strengthWorkout.exercises?.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FireIcon className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building</h3>
                      <p className="text-gray-500">Add exercises to create your strength workout</p>
                    </div>
                  ) : (
                    strengthWorkout.exercises?.map((exercise, index) => (
                      <div key={exercise.id} className="bg-white rounded-xl border-2 border-blue-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <h4 className="text-lg font-bold text-gray-900">{exercise.name}</h4>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
                              {exercise.muscleGroup}
                            </span>
                          </div>
                          <button
                            onClick={() => removeExerciseFromWorkout(exercise.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Sets */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-gray-700">Sets</h5>
                            <button
                              onClick={() => addSetToExercise(exercise.id)}
                              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                            >
                              + Add Set
                            </button>
                          </div>

                          {exercise.sets?.map((set, setIndex) => (
                            <div key={set.id} className="grid grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-600">Set {setIndex + 1}</span>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Reps</label>
                                <input
                                  type="number"
                                  min="1"
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                  value={set.reps || ''}
                                  onChange={(e) => updateSet(exercise.id, set.id, { reps: parseInt(e.target.value) || undefined })}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Weight (lbs)</label>
                                <input
                                  type="number"
                                  min="0"
                                  step="5"
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                  value={set.weight || ''}
                                  onChange={(e) => updateSet(exercise.id, set.id, { weight: parseFloat(e.target.value) || undefined })}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Rest (min)</label>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.5"
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                  value={set.restPeriod || ''}
                                  onChange={(e) => updateSet(exercise.id, set.id, { restPeriod: parseFloat(e.target.value) || undefined })}
                                />
                              </div>
                              <div className="flex items-end">
                                <button
                                  onClick={() => removeSetFromExercise(exercise.id, set.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <XMarkIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600">{exercise.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Muscle Groups */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Muscle Groups</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Chest', color: 'bg-red-500 text-white' },
                    { name: 'Back', color: 'bg-green-500 text-white' },
                    { name: 'Shoulders', color: 'bg-yellow-500 text-white' },
                    { name: 'Arms', color: 'bg-purple-500 text-white' },
                    { name: 'Legs', color: 'bg-blue-500 text-white' },
                    { name: 'Core', color: 'bg-orange-500 text-white' },
                  ].map((group) => (
                    <div key={group.name} className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${group.color}`}>
                        {group.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {strengthWorkout.exercises?.filter(ex => ex.muscleGroup.toLowerCase().includes(group.name.toLowerCase())).length || 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Athletes */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Assign Athletes</h4>
                <div className="space-y-3">
                  {mockAthletes.map((athlete) => (
                    <label key={athlete.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={strengthWorkout.assignedAthletes?.includes(athlete.id) || false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setStrengthWorkout(prev => ({
                              ...prev,
                              assignedAthletes: [...(prev.assignedAthletes || []), athlete.id]
                            }));
                          } else {
                            setStrengthWorkout(prev => ({
                              ...prev,
                              assignedAthletes: prev.assignedAthletes?.filter(id => id !== athlete.id) || []
                            }));
                          }
                        }}
                      />
                      <span className="ml-3 text-sm text-gray-700 font-medium">{athlete.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save Actions */}
          <div className="flex justify-between items-center mt-12">
            <div className="text-sm text-gray-500">
              Auto-saved 1 minute ago
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                Save Draft
              </button>
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                Create Workout
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
    );
  }

  // Fallback - should not reach here
  return <div>Invalid workout type</div>;
} 