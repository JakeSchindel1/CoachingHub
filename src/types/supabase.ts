export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'coach' | 'athlete'
          stripe_account_id: string | null
          stripe_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role: 'coach' | 'athlete'
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'coach' | 'athlete'
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          coach_id: string
          organization_name: string
          primary_color: string
          accent_color: string
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          coach_id: string
          organization_name: string
          primary_color?: string
          accent_color?: string
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          coach_id?: string
          organization_name?: string
          primary_color?: string
          accent_color?: string
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      coach_athletes: {
        Row: {
          id: string
          coach_id: string
          athlete_id: string
          status: 'active' | 'inactive' | 'pending'
          created_at: string
        }
        Insert: {
          id?: string
          coach_id: string
          athlete_id: string
          status?: 'active' | 'inactive' | 'pending'
          created_at?: string
        }
        Update: {
          id?: string
          coach_id?: string
          athlete_id?: string
          status?: 'active' | 'inactive' | 'pending'
          created_at?: string
        }
      }
      workouts: {
        Row: {
          id: string
          coach_id: string
          athlete_id: string | null
          name: string
          description: string | null
          workout_type: 'lifting' | 'running' | 'custom'
          is_template: boolean
          scheduled_date: string | null
          status: 'assigned' | 'in_progress' | 'completed' | 'skipped'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          coach_id: string
          athlete_id?: string | null
          name: string
          description?: string | null
          workout_type: 'lifting' | 'running' | 'custom'
          is_template?: boolean
          scheduled_date?: string | null
          status?: 'assigned' | 'in_progress' | 'completed' | 'skipped'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          coach_id?: string
          athlete_id?: string | null
          name?: string
          description?: string | null
          workout_type?: 'lifting' | 'running' | 'custom'
          is_template?: boolean
          scheduled_date?: string | null
          status?: 'assigned' | 'in_progress' | 'completed' | 'skipped'
          created_at?: string
          updated_at?: string
        }
      }
      exercises: {
        Row: {
          id: string
          workout_id: string
          name: string
          exercise_type: 'strength' | 'cardio' | 'flexibility' | 'custom'
          sets: number | null
          reps: number | null
          weight: number | null
          distance: number | null
          duration: number | null
          rest_seconds: number | null
          notes: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          workout_id: string
          name: string
          exercise_type: 'strength' | 'cardio' | 'flexibility' | 'custom'
          sets?: number | null
          reps?: number | null
          weight?: number | null
          distance?: number | null
          duration?: number | null
          rest_seconds?: number | null
          notes?: string | null
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          workout_id?: string
          name?: string
          exercise_type?: 'strength' | 'cardio' | 'flexibility' | 'custom'
          sets?: number | null
          reps?: number | null
          weight?: number | null
          distance?: number | null
          duration?: number | null
          rest_seconds?: number | null
          notes?: string | null
          order_index?: number
          created_at?: string
        }
      }
      exercise_logs: {
        Row: {
          id: string
          exercise_id: string
          athlete_id: string
          set_number: number
          reps_completed: number | null
          weight_used: number | null
          distance_completed: number | null
          duration_completed: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          exercise_id: string
          athlete_id: string
          set_number: number
          reps_completed?: number | null
          weight_used?: number | null
          distance_completed?: number | null
          duration_completed?: number | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          exercise_id?: string
          athlete_id?: string
          set_number?: number
          reps_completed?: number | null
          weight_used?: number | null
          distance_completed?: number | null
          duration_completed?: number | null
          notes?: string | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          workout_id: string | null
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          workout_id?: string | null
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          workout_id?: string | null
          read_at?: string | null
          created_at?: string
        }
      }
      file_uploads: {
        Row: {
          id: string
          athlete_id: string
          workout_id: string | null
          file_name: string
          file_type: 'fit' | 'video' | 'image' | 'other'
          file_url: string
          file_size: number
          uploaded_at: string
        }
        Insert: {
          id?: string
          athlete_id: string
          workout_id?: string | null
          file_name: string
          file_type: 'fit' | 'video' | 'image' | 'other'
          file_url: string
          file_size: number
          uploaded_at?: string
        }
        Update: {
          id?: string
          athlete_id?: string
          workout_id?: string | null
          file_name?: string
          file_type?: 'fit' | 'video' | 'image' | 'other'
          file_url?: string
          file_size?: number
          uploaded_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'coach' | 'athlete'
      workout_type: 'lifting' | 'running' | 'custom'
      exercise_type: 'strength' | 'cardio' | 'flexibility' | 'custom'
      file_type: 'fit' | 'video' | 'image' | 'other'
    }
  }
} 