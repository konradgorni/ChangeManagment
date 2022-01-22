import { Dispatch, SetStateAction } from 'react';
import { fetchDataFromDataBase } from '../../utils/fetchDataFromDataBase';
import { IEvents, IworkersList, IworkPlaceList } from './typesManagerBoard';

export const fetchEvents = (setEvents: Dispatch<SetStateAction<IEvents[]>>) => {
  fetchDataFromDataBase(
    'schedule',
    'workPlace,startDate,endDate,id,Name,Surname',
  ).then(({ data, error }) => {
    if (data !== null) {
      const newArray = data.map(
        (el: {
          Name: string;
          Surname: string;
          endDate: any;
          id: number;
          startDate: any;
          workPlace: string;
        }) => {
          const obj = {
            title: `${el.workPlace} - ${el.Name}${el.Surname}`,
            id: el.id,
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
  });
};
export type fetchWorkPlacesType = IworkPlaceList[] | undefined;
export const fetchWorkPlaces = (
  setWorkPlaceList: Dispatch<SetStateAction<fetchWorkPlacesType>>,
) => {
  fetchDataFromDataBase('workPlaces', 'workPlace').then(({ data, error }) => {
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
  });
};

export const workersListFetch = (
  setWorkersList: Dispatch<SetStateAction<IworkersList[]>>,
) => {
  fetchDataFromDataBase('users', 'userId,Name,Surname').then(
    ({ data, error }) => {
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
    },
  );
};
