import {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Login } from './Login';
import { LayoutPage } from '../../Shared/Layout/LayoutPage';
import AuthService from '../../Services/Auth-Service';
import { UserInfoInterface } from '../../Shared/System/SystemTypes';
import { systemStateSelector } from '../../Shared/System/State/SystemSelectors';

export function LoginPage(): ReactElement {
  const [userData, setUserData] = useState<UserInfoInterface | undefined>();
  const systemState = useSelector(systemStateSelector);

  const handleLogin = useCallback((): void => {
    AuthService
      .login()
      .then((data: UserInfoInterface) => {
        setUserData(data);
      }).catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    handleLogin();
  }, [handleLogin]);

  return (
    <LayoutPage centered isLoggedIn={systemState.loggedIn}>
      <Login userData={userData} />
    </LayoutPage>
  );
}
