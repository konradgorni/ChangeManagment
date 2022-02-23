import { Dispatch, SetStateAction } from 'react';
import { ToolbarProps } from 'react-big-calendar';
import { IReactSelectData } from '../../utils/globalTypes';
import { EmptyObject } from '../../store/slice/AuthSlice';

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

// ConfirmDeleteEvent props interface
export interface ConfirmDeleteEventProps {
  currentIdEvent: number | undefined;
  setShowConfirmDeleteModal: Dispatch<SetStateAction<boolean>>;
  fetchData: () => void;
}
// CalendarCardEvent props interface

export interface CalendarCardEventProps {
  setShowConfirmDeleteModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  setShowEditScheduleModal: Dispatch<SetStateAction<boolean>>;
  setCurrentEditEventData: Dispatch<SetStateAction<IEventData | EmptyObject>>;
  event: IEventData;
}
// CustomToolbar props interface

export interface CustomToolbarProps {
  props: ToolbarProps;
  setsShowAddToScheduleModal: Dispatch<SetStateAction<boolean>>;
  setShowUsersScheduleInfo: Dispatch<SetStateAction<boolean>>;
  setCurrentDateView: Dispatch<SetStateAction<Date>>;
}
// EditScheduleEventModal interfaces

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
