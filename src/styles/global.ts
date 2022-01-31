import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
#root{
  margin:0 auto;
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;600&display=swap');
  font-family: 'Inter', sans-serif;
}
`;
