import { supabase } from '../supabase/client';

export async function sendDataToDataBase(table: string, dataToSend: unknown) {
  const { error, data } = await supabase
    .from(table)
    .insert([dataToSend])
    .single();
  return { error };
}
