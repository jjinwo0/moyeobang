import {createContext, useContext, useState} from 'react';

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // const login = (accessToken: string, refreshToken: string) => {
  //     setAccessToken(accessToken);
  //     setRefreshToken(refreshToken);
  // };

  // const logout = () => {
  //     setAccessToken(null);
  //     setRefreshToken(null);

  // };
  return (
    <AuthContext.Provider
      value={{accessToken, refreshToken, setAccessToken, setRefreshToken}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
