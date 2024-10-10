import { css } from "@emotion/react";
import bangImage from '@/assets/icons/bangBang.png';
import Btn from "@/components/common/btn/Btn";
import React from "react";
import { colors } from "@/styles/colors";
import { Link } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import moyeobang from "@/services/moyeobang";
import { useEffect } from "react";

const layoutStyle = css`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    background-color: ${colors.white};
`;

const textStyle = css`
    font-family: 'bold';
    font-size: 40px;
`;

const logoStyle = css`
    width: 250px;
    height:250px;
    padding: 60px 0;
    margin-bottom: 80px;
`;

const buttonLayoutStyle = css`
    position: fixed;
    bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;

const linkStyle = css`
    text-decoration: none;
`;

interface PayCompletedModalProps {
    isHome:boolean;
    travelId:Id;
    accountId:AccountId;
    transactionId:TransactionId;
    participants:ParticipantInfo[]
    onClose: VoidFunction;
}

// ! api 연결 후 transactionId 임시 제거하기
export default function PayCompletedModal({isHome, travelId, accountId, transactionId, participants, onClose} : PayCompletedModalProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    // console.log('default정산 참가자',participants)

    // 닫기 누를시 이 데이터 이용해 정산해주기.
    const {data} = useSuspenseQuery({
        queryKey: ['transactionDetail', transactionId],
        queryFn: () => moyeobang.getTransactionDetail(accountId, Number(transactionId)),
    });

    const transactionDetailData = data.data.data;

    // default 정산하기(직접 정산 API)
    const {mutate: settleByDefault } = useMutation({
        mutationFn: ({transactionId, travelId, data} : {transactionId: TransactionId, travelId:Id, data: PostTransactionDetailByCustom}) => moyeobang.postSettleByCustom(transactionId, travelId, data),
        onSuccess: async () => {
        await queryClient.invalidateQueries({
            queryKey: ['transactionList', accountId], // 해당 계좌의 전체내역 업데이트
            refetchType: 'all',
        });
        if(isHome) {
            navigate({to: '/'})
        } else {
            navigate({to: `/account`})
        };
        onClose() // 모달이랑 QR창 닫기
        },
        });

    function createDefaultSettleData() {
        const info = participants.map((member) => (
            {
                // money = 전체금액/맴버수 내림값
                memberId:member.memberId, 
                money: Math.floor(transactionDetailData.money/participants.length)
            }
        ))

        return {
            paymentName : transactionDetailData.paymentName,
            money : transactionDetailData.money,
            info : info,
            splitMethod:'custom',
            acceptedNumber:transactionDetailData.acceptedNumber,
        };
    };

    function handleSettleDefault() {

        const sendData = createDefaultSettleData();
        settleByDefault({transactionId:transactionId, travelId:travelId, data:sendData})
    }

    useEffect(()=>{
        // 언마운트 되어버려도 1/n default로 되어야함.
        return () => {
            const sendData = createDefaultSettleData();
            settleByDefault({transactionId:transactionId, travelId:travelId, data:sendData})
        }
    }, [])

    return (
        <div css={layoutStyle}>
            <div css={textStyle}>결제 완료!</div>
            <img 
            css={logoStyle}
            src={bangImage} 
            alt="bangbang" />
            <div css={buttonLayoutStyle}>
                <Link to={`/account/${transactionId.toString()}/settle`} css={linkStyle} onClick={onClose}>        
                    <Btn buttonStyle={{ size:'big', style:'blue'}}>
                        정산하기
                    </Btn>
                </Link>
                <Btn buttonStyle={{ size:'big', style:'gray'}} onClick={handleSettleDefault}>
                    닫기
                </Btn>
            </div>
        </div>
    )
}