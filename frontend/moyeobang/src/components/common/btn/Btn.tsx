import { css } from '@emotion/react';

/** Button.tsx */
import React from 'react';
import StyledButton from './btn';

interface ButtonProps {
  buttonStyle: {
    style: 'primary' | 'secondary' | 'danger';
    size: 'tiny' | 'small' | 'middle' | 'big';
  };
}

const GeneralButton: React.FC<ButtonProps> = ({ children, buttonStyle }) => {
  return (
    <StyledButton
      variant={buttonStyle.style}
      size={buttonStyle.size}
    >
      {children}
    </StyledButton>
  );
};

export default GeneralButton;

