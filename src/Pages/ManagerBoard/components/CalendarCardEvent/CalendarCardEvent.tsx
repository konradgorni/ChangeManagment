import React from 'react';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';
import {
  StyledWrapper,
  StyledWrapperButtons,
} from './CalendarCardEvent.styled';
import { CalendarCardEventProps } from '../../typesManagerBoard';

const CalendarCardEvent = ({
  setShowConfirmDeleteModal,
  title,
  setCurrentEditEventData,
  setShowEditScheduleModal,
  event,
}: CalendarCardEventProps) => {
  const handleDelete = () => {
    setShowConfirmDeleteModal(true);
  };
  const handleEdit = () => {
    setShowEditScheduleModal(true);
    const obj = {
      title: event.title,
      workPlace: event.workPlace,
      id: event.id,
      userId: event.userId,
      start: event.start,
      end: event.end,
    };
    setCurrentEditEventData(obj);
  };
  return (
    <StyledWrapper>
      <h3>{title}</h3>
      <StyledWrapperButtons>
        <StyledButton type="submit" onClick={handleEdit}>
          Edit
        </StyledButton>
        <StyledButton background="red" onClick={handleDelete} type="submit">
          Delete
        </StyledButton>
      </StyledWrapperButtons>
    </StyledWrapper>
  );
};
export default CalendarCardEvent;
