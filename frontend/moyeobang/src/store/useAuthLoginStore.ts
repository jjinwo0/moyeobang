import {create} from 'zustand';
import {persist, PersistStorage} from 'zustand/middleware';

interface AuthLoginState {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  accessTokenExpireTime: string;
  refreshTokenExpireTime: string;
  setAccessTokenExpireTime: (accessTokenExpireTime: string) => void;
  setRefreshTokenExpireTime: (refreshTokenExpireTime: string) => void;
}

const localStoragePersist: PersistStorage<AuthLoginState> = {
  getItem: name => {
    const storedValue = localStorage.getItem(name);
    return storedValue ? JSON.parse(storedValue) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: name => {
    localStorage.removeItem(name);
  },
};

const useAuthLogin = create<AuthLoginState>()(
  persist(
    set => ({
      accessToken: '',
      refreshToken: '',
      accessTokenExpireTime: '',
      refreshTokenExpireTime: '',
      setAccessToken: accessToken => set({accessToken}),
      setRefreshToken: refreshToken => set({refreshToken}),
      setAccessTokenExpireTime: accessTokenExpireTime =>
        set({accessTokenExpireTime}),
      setRefreshTokenExpireTime: refreshTokenExpireTime =>
        set({refreshTokenExpireTime}),
    }),
    {
      name: 'auth-login-store',
      storage: localStoragePersist,
    }
  )
);

export default useAuthLogin;
