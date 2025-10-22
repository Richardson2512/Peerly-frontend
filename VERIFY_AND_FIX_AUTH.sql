-- ============================================
-- Verify and Fix Authentication Issues
-- ============================================
-- Run these queries in Supabase SQL Editor to diagnose and fix auth problems
-- ============================================

-- STEP 1: Check if RLS is enabled on users table
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'users';
-- Expected: rowsecurity = true

-- STEP 2: Check if RLS policies exist for users table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'users';
-- Expected: At least 3 policies (view all, update own, insert own)

-- STEP 3: Find all authenticated users from auth.users
SELECT id, email, created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;
-- Copy the ID of your account

-- STEP 4: Check if these users exist in public.users table
-- Replace 'YOUR-AUTH-USER-ID' with the ID from step 3
SELECT id, name, email, college, course 
FROM public.users 
WHERE id = 'YOUR-AUTH-USER-ID';
-- If this returns no rows, the user profile doesn't exist!

-- STEP 5: If user doesn't exist in public.users, create it manually
-- Replace all values with your actual data and auth user ID
INSERT INTO public.users (
  id, 
  name, 
  email, 
  college, 
  course, 
  course_duration, 
  course_level, 
  year, 
  graduation_date, 
  skills, 
  interests, 
  is_pro, 
  is_account_active
) VALUES (
  'YOUR-AUTH-USER-ID',  -- From step 3
  'Your Full Name',
  'your.email@college.edu',  -- Same as auth email
  'Your College Name',
  'Your Course Name',
  4,  -- Course duration in years
  'undergraduate',  -- or 'diploma', 'postgraduate', 'phd'
  '3',  -- Current year
  '2026-06-01',  -- Graduation date
  ARRAY['Skill1', 'Skill2', 'Skill3'],
  ARRAY['Interest1', 'Interest2'],
  false,  -- is_pro
  true  -- is_account_active
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  college = EXCLUDED.college,
  course = EXCLUDED.course,
  course_level = EXCLUDED.course_level,
  year = EXCLUDED.year,
  graduation_date = EXCLUDED.graduation_date;

-- STEP 6: Verify the fix worked
SELECT id, name, email, college, course, course_level, year 
FROM public.users 
WHERE id = 'YOUR-AUTH-USER-ID';
-- Should now show your correct data

-- STEP 7: Test RLS policy (run as authenticated user)
-- This tests if the RLS policy allows reading
SET ROLE authenticated;
SELECT id, name, college, course 
FROM public.users 
LIMIT 5;
-- Should return users without error
RESET ROLE;

-- ============================================
-- If RLS policies are missing, run these:
-- ============================================

-- Re-create RLS policies (just to be safe)
DROP POLICY IF EXISTS "Users can view all profiles" ON public.users;
CREATE POLICY "Users can view all profiles" ON public.users
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- Final Verification
-- ============================================

-- Run this to see all users in the database
SELECT id, name, email, college, course, created_at 
FROM public.users 
ORDER BY created_at DESC;

