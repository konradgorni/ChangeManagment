import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { IdataPickerData } from '../ManagerBoard/typesManagerBoard';

type stateDateType = null | Date;
interface timePicker {
  hour: string;
  min: string;
}
interface dataPickerProps {
  setDataPickerData: Dispatch<SetStateAction<IdataPickerData>>;
}

const DataPicker = ({ setDataPickerData }: dataPickerProps) => {
  const [selectedDate, setSelectedDate] = useState<stateDateType>();
  const [startTimePicker, setStartTimePicker] = useState<timePicker>();
  const [selectedDateEnd, setSelectedDateEnd] = useState<stateDateType>();
  const [endTimePicker, setEndTimePicker] = useState<timePicker>();

  useEffect(() => {
    handleClick();
  }, [startTimePicker, endTimePicker]);

  const getObjectToSend = (
    data: Date | null | undefined,
    hour: string | undefined,
    min: string | undefined,
  ) => {
    const time = moment(data).format('DD-MM-YYYY HH:mm');
    return {
      year: time.slice(6, 10),
      month: time.slice(3, 5),
      date: time.slice(0, 2),
      hours: hour,
      minutes: min,
    };
  };

  const handleClick = () => {
    const startObj = getObjectToSend(
      selectedDate,
      startTimePicker?.hour,
      startTimePicker?.min,
    );
    const endObj = getObjectToSend(
      selectedDateEnd,
      endTimePicker?.hour,
      endTimePicker?.min,
    );
    setDataPickerData({ startObj, endObj });
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
        }}
        minDate={new Date()}
        dateFormat="dd/MM/yyyy"
        placeholderText="start date"
      />
      <input
        type="time"
        onChange={(e) => {
          const obj = {
            hour: e.target.value.slice(0, 2),
            min: e.target.value.slice(3, 5),
          };
          setStartTimePicker(obj);
        }}
      />

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
      <input
        type="time"
        onChange={(e) => {
          const obj = {
            hour: e.target.value.slice(0, 2),
            min: e.target.value.slice(3, 5),
          };
          setEndTimePicker(obj);
        }}
      />
    </div>
  );
};
export default DataPicker;
