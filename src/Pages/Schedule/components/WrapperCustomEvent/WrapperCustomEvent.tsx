import React from 'react';
import moment from 'moment';
import {
  StyledWrapper,
  StyledButton,
  StyledSearchIcon,
} from './WrapperCustomEvent.styled';
import { WrapperCustomEventProps } from '../../typesSchedulePage';

const WrapperCustomEvent = ({
  event,
  setShowCoWorkersModal,
  setDataToFindCoWorkers,
}: WrapperCustomEventProps) => {
  const handleCoworkers = () => {
    const timeStart = moment(event.start).format('DD-MM-YYYY HH:mm');
    const timeEnd = moment(event.end).format('DD-MM-YYYY HH:mm');
    const obj = {
      name: event.Name,
      surname: event.Surname,
      workPlace: event.workPlace,
      year: timeStart.slice(6, 10),
      month: timeStart.slice(3, 5),
      date: timeStart.slice(0, 2),
      start: {
        hours: timeStart.slice(timeStart.length - 6, timeStart.length - 3),
        minutes: timeStart.slice(timeStart.length - 2, timeStart.length),
      },
      end: {
        hours: timeEnd.slice(timeEnd.length - 6, timeEnd.length - 3),
        minutes: timeEnd.slice(timeEnd.length - 2, timeEnd.length),
      },
      id: event.id,
    };
    setDataToFindCoWorkers(obj);
    setShowCoWorkersModal(true);
  };
  return (
    <StyledWrapper onClick={handleCoworkers}>
      <StyledButton type="submit">
        <StyledSearchIcon />
      </StyledButton>
    </StyledWrapper>
  );
};
export default WrapperCustomEvent;
