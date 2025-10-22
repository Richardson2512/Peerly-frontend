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
  // Use mock mode only when Supabase is not configured at all
  useMockMode: !isSupabaseConfigured,
  // Force production mode for database and storage
  useProductionDatabase: true,
  useProductionStorage: true,
  supabase: {
    url: supabaseUrl || 'https://kulufuxzrzzgwlaxjvqu.supabase.co',
    anonKey: supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1bHVmdXh6cnp6Z3dsYXhqdnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxODQ3OTUsImV4cCI6MjA3NDc2MDc5NX0.WyWOGEGyUZwA8LisN5ZxERerePx67WpRxw-8inrDHQk',
    isConfigured: isSupabaseConfigured
  }
};

console.log('App Mode:', appConfig.useMockMode ? 'LOCAL/MOCK (No Supabase)' : 'PRODUCTION (Supabase Connected)');
console.log('Database Mode:', appConfig.useProductionDatabase ? 'SUPABASE' : 'LOCAL');
console.log('Storage Mode:', appConfig.useProductionStorage ? 'SUPABASE' : 'LOCAL');

