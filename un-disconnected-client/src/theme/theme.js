// This is the custom color theme for our app

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    overrides: {
        MuiInputLabel: { // Name of the component ⚛️ / style sheet
          root: { // Name of the rule
            color: "#fff",
          }
        },
        MuiInputBase: {
            input: {
              background: "#fff",
            },
        },
      },
  typography: {
    h3: {
      color: "#FFFFFF"
    }
  },
  palette: {
    primary: { main: "#007CC7", contrastText: "#FFFFFF" },
    secondary: { main: "#203647" },
    text: { primary: "#FFFFFF" },
    input: { main: "#FFFFFF" },
    background: { default: "#12232E" },
  },
});

export default theme;
