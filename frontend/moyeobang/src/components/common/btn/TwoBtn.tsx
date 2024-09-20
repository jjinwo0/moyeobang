import React, {act, useState} from 'react';
import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {colors} from '@/styles/colors';

const baseDivStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.black};
  cursor: pointer;
  font-family: 'semibold';
  font-size: 24px;
  border-bottom: 2px solid ${colors.black};
  padding-bottom: 0;
`;

// 왼쪽 오른쪽 스타일을 줌
const StyledDiv = styled.div<{isActive: boolean}>`
  ${baseDivStyle}
  /* 인자를 props로 받아와서 확인함 */
  color: ${({isActive}) => (isActive ? colors.third : colors.black)};
  border-bottom-color: ${({isActive}) =>
    isActive ? colors.third : colors.black};
  span {
    font-family: 'englishbold';
    font-size: 24px;
    padding-top: 3px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 390px;
  height: 38px;
  gap: 75px;
`;

interface BtnProps {
  leftText: React.ReactNode; // 왼쪽 버튼에 들어갈 텍스트
  rightText: React.ReactNode; // 오른쪽 버튼에 들어갈 텍스트
  onLeftClick?: () => void; // 왼쪽 버튼 클릭 핸들러
  onRightClick?: () => void; // 오른쪽 버튼 클릭 핸들러
  defaultActive?: 'left' | 'right';
}

export default function TwoBtn({
  leftText,
  rightText,
  onLeftClick,
  onRightClick,
  defaultActive = 'left',
}) {
  const [activeButton, setActiveButton] = useState<'left' | 'right'>(
    defaultActive
  ); // 기본값은 'left'
  const onLeftHandler = () => {
    setActiveButton('left');
    if (onLeftClick) {
      onLeftClick();
    }
  };

  const onRightHandler = () => {
    setActiveButton('right');
    if (onRightClick) {
      onRightClick();
    }
  };
  return (
    <ButtonContainer>
      <StyledDiv isActive={activeButton === 'left'} onClick={onLeftHandler}>
        {leftText}
      </StyledDiv>
      <StyledDiv isActive={activeButton === 'right'} onClick={onRightHandler}>
        {rightText}
      </StyledDiv>
    </ButtonContainer>
  );
}

{
  /* <TwoBtn
  leftText={
    <>
      <span>QR</span>&nbsp;결제
    </>
  }
  rightText={
    <>
      <span>QR</span>&nbsp;스캔
    </>
  }
></TwoBtn>; */
}
