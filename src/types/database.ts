/**
 * Database types for RollnFitness.
 * Keep in sync with supabase/migrations/*.sql
 * After connecting Supabase, prefer generating with: npx supabase gen types typescript
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type FitnessGoal =
  | "strength"
  | "weight_management"
  | "mobility"
  | "endurance";

export type MobilityLevel =
  | "full"
  | "limited_lower"
  | "limited_upper"
  | "seated"
  | "assisted";

export type WorkoutExperience =
  | "beginner"
  | "some_experience"
  | "experienced";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type AppRole = "member" | "admin";

export type FriendshipStatus = "pending" | "accepted" | "declined" | "blocked";

export type PartnerStatus = "pending" | "active" | "paused" | "ended";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          display_name: string | null;
          bio: string | null;
          avatar_url: string | null;
          fitness_interests: string[] | null;
          equipment_preferences: string[] | null;
          mobility_level: MobilityLevel | null;
          workout_experience: WorkoutExperience | null;
          onboarding_completed_at: string | null;
          privacy_settings: Json;
          accessibility_settings: Json;
          role: AppRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          fitness_interests?: string[] | null;
          equipment_preferences?: string[] | null;
          mobility_level?: MobilityLevel | null;
          workout_experience?: WorkoutExperience | null;
          onboarding_completed_at?: string | null;
          privacy_settings?: Json;
          accessibility_settings?: Json;
          role?: AppRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      goals: {
        Row: {
          id: string;
          user_id: string;
          goal_type: FitnessGoal;
          target_description: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          goal_type: FitnessGoal;
          target_description?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["goals"]["Insert"]>;
        Relationships: [];
      };
      exercises: {
        Row: {
          id: string;
          name: string;
          description: string;
          instructions: string;
          video_url: string | null;
          image_url: string | null;
          slug: string | null;
          focus_area: string | null;
          difficulty: Difficulty;
          equipment: string[];
          target_muscles: string[];
          mobility_category: MobilityLevel;
          safety_notes: string | null;
          variations: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          instructions: string;
          video_url?: string | null;
          image_url?: string | null;
          slug?: string | null;
          focus_area?: string | null;
          difficulty: Difficulty;
          equipment?: string[];
          target_muscles?: string[];
          mobility_category: MobilityLevel;
          safety_notes?: string | null;
          variations?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["exercises"]["Insert"]>;
        Relationships: [];
      };
      workouts: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          goal_type: FitnessGoal | null;
          difficulty: Difficulty;
          estimated_duration_minutes: number | null;
          mobility_level: MobilityLevel | null;
          created_by: string | null;
          is_template: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          goal_type?: FitnessGoal | null;
          difficulty: Difficulty;
          estimated_duration_minutes?: number | null;
          mobility_level?: MobilityLevel | null;
          created_by?: string | null;
          is_template?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["workouts"]["Insert"]>;
        Relationships: [];
      };
      workout_history: {
        Row: {
          id: string;
          user_id: string;
          workout_id: string | null;
          started_at: string;
          completed_at: string | null;
          duration_seconds: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          workout_id?: string | null;
          started_at: string;
          completed_at?: string | null;
          duration_seconds?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["workout_history"]["Insert"]
        >;
        Relationships: [];
      };
      meals: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          calories: number;
          protein_g: number;
          carbs_g: number;
          fat_g: number;
          ingredients: string[];
          preparation_time_minutes: number | null;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          calories: number;
          protein_g: number;
          carbs_g: number;
          fat_g: number;
          ingredients?: string[];
          preparation_time_minutes?: number | null;
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["meals"]["Insert"]>;
        Relationships: [];
      };
      nutrition_preferences: {
        Row: {
          id: string;
          user_id: string;
          dietary_restrictions: string[];
          calorie_target: number | null;
          protein_target_g: number | null;
          preferred_categories: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          dietary_restrictions?: string[];
          calorie_target?: number | null;
          protein_target_g?: number | null;
          preferred_categories?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["nutrition_preferences"]["Insert"]
        >;
        Relationships: [];
      };
      communities: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          goal_type: FitnessGoal | null;
          interest_tag: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          goal_type?: FitnessGoal | null;
          interest_tag?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["communities"]["Insert"]>;
        Relationships: [];
      };
      community_posts: {
        Row: {
          id: string;
          community_id: string;
          author_id: string;
          title: string;
          body: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          community_id: string;
          author_id: string;
          title: string;
          body: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["community_posts"]["Insert"]
        >;
        Relationships: [];
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          body: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_id: string;
          body: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["comments"]["Insert"]>;
        Relationships: [];
      };
      friends: {
        Row: {
          id: string;
          requester_id: string;
          addressee_id: string;
          status: FriendshipStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          requester_id: string;
          addressee_id: string;
          status?: FriendshipStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["friends"]["Insert"]>;
        Relationships: [];
      };
      accountability_partners: {
        Row: {
          id: string;
          user_id: string;
          partner_id: string;
          status: PartnerStatus;
          shared_goal: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          partner_id: string;
          status?: PartnerStatus;
          shared_goal?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["accountability_partners"]["Insert"]
        >;
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          recipient_id: string;
          body: string;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          recipient_id: string;
          body: string;
          read_at?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
        Relationships: [];
      };
      badges: {
        Row: {
          id: string;
          code: string;
          name: string;
          description: string;
          criteria: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          description: string;
          criteria?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["badges"]["Insert"]>;
        Relationships: [];
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          earned_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          badge_id: string;
          earned_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_badges"]["Insert"]>;
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          body: string | null;
          metadata: Json;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          body?: string | null;
          metadata?: Json;
          read_at?: string | null;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["notifications"]["Insert"]
        >;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      fitness_goal: FitnessGoal;
      mobility_level: MobilityLevel;
      workout_experience: WorkoutExperience;
      difficulty: Difficulty;
      friendship_status: FriendshipStatus;
      partner_status: PartnerStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
