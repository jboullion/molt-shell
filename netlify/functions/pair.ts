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
    const { pairing_code, agent_name } = JSON.parse(event.body || '{}');

    if (!pairing_code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'pairing_code required' })
      };
    }

    // Find session by pairing code
    const { data: session, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('pairing_code', pairing_code)
      .single();

    if (error || !session) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Invalid pairing code' })
      };
    }

    // Update session with agent info
    await supabase
      .from('sessions')
      .update({ 
        agent_name,
        agent_connected: true,
        last_activity: new Date().toISOString()
      })
      .eq('id', session.id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        session_id: session.id
      })
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
