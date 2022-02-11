import React, { Dispatch, SetStateAction } from 'react';
import {
  StyledButtonsWrapper,
  StyledWrapper,
} from './ConfirmDeleteEvent.styled';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';
import { deleteElementFromDataBase } from '../../../../utils/deleteElementFromDataBase';
import { NotyficationsStatusEnum } from '../../../../utils/notificationsHandler';

interface ConfirmDeleteEventProps {
  currentIdEvent: number | undefined;
  setShowConfirmDeleteModal: Dispatch<SetStateAction<boolean>>;
  fetchData: () => void;
  handleNotificationForChildren: (message: string, status: string) => void;
}

const ConfirmDeleteEvent = ({
  currentIdEvent,
  setShowConfirmDeleteModal,
  fetchData,
  handleNotificationForChildren,
}: ConfirmDeleteEventProps) => {
  const handleDelete = () => {
    deleteElementFromDataBase('schedule', {
      columnTitle: 'id',
      columnValue: currentIdEvent,
    }).then((res) => {
      if (res?.error) {
        handleNotificationForChildren(
          'Problem with delete this element',
          NotyficationsStatusEnum.ERROR,
        );
      } else {
        fetchData();
        setShowConfirmDeleteModal(false);
        handleNotificationForChildren(
          'Element was deleted',
          NotyficationsStatusEnum.SUCCESS,
        );
      }
    });
  };

  return (
    <StyledWrapper>
      <h2>Are you sure to delete this element ?</h2>
      <StyledButtonsWrapper>
        <StyledButton type="submit" onClick={handleDelete}>
          Delete
        </StyledButton>
        <StyledButton
          background="red"
          type="submit"
          onClick={() => setShowConfirmDeleteModal(false)}
        >
          Cancel
        </StyledButton>
      </StyledButtonsWrapper>
    </StyledWrapper>
  );
};
export default ConfirmDeleteEvent;
