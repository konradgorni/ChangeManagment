import { Dispatch, SetStateAction } from 'react';
import { IReactSelectData } from '../../utils/globalTypes';

export interface IworkersListValueObject {
  Name: string;
  Surname: string;
  userId: string;
}

export interface IworkersList {
  label: string;
  value: IworkersListValueObject;
}

export interface IselectedWorker {
  Name: string;
  Surname: string;
  userId: string;
}
export interface IdataPickerDataObj {
  hours?: string;
  minutes?: string;
  month: string;
  date: string;
  year: string;
}
export interface IdataPickerData {
  endObj: IdataPickerDataObj;
  startObj: IdataPickerDataObj;
}

export interface IEvents {
  title: string;
  id: number;
  start: Date;
  end: Date;
  userId: string;
  workPlace: string;
  Name: string;
  Surname: string;
}
export interface IEventData {
  title: string;
  workPlace: string;
  id: number;
  userId: string;
  start: Date;
  end: Date;
}
export enum DataPickerTypeEnum {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

export type fetchWorkPlacesType = IReactSelectData[] | undefined;

// AddToScheduleModal interfaces

export interface AddToScheduleModalProps {
  workersList: IworkersList[];
  workPlaceList?: IReactSelectData[];
  fetchData: () => void;
  setsShowAddToScheduleModal: Dispatch<SetStateAction<boolean>>;
}
export interface IFormDataAddToScheduleModal {
  selectedWorker: IworkersList;
  selectedWorkPlace: IReactSelectData | undefined;
}
