import React, { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { supabase } from '../../supabase/client';
// import { events } from './events';

const SchedulePage = () => {
  const localizer = momentLocalizer(moment);
  const user: any = useSelector((state: RootState) => state.auth.value);
  const [events, setEvents] = useState<any>([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { error, data } = await supabase
      .from('schedule')
      .select('title,startDate,endDate,id')
      .eq('userId', user?.id)
      .order('id', { ascending: false });
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
  }

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
        onSelectEvent={(event: any) => console.log(event)}
        views={['month', 'week', 'day']}
      />
    </div>
  );
};
export default SchedulePage;
