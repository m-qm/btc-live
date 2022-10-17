import { Outlet } from 'react-router-dom';
import { SplashView } from './Components/SplashView';

interface SecureRoutesInterface {
  loggedIn: boolean;
}

export const SecureRoutes = ({ loggedIn }: SecureRoutesInterface) =>
  loggedIn ? <Outlet /> : <SplashView />;
