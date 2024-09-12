import React from 'react';
import styled from '@emotion/styled';
import {baseButtonStyle, sizeStyles, variantStyles} from './btnStyle'; // 스타일 가져오기

// StyledButton 컴포넌트 생성
const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
}>`
  ${baseButtonStyle}
  ${({variant}) => variantStyles[variant]} // variant에 따른 스타일 적용
  ${({size}) => sizeStyles[size]} // size에 따른 스타일 적용
`;

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: {
    style: ButtonVariant; // ButtonVariant 타입으로 스타일 선택
    size: ButtonSize; // ButtonSize 타입으로 크기 선택
  };
  children: React.ReactNode;
}

export default function Btn({buttonStyle, children, ...props}: BtnProps) {
  return (
    <StyledButton
      variant={buttonStyle.style}
      size={buttonStyle.size}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
