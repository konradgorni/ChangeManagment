import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Select from 'react-select';
import { StyledWrapper } from './MangerBoardPage.styled';
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
  useEffect(() => {
    workersListFetch(setWorkersList);
    fetchEvents(setEvents);
    fetchWorkPlaces(setWorkPlaceList);
  }, []);

  const handleAdd = () => {
    const obj = {
      userId: selectedWorker.userId,
      startDate: dataPickerData?.startObj,
      endDate: dataPickerData?.endObj,
      workPlace: selectedWorkPlace,
      Name: selectedWorker.Name,
      Surname: selectedWorker.Surname,
    };
    sendDataToDataBase('schedule', obj).then(() => fetchEvents(setEvents));
  };
  return (
    <StyledWrapper>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: 700 }}
        selectable
        view="day"
        views={{
          month: false,
          day: true,
          week: false,
        }}
      />
      <div>
        <h1>Workers list</h1>
        <Select
          onChange={(item: any) => setSelectedWorker(item.value)}
          options={workersList}
        />
        <h1>What position</h1>
        <Select
          onChange={(item: any) => setSelectedWorkPlace(item.value)}
          options={workPlaceList}
        />
        <h1>Work hours</h1>
        <DataPicker setDataPickerData={setDataPickerData} />
        <button type="submit" onClick={handleAdd}>
          Add
        </button>
      </div>
    </StyledWrapper>
  );
};
export default ManagerBoardPage;
