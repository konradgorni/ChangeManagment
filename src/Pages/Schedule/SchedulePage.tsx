import React, { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Calendar, momentLocalizer, ToolbarProps } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CustomToolbarSchedule from './components/CustomToolbarSchedule/CustomToolbarSchedule';
import WrapperCustomEvent from './components/WrapperCustomEvent/WrapperCustomEvent';
import { StyledWrapper } from './SchedulePage.styled';
import CoworkersModal from './components/CoworkersModal/CoworkersModal';
import { IEvents } from '../ManagerBoard/typesManagerBoard';
import { fetchEventsSchedule } from '../../utils/fetchEventsSchedule';

export interface IDataToFind {
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
interface IEvent {
  title: string;
  id: number;
  start: Date;
  end: Date;
  workPlace: string;
  Name: string;
  Surname: string;
}

const SchedulePage = () => {
  const localizer = momentLocalizer(moment);
  const user: any = useSelector((state: RootState) => state.auth.value);
  const [events, setEvents] = useState<IEvents[]>([]);
  const [allEvents, setAllEvents] = useState<IEvents[]>([]);
  const [showCoWorkersModal, setShowCoWorkersModal] = useState<boolean>(false);
  const [dataToFindCoWorkers, setDataToFindCoWorkers] = useState<
    IDataToFind | undefined
  >();
  useEffect(() => {
    fetchEventsSchedule(setEvents, {
      columnTitle: 'userId',
      columnValue: user?.id,
    });
    fetchEventsSchedule(setAllEvents);
  }, []);

  const handleSelect = (e: any) => {
    // console.log('handle', e);
  };
  const components = {
    toolbar: (props: ToolbarProps) => <CustomToolbarSchedule props={props} />,
    event: ({ event, title }: { event: IEvent; title: string }) => (
      <WrapperCustomEvent
        setShowCoWorkersModal={setShowCoWorkersModal}
        event={event}
        title={title}
        setDataToFindCoWorkers={setDataToFindCoWorkers}
      />
    ),
  };
  return (
    <StyledWrapper>
      <Calendar
        components={components}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '95vh' }}
      />
      {showCoWorkersModal && (
        <CoworkersModal
          dataToFindCoWorkers={dataToFindCoWorkers}
          allEvents={allEvents}
          setShowCoWorkersModal={setShowCoWorkersModal}
        />
      )}
    </StyledWrapper>
  );
};
export default SchedulePage;
