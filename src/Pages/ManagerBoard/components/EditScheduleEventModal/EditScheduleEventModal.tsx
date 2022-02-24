import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import {
  StyledButtonWrapper,
  StyledContainer,
  StyledWrapper,
} from './EditScheduleEventModal.styled';
import { EmptyObject } from '../../../../store/slice/AuthSlice';
import DataPicker from '../../../../components/DataPicker/DataPicker';
import {
  DataPickerTypeEnum,
  EditScheduleEventModalProps,
  IdataPickerData,
  IEditData,
  IworkersList,
} from '../../typesManagerBoard';
import { updateEventSchedule } from '../../utils/updateEventSchedule';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';
import { IReactSelectData } from '../../../../utils/globalTypes';
import {
  notyficationsHandler,
  NotyficationsStatusEnum,
} from '../../../../utils/notificationsHandler';

const EditScheduleEventModal = ({
  workersList,
  workPlaceList,
  setShowEditScheduleModal,
  currentEditEventData,
  fetchData,
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
    IEditData | EmptyObject | undefined
  >();

  const prepareEditDataObject = (start: Date, end: Date) => {
    const editedStartDate = moment(start).format('DD-MM-YYYY HH:mm');
    const editedEndDate = moment(end).format('DD-MM-YYYY HH:mm');
    const preparedObject = {
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
    setEditData(preparedObject);
  };

  useEffect(() => {
    const { userId, workPlace, start, end, id } = currentEditEventData;
    setEventId(id);
    prepareEditDataObject(start, end);

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
  }, [workersList, workPlaceList, currentEditEventData]);

  const handleSave = () => {
    const objToSend = {
      userId: selectedWorker?.value.userId,
      Name: selectedWorker?.value.Name,
      Surname: selectedWorker?.value.Surname,
      workPlace: selectedWorkPlace?.value,
      startDate: dataPickerData?.startObj,
      endDate: dataPickerData?.endObj,
    };
    updateEventSchedule(objToSend, eventId).then(({ error }) => {
      if (error) {
        notyficationsHandler(
          'Error with update',
          NotyficationsStatusEnum.ERROR,
        );
      } else {
        fetchData();
        setShowEditScheduleModal(false);
        notyficationsHandler(
          'Event was updated',
          NotyficationsStatusEnum.SUCCESS,
        );
      }
    });
  };

  return (
    <StyledWrapper>
      <StyledContainer>
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
      </StyledContainer>
      <ToastContainer />
    </StyledWrapper>
  );
};
export default EditScheduleEventModal;
