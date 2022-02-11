import { Dispatch, SetStateAction } from 'react';
import { IEventData, IworkersList } from '../../typesManagerBoard';
import { IReactSelectData } from '../../../../utils/globalTypes';
import { EmptyObject } from '../../../../store/slice/AuthSlice';

export interface IEditData {
  e?: Date;
  s?: Date;
  timeEnd?: string;
  timeStart?: string;
}

export interface EditScheduleEventModalProps {
  workersList: IworkersList[];
  workPlaceList?: IReactSelectData[];
  setShowEditScheduleModal: Dispatch<SetStateAction<boolean>>;
  currentEditEventData: IEventData | EmptyObject;
  fetchData: () => void;
}
