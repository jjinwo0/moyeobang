import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

const orderData = [
  {
		"title" : "스타벅스",
		"amount" : 1234,
		"senderAccountNumber" : "13213131",
		"receiverAccountNumber" : "12341234",
		"latitude" : 23.23232,
		"logitutde" : 42.31313,
		"paymentSessionId" : "12341231",
		"orders" : {
				"카페라떼" : 2312,
				"왕밤빵" : 2222,
				"밤양갱" : 13131
		},
  },



]

export const Route = createFileRoute('/pos/')({
  component: Pos
})

export default function Pos() {

  function handleClick() {

  }

  return (
    <div>
      {orderData.map((order, index) => (
        <div key={index}>
          <h1>{order.title}</h1>
          <h2>{order.amount}</h2>
          <h5>주문 내역</h5>
        </div>
      ))}
      <button
      onClick={handleClick}
      >
        결제하기
      </button>
    </div>
  )
}