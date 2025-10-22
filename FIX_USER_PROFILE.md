# Fix User Profile - Quick Guide

## Issue
Your user profile shows "Unknown Course" and "Unknown College" because the profile was auto-created with placeholder data when you tried to create a post.

## Quick Fix - Run This SQL in Supabase

### Step 1: Find Your User ID
Go to Supabase Dashboard → Authentication → Users
Copy your user's UUID (e.g., `d551ce05-ccd5-4111-a0fa-6ebfe2d04fbd`)

### Step 2: Update Your Profile
Run this in Supabase SQL Editor (replace with your actual data):

```sql
UPDATE public.users
SET 
  name = 'Your Full Name',
  college = 'Your College Name',
  course = 'Your Course Name',
  course_level = 'undergraduate',  -- or 'diploma', 'postgraduate', 'phd'
  year = '3',  -- Your current year
  course_duration = 4,  -- Total duration in years
  graduation_date = '2026-06-01',  -- Your expected graduation date
  skills = ARRAY['Skill1', 'Skill2', 'Skill3'],  -- Your skills
  interests = ARRAY['Interest1', 'Interest2'],  -- Your interests
  bio = 'Your bio here',  -- Optional
  location = 'City, State'  -- Optional
WHERE id = 'YOUR-USER-ID-HERE';  -- Replace with your actual UUID
```

### Step 3: Verify Update
```sql
SELECT name, college, course, year 
FROM public.users 
WHERE id = 'YOUR-USER-ID-HERE';
```

### Step 4: Refresh the App
- Log out and log back in
- Or just refresh the page
- Your profile should now show correctly!

## Example Update Query

```sql
UPDATE public.users
SET 
  name = 'Richardson',
  college = 'Stanford University',
  course = 'Computer Science',
  course_level = 'undergraduate',
  year = '3',
  course_duration = 4,
  graduation_date = '2026-06-01',
  skills = ARRAY['React', 'TypeScript', 'Node.js', 'Python'],
  interests = ARRAY['Web Development', 'AI', 'Startups'],
  bio = 'Passionate about building innovative web applications',
  location = 'Palo Alto, CA'
WHERE id = 'd551ce05-ccd5-4111-a0fa-6ebfe2d04fbd';
```

## Long-term Solution

The Settings page will be updated to allow profile editing through the UI. For now, use the SQL query above to fix your profile.

---

**Note**: Make sure to use single quotes for text values and replace the UUID with your actual user ID from Supabase Authentication.

