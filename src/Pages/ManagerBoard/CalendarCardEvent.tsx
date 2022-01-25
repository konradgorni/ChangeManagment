import React, { Dispatch, SetStateAction } from 'react';

interface CalendarCardEventProps {
  setShowConfirmDeleteModal: Dispatch<SetStateAction<boolean>>;
  title: string;
}

const CalendarCardEvent = ({
  setShowConfirmDeleteModal,
  title,
}: CalendarCardEventProps) => {
  const handleClick = () => {
    setShowConfirmDeleteModal(true);
  };

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick} type="submit">
        delete
      </button>
    </div>
  );
};
export default CalendarCardEvent;
