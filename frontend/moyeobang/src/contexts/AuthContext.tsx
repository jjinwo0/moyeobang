import React, {createContext, useContext, useState} from 'react';
import {useNavigate} from '@tanstack/react-router';

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
  handleLoginToken: (accessToken: string, accessTokenExpireTime: string, refreshToken: string, refreshTokenExpireTime: string) => void;
  handleLogout: () => void;
  loginProvider: string | null;
  setLoginProvider: React.Dispatch<React.SetStateAction<string | null>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loginProvider, setLoginProvider] = useState<string | null>(null);
  const [accessTokenExpireTime, setAccessTokenExpireTime] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [refreshTokenExpireTime, setRefreshTokenExpireTime] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleLoginToken = (accessToken: string, accessTokenExpireTime: string, refreshToken: string, refreshTokenExpireTime: string) => {
    setAccessToken(accessToken);
    setAccessTokenExpireTime(accessTokenExpireTime);
    setRefreshToken(refreshToken);
    setRefreshTokenExpireTime(refreshTokenExpireTime);
    setIsLogin(true);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken(null);
    setAccessTokenExpireTime(null);
    setRefreshToken(null);
    setRefreshTokenExpireTime(null);
    setLoginProvider(null);
    setIsLogin(false);
    navigate({to: '/entrance'});
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
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
