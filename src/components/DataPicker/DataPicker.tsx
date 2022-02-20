import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
  DataPickerTypeEnum,
  IdataPickerData,
} from '../../Pages/ManagerBoard/typesManagerBoard';
import { StyledDateWrapper, StyledWrapper } from './DataPicker.styled';
import { IEditData } from '../../Pages/ManagerBoard/components/EditScheduleEventModal/EditScheduleEventModalTypes';

type stateDateType = null | Date | undefined;

interface dataPickerProps {
  setDataPickerData: Dispatch<SetStateAction<IdataPickerData | undefined>>;
  editData?: IEditData | null;
  typeDataPicker?: DataPickerTypeEnum.ADD | DataPickerTypeEnum.EDIT;
}

const DataPicker = ({
  setDataPickerData,
  editData,
  typeDataPicker,
}: dataPickerProps) => {
  const defaultDate = new Date();
  const [selectedDate, setSelectedDate] = useState<stateDateType>(defaultDate);
  const [startTimePicker, setStartTimePicker] = useState<stateDateType>(
    defaultDate,
  );
  const [selectedDateEnd, setSelectedDateEnd] = useState<stateDateType>(
    defaultDate,
  );
  const [endTimePicker, setEndTimePicker] = useState<stateDateType>(
    defaultDate,
  );

  useEffect(() => {
    handleClick();
  }, [startTimePicker, endTimePicker]);
  useEffect(() => {
    if (typeDataPicker === DataPickerTypeEnum.EDIT) {
      setSelectedDate(editData?.s);
      setSelectedDateEnd(editData?.e);
      setStartTimePicker(editData?.s);
      setEndTimePicker(editData?.e);
    }
  }, [editData]);

  const getObjectToSend = (
    data: Date | null | undefined,
    dateTime: stateDateType,
  ) => {
    const time = moment(data).format('DD-MM-YYYY HH:mm');
    const time2 = moment(dateTime);
    return {
      year: time.slice(6, 10),
      month: time.slice(3, 5),
      date: time.slice(0, 2),
      hours: `${time2.hours()}`,
      minutes: `${time2.minutes()}`,
    };
  };

  const handleClick = () => {
    const startObj = getObjectToSend(selectedDate, startTimePicker);
    const endObj = getObjectToSend(selectedDateEnd, endTimePicker);
    setDataPickerData({ startObj, endObj });
  };

  return (
    <StyledWrapper>
      <StyledDateWrapper>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText="start date"
        />
        <DatePicker
          selected={startTimePicker}
          onChange={(date) => {
            if (date) {
              setStartTimePicker(date);
            }
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          timeFormat="HH:mm"
          dateFormat="HH:mm"
        />
      </StyledDateWrapper>
      <StyledDateWrapper>
        <DatePicker
          selected={selectedDateEnd}
          onChange={(date) => {
            setSelectedDateEnd(date);
            handleClick();
          }}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText="end date"
        />
        <DatePicker
          selected={endTimePicker}
          onChange={(date) => {
            if (date) {
              setEndTimePicker(date);
            }
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          timeFormat="HH:mm"
          dateFormat="HH:mm"
        />
      </StyledDateWrapper>
    </StyledWrapper>
  );
};
export default DataPicker;
