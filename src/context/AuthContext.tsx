import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, UserDto } from '../types';
import { LOGIN_PAGE, MAIN_PAGE } from '../configs';
import { toast } from 'react-toastify';

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserDto | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback((data: UserDto) => {
    setUser(data);
    const userStorage = localStorage.getItem('user');
    localStorage.setItem('user', JSON.stringify(data));
    if (userStorage === null) {
      toast.success('Login efetuado com sucesso.');
      navigate(MAIN_PAGE);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
    navigate(LOGIN_PAGE);
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
