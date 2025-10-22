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
          cover_photo_url?: string;
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
          cover_photo_url?: string;
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
          cover_photo_url?: string;
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
      conversations: {
        Row: {
          id: string;
          participant_one_id: string;
          participant_two_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          participant_one_id: string;
          participant_two_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          participant_one_id?: string;
          participant_two_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          message_type: 'text' | 'image' | 'file';
          attachment_url?: string;
          is_read: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          message_type?: 'text' | 'image' | 'file';
          attachment_url?: string;
          is_read?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_id?: string;
          receiver_id?: string;
          content?: string;
          message_type?: 'text' | 'image' | 'file';
          attachment_url?: string;
          is_read?: boolean;
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
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: 'connection_request' | 'connection_accepted' | 'message' | 'post_like' | 'comment' | 'mention' | 'system';
          title: string;
          message: string;
          is_read: boolean;
          action_url?: string;
          related_user_id?: string;
          related_entity_id?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'connection_request' | 'connection_accepted' | 'message' | 'post_like' | 'comment' | 'mention' | 'system';
          title: string;
          message: string;
          is_read?: boolean;
          action_url?: string;
          related_user_id?: string;
          related_entity_id?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'connection_request' | 'connection_accepted' | 'message' | 'post_like' | 'comment' | 'mention' | 'system';
          title?: string;
          message?: string;
          is_read?: boolean;
          action_url?: string;
          related_user_id?: string;
          related_entity_id?: string;
          created_at?: string;
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
  },

  // User profile image operations
  async updateUserAvatar(userId: string, avatarUrl: string) {
    const { data, error } = await supabase
      .from('users')
      .update({ avatar_url: avatarUrl })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUserCoverPhoto(userId: string, coverUrl: string) {
    const { data, error } = await supabase
      .from('users')
      .update({ cover_photo_url: coverUrl })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Conversation operations
  async getOrCreateConversation(userId: string, otherUserId: string) {
    // Ensure participant_one_id is always less than participant_two_id
    const [participantOne, participantTwo] = [userId, otherUserId].sort();
    
    // Try to find existing conversation
    const { data: existing, error: findError } = await supabase
      .from('conversations')
      .select('*')
      .eq('participant_one_id', participantOne)
      .eq('participant_two_id', participantTwo)
      .single();
    
    if (existing) return existing;
    
    // Create new conversation if it doesn't exist
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        participant_one_id: participantOne,
        participant_two_id: participantTwo
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserConversations(userId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .or(`participant_one_id.eq.${userId},participant_two_id.eq.${userId}`)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Message operations
  async sendMessage(messageData: Database['public']['Tables']['messages']['Insert']) {
    const { data, error } = await supabase
      .from('messages')
      .insert(messageData)
      .select()
      .single();
    
    if (error) throw error;
    
    // Update conversation's updated_at timestamp
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', messageData.conversation_id);
    
    return data;
  },

  async getConversationMessages(conversationId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async markMessageAsRead(messageId: string) {
    const { data, error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', messageId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async markConversationMessagesAsRead(conversationId: string, userId: string) {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .eq('receiver_id', userId)
      .eq('is_read', false);
    
    if (error) throw error;
  },

  async deleteMessage(messageId: string) {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId);
    
    if (error) throw error;
  },

  async getUnreadMessageCount(userId: string) {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('receiver_id', userId)
      .eq('is_read', false);
    
    if (error) throw error;
    return count || 0;
  },

  // Connection operations
  async sendConnectionRequest(userId: string, targetUserId: string) {
    // Check if connection already exists
    const { data: existing } = await supabase
      .from('connections')
      .select('*')
      .or(`and(user_id.eq.${userId},connected_user_id.eq.${targetUserId}),and(user_id.eq.${targetUserId},connected_user_id.eq.${userId})`)
      .single();
    
    if (existing) {
      throw new Error('Connection request already exists');
    }

    // Create connection request
    const { data, error } = await supabase
      .from('connections')
      .insert({
        user_id: userId,
        connected_user_id: targetUserId,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) throw error;

    // Get sender info for notification
    const { data: senderData } = await supabase
      .from('users')
      .select('name')
      .eq('id', userId)
      .single();

    // Create notification for target user
    await this.createNotification({
      user_id: targetUserId,
      type: 'connection_request',
      title: 'New Connection Request',
      message: `${senderData?.name || 'Someone'} wants to connect with you`,
      related_user_id: userId,
      related_entity_id: data.id
    });
    
    return data;
  },

  async acceptConnectionRequest(connectionId: string, userId: string) {
    // Update connection status
    const { data, error } = await supabase
      .from('connections')
      .update({ status: 'accepted' })
      .eq('id', connectionId)
      .eq('connected_user_id', userId) // Only the receiver can accept
      .select()
      .single();
    
    if (error) throw error;

    // Get accepter info for notification
    const { data: accepterData } = await supabase
      .from('users')
      .select('name')
      .eq('id', userId)
      .single();

    // Notify the requester
    await this.createNotification({
      user_id: data.user_id,
      type: 'connection_accepted',
      title: 'Connection Accepted',
      message: `${accepterData?.name || 'Someone'} accepted your connection request`,
      related_user_id: userId,
      related_entity_id: connectionId
    });
    
    return data;
  },

  async rejectConnectionRequest(connectionId: string, userId: string) {
    const { data, error } = await supabase
      .from('connections')
      .update({ status: 'rejected' })
      .eq('id', connectionId)
      .eq('connected_user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async removeConnection(connectionId: string) {
    const { error } = await supabase
      .from('connections')
      .delete()
      .eq('id', connectionId);
    
    if (error) throw error;
  },

  async getConnectionStatus(userId: string, targetUserId: string) {
    const { data, error } = await supabase
      .from('connections')
      .select('*')
      .or(`and(user_id.eq.${userId},connected_user_id.eq.${targetUserId}),and(user_id.eq.${targetUserId},connected_user_id.eq.${userId})`)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    return data;
  },

  async getUserConnections(userId: string, status: 'pending' | 'accepted' | 'rejected' = 'accepted') {
    const { data, error } = await supabase
      .from('connections')
      .select('*')
      .or(`user_id.eq.${userId},connected_user_id.eq.${userId}`)
      .eq('status', status);
    
    if (error) throw error;
    return data;
  },

  async getConnectionCounts(userId: string) {
    // Get accepted connections count (peers/friends)
    const { count: peersCount } = await supabase
      .from('connections')
      .select('*', { count: 'exact', head: true })
      .or(`user_id.eq.${userId},connected_user_id.eq.${userId}`)
      .eq('status', 'accepted');

    // Get followers (people who sent requests to this user that were accepted)
    const { count: followersCount } = await supabase
      .from('connections')
      .select('*', { count: 'exact', head: true })
      .eq('connected_user_id', userId)
      .eq('status', 'accepted');

    // Get following (requests this user sent that were accepted)
    const { count: followingCount } = await supabase
      .from('connections')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'accepted');

    return {
      peers: peersCount || 0,
      followers: followersCount || 0,
      following: followingCount || 0
    };
  },

  // Notification operations
  async createNotification(notificationData: Database['public']['Tables']['notifications']['Insert']) {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notificationData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserNotifications(userId: string, limit: number = 50) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async getUnreadNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .eq('is_read', false)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async markNotificationAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async markAllNotificationsAsRead(userId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    
    if (error) throw error;
  },

  async deleteNotification(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);
    
    if (error) throw error;
  },

  async getUnreadNotificationCount(userId: string) {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    
    if (error) throw error;
    return count || 0;
  },

  // Search operations
  async searchUsers(query: string, currentUserId: string, limit: number = 20) {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, college, course, course_level, year, avatar_url, bio')
      .neq('id', currentUserId) // Exclude current user
      .or(`name.ilike.%${query}%,college.ilike.%${query}%,course.ilike.%${query}%`)
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async getRecommendedUsers(userId: string, limit: number = 10) {
    // Get user's college and course
    const { data: userData } = await supabase
      .from('users')
      .select('college, course')
      .eq('id', userId)
      .single();

    if (!userData) return [];

    // Get users from same college/course
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, college, course, course_level, year, avatar_url, bio')
      .neq('id', userId)
      .or(`college.eq.${userData.college},course.eq.${userData.course}`)
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  }
};
