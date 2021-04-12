import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { RecipeProvider } from "./components/Providers/RecipeProvider";

ReactDOM.render(
  <React.StrictMode>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
