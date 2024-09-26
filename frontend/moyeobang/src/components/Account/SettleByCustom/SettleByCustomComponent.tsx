import React from "react"
import Btn from "@/components/common/btn/Btn"
import SettleCard from "./SettleCardByCustom";
import { useState, useEffect } from "react";
import refreshImage from '@/assets/icons/refresh.png';
import { layoutStyle, textLayoutStyle, balance, time, refresh, place, allButtonStyle, allRefreshLayoutStyle, settleListLayoutStyle, nButtonStyle, buttonLayoutStyle } from "./settlePage";
import FinalModal from "@/components/Account/FinalModal/FinalModal";
import { profileData} from "@/data/data";
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import moyeobang from "@/services/moyeobang";
import profile from "@/routes/_layout/_protected/_layout/profile/$memberName";

export interface CustomSettle {
    participantInfo: ParticipantInfo
    money : number
    isChecked: boolean
    isDecided:boolean // 금액 확정
}

interface SettleByCustomComponenetProps {
    transactionId : TransactionId;
    paymentName: PaymentName;
    // adress: Adress;
    totalMoney: Money;
    createdAt: CreatedAt;
    details: SettledParticipantByCustom[];
    acceptedNumber:AcceptedNumber;
    // splitMethod: SplitMethod; // 'custom'
    isUpdate:boolean;
}

// 결제 후 데이터
// money(totalMoney), transactionId, createdAt, paymentName, 와 모임통장 회원 정보 필요

