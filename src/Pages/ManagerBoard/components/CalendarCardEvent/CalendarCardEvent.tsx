import React, { Dispatch, SetStateAction } from 'react';
import { IEventData } from '../../typesManagerBoard';
import { EmptyObject } from '../../../../store/slice/AuthSlice';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';
import {
  StyledWrapper,
  StyledWrapperButtons,
} from './CalendarCardEvent.styled';

interface CalendarCardEventProps {
  setShowConfirmDeleteModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  setShowEditScheduleModal: Dispatch<SetStateAction<boolean>>;
  setCurrentEditEventData: Dispatch<SetStateAction<IEventData | EmptyObject>>;
  event: IEventData;
}

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
