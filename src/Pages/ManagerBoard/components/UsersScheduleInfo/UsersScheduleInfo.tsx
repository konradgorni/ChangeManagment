import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import moment from 'moment';
import {
  StyledUsersInfoWrapper,
  StyledWrapper,
} from './UsersScheduleInfo.styled';
import { fetchDataFromDataBase } from '../../../../utils/fetchDataFromDataBase';
import { IworkersList } from '../../typesManagerBoard';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';

interface UsersScheduleInfoProps {
  hideModal: Dispatch<SetStateAction<boolean>>;
  currentDateView: Date;
  workersList: IworkersList[];
}
interface IDateParsed {
  year: string;
  month: string;
  date: string;
}
interface IFetchData {
  Date: IDateParsed;
  confirmed: boolean;
  dayOff: boolean;
  id: number;
  timeRange: { start: string; end: string };
  userId: string;
}
interface IUserToShowData extends IFetchData {
  Name: string;
  Surname: string;
}

const UsersScheduleInfo = ({
  hideModal,
  currentDateView,
  workersList,
}: UsersScheduleInfoProps) => {
  const [usersToShow, setUsersToShow] = useState<IUserToShowData[]>([]);
  const timeObj = (date: Date) => {
    const time = moment(date).format('DD-MM-YYYY HH:mm');
    return {
      year: time.slice(6, 10),
      month: time.slice(3, 5),
      date: time.slice(0, 2),
    };
  };
  const handleFilter = (obj: IDateParsed) => {
    fetchDataFromDataBase(
      'usersScheduleInfo',
      'id,userId,dayOff,timeRange,Date,confirmed',
    ).then(({ data }) => {
      if (data) {
        const foundObjectWithCurrentDate = data.filter((el: IFetchData) => {
          return (
            el.Date.year === obj.year &&
            el.Date.month === obj.month &&
            el.Date.date === obj.date
          );
        });
        const connectedObject = foundObjectWithCurrentDate.map(
          (el: IFetchData) => {
            const obr = { ...el, Name: '', Surname: '' };

            const findWorker = workersList.filter(
              (worker: IworkersList) => worker.value.userId === el.userId,
            );
            if (findWorker[0].value.Name !== undefined) {
              obr.Name = findWorker[0].value.Name;
              obr.Surname = findWorker[0].value.Surname;
            }
            return obr;
          },
        );
        setUsersToShow(connectedObject);
      }
    });
  };
  useEffect(() => {
    const currentDateTimeObject = timeObj(currentDateView);
    handleFilter(currentDateTimeObject);
  }, [currentDateView]);

  return (
    <StyledWrapper>
      <h2>Notes from users</h2>
      <StyledUsersInfoWrapper>
        {usersToShow &&
          usersToShow.map((el: IUserToShowData) => (
            <div key={el.id}>
              <h3>{`${el.Name} ${el.Surname}`}</h3>
              {el.dayOff && <p>Want to take day off</p>}
              {!el.dayOff && (
                <p>{`Want work from ${el.timeRange.start} to ${el.timeRange.end}`}</p>
              )}
            </div>
          ))}
      </StyledUsersInfoWrapper>
      <StyledButton onClick={() => hideModal(false)} background="red">
        X
      </StyledButton>
    </StyledWrapper>
  );
};
export default UsersScheduleInfo;
