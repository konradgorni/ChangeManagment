import { supabase } from '../supabase/client';
// TODO: typy
export async function sendDataToDataBase(table: string, data: unknown) {
  await supabase.from(table).insert([data]).single();
}
