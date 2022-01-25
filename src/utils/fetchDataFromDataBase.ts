import { supabase } from '../supabase/client';

export interface eqObject {
  columnTitle: string;
  columnValue?: string | number;
}

// const isNumber = (arg: string | number): arg is number => {
//   return typeof arg === 'number';
// };

export async function fetchDataFromDataBase(
  table: string,
  select: string,
  eq: eqObject = { columnTitle: '', columnValue: '' },
) {
  const { error, data } = await supabase
    .from(table)
    .select(select)
    .eq(eq.columnTitle, eq.columnValue);
  return { error, data };
}
