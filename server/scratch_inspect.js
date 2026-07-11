import { supabase } from './db.js';

async function test() {
  try {
    const { data, error } = await supabase.from('portfolios').select('*').limit(1);
    if (error) {
      console.error('Supabase fetch error:', error);
    } else {
      console.log('Supabase portfolios sample data:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

test();
