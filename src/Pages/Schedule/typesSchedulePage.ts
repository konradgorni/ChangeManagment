import { Dispatch, SetStateAction } from 'react';
import { DateHeaderProps, ToolbarProps } from 'react-big-calendar';
import { IEvents } from '../ManagerBoard/typesManagerBoard';

// SchedulePage interfaces

export interface IDataToFindSchedulePage {
  name: string;
  surname: string;
  workPlace: string;
  id: number;
  date: string;
  month: string;
  year: string;
  start: { hours: string; minutes: string };
  end: { hours: string; minutes: string };
}
export interface IEventSchedulePage {
  title: string;
  id: number;
  start: Date;
  end: Date;
  workPlace: string;
  Name: string;
  Surname: string;
}

// CoworkersModal interfaces

export interface CoworkersModalProps {
  dataToFindCoWorkers: IDataToFindSchedulePage | undefined;
  allEvents: IEvents[];
  setShowCoWorkersModal: Dispatch<SetStateAction<boolean>>;
}

export interface ICoworkersList {
  date: string;
  end: { hours: string; minutes: string };
  start: { hours: string; minutes: string };
  id: number;
  month: string;
  name: string;
  surname: string;
  title: string;
  workPlace: string;
  year: string;
}

// CustomDateHeaderDay props interface

export interface CustomDateHeaderDayProps {
  props: DateHeaderProps;
  setShowSelectModal: Dispatch<SetStateAction<boolean>>;
  setSelectModalData: Dispatch<SetStateAction<DateHeaderProps | null>>;
}

// CustomToolbarSchedule props interface
export interface CustomToolbarScheduleProps {
  props: ToolbarProps;
}
// OnSelectModal interfaces
export interface IFormDataOnSelectModal {
  startTimeRange: string;
  endTimeRange: string;
}
export interface OnSelectModalProps {
  dataObj: DateHeaderProps | null;
  setShowSelectModal: Dispatch<SetStateAction<boolean>>;
  user: any;
}

// WrapperCustomEvent interfaces

export interface IEventWrapperCustomEvent {
  title: string;
  id: number;
  start: Date;
  end: Date;
  workPlace: string;
  Name: string;
  Surname: string;
}

export interface WrapperCustomEventProps {
  event: IEventWrapperCustomEvent;
  setShowCoWorkersModal: Dispatch<SetStateAction<boolean>>;
  setDataToFindCoWorkers: Dispatch<
    SetStateAction<IDataToFindSchedulePage | undefined>
  >;
}
