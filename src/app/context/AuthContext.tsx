/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  handleEnterPassword: (password: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const CORRECT_PASSWORD = '1234';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleEnterPassword = (password: string) => {
    const isCorrect = password === CORRECT_PASSWORD;

    if (isCorrect) {
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
