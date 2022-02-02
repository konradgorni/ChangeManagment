import { updateEventScheduleRow } from '../../../utils/updateEventScheduleRow';

export const updateEventSchedule = async (updateDate: any, id: number) => {
  const { data, error } = await updateEventScheduleRow('schedule', updateDate, {
    columnTitle: 'id',
    columnValue: id,
  });
  if (data !== null) {
    console.log('TODOSTAJEPO UPDATE', data);
  }
};
