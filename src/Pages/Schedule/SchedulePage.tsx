import React, { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchDataFromDataBase } from '../../utils/fetchDataFromDataBase';

const SchedulePage = () => {
  const localizer = momentLocalizer(moment);
  const user: any = useSelector((state: RootState) => state.auth.value);
  const [events, setEvents] = useState<any>([]);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetchDataFromDataBase('schedule', 'title,startDate,endDate,id', {
      columnTitle: 'userId',
      columnValue: user?.id,
    }).then(({ data, error }) => {
      if (data !== null) {
        const newArray = data.map((el: any) => {
          const obj = {
            title: el.title,
            id: el.id,
            start: new Date(
              el.startDate.year,
              el.startDate.month - 1,
              el.startDate.date,
              el.startDate.hours,
              el.startDate.minutes,
            ),
            end: new Date(
              el.endDate.year,
              el.endDate.month - 1,
              el.endDate.date,
              el.endDate.hours,
              el.endDate.minutes,
            ),
          };
          return obj;
        });
        setEvents(newArray);
      }
    });
  };

  const handleSelect = (e: any) => {
    console.log('handle', e);
  };
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        // onSelectEvent={(event: any) => console.log(event)}
        views={['month', 'week', 'day']}
        onSelectSlot={(selinfo) => console.log(selinfo)}
        selectable
      />
    </div>
  );
};
export default SchedulePage;
