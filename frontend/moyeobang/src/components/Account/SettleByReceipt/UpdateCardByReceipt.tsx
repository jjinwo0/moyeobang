import React from 'react';
import doubleButton from '@/assets/icons/doubleButton.png';
import blankCheckInput from '@/assets/icons/blackBlankCheck.png';
import checkInput from '@/assets/icons/blackCheck.png';
import { profileData } from '@/data/data';
import { css } from '@emotion/react';
import { colors } from '@/styles/colors';
import { useState, useEffect } from 'react';
import { OrderItemId, OrderItemQuantity } from '@/types/ex';
import ProfileImage from '../ProfileImage/ProfileImage';

const cardLayoutStyle=css`
    display:flex;
    flex-direction:column;
    gap:10px;
    padding: 10px;
    background-color: rgba(30, 192, 255, 0.10);
    border-radius: 15px;
    margin:0 20px;
`;

const inputContainerStyle=css`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    font-family:'regular';
    font-size:18px;

    div {
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        border-bottom:solid 1px ${colors.black};
        margin: 5px;
    }

    input {
        font-family:'regular';
        font-size:18px;
        border:transparent;
        background-color:transparent;
        width:90%;
        text-align:center;
        white-space: nowrap;      
        overflow: hidden;        
        text-overflow: ellipsis;  
        padding: 5px 0;
    }
`;

const itemStyle=css`
    width:230px;
`;

const quantityStyle=css`
    width:70px;
`;

const amountStyle=css`
    width:150px;
`;

const checkContainerStyle=css`
    display:flex;
    flex-direction:row;
    justify-content: right;
    align-items:center;
    gap:5px;
    img {
        width:20px;
        height:20px;
    }
`;

const profileContainerStyle=css`
    padding: 10px;
`;

const carouselStyle=css`
    display:flex;
    flex-direction:row;
    gap:10px;
    width:100%;
    overflow-x:auto;
    padding: 10px 0;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const buttonContainerStyle= (isOpen:boolean) => css`
    display:flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
    img {
        width:20px;
        height:15px;
        transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
`;

interface UpdateCardByReceiptProps {
    onChange?: (updatedItem: {
        itemId:OrderItemId;
        title:OrderItemTitle;
        quantity:OrderItemQuantity;
        amount:OrderItemAmount;
        participants:ParticipantInfo[];
    })=>void;
    itemId:OrderItemId;
    itemTitle:OrderItemTitle;
    itemQuantity:OrderItemQuantity;
    itemAmount:OrderItemAmount;
    participants:ParticipantInfo[]
}

// 해당 계좌의 회원들 다 가져와야함.
export default function UpdateCardByReceipt({
    onChange,
    itemId,
    itemTitle,
    itemQuantity,
    itemAmount,
    participants
    } : UpdateCardByReceiptProps) {

    const [title, setTitle]=useState(itemTitle);
    const [quantity, setQuantity]=useState(itemQuantity);
    const [amount, setAmount]=useState(itemAmount);
    const [selectedParticipants, setSelectedParticipants] = useState(participants);

    const [isOpen, setIsOpen] = useState(false);
    const [isAll, setIsAll] = useState(false);

    function handleOpen() {
        setIsOpen(!isOpen)
    }

    function handleAll() {
        if (isAll) {
            setSelectedParticipants([]);
        } else {
            setSelectedParticipants(profileData);
        }
        setIsAll(!isAll);
    }

    function handleClick(memberId:number | null) {
        if (memberId === null) {
            return;
        }

        // 이미 있었으면 true 반환 => 제거해야함
        // 없었으면 false 반환 => 추가해줘야함
        const isSelected = selectedParticipants?.some((prev) => prev.memberId===memberId)
        if (isSelected) {
            // 제거하기
            setSelectedParticipants((prev) => prev?.filter(prev => prev.memberId !== memberId))
        } else {
            setSelectedParticipants((prev) => [...prev, profileData.find(prev => prev.memberId===memberId)!])
        }
    }

    function handleAmountChange(event:React.ChangeEvent<HTMLInputElement>) {

        if (event.target.value==='') {
            setAmount(0);
        } else {
            const newAmount = parseInt(event.target.value, 10); //문자열을 정수로 변환 10진수
            // is (Not-a-Number) 확인
            // if (!isNaN(newAmount) && newAmount >= totalAmount) 
            setAmount(newAmount)
        }
    }

    function handleTitleChange(event:React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function handleQuantityChange(event:React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value==='') {
            setQuantity(0)
        } else {
            const newQuantity = parseInt(event.target.value, 10);
            setQuantity(newQuantity)
        }
    }

    // 변경 사항 업데이트
    useEffect(() => {
        if (onChange) {
            onChange({
                itemId,
                title,
                quantity,
                amount,
                participants: selectedParticipants,
            });
        }
    }, [title, quantity, amount, selectedParticipants]);

    return (
        <div css={cardLayoutStyle}>
            <div css={inputContainerStyle}>
                <div css={itemStyle}><input type="text" value={title} onChange={handleTitleChange}/></div>
                <div css={quantityStyle}><input type="text" value={quantity} onChange={handleQuantityChange}/>개</div>
                <div css={amountStyle}><input type="text" value={amount} onChange={handleAmountChange}/>원</div>
            </div>
            {isOpen && (
            <div css={profileContainerStyle}>
                <div css={checkContainerStyle}>전체선택 {isAll ? (
                    <img onClick={handleAll} src={checkInput} alt="" />
                ) : (
                    <img onClick={handleAll} src={blankCheckInput} alt="" />
                )}</div>
                <div css={carouselStyle}>
                    {profileData.map((profile, index) => (
                        <ProfileImage 
                            key={index} 
                            profileImage={profile.profileImage} 
                            px={65} 
                            isSelected={selectedParticipants.some(p => p.memberId === profile.memberId)}
                            onClick={() => handleClick(profile.memberId)}
                            />
                    ))}
                </div>
            </div>
            )}
            <div css={buttonContainerStyle(isOpen)}>
                <img onClick={handleOpen} src={doubleButton} alt="button" />
            </div>
        </div>
    )
}