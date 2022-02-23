import React from 'react';
import {
  StyledWrapper,
  StyledTitle,
  StyledButtonsWrapper,
  StyledButtonsContainer,
} from './CustomToolbar.styled';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';
import { CustomToolbarProps } from '../../typesManagerBoard';

const CustomToolbar = ({
  props,
  setsShowAddToScheduleModal,
  setShowUsersScheduleInfo,
  setCurrentDateView,
}: CustomToolbarProps) => {
  const { label, date } = props;

  const handleNext = () => {
    setShowUsersScheduleInfo(false);
    props.onNavigate('NEXT');
  };
  const handlePrev = () => {
    setShowUsersScheduleInfo(false);
    props.onNavigate('PREV');
  };

  return (
    <StyledWrapper>
      <StyledTitle>{label}</StyledTitle>
      <StyledButtonsContainer>
        <StyledButtonsWrapper>
          <StyledButton onClick={handlePrev} type="submit">
            Prev
          </StyledButton>
          <StyledButton onClick={handleNext} type="submit">
            Next
          </StyledButton>
        </StyledButtonsWrapper>
        <StyledButtonsWrapper>
          <StyledButton
            onClick={() => setsShowAddToScheduleModal(true)}
            type="submit"
          >
            Add
          </StyledButton>
          <StyledButton
            onClick={() => {
              setCurrentDateView(date);
              setShowUsersScheduleInfo(true);
            }}
            type="submit"
          >
            Notes
          </StyledButton>
        </StyledButtonsWrapper>
      </StyledButtonsContainer>
    </StyledWrapper>
  );
};
export default CustomToolbar;
