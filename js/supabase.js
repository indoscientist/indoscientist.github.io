import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Ganti dua nilai ini dari Supabase Project Settings > API.
export const supabaseUrl = 'https://ezsdpkngbwnmtuldohtq.supabase.co';
export const supabaseAnonKey = 'sb_publishable_mIQwFgnpPCYGM_tkcJiruw_r1pYBL9X';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
