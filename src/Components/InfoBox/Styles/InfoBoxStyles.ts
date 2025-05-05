import { Theme } from '@mui/material';

export const useStylesInfoBox = (theme: Theme) => ({
  label: {
    fontSize: '12px',
  },
  paper: {
    padding: '25px',
  },
  background: {
    backgroundColor: theme.palette.background.default,
  },
});
