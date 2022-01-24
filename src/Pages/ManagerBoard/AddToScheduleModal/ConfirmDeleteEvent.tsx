import React, { Dispatch, SetStateAction } from 'react';
import { StyledWrapper } from './ConfirmDeleteEvent.styled';
import { deleteElementFromDataBase } from '../../../utils/deleteElementFromDataBase';

interface ConfirmDeleteEventProps {
  currentIdEvent: number | undefined;
  setShowConfirmDeleteModal: Dispatch<SetStateAction<boolean>>;
  fetchData: () => void;
}

const ConfirmDeleteEvent = ({
  currentIdEvent,
  setShowConfirmDeleteModal,
  fetchData,
}: ConfirmDeleteEventProps) => {
  const handleDelete = () => {
    deleteElementFromDataBase('schedule', {
      columnTitle: 'id',
      columnValue: currentIdEvent,
    });
    fetchData();
    setShowConfirmDeleteModal(false);
  };

  return (
    <StyledWrapper>
      <h1>Are you sure to delete this element</h1>
      <button onClick={handleDelete} type="submit">
        Delete
      </button>
      <button type="submit" onClick={() => setShowConfirmDeleteModal(false)}>
        Cancel
      </button>
    </StyledWrapper>
  );
};
export default ConfirmDeleteEvent;
