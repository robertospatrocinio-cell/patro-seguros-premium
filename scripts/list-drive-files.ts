import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const API_KEY = Deno.env.get('GOOGLE_DRIVE_API_KEY');

async function listFiles() {
  if (!API_KEY) {
    console.error('GOOGLE_DRIVE_API_KEY is not set');
    return;
  }

  try {
    const response = await fetch(
      'https://www.googleapis.com/drive/v3/files?pageSize=20&fields=nextPageToken,files(id,name,mimeType,parents,createdTime)',
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const data = await response.json();
    if (data.error) {
      console.error('Google Drive API Error:', data.error);
      return;
    }

    console.log('Files found:', JSON.stringify(data.files, null, 2));
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

listFiles();
