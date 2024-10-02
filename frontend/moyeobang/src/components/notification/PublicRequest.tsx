import {css} from '@emotion/react';
import React from 'react';
import Btn from '../common/btn/Btn';
import bangBang from '@/assets/icons/bangBang.png';
import moyeobang from '@/services/moyeobang';                                                                 
import { useQueryClient,useMutation } from '@tanstack/react-query';


const containerStyle = css`
  width: 100%;
  height: 90px;
`;

const contentStyle = css`
  display: flex; /* 이미지와 텍스트를 가로로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  padding: 20px;

  img {
    width: 34px;
    margin-right: 20px; /* 이미지와 텍스트 사이 간격 */
  }
`;

const titleStyle = css`
  font-family: 'semibold';
  font-size: 18px;
`;

const textStyle = css`
  font-family: 'regular';
  font-size: 18px;
`;

const buttonContainerStyle = css`
  display: flex; /* 버튼들을 가로로 배치 */
  gap: 10px; /* 버튼 사이 간격 추가 */
  margin-top: 10px; /* 텍스트와 버튼 사이 간격 추가 */
`;

const timeStyle = css`
  font-family: 'regular';
  font-size: 12px;
  margin-bottom: 5px;
`;

interface PublicRequestProps {
  message: string;
  accountId: number;
  amount: number;
}

interface Data {
  memberId: number;
  amount: number;
}

// const travelName: string = '아기돼지오형제';

export default function PublicRequest({message, accountId,amount}: PublicRequestProps) {
  const timestamp = new Date().toLocaleString();

  const data:Data ={
    // memberId: memberId,
    memberId:1,
    amount: amount, 
  }

  //[todo] 수락 버튼 클릭 시 공금 입금 api 연결 필요

  // const queryClient = useQueryClient();

  // const {mutate: postDepositAccount} = useMutation({
  //   mutationFn: async (data:Data)=>{
  //     const response = await moyeobang.postDepositAccount(accountId, data);
  //     return response.data;
  //   },        
  //   onSuccess: async () => {
  //     // const {currentBalance} = response.data;

  //     await queryClient.invalidateQueries({
  //       queryKey: ['currentBalance'],
  //       refetchType: 'all',
  //     });
  //   },
  // });

  const handleAccept = () => {
    //[todo] 수락 버튼 클릭 시 공금 입금 api 연결 필요
    // postDepositAccount(data);
  };

  const handleCancel = () => {
    // 취소 로직 추가
  };

  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <img src={bangBang} alt="Notification Icon" />
        <div>
          <p css={timeStyle}>{timestamp}</p>
          <span css={textStyle}>{message}</span>
          <div css={buttonContainerStyle}>
            <Btn buttonStyle={{style: 'red', size: 'tiny'}} onClick={handleCancel}>취소</Btn>
            <Btn buttonStyle={{style: 'blue', size: 'tiny'}} onClick={handleAccept}>수락</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
