import React, {createContext, useContext, useState} from 'react';
import {useNavigate} from '@tanstack/react-router';

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
  handleLoginToken: (accessToken: string, refreshToken: string) => void;
  handleLogout: () => void;
  loginProvider: string | null;
  setLoginProvider: React.Dispatch<React.SetStateAction<string | null>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loginProvider, setLoginProvider] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleLoginToken = (accessToken: string, loginProvider: string) => {
    setAccessToken(accessToken);
    setLoginProvider(loginProvider);
    setIsLogin(true);
  };

  const clearAccessToken = () => {
    setAccessToken(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken(null);
    setLoginProvider(null);
    setIsLogin(false);
    clearAccessToken();
    navigate({to: '/entrance'});
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        handleLoginToken,
        handleLogout,
        loginProvider,
        setLoginProvider,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
