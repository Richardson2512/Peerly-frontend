import { supabase } from './supabase';

// Storage bucket names
export const BUCKETS = {
  AVATARS: 'avatars',
  COVERS: 'covers',
  POSTS: 'posts',
} as const;

/**
 * Upload a file to Supabase Storage
 * @param bucket - The bucket name (avatars or posts)
 * @param userId - The user's ID (used for folder organization)
 * @param file - The file to upload
 * @param fileName - Optional custom file name
 * @returns The public URL of the uploaded file
 */
export const uploadFile = async (
  bucket: string,
  userId: string,
  file: File,
  fileName?: string
): Promise<string> => {
  try {
    // Generate unique filename if not provided
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const finalFileName = fileName || `${timestamp}.${fileExt}`;
    
    // File path: userId/filename
    const filePath = `${userId}/${finalFileName}`;

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Upload avatar image
 * @param userId - The user's ID
 * @param file - The avatar image file
 * @returns The public URL of the uploaded avatar
 */
export const uploadAvatar = async (userId: string, file: File): Promise<string> => {
  return uploadFile(BUCKETS.AVATARS, userId, file, 'avatar.jpg');
};

/**
 * Upload cover photo
 * @param userId - The user's ID
 * @param file - The cover photo file
 * @returns The public URL of the uploaded cover photo
 */
export const uploadCoverPhoto = async (userId: string, file: File): Promise<string> => {
  return uploadFile(BUCKETS.COVERS, userId, file, 'cover.jpg');
};

/**
 * Upload post media (image or video)
 * @param userId - The user's ID
 * @param file - The media file
 * @returns The public URL of the uploaded media
 */
export const uploadPostMedia = async (userId: string, file: File): Promise<string> => {
  return uploadFile(BUCKETS.POSTS, userId, file);
};

/**
 * Delete a file from Supabase Storage
 * @param bucket - The bucket name
 * @param userId - The user's ID
 * @param fileName - The file name to delete
 */
export const deleteFile = async (
  bucket: string,
  userId: string,
  fileName: string
): Promise<void> => {
  try {
    const filePath = `${userId}/${fileName}`;
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * Delete post media
 * @param userId - The user's ID
 * @param fileUrl - The full URL of the file to delete
 */
export const deletePostMedia = async (userId: string, fileUrl: string): Promise<void> => {
  try {
    // Extract filename from URL
    const fileName = fileUrl.split('/').pop();
    if (!fileName) throw new Error('Invalid file URL');
    
    await deleteFile(BUCKETS.POSTS, userId, fileName);
  } catch (error) {
    console.error('Error deleting post media:', error);
    throw error;
  }
};

/**
 * Get the public URL for a file
 * @param bucket - The bucket name
 * @param userId - The user's ID
 * @param fileName - The file name
 * @returns The public URL
 */
export const getPublicUrl = (bucket: string, userId: string, fileName: string): string => {
  const filePath = `${userId}/${fileName}`;
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  
  return publicUrl;
};

/**
 * Create user storage folders (called during signup)
 * This ensures the user's folder structure exists
 * Note: Supabase creates folders automatically on first upload,
 * but this can be used for initialization if needed
 */
export const initializeUserStorage = async (userId: string): Promise<void> => {
  try {
    // Create a placeholder file to initialize folders
    // This will be replaced when user uploads actual content
    const placeholder = new Blob([''], { type: 'text/plain' });
    const placeholderFile = new File([placeholder], '.placeholder', { type: 'text/plain' });
    
    // Initialize both buckets
    await Promise.all([
      supabase.storage.from(BUCKETS.AVATARS).upload(`${userId}/.placeholder`, placeholderFile, { upsert: true }),
      supabase.storage.from(BUCKETS.POSTS).upload(`${userId}/.placeholder`, placeholderFile, { upsert: true })
    ]);
    
    console.log('User storage initialized for:', userId);
  } catch (error) {
    // Ignore errors - folders will be created on first actual upload
    console.log('Storage initialization skipped (will be created on first upload)');
  }
};

