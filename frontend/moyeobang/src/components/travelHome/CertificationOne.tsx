import React from 'react';
import {css} from '@emotion/react';
import LineInput from '../common/Inputs/LineInput';
import Btn from '../common/btn/Btn';
import certificationExample from '@/assets/icons/certificationExample.png';
// import deleteCircle from '@/assets/icons/deleteCircle.png';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 부모 요소에서 왼쪽 정렬 */
  width: 100%; /* 부모 요소의 전체 너비 사용 */
  padding: 5px; /* 양쪽 패딩 추가 */
  margin-bottom: 30px;
`;

const descriptionStyle = css`
  font-family: 'regular';
  font-size: 18px;
  /* margin-bottom: 50px; */
  text-align: left; /* 텍스트가 왼쪽에 정렬되도록 설정 */
  margin-left: 30px;
  margin-bottom: 10px;
`;

const lineContainerStyle = css`
  width: 330px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
const linStyle = css`
  width: 100%;
  border: none;
  border-bottom: 2px solid black; /* 밑줄 스타일 */
  padding: 8px 0;
  font-size: 24px;
  font-family: 'semibold';
  outline: none;
  transition: border-color 0.3s ease;
  margin-bottom: 30px;
`;

const labelStyle = css`
  margin-bottom: 8px;
  font-family: 'regular';
  font-size: 14px;
  color: #333;
`;

const btnStyle = css`
  margin: 20px 0;
`;

const exampleStyle = css`
  margin-top: 5px;
  margin-bottom: 8px;
  margin-left: 1.5px;
  img {
    width: 330px;
  }
`;

interface CertificationOneProps {
  onClose: () => void;
}

export default function CertificationOne({onClose}: CertificationOneProps) {
  const handleCertification = () => {
    onClose();
  };
  return (
    <>
      <div css={containerStyle}>
        <p css={descriptionStyle}>계좌정보를 입력해주세요</p>
        <p css={descriptionStyle}>해당 계좌로 1원을 입금해드려요</p>
      </div>
      <div css={lineContainerStyle}>
        <div css={labelStyle}>은행</div>
        <div css={linStyle}>싸피뱅크</div>

        <LineInput
          label="계좌번호"
          placeholder="-를 제외한 숫자만 입력해주세요"
        />
        <div css={btnStyle}>
          <Btn buttonStyle={{style: 'blue', size: 'big'}}>계좌인증 하기</Btn>
        </div>

        <div css={labelStyle}>인증 번호</div>
        <div css={exampleStyle}>
          <img src={certificationExample} />
        </div>

        <LineInput placeholder="인증번호 4자리를 입력해주세요" />
        <div css={btnStyle}>
          <Btn
            buttonStyle={{style: 'blue', size: 'big'}}
            onClick={handleCertification}
          >
            인증번호 확인
          </Btn>
        </div>
        {/* <div css={finishStyle}>
          <Btn buttonStyle={{style: 'gray', size: 'small'}}>완료</Btn>
        </div> */}
      </div>
    </>
  );
}
