import React, { useState } from 'react';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DataPicker from '../../../../components/DataPicker/DataPicker';
import {
  StyledButtonWrapper,
  StyledContainer,
  StyledWrapper,
} from './AddToScheduleModal.styled';
import {
  AddToScheduleModalProps,
  DataPickerTypeEnum,
  IdataPickerData,
  IFormDataAddToScheduleModal,
} from '../../typesManagerBoard';
import {
  StyledButton,
  StyledErrorMesage,
} from '../../../../styles/globalStylesComponents.styled';
import { sendDataToDataBase } from '../../../../utils/sendDataToDataBase';
import {
  notyficationsHandler,
  NotyficationsStatusEnum,
} from '../../../../utils/notificationsHandler';
import { schema } from './utils/schema';

const AddToScheduleModal = ({
  workersList,
  workPlaceList,
  setsShowAddToScheduleModal,
  fetchData,
}: AddToScheduleModalProps) => {
  const [dataPickerData, setDataPickerData] = useState<
    IdataPickerData | undefined
  >();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormDataAddToScheduleModal>({
    resolver: yupResolver(schema),
  });
  const handleForm = (data: IFormDataAddToScheduleModal) => {
    const { selectedWorker, selectedWorkPlace } = data;
    const objToSend = {
      userId: selectedWorker?.value.userId,
      startDate: dataPickerData?.startObj,
      endDate: dataPickerData?.endObj,
      workPlace: selectedWorkPlace?.value,
      Name: selectedWorker?.value.Name,
      Surname: selectedWorker?.value.Surname,
    };
    sendDataToDataBase('schedule', objToSend).then(({ error }) => {
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
  return (
    <StyledWrapper>
      <StyledContainer>
        <form>
          <h1>Workers list</h1>
          <Controller
            name="selectedWorker"
            control={control}
            render={({ field }) => (
              <Select isClearable options={workersList} {...field} />
            )}
          />
          <StyledErrorMesage>
            {errors.selectedWorker?.label?.message}
          </StyledErrorMesage>
          <h1>What position</h1>

          <Controller
            name="selectedWorkPlace"
            control={control}
            render={({ field }) => (
              <Select isClearable options={workPlaceList} {...field} />
            )}
          />
          <StyledErrorMesage>
            {errors.selectedWorkPlace?.label?.message}
          </StyledErrorMesage>
          <h1>Work hours</h1>
          <DataPicker
            setDataPickerData={setDataPickerData}
            typeDataPicker={DataPickerTypeEnum.ADD}
          />
          <StyledButtonWrapper>
            <StyledButton
              type="submit"
              onClick={handleSubmit((data) => {
                handleForm(data);
              })}
            >
              Add
            </StyledButton>
            <StyledButton
              background="red"
              type="submit"
              onClick={() => setsShowAddToScheduleModal(false)}
            >
              X
            </StyledButton>
          </StyledButtonWrapper>
        </form>
      </StyledContainer>
    </StyledWrapper>
  );
};
export default AddToScheduleModal;
