# Messages Feature - Database Setup Guide

## Overview
This guide will help you set up the database schema for the production-ready messaging system in Peerly.

## Prerequisites
- Access to your Supabase project dashboard
- SQL Editor access in Supabase

## Instructions

### Step 1: Run the SQL Schema
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy the entire contents of `supabase-schema.sql` file
5. Click **Run** to execute the schema

This will create:
- `conversations` table for managing 1-on-1 conversations
- Updated `messages` table with proper structure
- Indexes for optimal query performance
- Row Level Security (RLS) policies
- Automatic timestamp update triggers

### Step 2: Verify Tables Created

Run this query to verify the tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('conversations', 'messages');
```

You should see both `conversations` and `messages` tables.

### Step 3: Check RLS Policies

Verify RLS is enabled:

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('conversations', 'messages');
```

Both tables should show `rowsecurity = true`.

### Step 4: Test with Sample Data (Optional)

You can insert test data to verify everything works:

```sql
-- This will be handled automatically by the app when users start conversations
-- No manual data insertion needed
```

## Database Schema Details

### Conversations Table
- **Purpose**: Manages 1-on-1 conversations between users
- **Key Features**:
  - Ensures unique conversations between two users
  - Automatically orders participant IDs for consistency
  - Tracks last update time for sorting

### Messages Table
- **Purpose**: Stores all messages in conversations
- **Key Features**:
  - Links to conversations table
  - Supports text, image, and file message types
  - Tracks read status for unread indicators
  - Automatic timestamp management

## Real-time Features

The messaging system uses Supabase Realtime for instant updates:

1. **New Message Notifications**: Users receive messages instantly
2. **Read Status Updates**: Read receipts update in real-time
3. **Conversation List Updates**: Last message and timestamps update automatically

## Security

Row Level Security (RLS) ensures:
- Users can only see their own conversations
- Users can only send messages as themselves
- Users can only read messages they're involved in
- Users can delete their own sent messages

## Performance Optimizations

The schema includes indexes on:
- Participant IDs for fast conversation lookups
- Conversation ID for quick message retrieval
- Sender and receiver IDs for filtering
- Created and updated timestamps for sorting

## Troubleshooting

### Issue: Messages not appearing
**Solution**: Check if RLS policies are enabled and configured correctly.

### Issue: Real-time updates not working
**Solution**: Verify Supabase Realtime is enabled for `messages` and `conversations` tables in your project settings.

### Issue: Can't create conversations
**Solution**: Ensure both users exist in the `users` table first.

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase connection in `.env` file
3. Ensure all schema changes are applied correctly
4. Check Supabase logs in the dashboard

## Features Implemented

✅ Database schema for conversations and messages
✅ Real-time message delivery
✅ Read status tracking and unread counts
✅ Message deletion
✅ Auto-scroll to latest messages
✅ Search conversations
✅ Online status indicators
✅ Message timestamps
✅ Avatar integration
✅ Responsive design

## Next Steps

After setting up the database:
1. Users can start conversations from the Messages page
2. Real-time messaging will work automatically
3. All messages are persisted in Supabase
4. Users can search and manage their conversations

---

**Note**: The app will automatically create conversations when users try to message each other. No manual conversation creation is needed.

