import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Select from 'react-select';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import {
  StyledButtonWrapper,
  StyledWrapper,
} from './EditScheduleEventModal.styled';
import { EmptyObject } from '../../../../store/slice/AuthSlice';
import DataPicker from '../../../DataPicker/DataPicker';
import {
  DataPickerTypeEnum,
  IdataPickerData,
  IEventData,
  IworkersList,
} from '../../typesManagerBoard';
import { updateEventSchedule } from '../../utils/updateEventSchedule';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';
import { IReactSelectData } from '../../../../utils/globalTypes';
import {
  notyficationsHandler,
  NotyficationsStatusEnum,
} from '../../../../utils/notificationsHandler';

export interface IeditData {
  e?: Date;
  s?: Date;
  timeEnd?: string;
  timeStart?: string;
}

interface EditScheduleEventModalProps {
  workersList: IworkersList[];
  workPlaceList?: IReactSelectData[];
  setShowEditScheduleModal: Dispatch<SetStateAction<boolean>>;
  currentEditEventData: IEventData | EmptyObject;
  fetchData: () => void;
  handleNotificationForChildren: (message: string, status: string) => void;
}

const EditScheduleEventModal = ({
  workersList,
  workPlaceList,
  setShowEditScheduleModal,
  currentEditEventData,
  fetchData,
  handleNotificationForChildren,
}: EditScheduleEventModalProps) => {
  const [selectedWorker, setSelectedWorker] = useState<IworkersList | null>(
    null,
  );
  const [
    selectedWorkPlace,
    setSelectedWorkPlace,
  ] = useState<IReactSelectData | null>(null);
  const [dataPickerData, setDataPickerData] = useState<
    IdataPickerData | undefined
  >();
  const [eventId, setEventId] = useState<number>(0);
  const [editData, setEditData] = useState<
    IeditData | EmptyObject | undefined
  >();

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
    if (workersList) {
      const findEmployee = workersList.filter(
        (el: IworkersList) => el.value.userId === userId,
      );
      setSelectedWorker(findEmployee[0]);
    }
    if (workPlaceList) {
      const findWorkStation = workPlaceList?.filter(
        (el: IReactSelectData) => el.value === workPlace,
      );
      setSelectedWorkPlace(findWorkStation[0]);
    }
  }, []);

  const handleSave = () => {
    const obj = {
      userId: selectedWorker?.value.userId,
      Name: selectedWorker?.value.Name,
      Surname: selectedWorker?.value.Surname,
      workPlace: selectedWorkPlace?.value,
      startDate: dataPickerData?.startObj,
      endDate: dataPickerData?.endObj,
    };
    updateEventSchedule(obj, eventId).then(({ error }) => {
      if (error) {
        handleNotificationForChildren(
          'Error with update',
          NotyficationsStatusEnum.ERROR,
        );
      } else {
        fetchData();
        setShowEditScheduleModal(false);
        handleNotificationForChildren(
          'Event was updated',
          NotyficationsStatusEnum.SUCCESS,
        );
      }
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
        <StyledButtonWrapper>
          <StyledButton type="submit" onClick={handleSave}>
            Save
          </StyledButton>
          <StyledButton
            background="red"
            type="submit"
            onClick={() => setShowEditScheduleModal(false)}
          >
            X
          </StyledButton>
        </StyledButtonWrapper>
      </div>
      <ToastContainer />
    </StyledWrapper>
  );
};
export default EditScheduleEventModal;
