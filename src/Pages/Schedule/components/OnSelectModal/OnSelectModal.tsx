import React, { Dispatch, SetStateAction, useState } from 'react';
import moment from 'moment';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateHeaderProps } from 'react-big-calendar';
import {
  StyledWrapper,
  StyledCheckboxInput,
  StyledButtonsWrapper,
  StyledLabel,
  StyledInputTimeWrapper,
} from './OnSelectModal.styled';
import { sendDataToDataBase } from '../../../../utils/sendDataToDataBase';
import {
  StyledButton,
  StyledErrorMesage,
} from '../../../../styles/globalStylesComponents.styled';
import { NotyficationsStatusEnum } from '../../../../utils/notificationsHandler';

interface OnSelectModalProps {
  dataObj: DateHeaderProps | null;
  setShowSelectModal: Dispatch<SetStateAction<boolean>>;
  user: any;
  handleNotificationForChildren: (message: string, status: string) => void;
}

interface IFormData {
  startTimeRange: string;
  endTimeRange: string;
}

const OnSelectModal = ({
  dataObj,
  setShowSelectModal,
  user,
  handleNotificationForChildren,
}: OnSelectModalProps) => {
  const [checked, setChecked] = useState(false);
  const schema = yup.object({
    startTimeRange: yup.string().when('dummy', {
      is: () => checked === false,
      then: yup.string().required('StartTimeRange is required.'),
    }),
    endTimeRange: yup.string().when('dummy', {
      is: () => checked === false,
      then: yup.string().required('EndTimeRange is required.'),
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handleForm = (data: IFormData) => {
    if (dataObj !== null) {
      const { date } = dataObj;
      const time = moment(date).format('DD-MM-YYYY HH:mm');
      const obj = {
        userId: user.id,
        dayOff: checked,
        Date: {
          year: time.slice(6, 10),
          month: time.slice(3, 5),
          date: time.slice(0, 2),
        },
        timeRange: {
          start: data.startTimeRange,
          end: data.endTimeRange,
        },
        confirmed: false,
      };
      sendDataToDataBase('usersScheduleInfo', obj).then(({ error }) => {
        if (error) {
          handleNotificationForChildren(
            'Problem with add report to change',
            NotyficationsStatusEnum.ERROR,
          );
        } else {
          handleNotificationForChildren(
            'Report was added',
            NotyficationsStatusEnum.SUCCESS,
          );
          reset({ startTimeRange: '', endTimeRange: '' });
          setChecked(false);
          setShowSelectModal(false);
        }
      });
    }
  };
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <StyledWrapper>
      <form onSubmit={handleSubmit(handleForm)}>
        <h2>Report a change</h2>
        <StyledLabel htmlFor="dayoff">
          <h3>All day</h3>

          <StyledCheckboxInput
            type="checkbox"
            id="dayoff"
            checked={checked}
            onChange={handleChange}
          />
        </StyledLabel>
        <h2>Time range</h2>
        <StyledInputTimeWrapper>
          <input type="time" {...register('startTimeRange')} />
          <input type="time" {...register('endTimeRange')} />
        </StyledInputTimeWrapper>
        <StyledErrorMesage>{errors.startTimeRange?.message}</StyledErrorMesage>
        <StyledErrorMesage>{errors.endTimeRange?.message}</StyledErrorMesage>
        <StyledButtonsWrapper>
          <StyledButton type="submit">Submit</StyledButton>
          <StyledButton
            margin=""
            background="red"
            onClick={() => setShowSelectModal(false)}
          >
            X
          </StyledButton>
        </StyledButtonsWrapper>
      </form>
    </StyledWrapper>
  );
};
export default OnSelectModal;
