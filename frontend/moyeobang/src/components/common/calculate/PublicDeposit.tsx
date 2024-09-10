/** @jsxImportSource @emotion/react */
import React from 'react';
import Btn from '../btn/Btn';
import {bluefont, colors} from '@/styles/colors';
import {css} from '@emotion/react';

// 특정 받아오는 요소들, 여행 관련된 정보들
interface PublicDepositProps {
  accumulatedMoney: number; // 숫자로 된 금액
  tripName: string; // 여행 이름은 문자열
  budget: string; // 예산도 문자열로 받는다고 가정 (사용자가 입력할 값이므로)
}

const basicLayout = css`
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const accumulatedMoneyLayout = css`
  display: flex;
  gap: 10px;
  font-family: 'semibold';
  font-size: 18px;
  margin-bottom: 10px;
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
  max-width: 50%;
`;

const proposal = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
`

const PublicDeposit: React.FC<PublicDepositProps> = ({
  accumulatedMoney,
  tripName,
  budget,
}) => {
  return (
    <div css={basicLayout}>
      <div css={accumulatedMoneyLayout}>
        <span>현재 누적 입금 금액</span>
        <span css={bluefont}>{accumulatedMoney}원</span>
      </div>
      <div>{tripName}을 위해</div>
      <div css={proposal}>
        <input css={moneyInputStyle} type="text" value={budget} />원
        <div>공금을 요청해방</div>
      </div>
      <Btn buttonStyle={{style: 'blue', size: 'thinBig'}}>공금 입금 요청</Btn>
    </div>
  );
};

export default PublicDeposit;
