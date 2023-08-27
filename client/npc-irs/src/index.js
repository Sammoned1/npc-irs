import React, { createContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import DataContext from "./myCode/DataContext";

const container = document.getElementById("app");
const root = createRoot(container);

export const Context = createContext(null);

root.render(
  <Context.Provider
    value={{
      serverData: new DataContext(),
    }}
  >
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </Context.Provider>
);
