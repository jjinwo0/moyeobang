import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { css } from '@emotion/react'
import { useNavigate } from '@tanstack/react-router'
import TransactionDetailDefaultCard from '@/components/Account/Detail/TransactionDetailDefaultCard'
import Btn from '@/components/common/btn/Btn'
import { detailDataByCustomAfterSettle, detailDataByEqualAfterSettle, detailDataByEqualBeforeSettle } from '@/data/data'
import { colors } from '@/styles/colors'
import DetailCardByReceipt from '@/components/Account/Detail/DetailCardByReceipt'
import DetailCardByCustom from '@/components/Account/Detail/DetailCardByCustom'

// const dataByCustomAfterSettle = detailDataByCustomAfterSettle;
// const dataByEqualAfterSettle = detailDataByEqualAfterSettle;
// const dataByEqualBeforeSettle = detailDataByEqualBeforeSettle;
const data = detailDataByCustomAfterSettle;

const layoutStyle = css`
  margin-top: 50px;
  display:flex;
  flex-direction:column;
  gap:15px;
  padding: 10px 30px;
  height:100%;
`;

const buttonLayoutStyle=css`
  position:fixed;
  bottom:30px;
`;

const columnStyle=css`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  padding: 10px 5px;
  border-top: solid 3px ${colors.lightGray};
  font-family:'semibold';
  font-size:20px;
  padding-bottom:0px;
`;

const listStyle=css`
  display:flex;
  flex-direction:column;
  overflow-y:auto;
  height:370px;
  padding: 0 5px;
`;

export const Route = createFileRoute('/_layout/_protected/_layout/account/detail/_layout/$transactionId')({
  component: TransactionDetail
})

export default function TransactionDetail() {
  const { transactionId } = Route.useParams()
  const navigate = useNavigate({from:'/account/detail'});

  function handleSettle() {
    navigate({to:'/account/settle'})
  }

  function handleUpdate() {
    // 영수증 정산일때
    if ( data.splitMethod === "equal") {
      navigate({to: `/account/resultByReceipt/${transactionId}`})
    } else {
      // 직접 정산일때
      navigate({to: '/account/settle', state: { active :'right'} as any})
    }
  }

  return (
    <div css={layoutStyle}>
      {transactionId}상세 페이지
      <TransactionDetailDefaultCard 
            place={data.place}
            totalAmount={data.amount}
            createdAt={data.createdAt}
            acceptedNumber={data.amount}
            adress={data.adress}
        />
        {data.settled} / {data.splitMethod}
        { !data.settled && data.splitMethod ==='equal' &&
          <div>
            정산전.
          </div>
        }
        { data.settled && data.splitMethod ==='equal' &&
          <>
            <div css={columnStyle}><div>상품명</div><div>수량</div><div>금액</div></div>
              <div css={listStyle}>
                {data.details.map((detail, index) => (
                  <DetailCardByReceipt key={index} {...detail}/>
                ))}
              </div>
          </>
        }
        { data.settled && data.splitMethod ==='custom' &&
          <>
            <div css={columnStyle}><div>프로필</div><div>정산자</div><div>정산금액</div></div>
              <div css={listStyle}>
                {data.details.map((detail, index) => (
                  <DetailCardByCustom key={index} {...detail.participant} amount={detail.amount}/>
                ))}
              </div>
          </>
        }
        <div css={buttonLayoutStyle}>
        { data.settled ? (
        <Btn 
        buttonStyle={{ size:'big', style:'blue'}}
        onClick={handleUpdate}
        >정산 수정하기</Btn> 
        ) : (
          <Btn 
          buttonStyle={{ size:'big', style:'blue'}}
          onClick={handleSettle}
          >정산 하러가기</Btn>
        )
          }
        </div>
    </div>
  )
}