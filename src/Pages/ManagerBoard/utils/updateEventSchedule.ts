import { updateRowDataBase } from '../../../utils/updateRowDataBase';
import { IdataPickerDataObj } from '../typesManagerBoard';

interface IUpdateDate {
  Name?: string;
  Surname?: string;
  endDate?: IdataPickerDataObj;
  id?: number;
  startDate?: IdataPickerDataObj;
  userId?: string;
  workPlace?: string;
}
export const updateEventSchedule = async (
  updateDate: IUpdateDate,
  id: number,
) => {
  const { data, error } = await updateRowDataBase('schedule', updateDate, {
    columnTitle: 'id',
    columnValue: id,
  });
  if (data !== null) {
    console.log('TODOSTAJEPO UPDATE', data);
  }
};
