import React from 'react';
import {
  StyledIcon,
  StyledLabel,
  StyledWrapper,
} from './CustomDateHeaderDay.styled';
import { CustomDateHeaderDayProps } from '../../typesSchedulePage';

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
      <StyledIcon onClick={handleClick} />
      <StyledLabel>{label}</StyledLabel>
    </StyledWrapper>
  );
};
export default CustomDateHeaderDay;
