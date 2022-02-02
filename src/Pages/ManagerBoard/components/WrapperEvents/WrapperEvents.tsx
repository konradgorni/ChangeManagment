import React, { Dispatch, SetStateAction } from 'react';
import CalendarCardEvent from '../CalendarCardEvent/CalendarCardEvent';
import { IEventData } from '../../typesManagerBoard';
import { EmptyObject } from '../../../../store/slice/AuthSlice';

interface WrapperEventsProps {
  setCurrentEditEventData: Dispatch<SetStateAction<IEventData | EmptyObject>>;
  setShowConfirmDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowEditScheduleModal: Dispatch<SetStateAction<boolean>>;
  event: IEventData;
  title: string;
}

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
