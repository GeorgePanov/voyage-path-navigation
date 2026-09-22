/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

import { users } from '~/shared/users';

const AUTH_KEY = 'authData';
const AUTH_DURATION = 60 * 60 * 1000; // 1 час

type User = (typeof users)[number];

type AuthData = {
  timestamp: number;
  userId: User['userId'];
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  handleEnterPassword: (password: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const getSavedUser = (): User | null => {
  const savedAuth = localStorage.getItem(AUTH_KEY);

  if (!savedAuth) {
    return null;
  }

  try {
    const { timestamp, userId }: AuthData = JSON.parse(savedAuth);

    const isExpired = Date.now() - timestamp >= AUTH_DURATION;

    if (isExpired) {
      localStorage.clear();
      return null;
    }

    const user = users.find((user) => user.userId === userId);

    if (!user) {
      localStorage.clear();
      return null;
    }

    return user;
  } catch {
    localStorage.clear();
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getSavedUser);

  const isAuthenticated = user !== null;

  const handleEnterPassword = (password: string) => {
    const foundUser = users.find((user) => user.dateOfBirth === password);

    if (!foundUser) {
      return false;
    }

    const authData: AuthData = {
      timestamp: Date.now(),
      userId: foundUser.userId,
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));

    setUser(foundUser);

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        handleEnterPassword,
      }}
    >
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
