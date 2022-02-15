import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendDataToDataBase } from '../../../../utils/sendDataToDataBase';
import {
  StyledLabel,
  StyledInput,
  StyledErrorMesage,
  StyledButton,
} from '../../../../styles/globalStylesComponents.styled';
import {
  notyficationsHandler,
  NotyficationsStatusEnum,
} from '../../../../utils/notificationsHandler';

const schema = yup
  .object({
    workPlaceName: yup.string().required().min(4),
  })
  .required();

interface AddNewWorkPlaceProps {
  WorkPlacesListFetch: () => void;
}
interface IDataForm {
  workPlaceName: string;
}

const AddNewWorkPlace = ({ WorkPlacesListFetch }: AddNewWorkPlaceProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IDataForm>({
    resolver: yupResolver(schema),
  });

  const saveNewWorkPlaceInDatabase = (data: IDataForm) => {
    sendDataToDataBase('workPlaces', {
      workPlace: data.workPlaceName,
    }).then(({ error }) => {
      if (error) {
        notyficationsHandler(
          'Problem with saving new workplace',
          NotyficationsStatusEnum.SUCCESS,
        );
      } else {
        notyficationsHandler(
          'Workplace was added',
          NotyficationsStatusEnum.SUCCESS,
        );
        WorkPlacesListFetch();
        reset({ workPlaceName: '' });
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(saveNewWorkPlaceInDatabase)}>
        <StyledLabel htmlFor="test">
          <h3>WorkPlace Name</h3>
          <StyledInput type="text" id="test" {...register('workPlaceName')} />
        </StyledLabel>
        <StyledErrorMesage>{errors.workPlaceName?.message}</StyledErrorMesage>
        <StyledButton margin="12px 0" padding="0 5px" type="submit">
          Add New Workplace
        </StyledButton>
      </form>
    </div>
  );
};
export default AddNewWorkPlace;
