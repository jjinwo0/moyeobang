/** @jsxImportSource @emotion/react */
import {useMutation} from '@tanstack/react-query';
import useMyInfo from '@/store/useMyInfoStore';
import moyeobang from '@/services/moyeobang';
import React, {useState} from 'react';
import Btn from '../btn/Btn';
import {bluefont, colors} from '@/styles/colors';
import {css} from '@emotion/react';
import useTravelDetailStore from '@/store/useTravelDetailStore';
import { useQueryClient } from '@tanstack/react-query';

const basicLayout = css`
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const moneyInputStyle = css`
  height: 30px;
  border: 1px solid ${colors.third};
  border-radius: 50px;
  padding: 12px 16px;
  box-sizing: border-box;
  text-align: center;
  font-family: 'medium';
  font-size: 20px;
  color: ${colors.gray};
  max-width: 120px;

  &:focus {
    outline: none;
  }
`;

const proposal = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
`;

export default function PersonalDeposit({
  travelName,
  setShowModal
}: {
  travelName: TravelName;
  setShowModal : (step:string)=>void
}) {
  const [value, setValue] = useState<number>(0);
  const [focused, setFocused] = useState<boolean>(false); // 입력 필드가 클릭됐는지 여부를 추적
  const {memberId} = useMyInfo();
  const {accountId} = useTravelDetailStore();
  const queryClient = useQueryClient();


  const handleFocus = () => {
    if (!focused) {
      setValue(0); // 처음 클릭 시 입력 필드의 값을 비움
      setFocused(true); // 입력 필드가 클릭되었음을 표시
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const newValue = event.target.value;

    if (newValue==='') {
      setValue(0);
    }

    const numericValue=parseFloat(newValue);

    if (!isNaN(numericValue)) {
      setValue(numericValue); // 숫자일때만 사용자가 입력한 값을 업데이트
    }
  };

  const {mutate: postDepositAccount} = useMutation({
    mutationFn: ({
      accountId,
      memberId,
      amount,
    }: {
      accountId: Id;
      memberId: Id;
      amount: number;
    }) => {
      return moyeobang.postDepositAccount(accountId, memberId, amount);
    },
    onSuccess: async () => {

    await queryClient.invalidateQueries({
          queryKey: ['transactionList', accountId], 
          refetchType: 'all',
      });

    await queryClient.invalidateQueries({
          queryKey: ['accountByGroup', accountId], 
          refetchType: 'all',
      });

    await queryClient.invalidateQueries({
          queryKey: ['accountByMemberId', accountId, memberId], 
          refetchType: 'all',
      });
    }
  });

  const handleOnclick = () => {
    // api로 개인 입금 시키기
    if (value>0) {
      postDepositAccount({
        accountId: accountId,
        memberId: memberId,
        amount: Number(value),
      });
      setShowModal('')
      setValue(0);
    }
  };

  return (
    <div css={basicLayout}>
      <div>{travelName} 을/를 위해</div>
      <div css={proposal}>
        <input
          css={moneyInputStyle}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <div>원 입금해방</div>
      </div>
      <Btn
        buttonStyle={{style: 'blue', size: 'thinBig'}}
        onClick={handleOnclick}
      >
        개인 입금 하기
      </Btn>
    </div>
  );
}
