import { Dispatch, SetStateAction } from 'react';
import { eqObject, fetchDataFromDataBase } from './fetchDataFromDataBase';
import { IEvents } from '../Pages/ManagerBoard/typesManagerBoard';
// TODO Check types after added to object name and surname
export const fetchEventsSchedule = async (
  setEvents: Dispatch<SetStateAction<IEvents[]>>,
  eq?: eqObject,
) => {
  const { data, error } = await fetchDataFromDataBase(
    'schedule',
    'workPlace,startDate,endDate,id,Name,Surname,userId',
    eq,
  );
  if (data !== null) {
    const newArray = data.map(
      (el: {
        Name: string;
        Surname: string;
        endDate: any;
        id: number;
        startDate: any;
        workPlace: string;
        userId: string;
      }) => {
        const obj = {
          title: `${el.workPlace} - ${el.Name}${el.Surname}`,
          Name: el.Name,
          Surname: el.Surname,
          workPlace: el.workPlace,
          id: el.id,
          userId: el.userId,
          start: new Date(
            el.startDate.year,
            el.startDate.month - 1,
            el.startDate.date,
            el.startDate.hours,
            el.startDate.minutes,
          ),
          end: new Date(
            el.endDate.year,
            el.endDate.month - 1,
            el.endDate.date,
            el.endDate.hours,
            el.endDate.minutes,
          ),
        };
        return obj;
      },
    );
    setEvents(newArray);
  }
  return { error };
};
