import React from "react";
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import SmallProfileImage from "../ProfileImage/SmallProfileImage";
import { Link } from "@tanstack/react-router";

import { layoutStyle, 
    upContainerStyle, 
    textContainerStyle, 
    timeStyle, 
    locationStyle, 
    carouselStyle, 
    depositStyle, 
    notDepositStyle, 
    balanceStyle, 
    downContainerStyle
} from './transactionCardStyle'

export default function TransactionCard({
    transactionId,
    paymentName,
    money,
    participants,
    transactionType,
    currentBalance,
    createdAt,
    } : TransactionList) {

    return(
        <Link 
        to={transactionType==='입금' ? undefined : `/account/${transactionId}/detail`}
        search={{noShow:true}}
        css={layoutStyle}>
            <div css={upContainerStyle}>
                <div css={textContainerStyle} >
                    <div css={timeStyle} >{format(createdAt, 'yyyy-MM-dd HH:mm', {locale: ko})}</div>
                    <div css={locationStyle}>{paymentName}</div>
                </div>
                <div css={carouselStyle}>
                    { participants && participants.map((part, index) => (
                        <SmallProfileImage 
                        key={index}
                        px={45}
                        profileImage={part.profileImage}
                        />
                    ))}
                </div> 
            </div >
            <div css={downContainerStyle}>
                { transactionType === "입금" ? 
                    (<div css={depositStyle} >입금 <p>{money.toLocaleString()}</p> 원</div>) : 
                    (<div css={notDepositStyle}>출금  <p>{money.toLocaleString()}</p> 원</div>)
                }
                <div css={balanceStyle}> 잔액 <p>{currentBalance.toLocaleString()}</p> 원</div>
            </div>
        </Link>
    )
}