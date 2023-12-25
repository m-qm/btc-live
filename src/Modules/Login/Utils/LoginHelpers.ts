import * as Yup from 'yup';
import { LoginInitialValuesInterface } from './LoginInterfaces';

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("No password provided."),
});

export const LoginInitialValues: LoginInitialValuesInterface = {
  password: '',
  email: '',
};
