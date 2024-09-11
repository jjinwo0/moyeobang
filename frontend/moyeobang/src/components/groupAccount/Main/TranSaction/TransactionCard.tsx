import React from "react";
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import { css } from "@emotion/react";
import { colors } from "@/styles/colors";
import SmallProfileImage from "./SmallProfileImgae";
import { layout, 
    upContainer, 
    textContainer, 
    time, 
    location, 
    carousel, 
    deposit, 
    notDeposit, 
    balance, 
    downContainer
} from './transactionCardStyle'


type TransactionCardProps = TransactionRecords

export default function TransactionCard({
    // transactionId,
    place,
    // details,
    amount,
    participants,
    // splitMethod,
    settled,
    isDeposit,
    totalBalance,
    createdAt,
    } : TransactionCardProps) {

    return(
        <div css={layout}>
            <div css={upContainer}>
                <div css={textContainer} >
                    <div css={time} >{format(createdAt, 'yyyy-MM-dd HH:mm', {locale: ko})}</div>
                    <div css={location}>{place}</div>
                </div>
                { settled &&                
                <div css={carousel}>
                    { participants && participants.map((part, index) => (
                        <SmallProfileImage 
                        key={index}
                        profileImage={part.profileImage}
                        />
                    ))}
                </div> 
                }
            </div >
            <div css={downContainer}>
                { isDeposit ? <div css={deposit} >입금 <p>{amount}</p> 원</div> : 
                <div css={notDeposit}>출금  <p>{amount}</p> 원</div>
                }
                <div css={balance}> 잔액 <p>{totalBalance}</p> 원</div>
            </div>

        
        </div>
    )
}