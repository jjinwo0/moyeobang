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
import ResultByReceiptComponenet from '@/components/Account/SettleByReceipt/SettleByReceiptComponent'
import useTravelDetailStore from '@/store/useTravelDetailStore'
import { isSettledParticipantByCustom } from '@/util/typeGaurd'
import PresentMoneyModal from '@/components/Account/PresentMoneyModal/PresentMoneyModal'

const layoutStyle = css`
  margin-top: 50px;
  display:flex;
  flex-direction:column;
  gap:20px;
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
  padding: 15px 5px;
  border-top: solid 3px ${colors.lightGray};
  font-family:'semibold';
  font-size:20px;
  padding-bottom:0px;
`;

const nameStyle=css`
  display:flex;
  justify-content:left;
  padding-left:10px;
  text-align:left;
  width:100px;
`;

const listStyle=css`
  display:flex;
  flex-direction:column;
  overflow-y:auto;
  height:400px;
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
  const [ openUpdateByReceiptModal, setOpentUpdateByReceiptModal] = useState<boolean>(false);
  const {accountId} = useTravelDetailStore();

  const [openPresentModal, setOpenPresentModal] = useState<boolean>(false);
  const [updateReceiptPresentMoney, setUpdateReceiptPresentMoney] = useState<number>(0);

  const {data} = useSuspenseQuery({
    queryKey: ['transactionDetail', accountId, Number(transactionId)],
    queryFn: () => moyeobang.getTransactionDetail(accountId, Number(transactionId)),
  });

  const transactionDetailData = data.data.data;
  // console.log('detail 데이터', transactionDetailData) 

  function handleUpdateReceipt() {
    setOpentUpdateByReceiptModal(true);
  }

  function handleClose() {
    setOpentUpdateByReceiptModal(false);
  }

  function handleOpenPresentModal(remainMoney:number) {
    
    if (remainMoney>0) {
      setUpdateReceiptPresentMoney(remainMoney)
      setOpenPresentModal(true)
    }
  }

  function handleClosePresentModal() {
    setOpenPresentModal(false);
  }

  return openUpdateByReceiptModal ? (
    <ResultByReceiptComponenet 
      data={transactionDetailData as TransactionDetailByReceipt} 
      onClose={handleClose}
      isUpdate={true}
      setPostReceiptRemainMoney={handleOpenPresentModal}
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
      {openPresentModal && 
      <PresentMoneyModal 
      remainMoney={updateReceiptPresentMoney} 
      onClose={handleClosePresentModal}
      />
      }
      {isSettledParticipantByCustom(transactionDetailData.details) ?
      (
        <>
          <div css={columnStyle}>
            <div>프로필</div>
            <div css={nameStyle}>정산자</div>
            <div>정산금액</div>
          </div>
          <div css={listStyle}>
            {transactionDetailData.details.map((detail, index) => (
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
        ) : (
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
    </div>
  );
}