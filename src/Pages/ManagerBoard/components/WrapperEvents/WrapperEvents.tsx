import React from 'react';
import CalendarCardEvent from '../CalendarCardEvent/CalendarCardEvent';
import { WrapperEventsProps } from '../../typesManagerBoard';

const WrapperEvents = ({
  setShowConfirmDeleteModal,
  setShowEditScheduleModal,
  setCurrentEditEventData,
  event,
  title,
}: WrapperEventsProps) => {
  return (
    <CalendarCardEvent
      setShowConfirmDeleteModal={setShowConfirmDeleteModal}
      setShowEditScheduleModal={setShowEditScheduleModal}
      title={title}
      setCurrentEditEventData={setCurrentEditEventData}
      event={event}
    />
  );
};
export default WrapperEvents;
