import React, { Dispatch, SetStateAction } from 'react';
import { ToolbarProps } from 'react-big-calendar';
import { StyledWrapper, StyledTitle } from './CustomToolbar.styled';
import { StyledButton } from '../../../../styles/globalStylesComponents.styled';

interface CustomToolbarProps {
  props: ToolbarProps;
  setsShowAddToScheduleModal: Dispatch<SetStateAction<boolean>>;
}

const CustomToolbar = ({
  props,
  setsShowAddToScheduleModal,
}: CustomToolbarProps) => {
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

      <StyledButton onClick={handlePrev} type="submit">
        PREV
      </StyledButton>
      <StyledButton onClick={handleNext} type="submit">
        NEXT
      </StyledButton>
      <StyledButton
        onClick={() => setsShowAddToScheduleModal(true)}
        type="submit"
      >
        Add
      </StyledButton>
    </StyledWrapper>
  );
};
export default CustomToolbar;
