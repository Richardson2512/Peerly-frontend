# Fix Supabase Signup 400 Error

## The Issue
You're getting a 400 error when trying to sign up. This is because Supabase has **email confirmation** enabled by default, which requires additional configuration.

## ✅ Quick Fix (Recommended for Development)

### Disable Email Confirmation in Supabase

1. **Go to Supabase Dashboard:**
   - Visit: https://app.supabase.com/project/kulufuxzrzzgwlaxjvqu/auth/settings

2. **Disable Email Confirmation:**
   - Scroll down to **Email Auth** section
   - Find **"Enable email confirmations"**
   - **Toggle it OFF** (disable it)
   - Click **Save**

3. **Test Signup:**
   - Refresh your app: http://localhost:5173
   - Try signing up with a college email (e.g., yourname@stanford.edu)
   - Password must be at least 6 characters
   - You should now be able to sign up immediately!

## 🔍 What Was Fixed in the Code

I've improved the signup flow to:
1. ✅ Validate password length (minimum 6 characters)
2. ✅ Better error messages with console logging
3. ✅ Handle email confirmation scenario properly
4. ✅ Show helpful password hint during signup
5. ✅ Gracefully handle database errors

## 🧪 Testing Your Signup

After disabling email confirmation, try this:

### Test Account Details:
- **Email:** yourname@stanford.edu (or any .edu/.ac.in email)
- **Password:** test1234 (at least 6 characters)
- **Name:** Your Name
- **College:** Start typing "IIT" or "Delhi" to see autocomplete
- **Course:** Start typing "Computer" to see options
- **Course Level:** Select Diploma/Undergraduate/Postgraduate/PhD
- **Current Year:** Select your year
- **Graduation Year:** Select future year

## 🚨 Common Signup Errors & Solutions

### 1. "Password must be at least 6 characters"
**Solution:** Use a password with 6+ characters

### 2. "Please use your college email"
**Solution:** Use email ending with .edu, .ac.in, .ac.uk, etc.
Don't use Gmail, Outlook, Yahoo, or Hotmail

### 3. "Check your email to confirm"
**Solution:** Disable email confirmation in Supabase (see above)

### 4. "Account created but failed to save profile"
**Solution:** Make sure you ran the database schema (supabase-schema.sql)

## 📧 Email Confirmation Setup (Optional - For Production)

If you want to enable email confirmation later:

1. **Configure SMTP in Supabase:**
   - Go to Settings → Email
   - Add your SMTP credentials (SendGrid, Mailgun, etc.)

2. **Customize Email Templates:**
   - Go to Auth → Email Templates
   - Customize the confirmation email

3. **Re-enable Email Confirmations:**
   - Go to Auth → Settings
   - Toggle ON "Enable email confirmations"

## ✅ Success Indicators

When signup works correctly, you should see:
1. ✅ No errors in browser console
2. ✅ Redirect to dashboard
3. ✅ Your profile data displayed
4. ✅ Console shows: "App Mode: PRODUCTION (Supabase Connected)"

## 🆘 Still Having Issues?

Check browser console (F12) for detailed error messages and let me know what you see!

