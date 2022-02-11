import { Dispatch, SetStateAction } from 'react';
import { fetchDataFromDataBase } from '../../../utils/fetchDataFromDataBase';
import { fetchWorkPlacesType } from '../typesManagerBoard';

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
  return { error };
};
