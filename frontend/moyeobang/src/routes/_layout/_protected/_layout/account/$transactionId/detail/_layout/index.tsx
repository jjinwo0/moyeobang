import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { css } from '@emotion/react'
import TransactionDetailDefaultCard from '@/components/Account/Detail/TransactionDetailDefaultCard'
import Btn from '@/components/common/btn/Btn'
import { colors } from '@/styles/colors'
import DetailCardByReceipt from '@/components/Account/Detail/DetailCardByReceipt'
import DetailCardByCustom from '@/components/Account/Detail/DetailCardByCustom'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import moyeobang from '@/services/moyeobang'
import ResultByPos from '@/components/QrByPos/ResultByPos'
import ResultByReceiptComponenet from '@/components/Account/SettleByReceipt/ResultByReceiptComponent'

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
  const [ openUpdateModal, setOpentUpdateModal] = useState<boolean>(false);

  const {data} = useSuspenseQuery({
    queryKey: ['transactionDetail', accountId, transactionId],
    queryFn: () => moyeobang.getTransactionDetail(accountId, Number(transactionId)),
  });

  const transactionDetailData = data.data.data;
  console.log('거래 상세 데이터', transactionDetailData)

  function handleUpdateReceipt() {
    setOpentUpdateModal(true);
  }

  function handleClose() {
    setOpentUpdateModal(false);
  }

  // 타입 가드 함수
  function isSettledParticipantByCustom(
    details: SettledItemByReceipt[] | SettledParticipantByCustom[]
  ): details is SettledParticipantByCustom[] {
    return (details as SettledParticipantByCustom[])[0].participant !== undefined;
  }

  return openUpdateModal ? (
    <ResultByReceiptComponenet 
      data={transactionDetailData as TransactionDetailByReceipt} 
      onClose={handleClose}
      isNew={false}
      />
  ) : (
    <div css={layoutStyle}>
      <TransactionDetailDefaultCard
        paymentName={transactionDetailData.paymentName}
        money={transactionDetailData.money}
        createdAt={transactionDetailData.createdAt}
        adress={transactionDetailData.address}
        acceptedNumber={transactionDetailData.acceptedNumber}
      />
      {transactionDetailData.splitMethod === 'receipt' &&
        !isSettledParticipantByCustom(transactionDetailData.details) && (
          <>
            <div css={columnStyle}>
              <div>상품명</div>
              <div>수량</div>
              <div>금액</div>
            </div>
            <div css={listStyle}>
              {transactionDetailData.details.map((detail, index) => (
                <DetailCardByReceipt key={index} {...detail} />
              ))}
            </div>
            <Btn buttonStyle={{ size: 'big', style: 'blue' }} onClick={handleUpdateReceipt}>
              정산 수정하기
            </Btn>
          </>
        )}
      {transactionDetailData.splitMethod === 'custom' && (
        <>
          <div css={columnStyle}>
            <div>프로필</div>
            <div>정산자</div>
            <div>정산금액</div>
          </div>
          <div css={listStyle}>
            {isSettledParticipantByCustom(transactionDetailData.details) &&
              transactionDetailData.details.map((detail, index) => (
                <DetailCardByCustom
                  key={index}
                  {...detail.participant}
                  money={detail.money}
                />
              ))}
          </div>
          <Link to={`/account/${transactionId}/settle`} search={{ method: 'custom' }} css={LinkStyle}>
            <Btn buttonStyle={{ size: 'big', style: 'blue' }}>정산 수정하기</Btn>
          </Link>
        </>
      )}
    </div>
  );
}