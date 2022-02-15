import styled from 'styled-components';

export const StyledWrapperButtons = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;
export const StyledWrapper = styled.div`
  h3 {
    margin: 20px 0;
    line-height: 30px;
    font-size: 22px;
    text-align: center;
    width: 100%;
  }
`;
