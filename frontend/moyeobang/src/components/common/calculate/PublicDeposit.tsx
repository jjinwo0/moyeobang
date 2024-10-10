/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import Btn from '../btn/Btn';
import {colors} from '@/styles/colors';
import {css} from '@emotion/react';
import moyeobang from '@/services/moyeobang';
import {useMutation} from '@tanstack/react-query';
import useTravelDetailStore from '@/store/useTravelDetailStore';

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
  padding: 12px 8px;
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

type PublicDepositProps = {
  budget: number;
  travelName: string;
};

export default function PublicDeposit({
  travelName,
  budget,
}: PublicDepositProps) {
  const [value, setValue] = useState<string | number>(budget);
  const [focused, setFocused] = useState<boolean>(false); // 입력 필드가 클릭됐는지 여부를 추적
  const {travelId} = useTravelDetailStore();

  const {mutate: postResquestDepositAccount} = useMutation({
    mutationFn: ({
      travelId,
      title,
      amount,
    }: {
      travelId: Id;
      title: string;
      amount: number;
    }) => {
      return moyeobang.postResquestDepositAccount(travelId, title, amount);
    },
  });

  const handleFocus = () => {
    if (!focused) {
      setValue(''); // 처음 클릭 시 입력 필드의 값을 비움
      setFocused(true); // 입력 필드가 클릭되었음을 표시
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value); // 사용자가 입력한 값을 업데이트
  };

  const handleOnclick = () => {
    // 공금 요청 알림 보내기
    postResquestDepositAccount({
      travelId,
      title: travelName,
      amount: Number(value),
    });
    setValue(0);
    setFocused(false); // 다시 초기화
  };

  return (
    <div css={basicLayout}>
      <div>
        <span style={{color: colors.fourth, fontFamily: 'semibold'}}>
          {travelName}
        </span>{' '}
        을/를 위해
      </div>
      <div css={proposal}>
        <input
          css={moneyInputStyle}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <div>원 공금을 요청해방</div>
      </div>
      <Btn
        buttonStyle={{style: 'blue', size: 'thinBig'}}
        onClick={handleOnclick}
      >
        공금 입금 요청
      </Btn>
    </div>
  );
}
