import React, { useEffect, useState } from 'react';
import DeleteManager from './DeleteManager';
import { IReactSelectData } from '../../../../utils/globalTypes';
import { fetchDataFromDataBase } from '../../../../utils/fetchDataFromDataBase';
import AddManager from './AddManager';

const ModifyManagerList = () => {
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
      <DeleteManager
        managerList={managerList}
        ManagerListFetch={ManagerListFetch}
      />
      <AddManager userList={userList} ManagerListFetch={ManagerListFetch} />
    </div>
  );
};
export default ModifyManagerList;
