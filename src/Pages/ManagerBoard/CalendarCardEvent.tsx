import React, { Dispatch, SetStateAction } from 'react';
import { IEventData } from './typesManagerBoard';
import { EmptyObject } from '../../store/slice/AuthSlice';

export interface Ievent {
  title: string;
  workPlace: string;
  id: number;
  userId: string;
  start: Date;
  end: Date;
}
// TODO EVENT TYPE
interface CalendarCardEventProps {
  setShowConfirmDeleteModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  setShowEditScheduleModal: Dispatch<SetStateAction<boolean>>;
  setCurrentEditEventData: Dispatch<SetStateAction<IEventData | EmptyObject>>;
  event: any;
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
    setCurrentEditEventData(event);
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
