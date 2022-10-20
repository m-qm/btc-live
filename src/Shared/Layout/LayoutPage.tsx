import {
  Box, Container, useMediaQuery, useTheme,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { useStylesLayout } from './Styles/LayoutPageStyles';
import { HeaderBar } from './HeaderBar/HeaderBar';

type LayoutInterface = PropsWithChildren<{
  centered: boolean;
  isLoggedIn?: boolean;
}>;

export function LayoutPage({ children, centered, isLoggedIn = true }: LayoutInterface) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box display="flex" minHeight="100vh" flexDirection="column">
      <HeaderBar isLoggedIn={isLoggedIn} />
      <Box
        display="flex"
        alignItems={centered ? 'center' : 'initial'}
        flexGrow={1}
        mx={isMobile ? 2 : 4}
        sx={useStylesLayout(theme)}
      >
        <Container component="main" maxWidth="lg">
          <Box>{children}</Box>
        </Container>
      </Box>
      <Box my={2} />
    </Box>
  );
}
