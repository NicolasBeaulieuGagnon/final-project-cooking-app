import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root {                     
    --questions-bg-color: rgb(255, 236, 209);
    --primary-bg-color: rgb(255, 236, 209);
    --nav-bg-color: rgb(255, 160, 71);
    --nav-height : 10vh;

  }


html,
body,
div,
span {
  margin: 0;
  padding: 0;
  border: 0;
  background: #F8F9FA;
  vertical-align: baseline;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  font-family: 'Anaheim', sans-serif;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  /* width: 15px; */
}

*::-webkit-scrollbar-track {
  /* background: transparent; */
}

*::-webkit-scrollbar-thumb {
  /* background-color: #2a9d8f;
  border-radius: 20px;
  border: 1px solid #2a9d8f; */
}
`;
