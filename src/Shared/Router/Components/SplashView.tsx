import React, { ReactElement } from 'react';
import { Box, LinearProgress, Link } from '@mui/material';
import { AppRoutes } from '../Utils/RouterHelpers';

export const SplashView = (): ReactElement => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    top={0}
    left={0}
    width="100%"
    height="100%"
    zIndex="tooltip"
    position="fixed"
    bgcolor="white"
  >
    <Box width="318px" textAlign="center">
      Page is not available. Please
      {' '}
      <Link href={AppRoutes.Login} underline="hover">
        Login
      </Link>
      <Box my={3} />
      <LinearProgress />
      <Box my={3} />
    </Box>
  </Box>
);
