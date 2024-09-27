import React, {useState} from 'react';
import {css} from '@emotion/react';
import LineInput from '../common/Inputs/LineInput';
import Btn from '../common/btn/Btn';
import certificationExample from '@/assets/icons/certificationExample.png';
import SsafyBankNotification from '../notification/SsafyBankNotification';
import {useMutation} from '@tanstack/react-query';
import moyeobang from '@/services/moyeobang';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 5px;
  margin-bottom: 30px;
`;

const descriptionStyle = css`
  font-family: 'regular';
  font-size: 18px;
  text-align: left;
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
  border-bottom: 2px solid black;
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
  onVerify: () => void; // 인증 완료 시 호출할 함수
}

export default function CertificationOne({
  onClose,
  onVerify,
}: CertificationOneProps) {
  const [isCertificationVisible, setCertificationVisible] =
    useState<boolean>(false);
  const [checkButton, setCheckButton] = useState<boolean>(false);
  const [accountNumber, setAccountNumber] = useState<string>(''); // 계좌번호 상태 추가
  const [verifyNumber, setVerifyNumber] = useState<string>(''); // 인증번호 상태 추가

  const handleVerify = () => {
    if (accountNumber.length > 0) {
      // 계좌번호가 입력되어 있을 때만 실행
      // postDepositAccountOne({accountNumber, bankName: '싸피뱅크'});
      //[todo] 지금은 여기에 있는데 추후에 바꿔야함

      setTimeout(() => {
        setCertificationVisible(true); // 1.5초 후에 상태 변경
      }, 1500);
      setCheckButton(true);
    } else {
      alert('계좌번호를 입력해주세요');
    }
  };

  const handleCertification = () => {
    console.log('verifyNumber', verifyNumber);
    //[todo] 인증번호 추후 수정 가능(하드코딩)
    if (verifyNumber === '6495') {
      alert('인증에 성공하였습니다.');
      onVerify(); // 부모에게 인증 완료 알리기
    } else {
      alert('인증번호를 다시 확인해주세요');
    }
  };

  // //[todo] 계좌인증 성공 시 싸피뱅크에서 입금 내역 조회
  // const {mutate: postDepositAccountOne} = useMutation({
  //   mutationFn: async({accountNumber, bankName}: {accountNumber: string, bankName: string}) => {
  //     await moyeobang.postDepositAccountOne(accountNumber, bankName);
  //   },
  //   onSuccess: response => {
  //     console.log('response', response);
  //     const {status} = response as unknown as {status: string};
  //     if(status === 'SUCCESS'){
  //       console.log('계좌인증 성공');
  //       //[todo] 싸피뱅크에서 입금 내역 조회해야함
  //     } else{
  //       alert('계좌인증 실패');
  //     }
  //   }
  // })

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
          value={accountNumber} // 계좌번호 상태와 연결
          onChange={e => setAccountNumber(e.target.value)} // 입력값 변경 시 상태 업데이트
        />
        <div css={btnStyle}>
          <Btn
            buttonStyle={{style: 'blue', size: 'big'}}
            onClick={handleVerify}
          >
            계좌인증 하기
          </Btn>
        </div>

        <div css={labelStyle}>인증 번호</div>
        <div css={exampleStyle}>
          <img src={certificationExample} />
        </div>

        <LineInput
          placeholder="인증번호 4자리를 입력해주세요"
          value={verifyNumber}
          onChange={e => setVerifyNumber(e.target.value)}
        />
        {checkButton && (
          <div css={btnStyle}>
            <Btn
              buttonStyle={{style: 'blue', size: 'big'}}
              onClick={handleCertification} // 인증 번호 확인 클릭 시 호출
            >
              인증번호 확인
            </Btn>
          </div>
        )}
      </div>
      {isCertificationVisible && (
        <SsafyBankNotification
          setCertificationVisible={setCertificationVisible}
        />
      )}{' '}
      {/* 인증 완료 시 컴포넌트 표시 */}
    </>
  );
}
