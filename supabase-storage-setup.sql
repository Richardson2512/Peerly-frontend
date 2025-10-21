-- ============================================
-- Supabase Storage Setup for Peerly
-- ============================================
-- This creates storage buckets and policies for user uploads
-- Run this in your Supabase SQL Editor
-- ============================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('avatars', 'avatars', true),
  ('posts', 'posts', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- AVATARS BUCKET POLICIES
-- ============================================

-- Allow users to upload their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow everyone to view avatars (public read)
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- ============================================
-- POSTS BUCKET POLICIES
-- ============================================

-- Allow users to upload their own post media
CREATE POLICY "Users can upload their own post media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'posts' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own post media
CREATE POLICY "Users can update their own post media"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'posts' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own post media
CREATE POLICY "Users can delete their own post media"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'posts' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow everyone to view post media (public read)
CREATE POLICY "Anyone can view post media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'posts');

-- ============================================
-- FILE SIZE LIMITS (Optional)
-- ============================================
-- You can set these in Supabase Dashboard under Storage settings
-- Recommended:
-- - Avatars: Max 2MB
-- - Posts: Max 10MB for images, 4GB for videos (as per media validation specs)

-- ============================================
-- ADDITIONAL STORAGE CONFIGURATION
-- ============================================
-- These settings can be configured in Supabase Dashboard:

-- 1. Go to Storage > Settings
-- 2. Set file size limits:
--    - Avatars bucket: 2MB max
--    - Posts bucket: 4GB max (to support video uploads)
-- 3. Enable public access for both buckets
-- 4. Set cache control headers for better performance

-- ============================================
-- MEDIA VALIDATION INTEGRATION
-- ============================================
-- The frontend now includes comprehensive media validation:
-- - Images: Min 552x368px, Recommended 1200x627px
-- - Videos: 3s-10min duration, 1:2.4 to 2.4:1 aspect ratio
-- - File size limits enforced before upload
-- - Real-time validation feedback in MediaUploadModal

