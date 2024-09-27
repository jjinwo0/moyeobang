import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import { css } from '@emotion/react'
import Btn from '@/components/common/btn/Btn'
import QrScanByPos from '@/components/QrByPos/QrScanByPos'
import ResultByPos from '@/components/QrByPos/ResultByPos'

const Items = [
  {
    orderItemId: 1,
    orderItemTitle: '아이스 아메리카노',
    orderItemPrice: 1500,
  },
  {
    orderItemId: 2,
    orderItemTitle: '카페라떼',
    orderItemPrice: 3000,
  },
  {
    orderItemId: 3,
    orderItemTitle: '카라멜마끼아또',
    orderItemPrice: 3500,
  },
  {
    orderItemId: 4,
    orderItemTitle: '티라미수 케이크',
    orderItemPrice: 6500,
  },
]

export const Route = createFileRoute('/pos/')({
  component: Pos,
})

const layoutStyle = css`
  width: 100%;
  height: 100%;
  box-sizing:border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding-bottom:30px;

  input {
    width: 300px;
    height: 30px;
    border-radius: 15px;
    font-size: 16px;
    padding: 0 15px;
  }

  div {
    padding: 10px;
  }

  p {
    padding: 10px;
  }
`;

const boxStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing:border-box;
  padding: 0 10px;
