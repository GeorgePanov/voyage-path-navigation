import { Authentication } from '~/components/Authentication';

import { AuthProvider } from './context';

export const App = () => {
  return (
    <AuthProvider>
      <Authentication />
    </AuthProvider>
  );
};
