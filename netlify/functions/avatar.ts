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
    const { session_id, head, body, hands } = JSON.parse(event.body || '{}');

    if (!session_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'session_id required' })
      };
    }

    // Check if avatar exists
    const { data: existing } = await supabase
      .from('avatars')
      .select('id')
      .eq('session_id', session_id)
      .single();

    let result;

    if (existing) {
      // Update existing avatar
      result = await supabase
        .from('avatars')
        .update({ head, body, hands, updated_at: new Date().toISOString() })
        .eq('session_id', session_id)
        .select()
        .single();
    } else {
      // Create new avatar
      result = await supabase
        .from('avatars')
        .insert({ session_id, head, body, hands })
        .select()
        .single();
    }

    if (result.error) throw result.error;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        avatar: result.data
      })
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
