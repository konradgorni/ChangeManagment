import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Select from 'react-select';
import moment from 'moment';
import { StyledWrapper } from './EditScheduleEventModal.styled';
import { EmptyObject } from '../../../../store/slice/AuthSlice';
import DataPicker from '../../../DataPicker/DataPicker';
import {
  DataPickerTypeEnum,
  IEventData,
  IworkersList,
  IworkPlaceList,
} from '../../typesManagerBoard';
import { updateEventSchedule } from '../../utils/updateEventSchedule';

export interface IeditData {
  e?: Date;
  s?: Date;
  timeEnd?: string;
  timeStart?: string;
}

interface EditScheduleEventModalProps {
  workersList: IworkersList[];
  workPlaceList?: IworkPlaceList[];
  setShowEditScheduleModal: Dispatch<SetStateAction<boolean>>;
  currentEditEventData: IEventData | EmptyObject;
  fetchData: () => void;
}

const EditScheduleEventModal = ({
  workersList,
  workPlaceList,
  setShowEditScheduleModal,
  currentEditEventData,
  fetchData,
}: EditScheduleEventModalProps) => {
  const [selectedWorker, setSelectedWorker] = useState<any>({});
  const [selectedWorkPlace, setSelectedWorkPlace] = useState<any>();
  const [dataPickerData, setDataPickerData] = useState<any>();
  const [eventId, setEventId] = useState<number>(0);
  const [editData, setEditData] = useState<
    IeditData | EmptyObject | undefined
  >();

  useEffect(() => {
    console.log(selectedWorker);
  }, [selectedWorker]);

  useEffect(() => {
    const { userId, workPlace, start, end, id } = currentEditEventData;
    setEventId(id);
    const editedStartDate = moment(start).format('DD-MM-YYYY HH:mm');
    const editedEndDate = moment(end).format('DD-MM-YYYY HH:mm');
    const obj = {
      s: start,
      e: end,
      timeStart: editedStartDate.slice(
        editedStartDate.length - 5,
        editedStartDate.length,
      ),
      timeEnd: editedEndDate.slice(
        editedEndDate.length - 5,
        editedEndDate.length,
      ),
    };
    setEditData(obj);
    const findEmployee = workersList.filter(
      (el: any) => el.value.userId === userId,
    );
    setSelectedWorker(findEmployee[0]);
    const findWorkStation = workPlaceList?.filter(
      (el: any) => el.value === workPlace,
    );
    setSelectedWorkPlace(findWorkStation);
  }, []);

  const handleSave = () => {
    const obj = {
      userId: selectedWorker.value.userId,
      Name: selectedWorker.value.Name,
      Surname: selectedWorker.value.Surname,
      workPlace: selectedWorkPlace.value,
      startDate: dataPickerData.startObj,
      endDate: dataPickerData.endObj,
    };
    updateEventSchedule(obj, eventId).then(() => {
      fetchData();
    });
  };

  return (
    <StyledWrapper>
      <div>
        <h1>Workers list</h1>
        <Select
          onChange={(item) => setSelectedWorker(item)}
          options={workersList}
          value={selectedWorker}
        />
        <h1>What position</h1>
        <Select
          onChange={(item) => setSelectedWorkPlace(item)}
          options={workPlaceList}
          value={selectedWorkPlace}
        />
        <h1>Work hours</h1>
        <DataPicker
          typeDataPicker={DataPickerTypeEnum.EDIT}
          editData={editData}
          setDataPickerData={setDataPickerData}
        />
        <button type="submit" onClick={handleSave}>
          Save
        </button>
        <button type="submit" onClick={() => setShowEditScheduleModal(false)}>
          X
        </button>
      </div>
    </StyledWrapper>
  );
};
export default EditScheduleEventModal;
