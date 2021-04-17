import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root {    
    /* --dropDown-bg-color : rgb(232, 215, 190);                 
    --questions-bg-color: rgb(255, 236, 209);
    --primary-bg-color: rgb(255, 236, 209);
    --nav-bg-color: rgb(255, 160, 71);
    --nav-height : 10vh;
    --btn-bg-color : rgb(255, 160, 71);
    --dark-accent : rgb(120, 41, 15);
    --post-bg-color: #d9c9ba;
    --slight-box-shadow : rgb(145, 142, 140); */

    --dropDown-bg-color : rgb(209, 209, 209);                 
    --questions-bg-color: rgb(255, 236, 209);
    --primary-bg-color: rgb(240, 240, 245);
    --nav-bg-color: rgb(101, 140, 163);
    --nav-height : 10vh;
    --btn-bg-color : rgb(168, 168, 168);
    --dark-accent : rgb(39, 38, 67);
    --post-bg-color: rgb(191, 221, 255);
    --slight-box-shadow : rgb(145, 142, 140);
    --primary-border-color : rgb(7, 9, 82);
  }


html,
body,
div,
span {
  scroll-behavior: smooth;
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
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: var(--primary-bg-color) ;
}

*::-webkit-scrollbar-thumb {
  background-color:var(--dark-accent);
  border-radius: 55px;
}
`;
