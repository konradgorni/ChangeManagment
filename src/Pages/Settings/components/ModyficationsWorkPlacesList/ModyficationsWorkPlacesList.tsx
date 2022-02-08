import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteElementFromDataBase } from '../../../../utils/deleteElementFromDataBase';
import { updateRowDataBase } from '../../../../utils/updateRowDataBase';
import {
  StyledButtonsWrapper,
  StyledContainer,
  StyledSelect,
  StyledWrapper,
} from './ModyficationsWorkPlacesList.styled';
import {
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledErrorMesage,
} from '../../../../styles/globalStylesComponents.styled';
import { IReactSelectData } from '../../../../utils/globalTypes';
import { updateFunction } from './utils/updateFunction';
import { IupdateData } from '../../typesSettingsPage';

interface IDataForm {
  workPlaceName: IReactSelectData | undefined;
  workPlaceElementRename: string;
}
interface ModyficationsWorkPlacesListProps {
  workPlaceList: IReactSelectData[] | undefined;
  WorkPlacesListFetch: () => void;
}

const ModyficationsWorkPlacesList = ({
  workPlaceList,
  WorkPlacesListFetch,
}: ModyficationsWorkPlacesListProps) => {
  const [showEditOptions, setShowEditOptions] = useState<boolean>(false);
  const [editSchema, setEditSchema] = useState<boolean>(false);

  const schema = yup.object().shape({
    workPlaceName: yup
      .object()
      .shape({
        value: yup.string().required('select options'),
        label: yup.string(),
      })
      .required('This field is required.'),
    workPlaceElementRename: yup.string().when('dummy', {
      is: (value: string) => editSchema === true,
      then: yup
        .string()
        .required('This field is required.')
        .min(4, 'Min length 4 charts'),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IDataForm>({
    resolver: yupResolver(schema),
  });

  const handleDelete = ({
    workPlaceName,
  }: {
    workPlaceName?: IReactSelectData;
  }) => {
    deleteElementFromDataBase('workPlaces', {
      columnTitle: 'workPlace',
      columnValue: workPlaceName?.value,
    }).then(() => {
      WorkPlacesListFetch();
      reset({ workPlaceName: { label: '', value: '' } });
    });
  };

  const handleUpdate = ({
    workPlaceElementRename,
    workPlaceName,
  }: IupdateData) => {
    updateFunction(workPlaceElementRename, workPlaceName).then(({ data }) => {
      if (data !== null) {
        WorkPlacesListFetch();
        reset({
          workPlaceName: { label: '', value: '' },
          workPlaceElementRename: '',
        });
      }
    });
  };

  return (
    <StyledWrapper>
      <StyledContainer>
        <form>
          <div>
            <Controller
              name="workPlaceName"
              control={control}
              render={({ field }) => (
                <StyledSelect options={workPlaceList} {...field} />
              )}
            />
            <StyledErrorMesage>
              {errors.workPlaceName?.value?.message}
            </StyledErrorMesage>
            {showEditOptions && (
              <StyledLabel>
                <h3>New Name</h3>
                <StyledInput
                  type="text"
                  {...register('workPlaceElementRename')}
                />
                <StyledErrorMesage>
                  {errors.workPlaceElementRename?.message}
                </StyledErrorMesage>
              </StyledLabel>
            )}
          </div>
        </form>
        <StyledButtonsWrapper>
          {showEditOptions || (
            <>
              <StyledButton
                margin="0 5px"
                type="submit"
                onClick={handleSubmit(() => {
                  setShowEditOptions(true);
                  setEditSchema(true);
                })}
              >
                Edit
              </StyledButton>
              <StyledButton
                margin="0 5px"
                type="submit"
                onClick={handleSubmit((data) => {
                  handleDelete(data);
                })}
              >
                Delete
              </StyledButton>
            </>
          )}
          {showEditOptions && (
            <StyledButton
              margin="0 5px"
              type="submit"
              onClick={handleSubmit((data) => {
                handleUpdate(data);
              })}
            >
              Confirm
            </StyledButton>
          )}
        </StyledButtonsWrapper>
      </StyledContainer>
    </StyledWrapper>
  );
};
export default ModyficationsWorkPlacesList;
