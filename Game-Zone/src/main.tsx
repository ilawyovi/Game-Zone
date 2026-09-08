import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import "./index.css";
import App from "./App.tsx";
import theme from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript
          initialColorMode={theme.config.initialColorMode}
        />

        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
);