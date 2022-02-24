import React from 'react';
import {
  StyledButtonWrapper,
  StyledTitle,
  StyledWrapper,
} from './CustomToolbarSchedule.styled';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';
import { CustomToolbarScheduleProps } from '../../typesSchedulePage';

const CustomToolbarSchedule = ({ props }: CustomToolbarScheduleProps) => {
  const { label, onNavigate } = props;
  const handleNext = () => {
    onNavigate('NEXT');
  };
  const handlePrev = () => {
    onNavigate('PREV');
  };
  return (
    <StyledWrapper>
      <StyledTitle>{label}</StyledTitle>
      <StyledButtonWrapper>
        <StyledButton type="submit" onClick={handlePrev}>
          PREV
        </StyledButton>
        <StyledButton type="submit" onClick={handleNext}>
          NEXT
        </StyledButton>
      </StyledButtonWrapper>
    </StyledWrapper>
  );
};
export default CustomToolbarSchedule;
