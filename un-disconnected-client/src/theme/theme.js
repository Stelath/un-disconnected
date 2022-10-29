// This is the custom color theme for our app

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {main: "#007CC7"},
      secondary: {main: "#203647"},
      text: {main: '#FFFFFF'}
    },
});

export default theme;
