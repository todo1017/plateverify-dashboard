import deepPurple from '@material-ui/core/colors/deepPurple';
import pink from '@material-ui/core/colors/pink';

export default {
  palette: {
    primary: {
      light: deepPurple[300],
      main: deepPurple[500],
      dark: deepPurple[700],
      contrastText: '#fff'
    },
    secondary: {
      light: pink[300],
      main: pink['A200'],
      dark: pink[700],
      contrastText: '#fff'
    }
  },
  status: {
    danger: 'orange',
  },
  typography: {
    button: {
      fontWeight: 400,
      textAlign: 'capitalize'
    },
  },
};
