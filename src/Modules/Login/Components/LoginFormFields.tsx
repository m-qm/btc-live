import React, { ReactElement } from 'react';
import { Field, FormikErrors, FormikTouched } from 'formik';
import { Box, useTheme } from '@mui/material';
import { useStylesLogin } from '../Styles/LoginStyles';
import { LoginInitialValuesInterface } from '../Utils/LoginInterfaces';

export interface LoginFormFieldsInterface {
    errors: FormikErrors<LoginInitialValuesInterface>;
    touched: FormikTouched<LoginInitialValuesInterface>
}

export function LoginFormFields({ errors, touched }: LoginFormFieldsInterface): ReactElement {
  const theme = useTheme();

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box sx={useStylesLogin(theme).label}>
          <label>Email</label>
        </Box>
        <Box sx={useStylesLogin(theme).input}>
          <Field autoComplete="off" name="email" type="email" />
        </Box>
        {errors.email && touched.email ? <Box sx={useStylesLogin(theme).errorLabel}>{errors.email}</Box> : null}
      </Box>
      <Box my={2} />
      <Box display="flex" flexDirection="column">
        <Box sx={useStylesLogin(theme).label}>
          <label>Password</label>
        </Box>
        <Box sx={useStylesLogin(theme).input}>
          <Field autoComplete="off" type="password" name="password" />
        </Box>
        {errors.password && touched.password ? (
          <Box sx={useStylesLogin(theme).errorLabel}>{errors.password}</Box>
        ) : null}
      </Box>
    </>
  );
}
