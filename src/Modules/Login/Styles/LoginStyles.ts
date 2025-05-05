import { Theme } from '@mui/material';

export const useStylesLogin = (theme: Theme) => ({
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  form: {
    padding: theme.spacing(6),
    width: '100%',
    maxWidth: '400px',
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
      maxWidth: '300px',
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
  input: {
    padding: theme.spacing(1.5, 2),
    margin: theme.spacing(1, 0, 0),
    display: 'block',
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    '&:focus': {
      borderColor: theme.palette.primary.main,
      outline: 'none',
    },
  },
  errorLabel: {
    color: theme.palette.error.main,
    fontSize: '0.875rem',
    marginTop: theme.spacing(0.5),
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.primary,
  },
});
