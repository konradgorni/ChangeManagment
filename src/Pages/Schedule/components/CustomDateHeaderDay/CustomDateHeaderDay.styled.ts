import styled from 'styled-components';
import { ReactComponent as Icon } from '../../../../utils/icons/plus.svg';

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding-right: 0;
  margin: 10px 0;
`;
export const StyledLabel = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  letter-spacing: 1px;
  @media (min-width: 400px) {
    font-size: 16px;
  }
  @media (min-width: 900px) {
    font-size: 18px;
  }
  @media (min-width: 1024px) {
    font-size: 20px;
  }
  @media (min-width: 1300px) {
    font-size: 22px;
  }
  @media (min-width: 1300px) {
    font-size: 24px;
  }
`;
export const StyledIcon = styled(Icon)`
  width: 15px;
  height: 15px;
  cursor: pointer;
  @media (min-width: 500px) {
    width: 17px;
    height: 17px;
  }
  @media (min-width: 900px) {
    width: 20px;
    height: 20px;
  }
  @media (min-width: 1024px) {
    width: 24px;
    height: 24px;
  }
  @media (min-width: 1300px) {
    width: 26px;
    height: 26px;
  }
  @media (min-width: 1600px) {
    width: 28px;
    height: 28px;
  }
`;
