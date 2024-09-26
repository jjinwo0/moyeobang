import React, { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { css } from '@emotion/react'
import { useState } from "react";
import Navbar from "@/components/common/navBar/Navbar";
import ProfileImage from "@/components/Account/ProfileImage/ProfileImage";
import AllImage from "@/components/Account/ProfileImage/AllImage";
// import AccountCard from '@/components/Account/AccountCard/AccountCard';
import TransactionCard from '@/components/Account/TranSaction/TransactionCard';
import { profileData} from "@/data/data";
import moyeobang from '@/services/moyeobang';
import { useSuspenseQuery, useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Sipnner/Spinner';
import { proportionData } from '@/data/data';
import { isAccountBalanceByGroup } from '@/util/typeGaurd';
import CardSlider from '@/components/Account/CardSlider/CardSlider';

export const Route = createFileRoute('/_layout/_protected/_layout/account/')({
  component: groupAccount
})

const layoutStyle = css`
    max-width: 100%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items:center;
    height:100%;
    gap:10px;
`;

const profileListStyle = css`
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    align-items:center;
    padding: 10px 0;
    padding-left:10px;
    box-sizing:border-box;
    gap: 10px;
    width: 370px;

    overflow-x: auto;

    &::-webkit-scrollbar {
    display: none;
    }
`;

const accountCardStyle = css`
    max-width: 100%;
    display:flex;
    justify-content: center;
`;

const transactionListStyle = css`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  max-height: 390px; 
  overflow-y: auto; 
  width: 100%;

  &::-webkit-scrollbar {
    display: none; 
  }
`;

const accountId = 1;
export default function groupAccount() {

  const allList = profileData.map((member) => member.memberId)
  type SelectedMember = MemberId[]; 
  const [ selectedMember , setSelectedMember ] = useState<SelectedMember>(allList) // default 전체임
  const [index, setIndex] = useState<number>(0);
  const {data : transactionData} = useSuspenseQuery({
    queryKey: ['transactionList', accountId, selectedMember ],
    queryFn: () => moyeobang.getTransactionList(Number(accountId), selectedMember),
  });

  // get 모임 통장 전체 잔액 
  const { data :accountDataByGroup } = useQuery({
    queryKey: ['accoutByGroup', accountId],
    queryFn: () => moyeobang.getAccountState(accountId),
    enabled: selectedMember.length>1 // 전체
  });

  //get 모임 통장 개인별 잔액
  const { data : accountDataByMember } = useQuery({
    queryKey: ['accountByMemberId', accountId, selectedMember[0]],
    queryFn: () => {
      if ( selectedMember.length==1 && selectedMember[0]) {
        return moyeobang.getAccountStateBymemberId(accountId, selectedMember[0])
      }
    },
    enabled: selectedMember.length==1 && selectedMember !== undefined && accountId !== undefined,// 개인별
  });

  const transactionListData = transactionData.data.data;

  const accountData = selectedMember.length > 1 
    ? accountDataByGroup?.data.data 
    : accountDataByMember?.data.data;

  if (!accountData) {
    return <Spinner/>;
  }

  function onMemberClick(memberId : MemberId | null) {
    if (memberId) {
        // 해당 memberId get요청
        setSelectedMember([memberId])
    } else {
        // 전체 조회
        const allList = profileData.map((member) => member.memberId)
        setSelectedMember(allList)
    }
  }  

  function handleIndexChange(index:number) {
    console.log('카드번호 :' , index)
    setIndex(index)
  }

  return (
    <>
    <div css={layoutStyle}>
        <div css={profileListStyle} >
        <AllImage
        isSelected={selectedMember.length>1}
        onClick={() => onMemberClick(null)}
        />
        { profileData.map((profile, index) => (
            <ProfileImage 
            key={index} 
            {...profile} 
            isSelected={selectedMember.length!==1 ? false : selectedMember.includes(profile.memberId) } 
            onClick={() => onMemberClick(profile.memberId)} />
        ))}
        </div>
        <div css={accountCardStyle} >
          {isAccountBalanceByGroup(accountData)  ?
            <CardSlider 
            account={accountData} 
            consumptionProportionByCategory={proportionData.consumptionByCategory}
            consumptionProportionByMember={proportionData.consumptionByMember}
            dots={[0,1,2]}
            onChange={handleIndexChange}
            /> :
            <CardSlider 
            account={accountData}
            consumptionProportionByCategory={proportionData.consumptionByCategory}
            dots={[0,1]}
            onChange={handleIndexChange}
            />
          }
        </div>
        <div css={transactionListStyle}>
            {transactionListData.reverse().map((tran, index) => 
                <TransactionCard key={index} {...tran} />
            )}
        </div>
    </div>
    <Navbar/>
    </>
  )
}