import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { css } from '@emotion/react'
import { useNavigate } from '@tanstack/react-router'
import TransactionDetailDefaultCard from '@/components/Account/Detail/TransactionDetailDefaultCard'
import Btn from '@/components/common/btn/Btn'
import { detailDataByCustomAfterSettle, detailDataByReceiptAfterSettle } from '@/data/data'
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

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Route = createFileRoute('/_layout/_protected/_layout/account/$transactionId/detail/_layout/')({
  component: TransactionDetail
})

export default function TransactionDetail() {
  const { transactionId } = Route.useParams()
  const navigate = useNavigate({from:'/account/$transactionId/detail'});

  function handleUpdate() {
    // 영수증 정산일때
    if ( data.splitMethod === "receipt") {
      navigate({to: `/account/${transactionId}/resultByReceipt`})

    } else {
      // 직접 정산일때
      navigate({to: `/account/${transactionId}/settle`, state: {active: 'right'} as any})
    }
  }

  return (
    <div css={layoutStyle}>
      <TransactionDetailDefaultCard 
            paymentName={data.paymentName} 
            money={data.money}
            createdAt={data.createdAt}
            acceptedNumber={data.acceptedNumber}
            adress={data.adress}
        />
        { data.splitMethod ==='receipt' &&
          <>
            <div css={columnStyle}>
              <div>상품명</div>
              <div>수량</div>
              <div>금액</div>
            </div>
            <div css={listStyle}>
              {data.details.map((detail, index) => (
                <DetailCardByReceipt key={index} {...detail}/>
              ))}
            </div>
          </>
        }
        { data.splitMethod ==='custom' &&
          <>
            <div css={columnStyle}>
              <div>프로필</div>
              <div>정산자</div>
              <div>정산금액</div>
            </div>
            <div css={listStyle}>
              {data.details.map((detail, index) => (
                <DetailCardByCustom key={index} {...detail.participant} money={detail.money}/>
              ))}
            </div>
          </>
        }
        <div css={buttonLayoutStyle}>
          <Btn 
          buttonStyle={{ size:'big', style:'blue'}}
          onClick={handleUpdate}
          >정산 수정하기</Btn> 
        </div>
    </div>
  )
}