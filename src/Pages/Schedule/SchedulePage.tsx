import React, { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchDataFromDataBase } from '../../utils/fetchDataFromDataBase';

const events = [
  {
    id: 1,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 2,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 6)),
    end: new Date(new Date().setHours(new Date().getHours() + 6)),
  },
  {
    id: 3,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 8)),
    end: new Date(new Date().setHours(new Date().getHours() + 8)),
  },
];

const SchedulePage = () => {
  const localizer = momentLocalizer(moment);
  const user: any = useSelector((state: RootState) => state.auth.value);
  // const [events, setEvents] = useState<any>([]);
  // useEffect(() => {
  //   fetchEvents();
  // }, []);
  //
  // useEffect(() => {
  //   console.log(events);
  // }, [events]);

  // const fetchEvents = () => {
  //   fetchDataFromDataBase(
  //     'schedule',
  //     'workPlace,startDate,endDate,id,Name,Surname',
  //     {
  //       columnTitle: 'userId',
  //       columnValue: user?.id,
  //     },
  //   ).then(({ data, error }) => {
  //     if (data !== null) {
  //       const newArray = data.map(
  //         (el: {
  //           Name: string;
  //           Surname: string;
  //           endDate: any;
  //           id: number;
  //           startDate: any;
  //           workPlace: string;
  //         }) => {
  //           const obj = {
  //             title: `${el.workPlace} - ${el.Name}${el.Surname}`,
  //             id: el.id,
  //             start: new Date(
  //               el.startDate.year,
  //               el.startDate.month - 1,
  //               el.startDate.date,
  //               el.startDate.hours,
  //               el.startDate.minutes,
  //             ),
  //             end: new Date(
  //               el.endDate.year,
  //               el.endDate.month - 1,
  //               el.endDate.date,
  //               el.endDate.hours,
  //               el.endDate.minutes,
  //             ),
  //           };
  //           return obj;
  //         },
  //       );
  //       setEvents(newArray);
  //     }
  //   });
  // };
  //
  // const handleSelect = (e: any) => {
  //   // console.log('handle', e);
  // };
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        // onSelectEvent={(event: any) => console.log(event)}
        // onSelectSlot={(selinfo) => console.log(selinfo)}
        selectable
      />
    </div>
  );
};
export default SchedulePage;
