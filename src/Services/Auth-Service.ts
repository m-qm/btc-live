import { AxiosResponse } from 'axios';
import { API_USERS } from '../Api/Api';
import {
  localGet,
} from './HTTP-Service';
import { UserInfoInterface } from '../Shared/System/SystemTypes';

const login = (): Promise<UserInfoInterface> => localGet(API_USERS)
  .then((data: AxiosResponse) => data.data);

const AuthService = {
  login,
};

export default AuthService;
