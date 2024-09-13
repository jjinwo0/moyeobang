import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { css } from '@emotion/react'
import TransactionDetailDefaultCard from '@/components/Account/Detail/TransactionDetailDefaultCard'
import { TransactionDetailDefaultCardProps } from '@/components/Account/Detail/TransactionDetailDefaultCard'
import Btn from '@/components/common/btn/Btn'
import { detailDataByCustomAfterSettle, detailDataByEqualAfterSettle, detailDataByEqualBeforeSettle } from '@/data/data'

// const dataByCustomAfterSettle = detailDataByCustomAfterSettle;
// const dataByEqualAfterSettle = detailDataByEqualAfterSettle;
// const dataByEqualBeforeSettle = detailDataByEqualBeforeSettle;
const data = detailDataByCustomAfterSettle

const layoutStyle = css`
  margin-top: 50px;
  display:flex;
  flex-direction:column;
  gap:15px;
  padding: 10px 30px;
`;

const buttonLayoutStyle=css`
  position:fixed;
  bottom:30px;
`;

export const Route = createFileRoute('/_layout/_protected/_layout/account/detail/_layout/$transactionId')({
  component: TransactionDetail
})

export default function TransactionDetail() {
  const { transactionId } = Route.useParams()

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
        {data.settled} / 
        {data.splitMethod}
        { data.settled && data.splitMethod ==='equal' &&
          <div>영수증 정산됨.</div>
        }
        { data.settled && data.splitMethod ==='custom' &&
          <div>직접 정산됨.</div>
        }
        <div css={buttonLayoutStyle}>
        { data.settled ? <Btn buttonStyle={{ size:'big', style:'blue'}}>정산 수정하기</Btn> :
          <Btn buttonStyle={{ size:'big', style:'blue'}}>정산 하러가기</Btn>
          }
        </div>
    </div>
  )
}