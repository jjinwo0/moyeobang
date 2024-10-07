import {create} from 'zustand';
import {persist, PersistStorage} from 'zustand/middleware';

interface FcmTokenState {
  isfcmToken: boolean; // FCM 토큰 존재 여부를 boolean으로 관리
  setIsFcmToken: (tokenExists: boolean) => void; // 토큰 존재 여부를 설정하는 함수
}

// Custom storage object for Zustand
const localStoragePersist: PersistStorage<FcmTokenState> = {
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

const useFcmStore = create<FcmTokenState>()(
  persist(
    set => ({
      isfcmToken: false, // 초기값은 false (토큰 없음)
      setIsFcmToken: (tokenExists: boolean) => set({isfcmToken: tokenExists}), // 토큰 존재 여부를 저장
    }),
    {
      name: 'fcm-token-storage', // 로컬스토리지에 저장될 key 이름
      storage: localStoragePersist, // Use the custom storage object
    }
  )
);

export default useFcmStore;
