import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, ToolbarProps } from 'react-big-calendar';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import { StyledWrapper } from './MangerBoardPage.styled';
import { sendDataToDataBase } from '../../utils/sendDataToDataBase';
import { EmptyObject } from '../../store/slice/AuthSlice';
import {
  IdataPickerData,
  IselectedWorker,
  IworkersList,
  IEvents,
  IEventData,
} from './typesManagerBoard';
import AddToScheduleModal from './components/AddToScheduleModal/AddToScheduleModal';
import ConfirmDeleteEvent from './components/AddToScheduleModal/ConfirmDeleteEvent';
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

const ManagerBoardPage = () => {
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
  const [dataPickerData, setDataPickerData] = useState<IdataPickerData>();
  const [selectedWorker, setSelectedWorker] = useState<
    IselectedWorker | EmptyObject | null
  >({});
  const [selectedWorkPlace, setSelectedWorkPlace] = useState<string>();
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
  const handleNotificationForChildren = (message: string, status: string) => {
    if (status === NotyficationsStatusEnum.SUCCESS) {
      notyficationsHandler(message, NotyficationsStatusEnum.SUCCESS);
    }
    if (status === NotyficationsStatusEnum.ERROR) {
      notyficationsHandler(message, NotyficationsStatusEnum.ERROR);
    }
  };
  const handleAdd = () => {
    const obj = {
      userId: selectedWorker?.userId,
      startDate: dataPickerData?.startObj,
      endDate: dataPickerData?.endObj,
      workPlace: selectedWorkPlace,
      Name: selectedWorker?.Name,
      Surname: selectedWorker?.Surname,
    };
    sendDataToDataBase('schedule', obj).then(({ error }) => {
      if (error) {
        notyficationsHandler(
          'Problem with adding',
          NotyficationsStatusEnum.ERROR,
        );
      } else {
        fetchData();
        notyficationsHandler(
          'Your event was added',
          NotyficationsStatusEnum.SUCCESS,
        );
        setsShowAddToScheduleModal(false);
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
    toolbar: (props: ToolbarProps) => (
      <CustomToolbar
        props={props}
        setsShowAddToScheduleModal={setsShowAddToScheduleModal}
        setShowUsersScheduleInfo={setShowUsersScheduleInfo}
        setCurrentDateView={setCurrentDateView}
      />
    ),
  };

  return (
    <StyledWrapper>
      <Calendar
        components={components}
        localizer={localizer}
        events={events}
        onSelectEvent={({ id }: { id: number }) => setCurrentIdEvent(id)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '95vh', width: '100%' }}
        defaultView="day"
      />
      {showAddToScheduleModal && (
        <AddToScheduleModal
          setSelectedWorker={setSelectedWorker}
          workersList={workersList}
          setSelectedWorkPlace={setSelectedWorkPlace}
          workPlaceList={workPlaceList}
          setDataPickerData={setDataPickerData}
          handleAdd={handleAdd}
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
          handleNotificationForChildren={handleNotificationForChildren}
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
