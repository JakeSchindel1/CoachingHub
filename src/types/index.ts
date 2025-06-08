// Core user types
export type UserRole = 'coach' | 'athlete';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile extends User {
  bio?: string;
  location?: string;
  phone?: string;
  organization_id?: string;
}

// Authentication types
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface SignInData {
  email: string;
  password: string;
}

// Organization/Coach types
export interface Organization {
  id: string;
  name: string;
  coach_id: string;
  branding: {
    primary_color: string;
    accent_color: string;
    logo_url?: string;
  };
  created_at: string;
}

// Workout types
export interface Exercise {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'other';
  muscle_groups: string[];
  muscleGroup: string; // Primary muscle group for display
  instructions?: string;
  description?: string;
}

export interface WorkoutExercise {
  id: string;
  exercise_id: string;
  exercise: Exercise;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number; // in seconds
  distance?: number; // in meters
  rest_time?: number; // in seconds
  notes?: string;
}

// Running-specific workout structure
export interface RunningSegment {
  id: string;
  type: 'warmup' | 'main' | 'interval' | 'recovery' | 'cooldown' | 'interval_group';
  name: string;
  duration?: number; // in minutes
  distance?: number; // in miles/km
  pace?: string; // e.g., "7:30/mile"
  targetHeartRate?: {
    min: number;
    max: number;
    zone?: string; // e.g., "Zone 2", "Aerobic"
  };
  intensityLevel?: 1 | 2 | 3 | 4 | 5; // RPE scale
  notes?: string;
  // For interval groups
  repetitions?: number; // e.g., 4 (for "4 x [...]")
  intervals?: RunningInterval[]; // The intervals within the group
}

export interface RunningInterval {
  id: string;
  name: string;
  duration?: number;
  distance?: number;
  pace?: string;
  intensityLevel?: 1 | 2 | 3 | 4 | 5;
  type: 'work' | 'rest' | 'recovery';
}

export interface RunningWorkout {
  id: string;
  name: string;
  description: string;
  type: 'running';
  segments: RunningSegment[];
  totalDistance?: number;
  estimatedDuration?: number;
  warmupStretches?: Exercise[];
  cooldownStretches?: Exercise[];
  notes?: string;
  assignedAthletes: string[];
  scheduledDate?: string;
}

// Strength-specific types
export interface ExerciseSet {
  id: string;
  reps?: number;
  weight?: number; // in lbs or kg
  restPeriod?: number; // in minutes
  completed?: boolean;
  notes?: string;
}

export interface StrengthExercise {
  id: string;
  name: string;
  muscleGroup: string;
  description: string;
  sets: ExerciseSet[];
}

// Strength-specific workout structure  
export interface StrengthWorkout {
  id: string;
  name: string;
  description: string;
  type: 'strength';
  exercises: StrengthExercise[];
  warmupExercises?: StrengthExercise[];
  notes?: string;
  assignedAthletes: string[];
  scheduledDate?: string;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  coach_id: string;
  athlete_id?: string;
  exercises: WorkoutExercise[];
  scheduled_date?: string;
  completed_date?: string;
  status: 'draft' | 'assigned' | 'completed';
  created_at: string;
  updated_at: string;
}

// Message types
export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  coach_id: string;
  athlete_id: string;
  last_message?: Message;
  unread_count: number;
  updated_at: string;
}

// File upload types
export interface FileUpload {
  id: string;
  user_id: string;
  workout_id?: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_url: string;
  created_at: string;
}

// API response types (for when we retrofit)
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  totalPages: number;
} 