import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Select from 'react-select';
import { StyledButton, StyledWrapper } from './MangerBoardPage.styled';
import DataPicker from '../DataPicker/DataPickerr';
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
} from './typesManagerBoard';
import AddToScheduleModal from './AddToScheduleModal/AddToScheduleModal';
import Custom from './Custom';
import ConfirmDeleteEvent from './AddToScheduleModal/ConfirmDeleteEvent';

const ManagerBoardPage = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState<IEvents[]>([]);
  const [workersList, setWorkersList] = useState<IworkersList[]>([]);
  const [workPlaceList, setWorkPlaceList] = useState<IworkPlaceList[]>();
  const [dataPickerData, setDataPickerData] = useState<IdataPickerData>();
  const [selectedWorker, setSelectedWorker] = useState<
    IselectedWorker | EmptyObject
  >({});
  const [selectedWorkPlace, setSelectedWorkPlace] = useState<string>();
  const [showAddToScheduleModal, setshowAddToScheduleModal] = useState<boolean>(
    false,
  );
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<boolean>(
    false,
  );
  const [currentIdEvent, setCurrentIdEvent] = useState<number | undefined>(
    undefined,
  );
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
      userId: selectedWorker.userId,
      startDate: dataPickerData?.startObj,
      endDate: dataPickerData?.endObj,
      workPlace: selectedWorkPlace,
      Name: selectedWorker.Name,
      Surname: selectedWorker.Surname,
    };
    sendDataToDataBase('schedule', obj).then(() => fetchData());
  };
  // const Test = (...props: any) => {
  //   return (
  //     <Custom
  //       setShowConfirmDeleteModal={setShowConfirmDeleteModal}
  //       props={props}
  //     />
  //   );
  // };
  //
  // const components = {
  //   event: Test,
  // };

  const components = {
    event: <Custom setShowConfirmDeleteModal={setShowConfirmDeleteModal} />,
  };

  return (
    <StyledWrapper>
      <Calendar
        components={components}
        localizer={localizer}
        events={events}
        // onSelectSlot={(selinfo) => console.log(selinfo)}
        onSelectEvent={({ id }) => setCurrentIdEvent(id)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: 700 }}
        view="day"
        views={{
          month: false,
          day: true,
          week: false,
        }}
      />
      <StyledButton
        onClick={() => setshowAddToScheduleModal(true)}
        type="submit"
      >
        Add
      </StyledButton>
      {showAddToScheduleModal && (
        <AddToScheduleModal
          setSelectedWorker={setSelectedWorker}
          workersList={workersList}
          setSelectedWorkPlace={setSelectedWorkPlace}
          workPlaceList={workPlaceList}
          setDataPickerData={setDataPickerData}
          handleAdd={handleAdd}
          setshowAddToScheduleModal={setshowAddToScheduleModal}
        />
      )}
      {showConfirmDeleteModal && (
        <ConfirmDeleteEvent
          currentIdEvent={currentIdEvent}
          setShowConfirmDeleteModal={setShowConfirmDeleteModal}
          fetchData={fetchData}
        />
      )}
    </StyledWrapper>
  );
};
export default ManagerBoardPage;
