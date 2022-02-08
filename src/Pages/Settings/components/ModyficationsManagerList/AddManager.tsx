import React from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledSelect } from './ModyficationsManagerList.styled';
import {
  StyledErrorMesage,
  StyledButton,
} from '../../../../styles/globalStylesComponents.styled';
import { IReactSelectData } from '../../../../utils/globalTypes';
import { updateRowDataBase } from '../../../../utils/updateRowDataBase';

const schema = yup.object().shape({
  userData: yup
    .object()
    .shape({
      value: yup.string().required('select options'),
      label: yup.string(),
    })
    .required('This field is required.'),
});

interface IFormData {
  userData: IReactSelectData;
}

interface AddManager {
  ManagerListFetch: () => void;
  userList: IReactSelectData[];
}

const AddManager = ({ userList, ManagerListFetch }: AddManager) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handleAdd = ({ userData }: { userData: IReactSelectData }) => {
    updateRowDataBase(
      'users',
      { isManager: true },
      { columnTitle: 'id', columnValue: userData.value },
    ).then(() => {
      ManagerListFetch();
      reset({ userData: { label: '', value: '' } });
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
