import { createFileRoute } from '@tanstack/react-router'
import { css } from '@emotion/react'
import { useState } from "react";
import Navbar from "@/components/common/navBar/Navbar";
import ProfileImage from "@/components/Account/ProfileImage/ProfileImage";
import AllImage from "@/components/Account/ProfileImage/AllImage";
import React from 'react';
import AccountCard from '@/components/Account/AccounrtCard/AccountCard';
import TransactionCard from '@/components/Account/TranSaction/TransactionCard';
import { profileData, transactionsData } from "@/data/data";

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

export default function groupAccount() {
  const [ selectedMember , setSelectedMember ] = useState<number | null>(null) // default 전체임

  function onMemberClick(memberId : MemberId | null) {
    if (memberId) {
        setSelectedMember(memberId)
    } else {
        setSelectedMember(null)
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
            {transactionsData.map((tran, index) => 
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