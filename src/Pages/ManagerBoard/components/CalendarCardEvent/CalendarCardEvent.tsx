import React, { Dispatch, SetStateAction } from 'react';
import { IEventData } from '../../typesManagerBoard';
import { EmptyObject } from '../../../../store/slice/AuthSlice';

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
    <div>
      <h1>{title}</h1>
      <button onClick={handleDelete} type="submit">
        delete
      </button>
      <button type="submit" onClick={handleEdit}>
        Edit
      </button>
    </div>
  );
};
export default CalendarCardEvent;
