/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import Btn from '../btn/Btn';
import {bluefont, colors} from '@/styles/colors';
import {css} from '@emotion/react';

// 특정 받아오는 요소들, 여행 관련된 정보들
interface PersonalDepositProps {
  tripName: string; // 여행 이름은 문자열
}

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
  max-width: 50%;

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

const PublicDeposit: React.FC<PersonalDepositProps> = ({tripName}) => {
  const [value, setValue] = useState<number>(0);

  return (
    <div css={basicLayout}>
      <div>{tripName}을 위해</div>
      <div css={proposal}>
        <input
          css={moneyInputStyle}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <div>원 입금해방</div>
      </div>
      <Btn buttonStyle={{style: 'blue', size: 'thinBig'}}>개인 입금 하기</Btn>
    </div>
  );
};

export default PublicDeposit;
