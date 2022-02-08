import { supabase } from '../supabase/client';

export interface eqObject {
  columnTitle: string;
  columnValue?: string | number;
}

export async function updateRowDataBase(
  table: string,
  updateDate: any,
  eq: eqObject = { columnTitle: '', columnValue: '' },
) {
  const { error, data } = await supabase
    .from(table)
    .update(updateDate)
    .eq(eq.columnTitle, eq.columnValue);
  return { error, data };
}
