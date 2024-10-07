import {css} from '@emotion/react';
import {colors} from '@/styles/colors';

const boxStyle = css`
  width: 100%;
  height: 63px;
  background-color: white;
  border: 1px solid ${colors.customGreenBlue};
  border-radius: 10px;
  margin-bottom: 6px;
  display: flex;
  //   justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 20px;
`;

const tilteStyle = css`
  font-family: 'semibold';
  font-size: 20px;
  margin-left: 20px;
`;

const descriptionStyle = css`
  font-family: 'regular';
  font-size: 12px;
`;

const textStyle = css`
  font-family: 'regular';
  font-size: 16px;
  margin-left: auto;
  margin-right: 20px;
`;

type BoxProps = {
  title: string;
  description?: string;
  updateButton?: string;
};

export default function SettingBox({
  title,
  description,
  updateButton,
}: BoxProps) {
  return (
    <div css={boxStyle}>
      <p css={tilteStyle}>{title}</p>
      {description && <p css={descriptionStyle}>{description}</p>}
      {updateButton && <p css={textStyle}>{updateButton}</p>}
    </div>
  );
}
