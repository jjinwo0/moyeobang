import {create} from 'zustand';
import {persist, PersistStorage} from 'zustand/middleware';

interface MyInfoState {
  memberId: Id;
  memberName: MemberName;
  profileImage: ImgUrl;
  bankName: BankName;
  accountNumber: SourceAccountNumber;
  accountId: Id;
  setMemberId: (memberId: Id) => void;
  setMemberName: (memberName: MemberName) => void;
  setProfileImage: (profileImage: ImgUrl) => void;
  setBankName: (bankName: BankName) => void;
  setAccountNumber: (accountNumber: SourceAccountNumber) => void;
  setAccountId: (accountId: Id) => void;
}

const useMyInfo = create<MyInfoState>()(
  persist(
    set => ({
      memberId: 5,
      memberName: '',
      profileImage: '',
      bankName: '',
      accountNumber: '',
      accountId: 0,
      setMemberId: memberId => set({memberId}),
      setMemberName: memberName => set({memberName}),
      setProfileImage: profileImage => set({profileImage}),
      setBankName: bankName => set({bankName}),
      setAccountNumber: accountNumber => set({accountNumber}),
      setAccountId: accountId => set({accountId}),
    }),
    {
      name: 'myInfo',
    }
  )
);

export default useMyInfo;
