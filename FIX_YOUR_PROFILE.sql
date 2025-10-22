-- ============================================
-- Fix Your Profile - Ready to Run
-- ============================================
-- This script will fix the "Unknown College" and "Unknown Course" issue
-- ============================================

-- First, let's see what's currently in your profile
SELECT id, name, email, college, course, course_level, year, created_at
FROM public.users 
WHERE id = 'd551ce05-ccd5-4111-a0fa-6ebfe2d04fbd';

-- Now let's update it with your correct information
-- REPLACE THE VALUES BELOW WITH YOUR ACTUAL DATA:

UPDATE public.users
SET 
  name = 'Richardson',  -- ← CHANGE THIS to your real name
  college = 'Stanford University',  -- ← CHANGE THIS to your college
  course = 'Computer Science',  -- ← CHANGE THIS to your course
  course_level = 'undergraduate',  -- ← CHANGE THIS if needed (diploma/undergraduate/postgraduate/phd)
  year = '3',  -- ← CHANGE THIS to your current year
  course_duration = 4,  -- ← CHANGE THIS to your total course duration
  graduation_date = '2026-06-01',  -- ← CHANGE THIS to your expected graduation
  skills = ARRAY['React', 'TypeScript', 'Node.js', 'Python'],  -- ← CHANGE THIS to your skills
  interests = ARRAY['Web Development', 'AI', 'Startups'],  -- ← CHANGE THIS to your interests
  bio = 'Passionate about building innovative web applications',  -- ← CHANGE THIS to your bio
  location = 'Palo Alto, CA'  -- ← CHANGE THIS to your location
WHERE id = 'd551ce05-ccd5-4111-a0fa-6ebfe2d04fbd';

-- Verify the update worked
SELECT id, name, email, college, course, course_level, year, bio, location
FROM public.users 
WHERE id = 'd551ce05-ccd5-4111-a0fa-6ebfe2d04fbd';

-- ============================================
-- After running this:
-- 1. Log out of the app
-- 2. Log back in
-- 3. Your profile will show correctly!
-- ============================================

