import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { RecipeProvider } from "./components/Providers/RecipeProvider";
import { LoggedInUserProvider } from "./components/Providers/LoggedInUserProvider";

ReactDOM.render(
  <React.StrictMode>
    <LoggedInUserProvider>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </LoggedInUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
