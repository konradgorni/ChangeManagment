import React, { Dispatch, SetStateAction } from 'react';
import { DateHeaderProps } from 'react-big-calendar';
import { StyledLabel, StyledWrapper } from './CustomDateHeaderDay.styled';

interface CustomDateHeaderDayProps {
  props: DateHeaderProps;
  setShowSelectModal: Dispatch<SetStateAction<boolean>>;
  setSelectModalData: Dispatch<SetStateAction<DateHeaderProps | null>>;
}

const CustomDateHeaderDay = ({
  props,
  setShowSelectModal,
  setSelectModalData,
}: CustomDateHeaderDayProps) => {
  const { label } = props;
  const handleClick = () => {
    setShowSelectModal(true);
    setSelectModalData(props);
  };
  return (
    <StyledWrapper>
      <button type="submit" onClick={handleClick}>
        +
      </button>
      <StyledLabel>{label}</StyledLabel>
    </StyledWrapper>
  );
};
export default CustomDateHeaderDay;
