import React, { useState } from 'react';
import moment from 'moment';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
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
import {
  notyficationsHandler,
  NotyficationsStatusEnum,
} from '../../../../utils/notificationsHandler';
import { handleMinutesConver } from '../../../../utils/handleMinutesConvert';
import {
  IFormDataOnSelectModal,
  OnSelectModalProps,
} from '../../typesSchedulePage';

const OnSelectModal = ({
  dataObj,
  setShowSelectModal,
  user,
}: OnSelectModalProps) => {
  const [checked, setChecked] = useState(false);
  const schema = yup.object({
    startTimeRange: yup.string().when('dummy', {
      is: () => !checked,
      then: yup.string().required('Start time is required.'),
    }),
    endTimeRange: yup.string().when('dummy', {
      is: () => !checked,
      then: yup.string().required('End time is required.'),
    }),
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IFormDataOnSelectModal>({
    resolver: yupResolver(schema),
  });

  const handleForm = (data: IFormDataOnSelectModal) => {
    if (dataObj !== null) {
      const { date } = dataObj;
      const time = moment(date).format('DD-MM-YYYY HH:mm');
      const startTime = moment(data.startTimeRange);
      const endTime = moment(data.endTimeRange);
      const obj = {
        userId: user.id,
        dayOff: checked,
        Date: {
          year: time.slice(6, 10),
          month: time.slice(3, 5),
          date: time.slice(0, 2),
        },
        timeRange: {
          start: `${startTime.hours()}:${handleMinutesConver(
            startTime.minutes(),
          )}`,
          end: `${endTime.hours()}:${handleMinutesConver(endTime.minutes())}`,
        },
        confirmed: false,
      };
      sendDataToDataBase('usersScheduleInfo', obj).then(({ error }) => {
        if (error) {
          notyficationsHandler(
            'Problem with add report to change',
            NotyficationsStatusEnum.ERROR,
          );
        } else {
          notyficationsHandler(
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
          <Controller
            name="startTimeRange"
            control={control}
            render={({ field }: any) => (
              <DatePicker
                placeholderText="Select start time"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                timeFormat="HH:mm"
                dateFormat="HH:mm"
              />
            )}
          />
          <Controller
            name="endTimeRange"
            control={control}
            render={({ field }: any) => (
              <DatePicker
                placeholderText="Select end time"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                timeFormat="HH:mm"
                dateFormat="HH:mm"
              />
            )}
          />
        </StyledInputTimeWrapper>
        <StyledErrorMesage>{errors.startTimeRange?.message}</StyledErrorMesage>
        <StyledErrorMesage>{errors.endTimeRange?.message}</StyledErrorMesage>
        <StyledButtonsWrapper>
          <StyledButton type="submit">Submit</StyledButton>
          <StyledButton
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
