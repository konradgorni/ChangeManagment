import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, ToolbarProps } from 'react-big-calendar';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import { StyledWrapper } from './MangerBoardPage.styled';
import { EmptyObject } from '../../store/slice/AuthSlice';
import { IworkersList, IEvents, IEventData } from './typesManagerBoard';
import AddToScheduleModal from './components/AddToScheduleModal/AddToScheduleModal';
import ConfirmDeleteEvent from './components/DeleteModal/ConfirmDeleteEvent';
import EditScheduleEventModal from './components/EditScheduleEventModal/EditScheduleEventModal';
import { fetchEventsSchedule } from '../../utils/fetchEventsSchedule';
import { fetchWorkPlaces } from './utils/fetchWorkPlaces';
import { workersListFetch } from './utils/workersListFetch';
import WrapperEvents from './components/WrapperEvents/WrapperEvents';
import CustomToolbar from './components/CustomToolbar/CustomToolbar';
import { IReactSelectData } from '../../utils/globalTypes';
import UserScheduleInfo from './components/UsersScheduleInfo/UsersScheduleInfo';
import 'react-toastify/dist/ReactToastify.css';
import {
  notyficationsHandler,
  NotyficationsStatusEnum,
} from '../../utils/notificationsHandler';
import { handleMinutesConver } from '../../utils/handleMinutesConvert';
import { getObjectToSend } from './utils/getObjectToSend';
import { enumerateWidth } from './utils/enumerateWidth';

const ManagerBoardPage = () => {
  moment.locale('en-GB');
  const localizer = momentLocalizer(moment);
  const [showEditScheduleModal, setShowEditScheduleModal] = useState<boolean>(
    false,
  );
  const [
    showAddToScheduleModal,
    setsShowAddToScheduleModal,
  ] = useState<boolean>(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<boolean>(
    false,
  );
  const [currentDateView, setCurrentDateView] = useState<Date>(new Date());
  const [events, setEvents] = useState<IEvents[]>([]);
  const [workersList, setWorkersList] = useState<IworkersList[]>([]);
  const [workPlaceList, setWorkPlaceList] = useState<IReactSelectData[]>();
  const [showUsersScheduleInfo, setShowUsersScheduleInfo] = useState<boolean>(
    false,
  );
  const [currentIdEvent, setCurrentIdEvent] = useState<number | undefined>(
    undefined,
  );
  const [currentEditEventData, setCurrentEditEventData] = useState<
    IEventData | EmptyObject
  >({});

  useEffect(() => {
    workersListFetch(setWorkersList).then(({ error }) => {
      if (error) {
        notyficationsHandler(
          'Problem with workers list',
          NotyficationsStatusEnum.ERROR,
        );
      }
    });
    fetchData();
    fetchWorkPlaces(setWorkPlaceList).then(({ error }) => {
      if (error) {
        notyficationsHandler(
          'Problem with work places list',
          NotyficationsStatusEnum.ERROR,
        );
      }
    });
  }, []);

  const fetchData = () => {
    fetchEventsSchedule(setEvents).then(({ error }) => {
      if (error) {
        notyficationsHandler(
          'Problem with events schedule',
          NotyficationsStatusEnum.ERROR,
        );
      }
    });
  };

  const components = {
    event: ({ event, title }: { event: IEventData; title: string }) => (
      <WrapperEvents
        setShowConfirmDeleteModal={setShowConfirmDeleteModal}
        setShowEditScheduleModal={setShowEditScheduleModal}
        setCurrentEditEventData={setCurrentEditEventData}
        event={event}
        title={title}
      />
    ),
    toolbar: (props: ToolbarProps) => {
      const { date } = props;
      enumerateWidth(getObjectToSend(date, events));
      return (
        <CustomToolbar
          props={props}
          setsShowAddToScheduleModal={setsShowAddToScheduleModal}
          setShowUsersScheduleInfo={setShowUsersScheduleInfo}
          setCurrentDateView={setCurrentDateView}
        />
      );
    },
  };
  const formats = {
    timeGutterFormat: 'HH:mm',
    eventTimeRangeFormat: (range: { start: Date; end: Date }) => {
      const startTime = moment(range.start);
      const endTime = moment(range.end);
      return `${startTime.hours()}:${handleMinutesConver(
        startTime.minutes(),
      )}-${endTime.hours()}:${handleMinutesConver(endTime.minutes())}`;
    },
  };
  return (
    <StyledWrapper>
      <Calendar
        components={components}
        localizer={localizer}
        formats={formats}
        events={events}
        onSelectEvent={({ id }: { id: number }) => setCurrentIdEvent(id)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '95vh', width: '100%' }}
        defaultView="day"
        dayLayoutAlgorithm="no-overlap"
      />
      {showAddToScheduleModal && (
        <AddToScheduleModal
          workersList={workersList}
          workPlaceList={workPlaceList}
          fetchData={fetchData}
          setsShowAddToScheduleModal={setsShowAddToScheduleModal}
        />
      )}
      {showConfirmDeleteModal && (
        <ConfirmDeleteEvent
          currentIdEvent={currentIdEvent}
          setShowConfirmDeleteModal={setShowConfirmDeleteModal}
          fetchData={fetchData}
        />
      )}
      {showEditScheduleModal && (
        <EditScheduleEventModal
          workersList={workersList}
          workPlaceList={workPlaceList}
          setShowEditScheduleModal={setShowEditScheduleModal}
          currentEditEventData={currentEditEventData}
          fetchData={fetchData}
        />
      )}
      {showUsersScheduleInfo && (
        <UserScheduleInfo
          hideModal={setShowUsersScheduleInfo}
          currentDateView={currentDateView}
          workersList={workersList}
        />
      )}
      <ToastContainer />
    </StyledWrapper>
  );
};
export default ManagerBoardPage;
