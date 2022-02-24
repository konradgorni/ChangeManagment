import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledSelect } from './ModifyManagerList.styled';
import {
  StyledErrorMesage,
  StyledButton,
} from '../../../../styles/globalStylesComponents.styled';
import { IReactSelectData } from '../../../../utils/globalTypes';
import { updateRowDataBase } from '../../../../utils/updateRowDataBase';
import {
  notyficationsHandler,
  NotyficationsStatusEnum,
} from '../../../../utils/notificationsHandler';
import { schemaAddManager } from './utils/schems';
import { AddManagerProps } from '../../typesSettingsPage';

interface IFormData {
  userData: IReactSelectData;
}

const AddManager = ({ userList, ManagerListFetch }: AddManagerProps) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IFormData>({
    resolver: yupResolver(schemaAddManager),
  });

  const handleAdd = ({ userData }: { userData: IReactSelectData }) => {
    updateRowDataBase(
      'users',
      { isManager: true },
      { columnTitle: 'id', columnValue: userData.value },
    ).then(({ error }) => {
      if (error) {
        notyficationsHandler(
          'Problem with adding the manager',
          NotyficationsStatusEnum.ERROR,
        );
      } else {
        notyficationsHandler(
          'Manager was added',
          NotyficationsStatusEnum.SUCCESS,
        );
        ManagerListFetch();
        reset({ userData: { label: '', value: '' } });
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleAdd)}>
        <Controller
          name="userData"
          control={control}
          render={({ field }) => <StyledSelect options={userList} {...field} />}
        />
        <StyledErrorMesage>{errors.userData?.value?.message}</StyledErrorMesage>
        <StyledButton type="submit">Add</StyledButton>
      </form>
    </div>
  );
};
export default AddManager;
