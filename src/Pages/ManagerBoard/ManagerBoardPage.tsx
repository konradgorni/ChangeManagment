import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { StyledButton, StyledWrapper } from './MangerBoardPage.styled';
import { sendDataToDataBase } from '../../utils/sendDataToDataBase';
import { EmptyObject } from '../../store/slice/AuthSlice';
import {
  fetchEvents,
  fetchWorkPlaces,
  workersListFetch,
} from './utilsFunctionManagerBoard';
import {
  IdataPickerData,
  IselectedWorker,
  IworkersList,
  IworkPlaceList,
  IEvents,
  IEventData,
} from './typesManagerBoard';
import AddToScheduleModal from './AddToScheduleModal/AddToScheduleModal';
import ConfirmDeleteEvent from './AddToScheduleModal/ConfirmDeleteEvent';
import CalendarCardEvent from './CalendarCardEvent';
import EditScheduleEventModal from './EditScheduleEventModal/EditScheduleEventModal';

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

  useEffect(() => {
    console.log(events);
  }, [events]);

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
  const WrapperEvent = (props: any) => {
    const { title, event } = props;
    return (
      <CalendarCardEvent
        setShowConfirmDeleteModal={setShowConfirmDeleteModal}
        setShowEditScheduleModal={setShowEditScheduleModal}
        title={title}
        setCurrentEditEventData={setCurrentEditEventData}
        event={event}
      />
    );
  };

  const CustomToolbar = (props: any) => {
    const { label } = props;
    const handleNext = () => {
      props.onNavigate('NEXT');
    };
    const handlePrev = () => {
      props.onNavigate('PREV');
    };
    return (
      <div>
        <StyledButton
          onClick={() => setsShowAddToScheduleModal(true)}
          type="submit"
        >
          Add
        </StyledButton>
        <h2>{label}</h2>
        <button onClick={handlePrev} type="submit">
          prev
        </button>
        <button onClick={handleNext} type="submit">
          NEXT
        </button>
      </div>
    );
  };

  const components = {
    event: WrapperEvent,
    toolbar: CustomToolbar,
  };

  return (
    <StyledWrapper>
      <Calendar
        components={components}
        localizer={localizer}
        events={events}
        onSelectEvent={({ id }) => setCurrentIdEvent(id)}
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
