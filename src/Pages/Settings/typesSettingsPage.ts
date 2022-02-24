import { IReactSelectData } from '../../utils/globalTypes';

export interface IupdateData {
  workPlaceElementRename?: string;
  workPlaceName?: IReactSelectData;
}
export interface AddNewWorkPlaceProps {
  WorkPlacesListFetch: () => void;
}
export interface AddManagerProps {
  ManagerListFetch: () => void;
  userList: IReactSelectData[];
}
export interface DeleteManagerProps {
  managerList: IReactSelectData[];
  ManagerListFetch: () => void;
}
export interface IModifyWorkPlacesListProps {
  workPlaceList: IReactSelectData[] | undefined;
  WorkPlacesListFetch: () => void;
}
