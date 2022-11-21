import createTheme from '@material-ui/core/styles/createTheme';
import { ThemeOptions } from '@material-ui/core/styles/createTheme';

const themeOptions: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#58A1D6',
      light: '#58D6CC',
      dark: '#5862D6',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#ffffff',
    },
    background: {
      default: 'rgb(88,214,141)',
    },
  },
  typography: {
    h1: {
      fontWeight: 900,
      fontSize: '3rem',
      '@media (min-width:600px)': {
        fontSize: '6rem',
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
