# Supabase Storage Setup Guide

## 📦 Overview

This guide will help you set up Supabase Storage for handling user uploads in Peerly. Each user gets their own folder within shared buckets for organizing their content.

## 🎯 Storage Structure

```
supabase_storage/
├── avatars/
│   ├── user_id_1/
│   │   └── avatar.jpg
│   ├── user_id_2/
│   │   └── avatar.jpg
│   └── ...
└── posts/
    ├── user_id_1/
    │   ├── 1234567890.jpg
    │   ├── 1234567891.png
    │   └── ...
    ├── user_id_2/
    │   └── ...
    └── ...
```

## ⚙️ Setup Steps

### Step 1: Run the Storage SQL Script

1. **Go to Supabase SQL Editor:**
   - Visit: https://app.supabase.com/project/kulufuxzrzzgwlaxjvqu/sql

2. **Copy and Run the Script:**
   - Open the file `supabase-storage-setup.sql` in your project root
   - Copy all the SQL code
   - Paste it in the SQL Editor
   - Click **Run** or press `Ctrl+Enter`

3. **Verify Success:**
   - You should see: `Success. No rows returned`
   - This creates:
     - ✅ `avatars` bucket (public)
     - ✅ `posts` bucket (public)
     - ✅ RLS policies for secure access

### Step 2: Verify Buckets Created

1. **Go to Storage:**
   - Visit: https://app.supabase.com/project/kulufuxzrzzgwlaxjvqu/storage/buckets

2. **Check for Buckets:**
   - You should see:
     - ✅ `avatars` (public)
     - ✅ `posts` (public)

### Step 3: Configure File Size Limits (Optional)

1. **Go to Storage Settings:**
   - Visit: https://app.supabase.com/project/kulufuxzrzzgwlaxjvqu/settings/storage

2. **Set Recommended Limits:**
   - **Avatars:** Max 2MB
   - **Posts:** Max 10MB for images, 50MB for videos

## 🔒 Security (RLS Policies)

The SQL script automatically sets up these security policies:

### Avatars Bucket:
- ✅ Users can upload/update/delete **only their own** avatars
- ✅ Everyone can **view** all avatars (public read)

### Posts Bucket:
- ✅ Users can upload/update/delete **only their own** post media
- ✅ Everyone can **view** all post media (public read)

### How it Works:
- Files are organized by `userId/filename`
- RLS checks that `userId` matches the authenticated user
- Public read access allows viewing without authentication

## 🚀 How It Works in the App

### On User Signup:
```typescript
// Automatically called during signup
await initializeUserStorage(userId);
```

This creates placeholder files in both buckets to initialize the user's folders.

### When Creating a Post with Image:
```typescript
// User selects an image
const file = e.target.files[0];

// Upload to Supabase Storage
const imageUrl = await uploadPostMedia(userId, file);
// Returns: https://...supabase.co/storage/v1/object/public/posts/user_id/1234567890.jpg

// Save imageUrl in the post
const post = { content, image: imageUrl, ... };
```

### When Uploading Avatar:
```typescript
const avatarUrl = await uploadAvatar(userId, file);
// Returns: https://...supabase.co/storage/v1/object/public/avatars/user_id/avatar.jpg
```

## 📝 Storage Functions Available

### In `src/lib/storage.ts`:

```typescript
// Upload post media (images/videos)
uploadPostMedia(userId, file) → Promise<string>

// Upload avatar
uploadAvatar(userId, file) → Promise<string>

// Delete post media
deletePostMedia(userId, fileUrl) → Promise<void>

// Initialize user storage (called on signup)
initializeUserStorage(userId) → Promise<void>

// Get public URL for a file
getPublicUrl(bucket, userId, fileName) → string
```

## 🧪 Testing

### Test Image Upload:

1. **Sign up or log in**
2. **Go to your Profile → Activity tab**
3. **Click "Create Post"**
4. **Click "Add Photo"** and select an image
5. **Click "Post"**
6. **Check Supabase Storage:**
   - Go to: https://app.supabase.com/project/kulufuxzrzzgwlaxjvqu/storage/buckets/posts
   - You should see: `your_user_id/timestamp.jpg`

### Verify the Image:
- The post should display the image
- Right-click the image → "Open in new tab"
- URL should be: `https://kulufuxzrzzgwlaxjvqu.supabase.co/storage/v1/object/public/posts/...`

## 🐛 Troubleshooting

### "Failed to upload image"

**Possible causes:**
1. ❌ Storage buckets not created → Run `supabase-storage-setup.sql`
2. ❌ RLS policies not set → Re-run the SQL script
3. ❌ File too large → Check file size (max 10MB for posts)
4. ❌ Invalid file type → Only JPEG, PNG, GIF, WebP allowed

**Solution:**
```typescript
// Check browser console for detailed error
console.error('Upload error:', error);
```

### "Permission denied"

**Possible causes:**
1. ❌ User not authenticated → Make sure you're logged in
2. ❌ RLS policies incorrect → Re-run `supabase-storage-setup.sql`
3. ❌ Trying to access another user's files → Check userId matches

### Images not displaying

**Possible causes:**
1. ❌ Bucket not public → Check bucket is set to `public: true`
2. ❌ Wrong URL → Verify URL format: `.../storage/v1/object/public/posts/...`
3. ❌ CORS issues → Check Supabase CORS settings

## 📊 File Organization Best Practices

### ✅ DO:
- Use unique timestamps for filenames: `${Date.now()}.${ext}`
- Organize by userId: `userId/filename`
- Validate file types and sizes before upload
- Clean up unused files periodically

### ❌ DON'T:
- Create a bucket per user (use folders instead)
- Use predictable filenames (security risk)
- Upload without validation
- Store sensitive data in public buckets

## 🔄 Future Enhancements

Consider implementing:
- [ ] Image compression before upload
- [ ] Video upload support
- [ ] Progress indicators for large files
- [ ] CDN integration for faster delivery
- [ ] Automatic thumbnail generation
- [ ] Bulk delete for user cleanup

## 📚 Resources

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Storage RLS Policies](https://supabase.com/docs/guides/storage/security/access-control)
- [File Upload Best Practices](https://supabase.com/docs/guides/storage/uploads)

