import React, { Dispatch, SetStateAction } from 'react';
import { ToolbarProps } from 'react-big-calendar';
import { StyledButton } from '../../MangerBoardPage.styled';

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
    <div>
      <StyledButton
        onClick={() => setsShowAddToScheduleModal(true)}
        type="submit"
      >
        Add
      </StyledButton>
      <h2>{label}</h2>
      <button onClick={handlePrev} type="submit">
        prev
      </button>
      <button onClick={handleNext} type="submit">
        NEXT
      </button>
    </div>
  );
};
export default CustomToolbar;
