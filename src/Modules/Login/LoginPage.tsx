import { ReactElement } from 'react';
import { Login } from './Login';
import { LayoutPage } from '../../Shared/Layout/LayoutPage';

export function LoginPage(): ReactElement {
  return (
    <LayoutPage centred>
      <Login userData={undefined} />
    </LayoutPage>
  );
}