`;

const buttonLayoutStyle = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

// createdAt, uuid(paymentRequestId), paymentName, address, money 필요
export default function Pos() {
  const [placeId, setPlaceId] = useState<number | undefined>()
  const [placeName, setPlaceName] = useState<PaymentName>('')
  const [amount, setAmount] = useState<Money>(0)
  const [placeAddress, setPlaceAddress] = useState<Adress>('')
  const [latitude, setLatitude] = useState<number | undefined>()
  const [longitude, setLongitude] = useState<number | undefined>()
  const [targetAccountNumber, setTargetAccountNumber] = useState<string>('0012280102000441')

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}) // 각 상품의 수량을 저장
  const [isOpenQrModal, setIsOpenQrModal] = useState<boolean>(false)
  const [data, setData] = useState<PosPay>() // requestId, 결제자 계좌 아이디 없는 data 즉 결제기 데이터
  const [isOpenResultModal, setIsOpenResultModal] = useState<boolean>(false);
  const [resultData, setResultData] = useState<PaymentProps>(); // 결제 최종 데이터 
  

  function handlePlaceId(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setPlaceId(undefined)
    }
    const newId = parseInt(e.target.value) // 숫자로변환
    if (!isNaN(newId)) {
      setPlaceId(newId)
    }
  }

  function handlePlaceName(e: React.ChangeEvent<HTMLInputElement>) {
    setPlaceName(e.target.value)
  }

  function handlePlaceAddress(e: React.ChangeEvent<HTMLInputElement>) {
    setPlaceAddress(e.target.value)
  }

  function handleAmount(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setAmount(0)
    }
    const newAmount = parseInt(e.target.value) // 숫자로변환
    if (!isNaN(newAmount)) {
      setAmount(newAmount)
    }
  }

  function handleLatitude(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setLatitude(undefined)
    }
    const newLatitude = parseFloat(e.target.value) // 숫자로변환
    if (!isNaN(newLatitude)) {
      setLatitude(newLatitude)
    }
  }

  function handleLongitude(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setLongitude(undefined)
    }
    const newLongitude = parseFloat(e.target.value) // 숫자로변환
    if (!isNaN(newLongitude)) {
      setLongitude(newLongitude)
    }
  }

  function handleTargetAccountNumber(e: React.ChangeEvent<HTMLInputElement>) {
    setTargetAccountNumber(e.target.value)
  }

  // 수량 증가
  function increaseQuantity(itemId: number) {
    const itemPrice =
      Items.find((item) => item.orderItemId === itemId)?.orderItemPrice || 0

    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[itemId] || 0) + 1
      setAmount((prevAmount) =>
        prevAmount ? prevAmount + itemPrice : itemPrice,
      )
      return {
        ...prevQuantities,
        [itemId]: newQuantity,
      }
    })
  }

  // 수량 감소
  function decreaseQuantity(itemId: number) {
    const itemPrice =
      Items.find((item) => item.orderItemId === itemId)?.orderItemPrice || 0

    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[itemId] || 0
      const newQuantity = currentQuantity >= 1 ? currentQuantity - 1 : 0

      if (currentQuantity > 0) {
        setAmount((prevAmount) => (prevAmount ? prevAmount - itemPrice : 0))
      }

      return {
        ...prevQuantities,
        [itemId]: newQuantity,
      }
    })
  }

  // 정산하기
  function handleSettle() {
    if (placeId && latitude && longitude && amount) {
      const data: PosPay = {
        placeId,
        placeName,
        placeAddress,
        amount,
        latitude,
        longitude,
        targetAccountNumber,
      }
      setData(data)
      setIsOpenQrModal(true)
    }
  }

  function handleQrClose() {
    setIsOpenQrModal(false);
  }

  function handleResult(data:PaymentProps) {
    setResultData(data); // 결제 최종 데이터 받아오기
    setIsOpenResultModal(true)

    // 결제 api
  }

  function handleOnClickOutside() {
    setIsOpenResultModal(false);
  }

  return (
    <div css={layoutStyle}>
      {isOpenQrModal && data && <QrScanByPos onClose={handleQrClose} paymentData={data} onResult={handleResult}/> }
      {isOpenResultModal && resultData && <ResultByPos {...resultData} onClickOutside={handleOnClickOutside}/>}
      { !isOpenQrModal && !isOpenResultModal &&
        <>
          <div>
            <p>가맹점 id (placeId)</p>
            <input
              type="number"
              value={placeId !== undefined ? placeId : ''}
              onChange={handlePlaceId}
            />
          </div>
          <div>
            <p>가맹점 이름 (placeName)</p>
            <input type="text" value={placeName} onChange={handlePlaceName} />
          </div>
          <div>
            <p>가맹점 주소(placeAddress)</p>
            <input
              type="text"
              value={placeAddress}
              onChange={handlePlaceAddress}
            />
          </div>
          <div>
            <p>가맹점 계좌번호(targetAccountNumber)</p>
            <input
              type="text"
              value={targetAccountNumber}
              onChange={handleTargetAccountNumber}
            />
          </div>
          <div>
            <p>위도(latitude)</p>
            <input
              type="number"
              value={latitude}
              onChange={handleLatitude}
              step="0.000001"
            />
          </div>
          <div>
            <p>경도(longitude)</p>
            <input
              type="number"
              value={longitude}
              onChange={handleLongitude}
              step="0.000001"
            />
          </div>
          <div>
            <p>총금액(Money)</p>
            <input type="number" value={amount} onChange={handleAmount} />
          </div>

          {Items.map((item) => (
            <div key={item.orderItemId} css={boxStyle}>
              <div>
                <div>{item.orderItemTitle}</div>
                <div>{item.orderItemPrice}원</div>
                <div>수량: {quantities[item.orderItemId] || 0}</div>
              </div>
              <div css={buttonLayoutStyle}>
                <div>
                  <Btn
                    buttonStyle={{ size: 'middle', style: 'blue' }}
                    onClick={() => increaseQuantity(item.orderItemId)}
                  >
                    +
                  </Btn>
                </div>
                <div>
                  <Btn
                    buttonStyle={{ size: 'middle', style: 'red' }}
                    onClick={() => decreaseQuantity(item.orderItemId)}
                  >
                    -
                  </Btn>
                </div>
              </div>
            </div>
          ))}
          <Btn
            buttonStyle={{ size: 'big', style: 'blue' }}
            onClick={handleSettle}
          >
            결제하기
          </Btn>
        </>
      }
    </div>
  )
}
