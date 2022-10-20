import React, { ReactElement, useCallback } from 'react';
import {
  AppBar,
  Box, Button, Toolbar, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { ClearSessionAction, SystemActionTypes } from '../../System/SystemTypes';
import { clearSession } from '../../System/State/SystemActions';
import { AppRoutes } from '../../Router/Utils/RouterHelpers';

interface AppBarInterface {
  isLoggedIn: boolean;

}

export function HeaderBar({ isLoggedIn }: AppBarInterface): ReactElement {
  const dispatch = useDispatch<Dispatch<ClearSessionAction>>();
  const navigate = useNavigate();

  const handleLogout = useCallback((): void => {
    const dispatchAction = dispatch as Dispatch<SystemActionTypes>;
    dispatchAction(clearSession());
    navigate(AppRoutes.Login);
  }, [dispatch, navigate]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BTC Live App
          </Typography>
          {isLoggedIn ? (
            <Button endIcon={<LogoutIcon />} onClick={handleLogout} color="inherit">Logout</Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
