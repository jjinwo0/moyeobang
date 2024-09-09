/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react';
import {useState} from 'react';
import navBar from '@/assets/icons/navBar.png';
import travelLog from '@/assets/icons/travelLog.webp';
import wallet from '@/assets/icons/wallet.png';
import coin from '@/assets/icons/coin.png';

const footer = css`
  position: fixed;
  bottom: 0;
  z-index: 1000;
`;

const nav = css`
  width: 390px;
  height: 76.522px;
  background-image: url(${navBar});
  background-size: cover;
  background-repeat: no-repeat;
  flex-shrink: 0;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 163px;
`;

const travel = (isSelected: boolean) => css`
  // display: flex;
  align-items: center;
  p {
    font-family: 'semibold';
    font-size: 12px;
    margin-left: 5px;
    color: ${isSelected
      ? '#03A6FF'
      : 'rgba(0, 0, 0, 0.6)'}; /* 선택된 경우 색상 변경 */
  }
`;

const account = (isSelected: boolean) => css`
  // display: flex;
  align-items: center;
  p {
    font-family: 'semibold';
    font-size: 12px;
    margin-left: 3px;
    color: ${isSelected
      ? '#03A6FF'
      : 'rgba(0, 0, 0, 0.6)'}; /* 선택된 경우 색상 변경 */
  }
`;

const cal = css`
  width: 65px;
  height: 65px;
  background-color: rgba(135, 224, 255, 0.3);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -41px auto;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.4);

  p {
    font-family: 'semibold';
    font-size: 12px;
    margin-top: 3px;
    display: flex;
    margin-right: 1px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>('travel');

  return (
    <div css={footer}>
      <div css={cal}>
        <img src={coin} width={35} height={35} />
        <p>정산</p>
      </div>
      <div css={nav}>
        <div
          css={travel(selectedItem === 'travel')}
          onClick={() => setSelectedItem('travel')}
        >
          <img src={travelLog} width={50} height={50} alt="여행 기록" />
          <p>여행기록</p>
        </div>
        <div
          css={account(selectedItem === 'account')}
          onClick={() => setSelectedItem('account')}
        >
          <img src={wallet} width={50} height={50} />
          <p>모임통장</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
