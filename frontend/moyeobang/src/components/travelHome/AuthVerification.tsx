import React, {useState, useEffect} from 'react';
import {css} from '@emotion/react';
import blackBlankCheck from '@/assets/icons/blackBlankCheck.png';
import blackCheck from '@/assets/icons/blueCheck.png';
import oneLeftArrow from '@/assets/icons/oneLeftArrow.png';
import Btn from '../common/btn/Btn';
import BankAuth from './BankAuth';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import moyeobang from '@/services/moyeobang';

// 스타일 정의

const containerStyle = css`
  height: 100vh;
  flex-grow: 1;
`;
const authStyle = css`
  display: flex;
  flex-direction: column;
  font-family: 'regular';
  font-size: 20px;
  align-items: center;
  margin-top: 25px;
  flex-grow: 1;
  // height: 100vh;

  p {
    align-self: flex-start;
    margin-left: 15px;
    margin-bottom: 15px;
  }
`;

const checkStyle = css`
  display: flex;
  flex-direction: column;
  font-family: 'regular';
  font-size: 20px;
  margin-top: 40px;

  p {
    align-self: flex-start;
    margin-left: 15px;
    margin-bottom: 20px;
  }

  .terms-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; /* 부모 요소의 전체 너비를 차지하게 함 */
    margin-bottom: 15px;
  }

  .terms-text {
    display: flex;
    align-items: center; /* 체크박스와 텍스트를 수평으로 정렬 */
  }

  span {
    margin-top: 0;
  }
`;

const allAgreeStyle = css`
  display: flex;
  align-items: center; /* 체크박스와 텍스트를 수평으로 맞춤 */
  font-family: 'semibold';
  margin-top: 0;
  margin-bottom: 15px;
`;

const checkIconStyle = css`
  width: 24px;
  margin-left: 15px;
  margin-right: 8px;
  vertical-align: middle; /* 체크박스와 텍스트가 중간에 맞춰짐 */
`;

const arrowIconStyle = css`
  width: 8px;
  margin-left: auto; /* 화살표가 오른쪽에 고정되도록 설정 */
  margin-right: 5px;
`;

const completeStyle = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 235px;
  margin-right: 10px;
`;

interface AuthVerificationProps {
  onClose: () => void;
  formData: FormData;
}

export default function AuthVerification({
  onClose,
  formData,
}: AuthVerificationProps) {
  // 각 체크박스의 상태 관리
  const [allChecked, setAllChecked] = useState<boolean>(false); // 전체 동의 상태
  const [termsChecked, setTermsChecked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]); // 각 약관의 체크 상태

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false); // 인증 상태 추가

  useEffect(() => {
    // formData가 제대로 전달되었는지 확인
    console.log('Received FormData:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  }, [formData]);

  // 체크박스 클릭 시 이미지 토글
  const handleCheckToggle = (index: number) => {
    const updatedChecked = [...termsChecked];
    updatedChecked[index] = !updatedChecked[index];
    setTermsChecked(updatedChecked);
  };

  // 전체 동의 클릭 시 모든 체크박스 상태 변경
  const handleAllAgreeToggle = () => {
    const newState = !allChecked;
    setAllChecked(newState);
    setTermsChecked(termsChecked.map(() => newState));
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handlecloseModal = () => {
    setShowModal(false); // 모달을 닫기만 하고 인증 상태는 변경하지 않음
  };

  const handleVerificationComplete = () => {
    setIsVerified(true); // 인증 완료 시에만 인증 상태를 변경
    setShowModal(false); // 인증 완료 후 모달 닫기
  };

  //[todo] 여행 생성 api 연결 필요
  const queryClient = useQueryClient();


  const {mutate: postTravel} = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await moyeobang.postTravel(formData);
      return response.data; // Axios의 response.data 반환
    },
    onSuccess: async (response: MoyeobangResponse<ResponsePostTravel>) => {
      const {travelId} = response.data; // 응답에서 travelId 추출

      // travelList 쿼리 무효화 및 재요청
      await queryClient.invalidateQueries({
        queryKey: ['travelList'],
        refetchType: 'all',
      });

      // travelId를 사용해 postAccount 호출
      // postAccount(travelId);
    },
  });

  // //[todo] 여행 계좌 생성
  // const {mutate:postAccount} = useMutation({
  //   mutationFn:(travelId:number) => moyeobang.postAccount(travelId),
  //   onSuccess: async(response) => {
  //     await queryClient.invalidateQueries({
  //       queryKey:['accountNumber'],
  //       refetchType:'all'
  //     })
  //   }
  // })

  const handleCompleteClick = () => {
    if (isVerified && isAllTermsAgreed) {
      //[todo] 여행 생성 함수 호출
      postTravel(formData);

      onClose(); // 완료 버튼이 파란색일 때만 모달 닫기
    } else {
      alert('본인 인증 및 약관 동의를 모두 완료해야 합니다.');
    }
  };

  const isAllTermsAgreed = termsChecked.every(checked => checked); // 모든 이용약관 동의 됐는지 확인 하기 위해 every 메서드 사용

  return (
    <>
      <div css={containerStyle}>
        <div css={authStyle}>
          <p>본인 인증</p>
          <Btn
            buttonStyle={{style: isVerified ? 'gray' : 'blue', size: 'big'}}
            onClick={handleShowModal}
          >
            본인인증 하러 가기
          </Btn>
        </div>
        <div css={checkStyle}>
          <p>약관 동의</p>

          {/* 전체 동의 */}
          <div css={allAgreeStyle} onClick={handleAllAgreeToggle}>
            <img
              css={checkIconStyle}
              src={allChecked ? blackCheck : blackBlankCheck}
              alt="체크박스"
            />
            <span>전체 동의</span>
          </div>

          {/* 각 약관 항목 */}
          {[
            '모임 통장 이용 약관',
            '계좌간 자동이체 약관',
            '전자금융거래 약관',
            '예금거래기본 약관',
          ].map((term, index) => (
            <div className="terms-item" key={index}>
              <div
                className="terms-text"
                onClick={() => handleCheckToggle(index)}
              >
                <img
                  css={checkIconStyle}
                  src={termsChecked[index] ? blackCheck : blackBlankCheck}
                  alt="체크박스"
                />
                <span>[필수] {term}</span>
              </div>
              <img
                src={oneLeftArrow}
                css={arrowIconStyle}
                alt="화살표 아이콘"
              />
            </div>
          ))}
        </div>

        <div css={completeStyle}>
          <Btn
            buttonStyle={{
              style: isVerified && isAllTermsAgreed ? 'blue' : 'gray',
              size: 'small',
            }}
            onClick={handleCompleteClick} // 완료 클릭 시 처리
          >
            완료
          </Btn>
        </div>
      </div>

      {showModal && (
        <BankAuth
          onClose={handlecloseModal}
          onVerify={handleVerificationComplete}
        />
      )}
    </>
  );
}
