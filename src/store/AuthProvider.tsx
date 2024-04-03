import { ReactNode, createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  login: (email: string, userId: number) => {},
  logout: () => {},
  isUserLoggedIn: false,
  email: '',
});

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const emailFromLocalStorage = localStorage.getItem('email');
  const userIdFromLocalStorage = localStorage.getItem('userId');
  const [email, setEmail] = useState(emailFromLocalStorage || '');
  const [userId, setUserId] = useState(userIdFromLocalStorage ? +userIdFromLocalStorage : 0);

  const isUserLoggedIn = !!email;

  function login(email: string, userId: number) {
    setEmail(email);
    setUserId(userId);
    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId.toString());
  }

  function logout() {
    setEmail('');
    setUserId(0);
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
  }
  const value = {
    login,
    logout,
    isUserLoggedIn: isUserLoggedIn,
    email: email,
    userId: userId,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthCtx() {
  return useContext(AuthContext);
}
