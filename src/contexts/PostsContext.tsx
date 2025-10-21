import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post } from '../types';

interface PostsContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  deletePost: (postId: string) => void;
  updatePost: (postId: string, content: string) => void;
  getUserPosts: (userId: string) => Post[];
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([
    // Sample posts from Feed component
    {
      id: '1',
      userId: '2',
      userName: 'Sarah Chen',
      userAvatar: undefined,
      content: "Just finished my first week at Google as a software engineering intern! The experience has been incredible so far. Working on real projects that impact millions of users is both exciting and challenging. Can't wait to share more updates! 🚀",
      timestamp: new Date('2024-01-15T10:30:00'),
      likes: 42,
      comments: []
    },
    {
      id: '2',
      userId: '3',
      userName: 'Alex Rodriguez',
      userAvatar: undefined,
      content: "Participating in our university's hackathon this weekend! Our team is building an AI-powered study buddy app. Excited to see what we can create in 48 hours. Anyone else participating in hackathons this season?",
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      timestamp: new Date('2024-01-14T16:45:00'),
      likes: 28,
      comments: []
    },
  ]);

  const addPost = (post: Post) => {
    setPosts([post, ...posts]);
  };

  const deletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const updatePost = (postId: string, content: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, content } : post
    ));
  };

  const getUserPosts = (userId: string) => {
    return posts.filter(post => post.userId === userId);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, deletePost, updatePost, getUserPosts }}>
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

