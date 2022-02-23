import React, { Dispatch, SetStateAction } from 'react';
import {
  StyledButtonsWrapper,
  StyledWrapper,
} from './ConfirmDeleteEvent.styled';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';
import { deleteElementFromDataBase } from '../../../../utils/deleteElementFromDataBase';
import {
  notyficationsHandler,
  NotyficationsStatusEnum,
} from '../../../../utils/notificationsHandler';
import { ConfirmDeleteEventProps } from '../../typesManagerBoard';

const ConfirmDeleteEvent = ({
  currentIdEvent,
  setShowConfirmDeleteModal,
  fetchData,
}: ConfirmDeleteEventProps) => {
  const handleDelete = () => {
    deleteElementFromDataBase('schedule', {
      columnTitle: 'id',
      columnValue: currentIdEvent,
    }).then((res) => {
      if (res?.error) {
        notyficationsHandler(
          'Problem with removing this event',
          NotyficationsStatusEnum.ERROR,
        );
      } else {
        fetchData();
        setShowConfirmDeleteModal(false);
        notyficationsHandler(
          'Element was removed',
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
