import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

export const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#27276d',
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: blue,
  },
});
