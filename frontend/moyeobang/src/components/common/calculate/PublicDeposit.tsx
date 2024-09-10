import React from 'react';
import Btn from '../btn/Btn';
import {bluefont, colors} from '@/styles/colors';

interface PublicDepositProps {
  accumulatedMoney: number; // 숫자로 된 금액
  tripName: string; // 여행 이름은 문자열
  budget: string; // 예산도 문자열로 받는다고 가정 (사용자가 입력할 값이므로)
}

const PublicDeposit: React.FC<PublicDepositProps> = ({
  accumulatedMoney,
  tripName,
  budget,
}) => {
  return (
    <>
      <div>
        <span>현재 누적 입금 금액</span>
        <span css={bluefont}>{accumulatedMoney}원</span>
      </div>
      <div>{tripName}을 위해</div>
      <div>
        <input type="text" placeholder={budget} />원
      </div>
      <Btn buttonStyle={{style: 'blue', size: 'thinBig'}}>공금 입금 요청</Btn>
    </>
  );
};

export default PublicDeposit;
