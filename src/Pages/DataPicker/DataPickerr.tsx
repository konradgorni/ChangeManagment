import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { supabase } from '../../supabase/client';
import { RootState } from '../../store/store';

interface dateObj {
  date: string;
  hours: string;
  minutes: string;
  month: string;
  year: string;
}
type stateDateType = null | Date;

const DataPicker = () => {
  const [selectedDate, setSelectedDate] = useState<stateDateType>(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState<stateDateType>(
    new Date(),
  );
  const [title, setTitle] = useState<string>('');
  const user: any = useSelector((state: RootState) => state.auth.value);

  async function sendToBase(start: dateObj, end: dateObj, eventTitle: string) {
    await supabase
      .from('schedule')
      .insert([
        {
          userId: user.id,
          title: eventTitle,
          startDate: start,
          endDate: end,
        },
      ])
      .single();
  }

  const getObjectToSend = (data: any) => {
    const time = moment(data).format('DD-MM-YYYY HH:mm');
    return {
      year: time.slice(6, 10),
      month: time.slice(3, 5),
      date: time.slice(0, 2),
      hours: time.slice(11, 13),
      minutes: time.slice(14, 16),
    };
  };

  const handleClick = () => {
    const startObj = getObjectToSend(selectedDate);
    const endObj = getObjectToSend(selectedDateEnd);
    sendToBase(startObj, endObj, title);
  };
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
      />
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        placeholderText="start"
      />
      <DatePicker
        selected={selectedDateEnd}
        onChange={(date) => setSelectedDateEnd(date)}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        placeholderText="end"
      />
      <button type="submit" onClick={handleClick}>
        Dodaj wydarzenie
      </button>
    </div>
  );
};
export default DataPicker;
