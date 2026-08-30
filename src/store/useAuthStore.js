import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set) => ({
  session: null,
  user: null,
  role: null,
  loading: true,

  initialize: async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      
      if (session) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (error) console.error("Error fetching profile:", error);
        
        const emailRole = session.user.email === 'hackerfromrussia111@gmail.com' ? 'admin' : 'user';
        set({ session, user: session.user, role: profile?.role || emailRole, loading: false });
      } else {
        set({ session: null, user: null, role: null, loading: false });
      }
    } catch (err) {
      console.error("Error during auth initialization:", err);
      set({ session: null, user: null, role: null, loading: false });
    }

    try {
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          const emailRole = session.user.email === 'hackerfromrussia111@gmail.com' ? 'admin' : 'user';
          set({ session, user: session.user, role: profile?.role || emailRole, loading: false });
        } else {
          set({ session: null, user: null, role: null, loading: false });
        }
      });
    } catch (err) {
      console.error("Error setting up auth listener:", err);
    }
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  },

  signUp: async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}));
