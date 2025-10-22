-- ============================================
-- Delete All Users - Clean Slate
-- ============================================
-- This will delete all users from both auth and public tables
-- USE WITH CAUTION - This deletes ALL user data!
-- ============================================

-- STEP 1: Delete all users from public.users table
DELETE FROM public.users;

-- STEP 2: Delete all users from auth.users table
-- This also removes their authentication
DELETE FROM auth.users;

-- STEP 3: Verify everything is deleted
SELECT COUNT(*) as remaining_public_users FROM public.users;
SELECT COUNT(*) as remaining_auth_users FROM auth.users;
-- Both should show 0

-- ============================================
-- After running this:
-- 1. All old accounts are gone
-- 2. You can now create fresh new accounts
-- 3. Sign up through the app UI
-- 4. Everything will work perfectly!
-- ============================================

-- STEP 4: (OPTIONAL) Also clean up related data
DELETE FROM public.posts;
DELETE FROM public.messages;
DELETE FROM public.conversations;
DELETE FROM public.connections;
DELETE FROM public.badges;
DELETE FROM public.notifications;

-- Verify all cleaned
SELECT 
  (SELECT COUNT(*) FROM public.users) as users,
  (SELECT COUNT(*) FROM public.posts) as posts,
  (SELECT COUNT(*) FROM public.messages) as messages,
  (SELECT COUNT(*) FROM public.conversations) as conversations,
  (SELECT COUNT(*) FROM public.connections) as connections,
  (SELECT COUNT(*) FROM public.badges) as badges,
  (SELECT COUNT(*) FROM public.notifications) as notifications;
-- All should be 0

-- ============================================
-- NOW YOU'RE READY FOR A FRESH START!
-- Go to the app and sign up with your real information
-- ============================================

