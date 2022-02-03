import { updateEventScheduleRow } from '../../../utils/updateEventScheduleRow';
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
  const { data, error } = await updateEventScheduleRow('schedule', updateDate, {
    columnTitle: 'id',
    columnValue: id,
  });
  if (data !== null) {
    console.log('TODOSTAJEPO UPDATE', data);
  }
};
