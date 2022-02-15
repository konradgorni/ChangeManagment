import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  .rbc-event{
  background-color:#212121!important;
  }
  .rbc-time-content{
    width:100%!important;
    overflow-x:auto!important;
  }
}
#root{
  margin:0 auto;
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;600&display=swap');
  font-family: 'Inter', sans-serif;
}
`;
