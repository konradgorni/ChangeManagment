import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { ToolbarProps } from 'react-big-calendar';
import { StyledWrapper, StyledTitle } from './CustomToolbar.styled';
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
    props.onNavigate('NEXT');
  };
  const handlePrev = () => {
    props.onNavigate('PREV');
  };

  return (
    <StyledWrapper>
      <StyledTitle>{label}</StyledTitle>

      <StyledButton onClick={handlePrev} type="submit">
        Prev
      </StyledButton>
      <StyledButton onClick={handleNext} type="submit">
        Next
      </StyledButton>
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
    </StyledWrapper>
  );
};
export default CustomToolbar;
