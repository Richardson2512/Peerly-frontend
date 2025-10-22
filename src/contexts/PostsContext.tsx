import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post } from '../types';
import { db, supabase } from '../lib/supabase';

interface PostsContextType {
  posts: Post[];
  addPost: (post: Post) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  updatePost: (postId: string, content: string) => Promise<void>;
  getUserPosts: (userId: string) => Post[];
  loading: boolean;
  refreshPosts: () => Promise<void>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

// Helper function to convert Supabase post to our Post type
const convertSupabasePost = (supabasePost: any): Post => {
  return {
    id: supabasePost.id,
    userId: supabasePost.user_id,
    userName: supabasePost.users?.name || 'Unknown User',
    userAvatar: supabasePost.users?.avatar_url,
    content: supabasePost.content,
    image: supabasePost.image_url,
    video: supabasePost.video_url,
    timestamp: new Date(supabasePost.created_at),
    likes: supabasePost.likes || 0,
    comments: [] // Comments would be loaded separately
  };
};

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Load posts from Supabase on mount
  const refreshPosts = async () => {
    try {
      setLoading(true);
      console.log('Loading posts from database...');
      const supabasePosts = await db.getAllPosts();
      console.log('Raw Supabase posts:', supabasePosts);
      const convertedPosts = supabasePosts.map(convertSupabasePost);
      console.log('Converted posts:', convertedPosts);
      setPosts(convertedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const addPost = async (post: Post) => {
    try {
      console.log('Creating post with data:', {
        user_id: post.userId,
        content: post.content,
        image_url: post.image,
        video_url: post.video,
        likes: 0,
        comments_count: 0,
        shares_count: 0
      });
      
      // Check if user exists first
      console.log('Checking if user exists in database...');
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, name')
        .eq('id', post.userId)
        .single();
      
      if (userError) {
        console.error('User not found in database:', userError);
        throw new Error(`User ${post.userId} not found in database`);
      }
      
      console.log('User found in database:', userData);
      
      // Save to Supabase
      const supabasePost = await db.createPost({
        user_id: post.userId,
        content: post.content,
        image_url: post.image,
        video_url: post.video,
        likes: 0,
        comments_count: 0,
        shares_count: 0
      });
      
      console.log('Post created successfully in Supabase:', supabasePost);
      
      // Create new post with Supabase ID and timestamps, but preserve user info from original post
      const newPost: Post = {
        id: supabasePost.id,
        userId: supabasePost.user_id,
        userName: post.userName, // Use original post's userName
        userAvatar: post.userAvatar, // Use original post's userAvatar
        content: supabasePost.content,
        image: supabasePost.image_url,
        video: supabasePost.video_url,
        timestamp: new Date(supabasePost.created_at),
        likes: supabasePost.likes || 0,
        comments: []
      };
      
      console.log('Adding post to local state:', newPost);
      setPosts(prevPosts => [newPost, ...prevPosts]);
    } catch (error) {
      console.error('Error creating post:', error);
      console.error('Error details:', error);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      console.error('Error hint:', error.hint);
      throw error;
    }
  };

  const deletePost = async (postId: string) => {
    try {
      // Delete from Supabase
      await db.deletePost(postId);
      
      // Remove from local state
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  const updatePost = async (postId: string, content: string) => {
    try {
      // Update in Supabase
      await db.updatePost(postId, { content });
      
      // Update local state
      setPosts(prevPosts => prevPosts.map(post => 
        post.id === postId ? { ...post, content } : post
      ));
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  };

  const getUserPosts = (userId: string) => {
    return posts.filter(post => post.userId === userId);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, deletePost, updatePost, getUserPosts, loading, refreshPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

