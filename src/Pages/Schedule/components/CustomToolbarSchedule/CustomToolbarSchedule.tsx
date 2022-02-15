import React from 'react';
import { ToolbarProps } from 'react-big-calendar';
import {
  StyledButtonWrapper,
  StyledTitle,
  StyledWrapper,
} from './CustomToolbarSchedule.styled';
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
