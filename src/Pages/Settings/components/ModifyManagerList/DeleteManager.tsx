import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  StyledErrorMesage,
  StyledButton,
} from '../../../../styles/globalStylesComponents.styled';
import { StyledSelect } from './ModifyManagerList.styled';
import { updateRowDataBase } from '../../../../utils/updateRowDataBase';
import { IReactSelectData } from '../../../../utils/globalTypes';
import {
  notyficationsHandler,
  NotyficationsStatusEnum,
} from '../../../../utils/notificationsHandler';

const schema = yup.object().shape({
  managerName: yup
    .object()
    .shape({
      value: yup.string().required('select options'),
      label: yup.string(),
    })
    .required('This field is required.'),
});

interface DeleteManagerProps {
  managerList: IReactSelectData[];
  ManagerListFetch: () => void;
}
interface IFormData {
  managerName: IReactSelectData;
}
const DeleteManager = ({
  managerList,
  ManagerListFetch,
}: DeleteManagerProps) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });
  const handleDelete = ({
    managerName: { value },
  }: {
    managerName: IReactSelectData;
  }) => {
    updateRowDataBase(
      'users',
      { isManager: false },
      { columnTitle: 'id', columnValue: value },
    ).then(({ error }) => {
      if (error) {
        notyficationsHandler(
          'Problem with removing the manager',
          NotyficationsStatusEnum.ERROR,
        );
      } else {
        notyficationsHandler(
          'Manager was removed',
          NotyficationsStatusEnum.SUCCESS,
        );
        ManagerListFetch();
        reset({ managerName: { label: '', value: '' } });
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(handleDelete)}>
      <Controller
        name="managerName"
        control={control}
        render={({ field }) => (
          <StyledSelect options={managerList} {...field} />
        )}
      />
      <StyledErrorMesage>
        {errors.managerName?.value?.message}
      </StyledErrorMesage>
      <StyledButton type="submit">Delete</StyledButton>
    </form>
  );
};
export default DeleteManager;
