import { supabase } from '../supabase/client';

// TODO: typy

export interface eqObject {
  columnTitle: string;
  columnValue: string | undefined | number;
}
export async function fetchDataFromDataBase(
  table: any,
  select: any,
  eq: eqObject = { columnTitle: '', columnValue: '' },
) {
  const { error, data } = await supabase
    .from(table)
    .select(select)
    .eq(eq.columnTitle, eq.columnValue);
  return { error, data };
}
