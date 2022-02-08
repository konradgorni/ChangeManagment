import React, { useEffect, useState } from 'react';
import DeleteManager from './DeleteManager';
import { IReactSelectData } from '../../../../utils/globalTypes';
import { fetchDataFromDataBase } from '../../../../utils/fetchDataFromDataBase';
import { StyledList } from '../../SettingsPage.styled';
import AddManager from './AddManager';

const ModyficationsManagerList = () => {
  const [userList, setUserList] = useState<IReactSelectData[]>([]);
  const [managerList, setManagerList] = useState<IReactSelectData[]>([]);
  useEffect(() => {
    ManagerListFetch();
  }, []);
  const ManagerListFetch = () => {
    fetchDataFromDataBase('users', 'id,isManager,Name,Surname').then((res) => {
      const { data } = res;
      if (data) {
        const users = data
          .filter((el) => el.isManager === false)
          .map((el) => {
            return {
              label: `${el.Name} ${el.Surname}`,
              value: el.id,
            };
          });
        setUserList(users);
        const managers = data
          .filter((el) => el.isManager === true)
          .map((el) => {
            return { label: `${el.Name} ${el.Surname}`, value: el.id };
          });
        setManagerList(managers);
      }
    });
  };
  return (
    <div>
      <StyledList>
        {/* {managerList.map((el: any) => ( */}
        {/*  <li key={el.id}>{`${el.Name} ${el.Surname}`}</li> */}
        {/* ))} */}
      </StyledList>
      <DeleteManager
        managerList={managerList}
        ManagerListFetch={ManagerListFetch}
      />
      <AddManager userList={userList} ManagerListFetch={ManagerListFetch} />
    </div>
  );
};
export default ModyficationsManagerList;
