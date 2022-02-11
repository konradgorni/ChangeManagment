import { Dispatch, SetStateAction } from 'react';
import { IworkersList } from '../../typesManagerBoard';

export interface UsersScheduleInfoProps {
  hideModal: Dispatch<SetStateAction<boolean>>;
  currentDateView: Date;
  workersList: IworkersList[];
}
export interface IDateParsed {
  year: string;
  month: string;
  date: string;
}
export interface IFetchData {
  Date: IDateParsed;
  confirmed: boolean;
  dayOff: boolean;
  id: number;
  timeRange: { start: string; end: string };
  userId: string;
}
export interface IUserToShowData extends IFetchData {
  Name: string;
  Surname: string;
}