export default function SettleByCustomComponent({transactionId, totalMoney, paymentName, createdAt, details, acceptedNumber, isUpdate} : SettleByCustomComponenetProps) {
    const [ settleData , setSettleData ] = useState<CustomSettle[]>([]);
    const [ remainMoney, setRemainMoney ] = useState<number>(0);
    const [ isAll, setIsAll ] = useState<boolean>(true);
    const [ canSettle, setCanSettle ] = useState<boolean>(false);
    const [ isOpenFinalModal, setIsOpenFinalModal ] = useState<boolean>(false);
    const [ confirmData, setConfirmData ] = useState<CustomSettle[]>([]);
    const navigate = useNavigate({from:'/account/$transactionId/settle'});
    const queryClient = useQueryClient();
    console.log(isUpdate)


    const {mutate: updateCustom } = useMutation({
        mutationFn: ({transactionId, data} : {transactionId: TransactionId, data: PostTransactionDetailByCustom}) => moyeobang.postSettleByCustom(transactionId, data),
        onSuccess: async () => {
        await queryClient.invalidateQueries({
            queryKey: ['transactionDetail', transactionId],
            refetchType: 'all',
        });
        await navigate({to: `/account/${transactionId.toString()}/detail`});
        },
     });


    useEffect(()=> {
        // 새로 들어온거 details=[] 여기에 default 1/n해주기
        if (!isUpdate) {
            const initialSettle = profileData.map(member => {
                return {
                    participantInfo : member,
                    money : totalMoney/profileData.length ,
                    isChecked: true,
                    isDecided:false, // 초기 아무도 확정아님.
                };
            })
            setSettleData(initialSettle);
            setRemainMoney(0);
        } 
        // 수정일 때 details있음.
        else if (details && details.length > 0) {
            console.log(profileData)
            const initialSettle = profileData.map(member => {
                console.log(member.memberId)
                const prevMember = details.find((detail) => detail.participant.memberId === member.memberId);
                return {
                    participantInfo : member,
                    money : prevMember ? prevMember.money : 0,
                    isChecked: prevMember ? true : false,
                    isDecided:false, // 초기 아무도 확정아님.
                }
        });
            setSettleData(initialSettle);
            console.log(initialSettle)
        }
    }, [profileData, details, totalMoney, isUpdate])

    // 총액만큼 정산되어야 정산 가능.
    useEffect(() => {
        if ( remainMoney===0 ){
            setCanSettle(true);
        } else {
            setCanSettle(false);
        }
    }, [remainMoney, setRemainMoney, settleData])

    // 정산하기 버튼 최종확인 모달로 이동
    function handleConfirm() {
        setConfirmData(settleData
        .filter(user => user.money > 0)
        )
        setIsOpenFinalModal(true);
    }

    // 최종확인에서 확인완료 후 정산하기 
    // isNew(true) 처음 | isNew(false) 원래 데이터 들고옴
    function handleSettle() {
        const info = settleData
        .filter(user => user.money > 0) // 금액이 있는 유저
        .map(user => ({
            memberId: user.participantInfo.memberId,
            money: user.money,
        }) )
        
        const spendData : PostTransactionDetailByCustom = {
            paymentName : paymentName,
            money:totalMoney, 
            info : info,
            splitMethod : 'custom', 
            acceptedNumber: acceptedNumber,
        }
        console.log('보내는 데이터 확인',spendData)
        updateCustom({transactionId, data:spendData})
        setIsOpenFinalModal(false);
    }

    // 업데이트 onChange
    function handleUpdate(updateUser : {memberId: number, money:number, isChecked:boolean}) {

        setSettleData((prevData) => {
            // 방금 변한값으로 update
            const updateData = prevData.map((member) => (
                updateUser.memberId === member.participantInfo.memberId ?
                {...member, money:updateUser.money, isChecked:updateUser.isChecked} :
                member
            ));

            // update된거 이용해서 계산.
            const currentTotal = updateData.reduce((total, user) => total + (user.money>0? user.money : 0), 0); 
            const remain = totalMoney- currentTotal
            // 남은 금액이 음수가 되버리면 지금 넣을수 있는 최대값으로 넣어주기!
            if ( remain<0 ) {
                setRemainMoney(0);
                updateUser.money += remain;
                return updateData.map((user) =>
                    user.participantInfo.memberId === updateUser.memberId
                    ? { ...user, money: updateUser.money }
                    : user
                );
            } else {
                setRemainMoney(remain);
                return updateData; 
            }
        })
    }

    // 초기화
    function handleRefresh() {
        setSettleData((prev) => 
            prev.map((member) => (
                {...member, money:0, isDecided:false, isChecked:true}
            ))
        ); // 깊은 복사!
        setRemainMoney(totalMoney)
        setCanSettle(false); 
    }

    function handleDivide() {
        
        // 체크된 사람이면서 아직 금액측정 안된사람
        const checkedCount = settleData.filter(user => user.isChecked && user.money===0).length; 
        if (checkedCount===0) { return }
        const currentTotal = settleData.reduce((total, user) => total + (user.money>0? user.money : 0), 0); 
        const remainingAmount = totalMoney - currentTotal

        setSettleData(prevData =>
            prevData.map(user => 
                user.isChecked && user.money==0 ? 
                {...user, money: Math.ceil( remainingAmount / checkedCount), isDecided:true} :
                {...user, isDecided:true}
            )
        )
        setRemainMoney(0);
        setCanSettle(true);
    }

    function toggleAll() {
        // 1/n 해방 눌렀는지
        const isDivide = settleData.some((member) => member.isDecided);

        if (!isDivide) {
            setSettleData((prevData) => 
                prevData.map((user) => 
                    isAll ? 
                    ( {...user, isChecked : !isAll, money:0}) :
                    ({...user, isChecked : !isAll})
                ))
            setIsAll((prev) => !prev)
        }
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
                <div css={time}>{format(createdAt, 'yyyy-MM-dd HH:mm', {locale: ko})}</div>
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
                    memberId={user.participantInfo.memberId}
                    profileImage={user.participantInfo.profileImage}
                    memberName={user.participantInfo.memberName}
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
                    >{ isUpdate ? '수정 완료' : '정산하기'}
                    </Btn> 
                ) : ( 
                    <Btn 
                    buttonStyle={{ size:'big', style:'gray'}}
                    >{ isUpdate ? '수정 완료' : '정산하기'}
                    </Btn>
                )
                }
            </div>
        </div>
        </>
    )
}