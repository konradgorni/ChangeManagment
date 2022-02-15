import styled from 'styled-components';
import { ReactComponent as SearchIcon } from './search.svg';

export const StyledWrapper = styled.div`
  //height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const StyledButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
export const StyledSearchIcon = styled(SearchIcon)`
  width: 20px;
  height: 20px;
  color: white;
`;
