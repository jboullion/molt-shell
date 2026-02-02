import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const session_id = event.queryStringParameters?.session_id;

    if (!session_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'session_id required' })
      };
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', session_id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify(data || [])
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
