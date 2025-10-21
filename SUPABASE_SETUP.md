# Supabase Setup Guide for Peerly

## Step 1: Set Up Database Tables

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project: `kulufuxzrzzgwlaxjvqu`
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `supabase-schema.sql` file
6. Paste it into the SQL editor
7. Click **Run** (or press Ctrl+Enter)

This will create all the necessary tables, indexes, and Row Level Security policies.

## Step 2: Configure Email Authentication

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Enable **Email** provider if not already enabled
3. Configure email templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize the confirmation email, magic link, etc.

## Step 3: Disable Email Confirmation (Optional - For Testing)

For easier testing during development, you can disable email confirmation:

1. Go to **Authentication** → **Settings**
2. Scroll to **Email Auth**
3. Toggle off **Enable email confirmations**
4. Click **Save**

⚠️ **Note:** Re-enable this in production for security!

## Step 4: Test Sign Up

1. Make sure your dev server is running: `npm run dev`
2. Open http://localhost:5173
3. Click **Login** or **Get Started**
4. Click **Create New Account**
5. Fill in the form with:
   - **Email:** Use a college email (e.g., yourname@stanford.edu, yourname@mit.edu, etc.)
   - **Password:** At least 6 characters
   - **Full Name:** Your name
   - **College:** Your college name
   - **Course:** Your course (e.g., Computer Science)
   - **Year:** Your current year
   - **Graduation Year:** Future year
6. Click **Sign Up**

## Step 5: Verify in Supabase

After signing up, verify the data was created:

1. Go to **Table Editor** in Supabase dashboard
2. Check **auth.users** table - you should see your account
3. Check **public.users** table - you should see your profile data

## Demo Accounts (Hardcoded for Testing)

You can also use these pre-configured demo accounts without creating database entries:

### Regular User
- Email: `john.student@stanford.edu`
- Password: `demo123`

### Pro User
- Email: `sarah.chen@mit.edu`
- Password: `pro123`

## Troubleshooting

### Sign Up Not Working?
- Check browser console for errors (F12)
- Verify your email domain is allowed (.edu, .ac.in, etc.)
- Make sure email confirmation is disabled or check your email

### Database Connection Issues?
- Verify `.env` file has correct credentials
- Restart dev server after changing `.env`
- Check Supabase dashboard for API status

### Tables Not Created?
- Make sure you ran the entire SQL script
- Check for errors in SQL Editor after running
- Verify you have proper permissions

## Production Checklist

Before deploying to production:

- [ ] Re-enable email confirmations
- [ ] Review and tighten RLS policies if needed
- [ ] Set up email templates
- [ ] Configure custom SMTP (optional)
- [ ] Set up proper error tracking
- [ ] Add rate limiting
- [ ] Review security settings

