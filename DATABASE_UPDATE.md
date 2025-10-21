# Database Update Required

## What Changed?
- Added "Diploma" as a new course level option
- Added autocomplete for colleges and courses with custom entry support

## Quick Database Update

Since you already have the database tables created, you only need to update the `course_level` constraint to include 'diploma'.

### Option 1: Re-run the Full Schema (Recommended for Fresh Setup)
If you haven't added any important data yet:

1. Go to Supabase SQL Editor
2. Copy the entire `supabase-schema.sql` file
3. Run it (this will drop and recreate tables with the new constraint)

### Option 2: Update Only the Constraint (Keep Existing Data)
If you want to keep existing data:

Run this SQL command in Supabase SQL Editor:

```sql
-- Drop the old constraint
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_course_level_check;

-- Add the new constraint with diploma included
ALTER TABLE public.users ADD CONSTRAINT users_course_level_check 
  CHECK (course_level IN ('diploma', 'undergraduate', 'postgraduate', 'phd'));
```

## That's it!
After updating the database, refresh your browser and test the sign-up form.

## New Features Available:
1. ✅ **Autocomplete for Colleges** - Type to search 100+ Indian colleges
2. ✅ **Autocomplete for Courses** - Type to search 140+ courses/programs
3. ✅ **Custom Entry** - If not found, your custom entry will be saved
4. ✅ **Diploma Option** - Now available in course level dropdown
5. ✅ **Keyboard Navigation** - Use arrow keys to navigate suggestions

