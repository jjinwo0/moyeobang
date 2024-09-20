import React, { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { css } from '@emotion/react'
import { useState } from "react";
import Navbar from "@/components/common/navBar/Navbar";
import ProfileImage from "@/components/Account/ProfileImage/ProfileImage";
import AllImage from "@/components/Account/ProfileImage/AllImage";
import AccountCard from '@/components/Account/AccountCard/AccountCard';
import TransactionCard from '@/components/Account/TranSaction/TransactionCard';
import { profileData, transactions } from "@/data/data";
import moyeobang from '@/services/moyeobang';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/_layout/_protected/_layout/account/')({
  component: groupAccount
})

const layoutStyle = css`
    max-width: 100%;
    margin-top: 50px;

    display: flex;
    flex-direction: column;
    height:100%;

`;

const profileListStyle = css`
    display: flex;
    flex-direction: row;
    padding: 15px;
    gap: 15px;

    overflow-x: auto;

    &::-webkit-scrollbar {
    display: none;
    }
`;

const accountCardStyle = css`
    max-width: 100%;
    display:flex;
    justify-content: center;
    padding: 20px;
`;

const transactionListStyle = css`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  max-height: 400px; 
  overflow-y: auto; 
  width: 100%;

  &::-webkit-scrollbar {
    display: none; 
  }
`
const accountId = 1;
export default function groupAccount() {

  type SelectedMember = MemberId | MemberId[]; 
  const [ selectedMember , setSelectedMember ] = useState<SelectedMember | null>(null) // default 전체임

  // const {data} = useSuspenseQuery({
  //   queryKey: ['transactionList', accountId],
  //   queryFn: () => moyeobang.getTransactionList(Number(accountId)),
  // });

  // const transactionData = data.data.data;
  const transactionData = transactions;

  function onMemberClick(memberId : MemberId | null) {
    if (memberId) {
        // 해당 memberId get요청
        setSelectedMember(memberId)
    } else {
        // 전체 조회
        const allList = profileData.map((member) => member.memberId)
        setSelectedMember(allList)
    }
  }  

  return (
    <>
    <div css={layoutStyle}>
        <div css={profileListStyle} >
        <AllImage
        isSelected={null===selectedMember}
        onClick={() => onMemberClick(null)}
        />
        { profileData.map((profile, index) => (
            <ProfileImage 
            key={index} 
            {...profile} 
            isSelected={profile.memberId === selectedMember } 
            onClick={() => onMemberClick(profile.memberId)} />
        ))}
        </div>
        <div css={accountCardStyle} >
            <AccountCard />
        </div>
        <div css={transactionListStyle}>
            {transactionData.map((tran, index) => 
                <TransactionCard key={index} {...tran} />
            )}
        </div>
        <div>
            {selectedMember}
        </div>
    </div>
    <Navbar/>
    </>
  )
}