import { Dispatch, SetStateAction } from 'react';
import { fetchDataFromDataBase } from '../../../utils/fetchDataFromDataBase';
import { IworkersList } from '../typesManagerBoard';

export const workersListFetch = async (
  setWorkersList: Dispatch<SetStateAction<IworkersList[]>>,
) => {
  const { data, error } = await fetchDataFromDataBase(
    'users',
    'userId,Name,Surname',
  );
  if (data !== null) {
    const newArray = data.map(
      (el: { Name: string; Surname: string; userId: string }) => {
        const obj = {
          value: {
            userId: el.userId,
            Name: el.Name,
            Surname: el.Surname,
          },
          label: `${el.Name} ${el.Surname}`,
        };
        return obj;
      },
    );
    setWorkersList(newArray);
  }
  return { error };
};
