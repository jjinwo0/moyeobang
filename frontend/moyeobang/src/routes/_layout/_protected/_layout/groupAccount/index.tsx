import { createFileRoute } from '@tanstack/react-router'
import { css } from '@emotion/react'
import { useState } from "react";
import Navbar from "@/components/common/navBar/Navbar";
import profileImageUrl from '@/assets/images/profile.jpg'
import ProfileImage from "@/components/groupAccount/Main/ProfileImage";
import AllImage from "@/components/groupAccount/Main/AllImage";
import React from 'react';

export const Route = createFileRoute('/_layout/_protected/_layout/groupAccount/')({
  component: groupAccount
})

const profileData : ParticipantsInfo[] = [
  {   
      memberId : 1,
      nickname: "홍길동",
      profileImage : profileImageUrl,
  },
  {   
      memberId : 2,
      nickname: "홍길동",
      profileImage : profileImageUrl,
  },
  {   
      memberId : 3,
      nickname: "홍길동",
      profileImage : profileImageUrl,
  },
  {   
      memberId : 4,
      nickname: "홍길동",
      profileImage : profileImageUrl,
  },
  {   
      memberId : 5,
      nickname: "홍길동",
      profileImage : profileImageUrl,
  },
]

const layoutStyle = css`
max-width: 100%;
margin-top: 50px;

display: flex;
flex-direction: column;
height:100%;
overflow-y: scroll;

&::-webkit-scrollbar {
display: none;
}
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
        <div>
            {selectedMember}
        </div>
    </div>
    <Navbar/>
    </>
  )
}