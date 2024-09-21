import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { css } from '@emotion/react'
import { useNavigate } from '@tanstack/react-router'
import TransactionDetailDefaultCard from '@/components/Account/Detail/TransactionDetailDefaultCard'
import Btn from '@/components/common/btn/Btn'
import { detailsByCustom, detailsByReceipt} from '@/data/data'
import { colors } from '@/styles/colors'
import DetailCardByReceipt from '@/components/Account/Detail/DetailCardByReceipt'
import DetailCardByCustom from '@/components/Account/Detail/DetailCardByCustom'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import moyeobang from '@/services/moyeobang'

const layoutStyle = css`
  margin-top: 50px;
  display:flex;
  flex-direction:column;
  gap:15px;
  padding: 10px 30px;
  height:100%;
`;

const LinkStyle = css`
  text-decoration: none;
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
  height:450px;
  padding: 0 5px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Route = createFileRoute('/_layout/_protected/_layout/account/$transactionId/detail/_layout/')({
  component: TransactionDetail
})

export default function TransactionDetail() {
  // 임시 accountId
  const accountId = 1;
  const { transactionId } = Route.useParams()
  const navigate = useNavigate({from:'/account/$transactionId/detail'});

  // const {data} = useSuspenseQuery({
  //   queryKey: ['transactionDetail', accountId, transactionId],
  //   queryFn: () => moyeobang.getTransactionDetail(accountId, Number(transactionId)),
  // });

  // const transactionDetailData = data.data.data;
  const transactionDetailData = detailsByReceipt;

  // 타입 가드 함수
  function isSettledParticipantByCustom(
    detail: SettledItemByReceipt | SettledParticipantByCustom
  ): detail is SettledParticipantByCustom {
    return (detail as SettledParticipantByCustom).participant !== undefined;
  }

  return (
    <div css={layoutStyle}>
      <TransactionDetailDefaultCard 
            paymentName={transactionDetailData.paymentName} 
            money={transactionDetailData.money}
            createdAt={transactionDetailData.createdAt}
            adress={transactionDetailData.adress}
        />
        { transactionDetailData.splitMethod ==='receipt' &&
          <>
            <div css={columnStyle}>
              <div>상품명</div>
              <div>수량</div>
              <div>금액</div>
            </div>
            <div css={listStyle}>
              {transactionDetailData.details.map((detail, index) => (
                <DetailCardByReceipt key={index} {...detail}/>
              ))}
            </div>
            <Link to={`/account/${transactionId}/resultByReceipt`} search={{isNew:false}} css={LinkStyle}>
              <Btn buttonStyle={{ size:'big', style:'blue'}}>정산 수정하기</Btn> 
            </Link>
          </>
        }
        { transactionDetailData.splitMethod ==='custom' &&
          <>
            <div css={columnStyle}>
              <div>프로필</div>
              <div>정산자</div>
              <div>정산금액</div>
            </div>
            <div css={listStyle}>
              {transactionDetailData.details.map((detail, index) => {
                if (isSettledParticipantByCustom(detail)) {
                  return (
                    <DetailCardByCustom key={index} {...detail.participant} money={detail.money}/>
                  )
                }
                return null;
                })}
            </div>
            <Link to={`/account/${transactionId}/settle`} search={{method: 'custom'}} css={LinkStyle}>
              <Btn buttonStyle={{ size:'big', style:'blue'}}>정산 수정하기</Btn> 
            </Link>
          </>
        }
    </div>
  )
}