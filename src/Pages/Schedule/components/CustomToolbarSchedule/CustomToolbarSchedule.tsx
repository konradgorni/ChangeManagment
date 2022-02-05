import React from 'react';
import { ToolbarProps } from 'react-big-calendar';
import { StyledTitle, StyledWrapper } from './CustomToolbarSchedule.styled';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';

interface CustomToolbarScheduleProps {
  props: ToolbarProps;
}

const CustomToolbarSchedule = ({ props }: CustomToolbarScheduleProps) => {
  const { label } = props;
  const handleNext = () => {
    props.onNavigate('NEXT');
  };
  const handlePrev = () => {
    props.onNavigate('PREV');
  };
  return (
    <StyledWrapper>
      <StyledTitle>{label}</StyledTitle>
      <StyledButton type="submit" onClick={handlePrev}>
        PREV
      </StyledButton>
      <StyledButton type="submit" onClick={handleNext}>
        NEXT
      </StyledButton>
    </StyledWrapper>
  );
};
export default CustomToolbarSchedule;
