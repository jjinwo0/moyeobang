import React from 'react';
import {css} from '@emotion/react';
import Btn from '../common/btn/Btn';
import {colors} from '@/styles/colors';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import moyeobang from '@/services/moyeobang';

const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 배경을 검은색 반투명으로 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101; /* 다른 요소 위에 표시되도록 설정 */
`;

const modalContentStyle = css`
  color: ${colors.fifth};
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 240px;
  text-align: center;
  font-family: 'bold';
  font-size: 24px;
  gap: 10px;

  p {
    color: ${colors.black};
  }
`;

const btnStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center; /* 버튼을 가로로 가운데 정렬 */
  gap: 30px; /* 버튼들 간의 간격 */
  margin-top: 10px;
`;

interface ExitTravelProps {
  travelTitle: string; // travelTitle prop의 타입을 문자열로 정의
  onClose: () => void;
  travelId: number;
}

export default function ExitTravel({
  travelTitle,
  onClose,
  travelId,
}: ExitTravelProps) {
  // //[todo] 여행 삭제 api 연결
  // const queryClient = useQueryClient();
  // const {mutate: leaveTravel} = useMutation({
  //   //zustand에서 멤버Id 꺼내와서 넣기
  //   mutationFn: (travelId: Id) => moyeobang.leaveTravel(travelId,memberId),
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: ['travelList'],
  //       refetchType: 'all',
  //     });
  //   },
  // });

  const handleExitTravel = (travelId: number) => {
    onClose();
    //[todo]나가기 API 호출 함수 추가해야함
    // leaveTravel(travelId);
  };

  return (
    <div css={modalOverlayStyle}>
      <div css={modalContentStyle}>
        {travelTitle}
        <p>여행모임을</p>
        <p>나가시겠습니까?</p>

        {/* 버튼들을 옆으로 나란히 배치 */}
        <div css={btnStyle}>
          <Btn buttonStyle={{style: 'gray', size: 'small'}} onClick={onClose}>
            취소
          </Btn>
          <Btn
            buttonStyle={{style: 'red', size: 'small'}}
            onClick={() => handleExitTravel(travelId)}
          >
            나가기
          </Btn>
        </div>
      </div>
    </div>
  );
}
