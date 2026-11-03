import { create } from 'zustand';

import { users } from '~/shared/users';

const AUTH_KEY = 'authData';
const AUTH_DURATION = 60 * 60 * 1000; // 1 час

type User = (typeof users)[number];

type AuthData = {
  timestamp: number;
  userId: User['userId'];
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  handleEnterPassword: (password: string) => boolean;
};

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

const savedUser = getSavedUser();

export const useAuth = create<AuthState>((set) => ({
  user: savedUser,
  isAuthenticated: savedUser !== null,
  handleEnterPassword: (password) => {
    const foundUser = users.find((user) => user.dateOfBirth === password);

    if (!foundUser) {
      return false;
    }

    const authData: AuthData = {
      timestamp: Date.now(),
      userId: foundUser.userId,
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));

    set({
      isAuthenticated: true,
      user: foundUser,
    });

    return true;
  },
}));
