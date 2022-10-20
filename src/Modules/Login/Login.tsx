import React, {
  ReactElement, useCallback,
} from 'react';
import {
  Box, Button, Paper, Typography, useTheme,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { useSnackbar } from 'notistack';
import { SystemActionTypes, UpdateSessionAction, UserInfoInterface } from '../../Shared/System/SystemTypes';
import { updateSession } from '../../Shared/System/State/SystemActions';
import { getUserRoleByString } from '../../Shared/System/State/SystemSelectors';
import { LoginInitialValues, LoginValidationSchema } from './Utils/LoginHelpers';
import { LoginFormFields, LoginFormFieldsInterface } from './Components/LoginFormFields';
import { LoginInitialValuesInterface } from './Utils/LoginInterfaces';
import { isEmpty } from '../../Shared/Utils/Helpers';
import { useStylesLogin } from './Styles/LoginStyles';
import { AppRoutes } from '../../Shared/Router/Utils/RouterHelpers';

interface LoginInterface {
  userData: UserInfoInterface | undefined
}

export function Login({ userData }: LoginInterface): ReactElement {
  const dispatch = useDispatch<Dispatch<UpdateSessionAction>>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const isValidUser = useCallback(
    (values: LoginInitialValuesInterface):boolean => (userData && !isEmpty(userData) ? values.email === userData.email : false),
    [userData],
  );

  const handleSubmit = useCallback((values: LoginInitialValuesInterface): void => {
    const dispatchAction = dispatch as Dispatch<SystemActionTypes>;
    if (userData && isValidUser(values)) {
      const role = getUserRoleByString(userData.role);
      const userInfo = {
        ...userData,
        role,
      };
      dispatchAction(updateSession(userInfo));
      navigate(AppRoutes.Dashboard);
    } else {
      enqueueSnackbar('User is not found in public/Users.json', { variant: 'error' });
    }
  }, [dispatch, enqueueSnackbar, isValidUser, navigate, userData]);

  return (
    <Box sx={useStylesLogin(theme).box}>
      <Paper elevation={3}>
        <Formik
          initialValues={LoginInitialValues}
          validationSchema={LoginValidationSchema}
          onSubmit={(values: LoginInitialValuesInterface) => handleSubmit(values)}
        >
          {({ errors, touched }: LoginFormFieldsInterface) => (
            <Box sx={useStylesLogin(theme).form}>
              <Form>
                <Typography variant="h4" component="h4">
                  Sign in
                </Typography>
                <Box my={2} />
                <LoginFormFields errors={errors} touched={touched} />
                <Box mt={2} />
                <Box sx={useStylesLogin(theme).button}>
                  <Button disabled={!isEmpty(errors)} endIcon={<LoginIcon />} variant="contained" type="submit">Sign in</Button>
                </Box>
              </Form>
            </Box>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
