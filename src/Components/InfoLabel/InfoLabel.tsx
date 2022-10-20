import React, { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';

interface InfoLabelInterface {
    labelName: string;
    value: string | undefined | number;
}

export function InfoLabel({ labelName, value }: InfoLabelInterface): ReactElement {
  return (
    <>
      <Box display="flex" color="black">
        <label>{labelName}</label>
        <Typography ml={1} variant="inherit" component="p">
          {value}
        </Typography>
      </Box>
      <Box mb={1} />
    </>
  );
}
