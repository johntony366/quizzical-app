import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import StartPage from "./components/StartPage";
import blueBlob from "./assets/blueBlob.svg";
import yellowBlob from "./assets/yellowBlob.svg";

const theme = createTheme({
  typography: {
    fontFamily: ["Karla", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#4D5B9E"
    }
  }
});

function App() {
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
      >
        <StartPage />
      </Box>
    </ThemeProvider>
  );
}

export default App;
