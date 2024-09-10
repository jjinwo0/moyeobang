/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React from 'react';
import {colors} from '@/styles/colors';
import Btn from '../btn/Btn';

const CalculateBtn = ()=>{
    const btnLayout = css`
  display: flex;
  gap: 40px;
`;
    return (
        <div css={btnLayout}>
          <Btn buttonStyle={{style: 'greenBlue', size: 'middleSquare'}}>
            공금 요청해방
          </Btn>
          <Btn buttonStyle={{style: 'blue', size: 'middleSquare'}}>
            개인 입금해방
          </Btn>
        </div>
    )
}

export default CalculateBtn