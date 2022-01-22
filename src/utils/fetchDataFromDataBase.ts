import { supabase } from '../supabase/client';

interface eqObject {
  columnTitle: string;
  columnValue: string | undefined;
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
