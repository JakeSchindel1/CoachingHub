'use client';

import { useState, useEffect } from 'react';
import { Exercise } from '@/types';

// Comprehensive mock exercise database
const MOCK_EXERCISES: Exercise[] = [
  // Strength Training - Upper Body
  {
    id: '1',
    name: 'Bench Press',
    type: 'strength',
    muscle_groups: ['chest', 'triceps', 'shoulders'],
    instructions: 'Lie on bench, grip bar shoulder-width apart, lower to chest, press up explosively.',
  },
  {
    id: '2',
    name: 'Pull-ups',
    type: 'strength',
    muscle_groups: ['back', 'biceps'],
    instructions: 'Hang from bar, pull body up until chin over bar, lower with control.',
  },
  {
    id: '3',
    name: 'Overhead Press',
    type: 'strength',
    muscle_groups: ['shoulders', 'triceps', 'core'],
    instructions: 'Press barbell from shoulders to overhead, keep core tight.',
  },
  {
    id: '4',
    name: 'Dumbbell Rows',
    type: 'strength',
    muscle_groups: ['back', 'biceps'],
    instructions: 'Hinge at hips, row dumbbell to ribcage, squeeze shoulder blades.',
  },
  {
    id: '5',
    name: 'Dips',
    type: 'strength',
    muscle_groups: ['triceps', 'chest', 'shoulders'],
    instructions: 'Lower body by bending arms, press back up to starting position.',
  },

  // Strength Training - Lower Body
  {
    id: '6',
    name: 'Squats',
    type: 'strength',
    muscle_groups: ['quadriceps', 'glutes', 'core'],
    instructions: 'Feet shoulder-width apart, sit back and down, drive through heels to stand.',
  },
  {
    id: '7',
    name: 'Deadlifts',
    type: 'strength',
    muscle_groups: ['hamstrings', 'glutes', 'back', 'core'],
    instructions: 'Hip hinge movement, keep bar close to body, drive hips forward.',
  },
  {
    id: '8',
    name: 'Lunges',
    type: 'strength',
    muscle_groups: ['quadriceps', 'glutes', 'calves'],
    instructions: 'Step forward, lower until both knees at 90 degrees, return to start.',
  },
  {
    id: '9',
    name: 'Bulgarian Split Squats',
    type: 'strength',
    muscle_groups: ['quadriceps', 'glutes'],
    instructions: 'Rear foot elevated, lower into lunge position, drive through front heel.',
  },
  {
    id: '10',
    name: 'Hip Thrusts',
    type: 'strength',
    muscle_groups: ['glutes', 'hamstrings'],
    instructions: 'Shoulders on bench, drive hips up, squeeze glutes at top.',
  },

  // Cardio
  {
    id: '11',
    name: 'Running',
    type: 'cardio',
    muscle_groups: ['legs', 'cardiovascular'],
    instructions: 'Maintain steady pace, focus on breathing rhythm.',
  },
  {
    id: '12',
    name: 'Cycling',
    type: 'cardio',
    muscle_groups: ['legs', 'cardiovascular'],
    instructions: 'Maintain cadence between 80-100 RPM, adjust resistance as needed.',
  },
  {
    id: '13',
    name: 'Rowing',
    type: 'cardio',
    muscle_groups: ['back', 'legs', 'arms', 'cardiovascular'],
    instructions: 'Drive with legs, lean back, pull handle to chest, reverse the motion.',
  },
  {
    id: '14',
    name: 'Burpees',
    type: 'cardio',
    muscle_groups: ['full body', 'cardiovascular'],
    instructions: 'Drop to plank, push-up, jump feet to hands, jump up with arms overhead.',
  },
  {
    id: '15',
    name: 'Mountain Climbers',
    type: 'cardio',
    muscle_groups: ['core', 'shoulders', 'cardiovascular'],
    instructions: 'Plank position, alternate bringing knees to chest rapidly.',
  },

  // Core & Flexibility
  {
    id: '16',
    name: 'Plank',
    type: 'flexibility',
    muscle_groups: ['core', 'shoulders'],
    instructions: 'Hold straight line from head to heels, engage core muscles.',
  },
  {
    id: '17',
    name: 'Russian Twists',
    type: 'strength',
    muscle_groups: ['core', 'obliques'],
    instructions: 'Sit with feet off ground, rotate torso side to side.',
  },
  {
    id: '18',
    name: 'Dead Bug',
    type: 'flexibility',
    muscle_groups: ['core'],
    instructions: 'Lie on back, extend opposite arm and leg, return with control.',
  },
  {
    id: '19',
    name: 'Cat-Cow Stretch',
    type: 'flexibility',
    muscle_groups: ['spine', 'core'],
    instructions: 'On hands and knees, alternate between arching and rounding spine.',
  },
  {
    id: '20',
    name: 'Pigeon Pose',
    type: 'flexibility',
    muscle_groups: ['hips', 'glutes'],
    instructions: 'From downward dog, bring knee forward, extend back leg, hold stretch.',
  },

  // Olympic Lifts
  {
    id: '21',
    name: 'Clean and Jerk',
    type: 'strength',
    muscle_groups: ['full body', 'power'],
    instructions: 'Explosive lift from floor to shoulders, then overhead. Technical movement.',
  },
  {
    id: '22',
    name: 'Snatch',
    type: 'strength',
    muscle_groups: ['full body', 'power'],
    instructions: 'Single explosive movement from floor to overhead. Highly technical.',
  },

  // Plyometric
  {
    id: '23',
    name: 'Box Jumps',
    type: 'other',
    muscle_groups: ['legs', 'power'],
    instructions: 'Jump onto box with both feet, step down with control.',
  },
  {
    id: '24',
    name: 'Jump Squats',
    type: 'other',
    muscle_groups: ['legs', 'power'],
    instructions: 'Squat down, explode up into jump, land softly.',
  },
  {
    id: '25',
    name: 'Medicine Ball Slams',
    type: 'other',
    muscle_groups: ['core', 'shoulders', 'power'],
    instructions: 'Lift ball overhead, slam down with force, catch on bounce.',
  },
];

