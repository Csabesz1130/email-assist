import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL';
const supabaseKey = 'YOUR_SUPABASE_PROJECT_API_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function storeEventDetails(eventDetails) {
  try {
    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title: eventDetails.title,
          date: eventDetails.date,
          time: eventDetails.time,
          location: eventDetails.location,
          attendees: JSON.stringify(eventDetails.attendees),
          notes: eventDetails.notes,
        },
      ]);

    if (error) {
      console.error('Error storing event details:', error);
      throw error;
    }

    console.log('Event details stored successfully:', data);
  } catch (error) {
    console.error('Error in storeEventDetails:', error);
    throw error;
  }
}