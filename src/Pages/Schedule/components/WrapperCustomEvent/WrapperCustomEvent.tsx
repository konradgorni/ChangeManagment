import React, { Dispatch, SetStateAction } from 'react';
import moment from 'moment';
import { IDataToFind } from '../../SchedulePage';
import {
  StyledWrapper,
  StyledButton,
  StyledSearchIcon,
} from './WrapperCustomEvent.styled';

interface IEvent {
  title: string;
  id: number;
  start: Date;
  end: Date;
  workPlace: string;
  Name: string;
  Surname: string;
}

interface WrapperCustomEventProps {
  event: IEvent;
  title: string;
  setShowCoWorkersModal: Dispatch<SetStateAction<boolean>>;
  setDataToFindCoWorkers: Dispatch<SetStateAction<IDataToFind | undefined>>;
}

const WrapperCustomEvent = ({
  event,
  title,
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
    <StyledWrapper>
      <StyledButton type="submit" onClick={handleCoworkers}>
        <StyledSearchIcon />
      </StyledButton>
    </StyledWrapper>
  );
};
export default WrapperCustomEvent;
