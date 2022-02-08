import React, { useEffect, useState } from 'react';
import { fetchWorkPlaces } from '../ManagerBoard/utils/fetchWorkPlaces';
import AddNewWorkPlace from './components/AddNewWorkPlace/AddNewWorkPlace';
import ModyficationsWorkPlacesList from './components/ModyficationsWorkPlacesList/ModyficationsWorkPlacesList';
import { IReactSelectData } from '../../utils/globalTypes';
import { StyledList, StyledTitle, StyledWrapper } from './SettingsPage.styled';
import ModyficationsManagerList from './components/ModyficationsManagerList/ModyficationsManagerList';

const SettingsPage = () => {
  const [workPlaceList, setWorkPlaceList] = useState<
    IReactSelectData[] | undefined
  >([]);

  useEffect(() => {
    WorkPlacesListFetch();
  }, []);
  const WorkPlacesListFetch = () => {
    fetchWorkPlaces(setWorkPlaceList);
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
      <ModyficationsWorkPlacesList
        WorkPlacesListFetch={WorkPlacesListFetch}
        workPlaceList={workPlaceList}
      />
      <StyledTitle>Mangar List</StyledTitle>

      <ModyficationsManagerList />
    </StyledWrapper>
  );
};
export default SettingsPage;