// Workout templates
const WORKOUT_TEMPLATES = [
  {
    id: '1',
    name: 'Upper Body Strength',
    description: 'Build upper body strength and muscle mass',
    category: 'strength',
    exercises: [
      { exerciseId: '1', sets: 3, reps: 8, rest: 120 },
      { exerciseId: '2', sets: 3, reps: 6, rest: 120 },
      { exerciseId: '3', sets: 3, reps: 10, rest: 90 },
      { exerciseId: '4', sets: 3, reps: 12, rest: 90 },
      { exerciseId: '5', sets: 2, reps: 15, rest: 60 },
    ],
  },
  {
    id: '2',
    name: 'Lower Body Power',
    description: 'Explosive lower body development',
    category: 'strength',
    exercises: [
      { exerciseId: '6', sets: 4, reps: 5, rest: 180 },
      { exerciseId: '7', sets: 3, reps: 6, rest: 180 },
      { exerciseId: '23', sets: 3, reps: 8, rest: 120 },
      { exerciseId: '24', sets: 3, reps: 10, rest: 90 },
    ],
  },
  {
    id: '3',
    name: 'HIIT Cardio',
    description: 'High-intensity interval training',
    category: 'cardio',
    exercises: [
      { exerciseId: '14', sets: 4, reps: 10, rest: 30 },
      { exerciseId: '15', sets: 4, duration: 30, rest: 30 },
      { exerciseId: '24', sets: 4, reps: 15, rest: 30 },
      { exerciseId: '17', sets: 4, duration: 45, rest: 45 },
    ],
  },
  {
    id: '4',
    name: 'Recovery & Mobility',
    description: 'Active recovery and flexibility',
    category: 'flexibility',
    exercises: [
      { exerciseId: '16', sets: 3, duration: 60, rest: 30 },
      { exerciseId: '19', sets: 2, reps: 10, rest: 30 },
      { exerciseId: '20', sets: 2, duration: 90, rest: 60 },
      { exerciseId: '18', sets: 3, reps: 8, rest: 30 },
    ],
  },
];

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [templates] = useState(WORKOUT_TEMPLATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadExercises = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setExercises(MOCK_EXERCISES);
      setLoading(false);
    };

    loadExercises();
  }, []);

  // Filter exercises by various criteria
  const filterExercises = (filters: {
    type?: string;
    muscleGroup?: string;
    search?: string;
  }) => {
    return exercises.filter(exercise => {
      if (filters.type && exercise.type !== filters.type) return false;
      if (filters.muscleGroup && !exercise.muscle_groups.includes(filters.muscleGroup)) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return exercise.name.toLowerCase().includes(searchLower) ||
               exercise.muscle_groups.some(mg => mg.toLowerCase().includes(searchLower));
      }
      return true;
    });
  };

  // Get exercise by ID
  const getExerciseById = (id: string) => {
    return exercises.find(exercise => exercise.id === id);
  };

  // Create custom exercise (for now just adds to local state)
  const createCustomExercise = async (exerciseData: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exerciseData,
      id: Date.now().toString(),
    };
    
    setExercises(prev => [...prev, newExercise]);
    return newExercise;
  };

  // Get all unique muscle groups
  const getMuscleGroups = () => {
    const allGroups = exercises.flatMap(exercise => exercise.muscle_groups);
    return [...new Set(allGroups)].sort();
  };

  // Get all exercise types
  const getExerciseTypes = () => {
    const allTypes = exercises.map(exercise => exercise.type);
    return [...new Set(allTypes)].sort();
  };

  return {
    exercises,
    templates,
    loading,
    filterExercises,
    getExerciseById,
    createCustomExercise,
    getMuscleGroups,
    getExerciseTypes,
  };
} 