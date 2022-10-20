import React, { ReactElement } from 'react';
import {
  Box, Link, SxProps, Typography,
} from '@mui/material';

interface InfoLabelRowInterface {
    labelName: string;
    value: string | undefined | number;
    labelSx: SxProps;
    withLink?: boolean;
    link?: string;
}

export function InfoLabelRow({
  labelName, value, labelSx, withLink = false, link = '',
}: InfoLabelRowInterface): ReactElement {
  return (
    <>
      <Box sx={labelSx}>
        <label>
          {labelName}
        </label>
      </Box>
      <Typography variant="inherit" component="p">
        {withLink ? (
          <Link href={link} underline="hover">
            {value}
          </Link>
        ) : value}
      </Typography>
      <Box mb={1} />
    </>
  );
}
