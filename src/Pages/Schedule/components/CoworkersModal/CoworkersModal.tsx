import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  StyledButtonWrapper,
  StyledWorkerCard,
  StyledWrapper,
} from './CoworkersModal.styled';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';
import { IEvents } from '../../../ManagerBoard/typesManagerBoard';
import { CoworkersModalProps, ICoworkersList } from '../../typesSchedulePage';

const CoworkersModal = ({
  dataToFindCoWorkers,
  allEvents,
  setShowCoWorkersModal,
}: CoworkersModalProps) => {
  const [CoworkersList, setCoworkersList] = useState<ICoworkersList[]>();
  useEffect(() => {
    const MatchCoworkersList = allEvents
      .map((el: IEvents) => {
        const timeStart = moment(el.start).format('DD-MM-YYYY HH:mm');
        const timeEnd = moment(el.end).format('DD-MM-YYYY HH:mm');

        const obj = {
          title: el.title,
          workPlace: el.workPlace,
          year: timeStart.slice(6, 10),
          month: timeStart.slice(3, 5),
          date: timeStart.slice(0, 2),
          id: el.id,
          name: el.Name,
          surname: el.Surname,
          start: {
            hours: timeStart.slice(timeStart.length - 6, timeStart.length - 3),
            minutes: timeStart.slice(timeStart.length - 2, timeStart.length),
          },
          end: {
            hours: timeEnd.slice(timeEnd.length - 6, timeEnd.length - 3),
            minutes: timeEnd.slice(timeEnd.length - 2, timeEnd.length),
          },
        };
        return obj;
      })
      .filter((el: ICoworkersList) => {
        if (dataToFindCoWorkers !== undefined) {
          if (dataToFindCoWorkers.year === el.year) {
            if (dataToFindCoWorkers.month === el.month) {
              if (dataToFindCoWorkers.date === el.date) {
                if (dataToFindCoWorkers.id !== el.id) {
                  return true;
                }
              }
            }
          }
        }

        return false;
      });
    setCoworkersList(MatchCoworkersList);
  }, []);
  const renderContent = () => {
    if (CoworkersList !== undefined) {
      return CoworkersList.map((el: ICoworkersList) => {
        return (
          <StyledWorkerCard key={el.id}>
            <h3>{`${el.name} ${el.surname}`}</h3>
            <p>{el.workPlace}</p>
            <p>{`${el.start.hours}:${el.start.minutes} - ${el.end.hours}:${el.end.minutes}`}</p>
          </StyledWorkerCard>
        );
      });
    }
  };
  return (
    <StyledWrapper>
      <h2>Your Coworkers</h2>
      <StyledWorkerCard user>
        <h3>{`${dataToFindCoWorkers?.name} ${dataToFindCoWorkers?.surname}`}</h3>
        <p>{dataToFindCoWorkers?.workPlace}</p>
        <p>{`${dataToFindCoWorkers?.start.hours}:${dataToFindCoWorkers?.start.minutes} - ${dataToFindCoWorkers?.end.hours}:${dataToFindCoWorkers?.end.minutes}`}</p>
      </StyledWorkerCard>
      {CoworkersList !== undefined ? renderContent() : null}
      <StyledButtonWrapper>
        <StyledButton
          background="red"
          type="submit"
          onClick={() => setShowCoWorkersModal(false)}
        >
          X
        </StyledButton>
      </StyledButtonWrapper>
    </StyledWrapper>
  );
};
export default CoworkersModal;
