import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, ToolbarProps } from 'react-big-calendar';
import moment from 'moment';
import { StyledWrapper } from './MangerBoardPage.styled';
import { sendDataToDataBase } from '../../utils/sendDataToDataBase';
import { EmptyObject } from '../../store/slice/AuthSlice';
import {
  IdataPickerData,
  IselectedWorker,
  IworkersList,
  IworkPlaceList,
  IEvents,
  IEventData,
} from './typesManagerBoard';
import AddToScheduleModal from './components/AddToScheduleModal/AddToScheduleModal';
import ConfirmDeleteEvent from './components/AddToScheduleModal/ConfirmDeleteEvent';
import EditScheduleEventModal from './components/EditScheduleEventModal/EditScheduleEventModal';
import { fetchEvents } from './utils/fetchEvents';
import { fetchWorkPlaces } from './utils/fetchWorkPlaces';
import { workersListFetch } from './utils/workersListFetch';
import WrapperEvents from './components/WrapperEvents/WrapperEvents';
import CustomToolbar from './components/CustomToolbar/CustomToolbar';

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

  const [events, setEvents] = useState<IEvents[]>([]);
  const [workersList, setWorkersList] = useState<IworkersList[]>([]);
  const [workPlaceList, setWorkPlaceList] = useState<IworkPlaceList[]>();
  const [dataPickerData, setDataPickerData] = useState<IdataPickerData>();
  const [selectedWorker, setSelectedWorker] = useState<
    IselectedWorker | EmptyObject | null
  >({});
  const [selectedWorkPlace, setSelectedWorkPlace] = useState<string>();

  const [currentIdEvent, setCurrentIdEvent] = useState<number | undefined>(
    undefined,
  );
  const [currentEditEventData, setCurrentEditEventData] = useState<
    IEventData | EmptyObject
  >({});

  useEffect(() => {
    workersListFetch(setWorkersList);
    fetchData();
    fetchWorkPlaces(setWorkPlaceList);
  }, []);

  const fetchData = () => {
    fetchEvents(setEvents);
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
    sendDataToDataBase('schedule', obj).then(() => fetchData());
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
        style={{ height: '100%', width: '100%' }}
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
          workersList={workersList}
          workPlaceList={workPlaceList}
          setShowEditScheduleModal={setShowEditScheduleModal}
          currentEditEventData={currentEditEventData}
          fetchData={fetchData}
        />
      )}
    </StyledWrapper>
  );
};
export default ManagerBoardPage;
