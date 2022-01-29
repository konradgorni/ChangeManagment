import { Dispatch, SetStateAction } from 'react';
import { fetchDataFromDataBase } from '../../utils/fetchDataFromDataBase';
import { IEvents, IworkersList, IworkPlaceList } from './typesManagerBoard';
import { updateEventScheduleRow } from '../../utils/updateEventScheduleRow';

export const fetchEvents = async (
  setEvents: Dispatch<SetStateAction<IEvents[]>>,
) => {
  const { data, error } = await fetchDataFromDataBase(
    'schedule',
    'workPlace,startDate,endDate,id,Name,Surname,userId',
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
};

export type fetchWorkPlacesType = IworkPlaceList[] | undefined;

export const fetchWorkPlaces = async (
  setWorkPlaceList: Dispatch<SetStateAction<fetchWorkPlacesType>>,
) => {
  const { data, error } = await fetchDataFromDataBase(
    'workPlaces',
    'workPlace',
  );
  if (data !== null) {
    const workPlacesOptions = data.map(({ workPlace }) => {
      const object = {
        value: workPlace,
        label: `${workPlace}`,
      };
      return object;
    });
    setWorkPlaceList(workPlacesOptions);
  }
};

export const workersListFetch = async (
  setWorkersList: Dispatch<SetStateAction<IworkersList[]>>,
) => {
  const { data, error } = await fetchDataFromDataBase(
    'users',
    'userId,Name,Surname',
  );
  if (data !== null) {
    const newArray = data.map((el: any) => {
      const obj = {
        value: {
          userId: el.userId,
          Name: el.Name,
          Surname: el.Surname,
        },
        label: `${el.Name} ${el.Surname}`,
      };
      return obj;
    });
    setWorkersList(newArray);
  }
};
export const updateEventSchedule = async (updateDate: any, id: number) => {
  const { data, error } = await updateEventScheduleRow('schedule', updateDate, {
    columnTitle: 'id',
    columnValue: id,
  });
  if (data !== null) {
    console.log('TODOSTAJEPO UPDATE', data);
  }
};
