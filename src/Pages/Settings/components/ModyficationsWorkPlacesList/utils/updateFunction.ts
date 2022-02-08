import { IReactSelectData } from '../../../../../utils/globalTypes';
import { updateRowDataBase } from '../../../../../utils/updateRowDataBase';

export const updateFunction = async (
  workPlaceElementRename: string | undefined,
  workPlaceName: IReactSelectData | undefined,
) => {
  const { data, error } = await updateRowDataBase(
    'workPlaces',
    { workPlace: workPlaceElementRename },
    { columnTitle: 'workPlace', columnValue: workPlaceName?.value },
  );

  return { data, error };
};
