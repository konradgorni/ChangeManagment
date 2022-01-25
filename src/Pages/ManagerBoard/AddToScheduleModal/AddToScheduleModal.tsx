import React from 'react';
import Select from 'react-select';
import DataPicker from '../../DataPicker/DataPickerr';
import { StyledWrapper } from './AddToScheduleModal.styled';

const AddToScheduleModal = ({
  setSelectedWorker,
  workersList,
  setSelectedWorkPlace,
  workPlaceList,
  setDataPickerData,
  handleAdd,
  setsShowAddToScheduleModal,
}: any) => {
  return (
    <StyledWrapper>
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
        <button type="submit" onClick={() => setsShowAddToScheduleModal(false)}>
          X
        </button>
      </div>
    </StyledWrapper>
  );
};
export default AddToScheduleModal;
