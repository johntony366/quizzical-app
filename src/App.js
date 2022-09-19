import React from "react";
import { useState } from "react";

import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import blueBlob from "./assets/blueBlob.svg";
import yellowBlob from "./assets/yellowBlob.svg";

const theme = createTheme({
  typography: {
    fontFamily: ["Karla", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#4D5B9E",
      light: "#bdc7ff",
    },
    success: {
      main: "#2e7d32",
      light: "#89e88e",
    },
    warning: {
      main: "#d65656",
      light: "#e88989",
    },
  },
});

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);

  function toggleIsGameRunning() {
    setIsGameRunning((oldVal) => !oldVal);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="App"
        sx={{
          backgroundColor: "#F5F7FB",
          backgroundImage: `url(${blueBlob}), url(${yellowBlob})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom left, top right",
        }}
        minHeight={"100vh"}
      >
        {isGameRunning ? (
          <QuizPage
            isGameRunning={isGameRunning}
            toggleIsGameRunning={toggleIsGameRunning}
          />
        ) : (
          <StartPage handleStartClick={toggleIsGameRunning} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
