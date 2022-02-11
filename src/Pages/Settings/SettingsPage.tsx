import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { fetchWorkPlaces } from '../ManagerBoard/utils/fetchWorkPlaces';
import AddNewWorkPlace from './components/AddNewWorkPlace/AddNewWorkPlace';
import ModifyWorkPlacesList from './components/ModifyWorkPlacesList/ModifyWorkPlacesList';
import { IReactSelectData } from '../../utils/globalTypes';
import { StyledList, StyledTitle, StyledWrapper } from './SettingsPage.styled';
import ModifyManagerList from './components/ModifyManagerList/ModifyManagerList';
import {
  notyficationsHandler,
  NotyficationsStatusEnum,
} from '../../utils/notificationsHandler';

const SettingsPage = () => {
  const [workPlaceList, setWorkPlaceList] = useState<
    IReactSelectData[] | undefined
  >([]);

  useEffect(() => {
    WorkPlacesListFetch();
  }, []);
  const WorkPlacesListFetch = () => {
    fetchWorkPlaces(setWorkPlaceList).then(({ error }) => {
      if (error) {
        notyficationsHandler(
          'Problem with work places list',
          NotyficationsStatusEnum.ERROR,
        );
      }
    });
  };
  return (
    <StyledWrapper>
      <StyledTitle>WorkPlace List</StyledTitle>
      <StyledList>
        {workPlaceList?.map((el: IReactSelectData) => (
          <li key={el.label}>{el.value}</li>
        ))}
      </StyledList>
      <StyledTitle>Add new WorkPlace</StyledTitle>
      <AddNewWorkPlace WorkPlacesListFetch={WorkPlacesListFetch} />

      <StyledTitle>Edit WorkPlace or delete</StyledTitle>
      <ModifyWorkPlacesList
        WorkPlacesListFetch={WorkPlacesListFetch}
        workPlaceList={workPlaceList}
      />
      <StyledTitle>Mangar List</StyledTitle>

      <ModifyManagerList />
      <ToastContainer />
    </StyledWrapper>
  );
};
export default SettingsPage;
