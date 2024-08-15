import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family:'sans-seriff','Arial;
    background-color: #f8f9fa;
  }

  main {
    padding-top: 60px; /* Adjust according to your header height */
  }
`;

export default GlobalStyle;
