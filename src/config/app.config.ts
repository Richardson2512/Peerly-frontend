// App configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseAnonKey !== 'placeholder-anon-key-for-development' &&
  supabaseAnonKey !== 'placeholder-key';

export const appConfig = {
  // Use mock/local mode when Supabase is not properly configured
  useMockMode: !isSupabaseConfigured,
  supabase: {
    url: supabaseUrl || 'https://placeholder.supabase.co',
    anonKey: supabaseAnonKey || 'placeholder-key',
    isConfigured: isSupabaseConfigured
  }
};

console.log('App Mode:', appConfig.useMockMode ? 'LOCAL/MOCK (No Supabase)' : 'PRODUCTION (Supabase Connected)');

