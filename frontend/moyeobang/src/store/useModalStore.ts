import {create} from 'zustand';

// 상태 타입 정의
interface ModalState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

// Zustand 스토어 생성 시 타입 지정
const useModalStore = create<ModalState>(set => ({
  isModalOpen: false,
  openModal: () => set({isModalOpen: true}),
  closeModal: () => set({isModalOpen: false}),
}));

export default useModalStore;
