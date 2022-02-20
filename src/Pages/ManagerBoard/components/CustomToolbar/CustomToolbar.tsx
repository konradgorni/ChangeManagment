import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { ToolbarProps } from 'react-big-calendar';
import {
  StyledWrapper,
  StyledTitle,
  StyledButtonsWrapper,
  StyledButtonsContainer,
} from './CustomToolbar.styled';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';

interface CustomToolbarProps {
  props: ToolbarProps;
  setsShowAddToScheduleModal: Dispatch<SetStateAction<boolean>>;
  setShowUsersScheduleInfo: Dispatch<SetStateAction<boolean>>;
  setCurrentDateView: Dispatch<SetStateAction<Date>>;
}

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
