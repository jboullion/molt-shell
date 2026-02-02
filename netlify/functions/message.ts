import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { session_id, sender, text } = JSON.parse(event.body || '{}');

    if (!session_id || !sender || !text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'session_id, sender, and text required' })
      };
    }

    const { data, error } = await supabase
      .from('messages')
      .insert({ session_id, sender, text })
      .select()
      .single();

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: data
      })
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
