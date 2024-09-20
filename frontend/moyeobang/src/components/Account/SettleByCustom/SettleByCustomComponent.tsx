import React from "react"
import Btn from "@/components/common/btn/Btn"
import SettleCard from "./SettleCardByCustom";
import { useState, useEffect } from "react";
import refreshImage from '@/assets/icons/refresh.png';
import { layoutStyle, textLayoutStyle, balance, time, refresh, place, allButtonStyle, allRefreshLayoutStyle, settleListLayoutStyle, nButtonStyle, buttonLayoutStyle } from "./settlePage";
import FinalModal from "@/components/FinalModal/FinalModal";
import { profileData } from "@/data/data";
import { ko } from "date-fns/locale";

export interface CustomSettle {
    participantsInfo: ParticipantInfo
    money : number
    isChecked: boolean
    isDecided:boolean // 금액 확정
}

interface SettleByCustomComponentProps {
    transactionId:TransactionId;
    totalMoney: Money;
    adress:Adress;
    paymentName:PaymentName;
    isNew:IsNew;
    createdAt:CreatedAt;
}

// 결제 후 데이터
// money(totalMoney), transactionId, createdAt, paymentName, 와 모임통장 회원 정보 필요
const dummyData = profileData; 

// 임시로 넣어둠.
export default function SettleByCustomComponent({transactionId, totalMoney, adress, paymentName, createdAt} : SettleByCustomComponentProps) {
    const [ settleData , setSettleData ] = useState<CustomSettle[]>([]);
    const [ initialSettle, setInitialSettle] = useState<CustomSettle[]>([]);
    const [ remainMoney, setRemainMoney ] = useState<number>(totalMoney);
    const [ isAll, setIsAll ] = useState<boolean>(true);
    const [ canSettle, setCanSettle ] = useState<boolean>(false);
    const [ isOpenFinalModal, setIsOpenFinalModal ] = useState<boolean>(false);
    const [ confirmData, setConfirmData ] = useState<CustomSettle[]>([]);

    // 초기 데이터 설정
    useEffect(()=> {
        const initialSettle = dummyData.map(user => ({
            participantsInfo : user,
            money : 0,
            isChecked: true,
            isDecided:false, // 초기 아무도 확정아님.
        }));
        setSettleData(initialSettle);
        setInitialSettle(initialSettle)
        setRemainMoney(totalMoney);
    }, [])

    // get으로 transaction의 상세 데이터 가져오기!


    // 총액만큼 정산되어야 정산 가능.
    useEffect(() => {
        if ( remainMoney===0 ){
            setCanSettle(true);
        } else {
            setCanSettle(false);
        }
    }, [remainMoney])

    // 정산하기 버튼 최종확인 모달로 이동
    function handleConfirm() {
        setConfirmData(settleData
        .filter(user => user.money > 0)
        )
        setIsOpenFinalModal(true);
    }

    // 최종확인에서 확인완료 후 정산하기 
    // isNew(true) POST | isNew(false) PUT
    function handleSettle() {
        const info = settleData
        .filter(user => user.money > 0) // 금액이 있는 유저
        .map(user => ({
            money: user.money,
            memberId: user.participantsInfo.memberId,
        }) )
        
        const SpendData = {
            money:totalMoney, 
            paymentName : paymentName,
            createdAt:createdAt,
            transactionId:transactionId,
            adress:adress,
            info : info,
            splitMethod : 'custom', 
        }
        console.log(SpendData)
        setIsOpenFinalModal(false);
    }


    function handleUpdate(updateUser : {memberId: number, money:number, isChecked:boolean}) {
        const updateData = settleData.map((user) => (
            updateUser.memberId === user.participantsInfo.memberId ? 
            {...user, money : updateUser.money, isChecked:updateUser.isChecked} :
            user
        ))

        const currentTotal = updateData.reduce((total, user) => total + (user.money>0? user.money : 0), 0); 
        const remainMoney = totalMoney - currentTotal
        // 남은 금액이 음수가 되버리면 지금 넣을수 있는 최대값으로 넣어주기!
        if ( remainMoney<0 ) {
            setRemainMoney(0);
            updateUser.money = updateUser.money + remainMoney;
        } else{
            setRemainMoney(remainMoney)
        }

        setSettleData(prevData =>
            prevData.map(user => 
                user.participantsInfo.memberId === updateUser.memberId ? 
                {...user, money: updateUser.money, isChecked: updateUser.isChecked} :
                user
            ))
    }


    function handleRefresh() {
        setSettleData([...initialSettle]); // 깊은 복사!
        setRemainMoney(totalMoney)
    }

    function handleDivide() {
        
        // 체크된 사람이면서 아직 금액측정 안된사람
        const checkedCount = settleData.filter(user => user.isChecked && user.money===0).length; 
        const currentTotal = settleData.reduce((total, user) => total + (user.money>0? user.money : 0), 0); 

        const remainingAmount = totalMoney - currentTotal

        setSettleData(prevData =>
            prevData.map(user => 
                user.isChecked && user.money==0 ? 
                {...user, money: Math.ceil( remainingAmount / checkedCount), isDecided:true} :
                {...user, isDecided:true}
            )
        )
        setCanSettle(true);
    }

    function toggleAll() {
        setSettleData((prevData) => 
            prevData.map((user) => 
                isAll ? 
                ( {...user, isChecked : !isAll, money:0}) :
                ({...user, isChecked : !isAll})
            ))
        setIsAll((prev) => !prev)
    };

    function handleClickOutside() {
        setIsOpenFinalModal(false);
    }

    return (
        <>
        { isOpenFinalModal && 
            <FinalModal 
            onClickOutside={handleClickOutside} 
            onClick={handleSettle} 
            confirmData={confirmData}
            totalMoney={totalMoney}
            /> 
        }
        <div css={layoutStyle}>
            <div css={textLayoutStyle}>
                <div css={place}>{paymentName}</div>
                <div css={balance}>총 금액 : {totalMoney} 원 / 남은 금액 : {remainMoney} 원</div>
                <div css={time}>{createdAt}</div>
                <div css={allRefreshLayoutStyle}>
                <div css={allButtonStyle(isAll)} onClick = {toggleAll}>
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
                    money={user.money}
                    onUpdate={handleUpdate}
                    />
                ))}
            </div>
            <div css={nButtonStyle}>
                남은 금액 1/N 해방
                <button onClick={handleDivide}>1/N</button>
            </div>
            <div css={buttonLayoutStyle}>
                { canSettle ? (
                    <Btn 
                    buttonStyle={{ size:'big', style:'blue'}}
                    onClick={handleConfirm}
                    >정산하기
                    </Btn> 
                ) : ( 
                    <Btn 
                    buttonStyle={{ size:'big', style:'gray'}}
                    >정산하기
                    </Btn>
                )
                }
            </div>
        </div>
        </>
    )
}