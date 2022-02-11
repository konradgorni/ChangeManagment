import { supabase } from '../supabase/client';
import { eqObject } from './fetchDataFromDataBase';

export async function deleteElementFromDataBase(
  table: string,
  eq: eqObject = { columnTitle: '', columnValue: '' },
) {
  if (eq.columnValue === '') return;
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq(eq.columnTitle, eq.columnValue);
  return { data, error };
}
