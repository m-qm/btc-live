import { Theme } from '@mui/material';

export const useStylesLogin = (theme: Theme) => ({
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    padding: '100px',
    width: '350px',
    [theme.breakpoints.down('sm')]: {
      padding: '40px',
      width: '240px',
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  input: {
    padding: '12px 20px',
    margin: '8px 0px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  errorLabel: {
    color: 'red',
    fontSize: '12px',
  },
  label: {
    fontSize: '12px',
  },
});
