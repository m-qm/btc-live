import { SplashView } from './Components/SplashView';
import { DashboardPage } from '../../Modules/Dashboard/DashboardPage';

interface SecureRoutesInterface {
  loggedIn: boolean
}

export const SecureRoutes = ({ loggedIn }: SecureRoutesInterface) => (loggedIn ? <DashboardPage /> : <SplashView />);
