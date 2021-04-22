import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root {    
  

    --dropDown-bg-color : rgb(209, 209, 209);                 
    --questions-bg-color: rgb(255, 236, 209);
    --primary-bg-color: rgb(240, 240, 245);
    --nav-bg-color: rgb(37, 64, 82);
    --nav-height : 10vh;
    --btn-bg-color : rgb(168, 168, 168);
    --dark-accent : rgb(39, 38, 67);
    --post-bg-color: rgb(191, 221, 255);
    --slight-box-shadow : rgb(145, 142, 140);
    --light-bg-color : rgb(199, 198, 197);
    --primary-border-color : rgb(7, 9, 82);
    --golden-detail : rgb(217, 154, 20);
  }


html,
body,
div,
span {
  scroll-behavior: smooth;
  margin: 0;
  padding: 0;
  border: 0;
  background: var(--primary-bg-color);
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
