import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SUPABASE_URL, SUPABASE_KEY } from '@env';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Load the session from AsyncStorage.
const loadSession = async () => {
  const session = await AsyncStorage.getItem('supabase-session');
  if (session) {
    supabase.auth.setSession(JSON.parse(session));
  }
};

// Save the session to AsyncStorage whenever it changes.
supabase.auth.onAuthStateChange(async (event, session) => {
  await AsyncStorage.setItem('supabase-session', JSON.stringify(session));
});

loadSession();

export default supabase;
