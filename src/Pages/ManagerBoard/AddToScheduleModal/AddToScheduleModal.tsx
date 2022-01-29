import React, { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';
import DataPicker from '../../DataPicker/DataPickerr';
import { StyledWrapper } from './AddToScheduleModal.styled';
import {
  DataPickerTypeEnum,
  IdataPickerData,
  IselectedWorker,
  IworkersList,
  IworkPlaceList,
} from '../typesManagerBoard';
import { EmptyObject } from '../../../store/slice/AuthSlice';

interface AddToScheduleModalProps {
  setSelectedWorker: Dispatch<
    SetStateAction<IselectedWorker | EmptyObject | null>
  >;
  workersList: IworkersList[];
  setSelectedWorkPlace: Dispatch<SetStateAction<string | undefined>>;
  workPlaceList?: IworkPlaceList[];
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
  // TODO CO JESLI KTOS NIE WYBIERZE ELEMENTU Z LISTY ON CHANGE
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
        <button type="submit" onClick={handleAdd}>
          Add
        </button>
        <button type="submit" onClick={() => setsShowAddToScheduleModal(false)}>
          X
        </button>
      </div>
    </StyledWrapper>
  );
};
export default AddToScheduleModal;
