import React, { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';
import DataPicker from '../../../../components/DataPicker/DataPicker';
import {
  StyledButtonWrapper,
  StyledWrapper,
} from './AddToScheduleModal.styled';
import {
  DataPickerTypeEnum,
  IdataPickerData,
  IselectedWorker,
  IworkersList,
} from '../../typesManagerBoard';
import { EmptyObject } from '../../../../store/slice/AuthSlice';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';
import { IReactSelectData } from '../../../../utils/globalTypes';

interface AddToScheduleModalProps {
  setSelectedWorker: Dispatch<
    SetStateAction<IselectedWorker | EmptyObject | null>
  >;
  workersList: IworkersList[];
  setSelectedWorkPlace: Dispatch<SetStateAction<string | undefined>>;
  workPlaceList?: IReactSelectData[];
  setDataPickerData: Dispatch<SetStateAction<IdataPickerData | undefined>>;
  handleAdd: () => void;
  setsShowAddToScheduleModal: Dispatch<SetStateAction<boolean>>;
}
const AddToScheduleModal = ({
  setSelectedWorker,
  workersList,
  setSelectedWorkPlace,
  workPlaceList,
  setDataPickerData,
  handleAdd,
  setsShowAddToScheduleModal,
}: AddToScheduleModalProps) => {
  return (
    <StyledWrapper>
      <div>
        <h1>Workers list</h1>
        <Select
          onChange={(item) => {
            if (item !== null) {
              setSelectedWorker(item.value);
            }
          }}
          options={workersList}
        />
        <h1>What position</h1>
        <Select
          onChange={(item) => {
            setSelectedWorkPlace(item?.value);
          }}
          options={workPlaceList}
        />
        <h1>Work hours</h1>
        <DataPicker
          setDataPickerData={setDataPickerData}
          typeDataPicker={DataPickerTypeEnum.ADD}
        />
        <StyledButtonWrapper>
          <StyledButton type="submit" onClick={handleAdd}>
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
      </div>
    </StyledWrapper>
  );
};
export default AddToScheduleModal;
