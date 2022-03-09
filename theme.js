import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans Thai','Sora',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#f44336',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    warning: {
      main: '#ffb300',
    }
  },
});

export default theme;
