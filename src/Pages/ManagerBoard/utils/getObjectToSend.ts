import moment from 'moment';
import { IEvents } from '../typesManagerBoard';

export const getObjectToSend = (
  data: Date | null | undefined,
  events: IEvents[] = [],
) => {
  const time = moment(data).format('DD-MM-YYYY HH:mm');
  return {
    year: time.slice(6, 10),
    month: time.slice(3, 5),
    date: time.slice(0, 2),
    events,
  };
};
