export interface IworkersListValueObject {
  Name: string;
  Surname: string;
  userId: string;
}

export interface IworkersList {
  label: string;
  value: IworkersListValueObject;
}
export interface IworkPlaceList {
  label: string;
  value: string;
}

export interface IselectedWorker {
  Name: string;
  Surname: string;
  userId: string;
}
export interface IdataPickerDataObj {
  hours: string;
  minutes: string;
  month: string;
  date: string;
  year: string;
}
export interface IdataPickerData {
  endObj: IdataPickerDataObj | undefined;
  startObj: IdataPickerDataObj | undefined;
}

export interface IEvents {
  title: string;
  id: number;
  start: Date;
  end: Date;
}
