import { createClient } from '@supabase/supabase-js';
import { appConfig } from '../config/app.config';

const supabaseUrl = appConfig.supabase.url;
const supabaseAnonKey = appConfig.supabase.anonKey;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          college: string;
          course: string;
          course_duration: number;
          course_level: 'diploma' | 'undergraduate' | 'postgraduate' | 'phd';
          year: string;
          graduation_date: string;
          avatar_url?: string;
          bio?: string;
          is_pro: boolean;
          pro_expiry_date?: string;
          skills: string[];
          interests: string[];
          is_account_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          college: string;
          course: string;
          course_duration: number;
          course_level: 'diploma' | 'undergraduate' | 'postgraduate' | 'phd';
          year: string;
          graduation_date: string;
          avatar_url?: string;
          bio?: string;
          is_pro?: boolean;
          pro_expiry_date?: string;
          skills?: string[];
          interests?: string[];
          is_account_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          college?: string;
          course?: string;
          course_duration?: number;
          course_level?: 'undergraduate' | 'postgraduate' | 'phd';
          year?: string;
          graduation_date?: string;
          avatar_url?: string;
          bio?: string;
          is_pro?: boolean;
          pro_expiry_date?: string;
          skills?: string[];
          interests?: string[];
          is_account_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          image_url?: string;
          video_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          image_url?: string;
          video_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          image_url?: string;
          video_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      badges: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          event: string;
          rank: string;
          date: string;
          category: 'hackathon' | 'competition' | 'academic' | 'sports' | 'cultural' | 'other';
          description?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          event: string;
          rank: string;
          date: string;
          category: 'hackathon' | 'competition' | 'academic' | 'sports' | 'cultural' | 'other';
          description?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          event?: string;
          rank?: string;
          date?: string;
          category?: 'hackathon' | 'competition' | 'academic' | 'sports' | 'cultural' | 'other';
          description?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      connections: {
        Row: {
          id: string;
          user_id: string;
          connected_user_id: string;
          status: 'pending' | 'accepted' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          connected_user_id: string;
          status?: 'pending' | 'accepted' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          connected_user_id?: string;
          status?: 'pending' | 'accepted' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
      };
      internships: {
        Row: {
          id: string;
          title: string;
          company: string;
          location: string;
          type: 'remote' | 'on-site' | 'hybrid';
          duration: string;
          stipend: string;
          description: string;
          requirements: string[];
          posted_date: string;
          application_deadline: string;
          company_logo?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          company: string;
          location: string;
          type: 'remote' | 'on-site' | 'hybrid';
          duration: string;
          stipend: string;
          description: string;
          requirements: string[];
          posted_date: string;
          application_deadline: string;
          company_logo?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          company?: string;
          location?: string;
          type?: 'remote' | 'on-site' | 'hybrid';
          duration?: string;
          stipend?: string;
          description?: string;
          requirements?: string[];
          posted_date?: string;
          application_deadline?: string;
          company_logo?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          instructor: string;
          duration: string;
          level: 'beginner' | 'intermediate' | 'advanced';
          category: string;
          thumbnail_url: string;
          video_url: string;
          is_free: boolean;
          is_pro_only: boolean;
          completion_certificate: boolean;
          enrolled_students: number;
          rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          instructor: string;
          duration: string;
          level: 'beginner' | 'intermediate' | 'advanced';
          category: string;
          thumbnail_url: string;
          video_url: string;
          is_free: boolean;
          is_pro_only: boolean;
          completion_certificate: boolean;
          enrolled_students?: number;
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          instructor?: string;
          duration?: string;
          level?: 'beginner' | 'intermediate' | 'advanced';
          category?: string;
          thumbnail_url?: string;
          video_url?: string;
          is_free?: boolean;
          is_pro_only?: boolean;
          completion_certificate?: boolean;
          enrolled_students?: number;
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      pro_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          start_date: string;
          end_date: string;
          is_active: boolean;
          payment_method: string;
          amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          start_date: string;
          end_date: string;
          is_active?: boolean;
          payment_method: string;
          amount: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          start_date?: string;
          end_date?: string;
          is_active?: boolean;
          payment_method?: string;
          amount?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Helper functions for database operations
export const db = {
  // User operations
  async createUser(userData: Database['public']['Tables']['users']['Insert']) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUser(id: string, updates: Database['public']['Tables']['users']['Update']) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Post operations
  async createPost(postData: Database['public']['Tables']['posts']['Insert']) {
    const { data, error } = await supabase
      .from('posts')
      .insert(postData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getPosts(limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users:user_id (
          name,
          avatar_url,
          course,
          year
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    return data;
  },

  // Connection operations
  async sendConnectionRequest(userId: string, connectedUserId: string) {
    const { data, error } = await supabase
      .from('connections')
      .insert({
        user_id: userId,
        connected_user_id: connectedUserId,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getConnectionRequests(userId: string) {
    const { data, error } = await supabase
      .from('connections')
      .select(`
        *,
        users:user_id (
          name,
          avatar_url,
          course,
          college
        )
      `)
      .eq('connected_user_id', userId)
      .eq('status', 'pending');
    
    if (error) throw error;
    return data;
  },

  async acceptConnectionRequest(connectionId: string) {
    const { data, error } = await supabase
      .from('connections')
      .update({ status: 'accepted', updated_at: new Date().toISOString() })
      .eq('id', connectionId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async rejectConnectionRequest(connectionId: string) {
    const { data, error } = await supabase
      .from('connections')
      .update({ status: 'rejected', updated_at: new Date().toISOString() })
      .eq('id', connectionId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Internship operations
  async getInternships(limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .order('posted_date', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    return data;
  },

  // Course operations
  async getCourses(limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    return data;
  },

  // Post operations
  async createPost(postData: Database['public']['Tables']['posts']['Insert']) {
    const { data, error } = await supabase
      .from('posts')
      .insert(postData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getAllPosts(limit: number = 50, offset: number = 0) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          id,
          name,
          avatar_url,
          college,
          course
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    return data;
  },

  async getUserPosts(userId: string) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          id,
          name,
          avatar_url,
          college,
          course
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async updatePost(postId: string, updates: Database['public']['Tables']['posts']['Update']) {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', postId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deletePost(postId: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);
    
    if (error) throw error;
  },

  async likePost(postId: string) {
    const { data, error } = await supabase.rpc('increment_post_likes', { post_id: postId });
    if (error) throw error;
    return data;
  },

  // Pro subscription operations
  async createProSubscription(subscriptionData: Database['public']['Tables']['pro_subscriptions']['Insert']) {
    const { data, error } = await supabase
      .from('pro_subscriptions')
      .insert(subscriptionData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserProSubscription(userId: string) {
    const { data, error } = await supabase
      .from('pro_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Badge operations
  async createBadge(badgeData: Database['public']['Tables']['badges']['Insert']) {
    const { data, error } = await supabase
      .from('badges')
      .insert(badgeData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserBadges(userId: string) {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async updateBadge(badgeId: string, updates: Database['public']['Tables']['badges']['Update']) {
    const { data, error } = await supabase
      .from('badges')
      .update(updates)
      .eq('id', badgeId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteBadge(badgeId: string) {
    const { error } = await supabase
      .from('badges')
      .delete()
      .eq('id', badgeId);
    
    if (error) throw error;
  }
};
