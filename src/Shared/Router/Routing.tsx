import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginPage } from '../../Modules/Login/LoginPage';
// import { DashboardPage } from '../../Modules/Dashboard/DashboardPage';
import { systemStateSelector } from '../System/State/SystemSelectors';
import { AppRoutes } from './Utils/RouterHelpers';
import { SecureRoutes } from './Routes';

export const Routing: React.FC = () => {
  const systemState = useSelector(systemStateSelector);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route
          path="/"
          element={<SecureRoutes loggedIn={systemState.loggedIn} />}
        >
          {/* <Route path={AppRoutes.Dashboard} element={<DashboardPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
