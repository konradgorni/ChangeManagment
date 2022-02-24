import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../../../utils/icons/search.svg';

export const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const StyledButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
`;
export const StyledSearchIcon = styled(SearchIcon)`
  width: 20px;
  height: 20px;
  color: white;
  @media (min-width: 600px) {
    width: 25px;
    height: 25px;
  }
  @media (min-width: 1024px) {
    width: 28px;
    height: 28px;
  }
  @media (min-width: 1500px) {
    width: 30px;
    height: 30px;
  }
`;
