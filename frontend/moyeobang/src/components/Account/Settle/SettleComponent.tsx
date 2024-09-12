import React from "react"
import Btn from "@/components/common/btn/Btn"
import profileImage from '@/assets/images/profile.jpg'
import SettleCard from "./SettleCard";
// import FinalModal from "../../FinalModal/FinalModal";
// import Backdrop from "../../FinalModal/Backdrop/Backdrop";
import { useState, useEffect } from "react";
import refreshImage from '@/assets/icons/refresh.png';
import { setDate } from "date-fns";
import { layoutStyle, textLayoutStyle, balance, time, refresh, place, settleListLayoutStyle, nButtonStyle, buttonLayoutStyle } from "./settlePage";


const dummyData : ParticipantsInfo[] = [
    {   
        memberId: 1,
        profileImage: profileImage, 
        nickname: '가현', 
    },
    {
        memberId: 2,
        profileImage: profileImage,
        nickname: '지민',
    },
    {
        memberId: 3,
        profileImage: profileImage,
        nickname: '하늘',
    },
    {
        memberId: 4,
        profileImage: profileImage,
        nickname: '하늘',
    },
    {
        memberId: 5,
        profileImage: profileImage,
        nickname: '하늘',
    },
    {
        memberId: 6,
        profileImage: profileImage,
        nickname: '하늘',
    },
];

interface CustomSettle {
    participantsInfo: ParticipantsInfo
    amount : number
    isChecked: boolean
    isDecided:boolean // 금액 확정
}

// 총 결제 금액 가져와야함!
const totalAmount : number = 60000;

export default function SettleComponent() {
    const [ settleData , setSettleData ] = useState<CustomSettle[]>([]);
    const [ initialSettle, setInitialSettle] = useState<CustomSettle[]>([]);
    const [ remainAmount, setRemainAmount ] = useState<number>(totalAmount);
    const [ isAll, setIsAll ] = useState<boolean>(true);

    // 초기 데이터 설정
    useEffect(()=> {
        const initialSettle = dummyData.map(user => ({
            participantsInfo : user,
            amount : 0,
            isChecked: true,
            isDecided:false, // 초기 아무도 확정아님.
        }));
        setSettleData(initialSettle);
        setInitialSettle(initialSettle)
        setRemainAmount(totalAmount);
    }, [])

    function handleSettle() {
        const info = settleData
        .filter(user => user.amount > 0) // 금액이 있는 유저
        .map(user => ({
            amount: user.amount,
            memberId: user.participantsInfo.memberId,
            splitMethod: 'custom'
        }) )
    }


    function handleUpdate(updateUser : {memberId: number, amount:number, isChecked:boolean}) {
        const updateData = settleData.map((user) => (
            updateUser.memberId === user.participantsInfo.memberId ? 
            {...user, amount : updateUser.amount, isChecked:updateUser.isChecked} :
            user
        ))

        const currentTotal = updateData.reduce((total, user) => total + (user.amount>0? user.amount : 0), 0); 
        const remainingAmount = totalAmount - currentTotal
        setRemainAmount(remainingAmount)

        setSettleData(prevData =>
            prevData.map(user => 
                user.participantsInfo.memberId === updateUser.memberId ? 
                {...user, amount: updateUser.amount, isChecked: updateUser.isChecked} :
                user
            ))
    }


    function handleRefresh() {
        setSettleData([...initialSettle]); // 깊은 복사!
        setRemainAmount(totalAmount)
    }

    function handleDivide() {
        
        // 체크된 사람이면서 아직 금액측정 안된사람
        const checkedCount = settleData.filter(user => user.isChecked && user.amount===0).length; 
        const currentTotal = settleData.reduce((total, user) => total + (user.amount>0? user.amount : 0), 0); 

        const remainingAmount = totalAmount - currentTotal

        setSettleData(prevData =>
            prevData.map(user => 
                user.isChecked && user.amount==0 ? 
                {...user, amount: Math.ceil( remainingAmount / checkedCount )} :
                user
            )
        )
    }

    function toggleAll() {
        setSettleData((prevData) => 
            prevData.map((user) => 
                isAll ? 
                ( {...user, isChecked : !isAll, amount:0}) :
                ({...user, isChecked : !isAll})
            ))
        setIsAll((prev) => !prev)
    };

    return (
        <div css={layoutStyle}>
            {/* <FinalModal onClickOutside={handleClickOutside}>
                <div>gkgkgk</div>
            </FinalModal> */}
            <div css={textLayoutStyle}>
                <div css={place}>컴포즈 커피</div>
                <div css={balance}>총 금액 : {totalAmount} 원 / 남은 금액 : {remainAmount} 원</div>
                <div css={time}>2024-09-12 16:20</div>
                <div onClick = {toggleAll}>
                    { isAll ? <button>전체 해제</button> : 
                    <button>전체 선택</button>
                }
                </div>
                <div css={refresh}>초기화 
                <img 
                onClick={handleRefresh}
                src={refreshImage} 
                alt="" />
                </div>
            </div>
            <div css={settleListLayoutStyle}>
                { settleData.map((user, index) => (
                    <SettleCard 
                    key={index}
                    memberId={user.participantsInfo.memberId}
                    profileImage={user.participantsInfo.profileImage}
                    nickname={user.participantsInfo.nickname}
                    isChecked={user.isChecked}
                    isDecided={user.isDecided}
                    amount={user.amount}
                    onUpdate={handleUpdate}
                    />
                ))}
            </div>
            <div css={nButtonStyle}>
                남은 금액 1/N 해방
                <button onClick={handleDivide}>1/N</button>
            </div>
            <div css={buttonLayoutStyle}>
            <Btn 
            buttonStyle={{ size:'big', style:'blue'}}
            onClick={handleSettle}
            >정산하기
            </Btn>
            </div>
        </div>
    )
}