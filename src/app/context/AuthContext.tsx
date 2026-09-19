/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

import { usersDateOfBirth } from '~/shared/users';

const AUTH_KEY = 'authTimeStamp';

type AuthContextType = {
  isAuthenticated: boolean;
  handleEnterPassword: (password: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedTime = localStorage.getItem(AUTH_KEY);

    if (!savedTime) {
      return false;
    }

    // Через час очищать
    const isOneDayPassed = Date.now() - Number(savedTime) >= 60 * 60 * 1000;

    if (isOneDayPassed) {
      localStorage.removeItem(AUTH_KEY);
      return false;
    }

    return true;
  });

  const handleEnterPassword = (password: string) => {
    const isCorrect = usersDateOfBirth.includes(password);

    if (isCorrect) {
      localStorage.setItem(AUTH_KEY, Date.now().toString());
      setIsAuthenticated(true);
    }

    return isCorrect;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleEnterPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
