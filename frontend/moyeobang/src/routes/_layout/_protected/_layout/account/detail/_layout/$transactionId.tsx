import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { css } from '@emotion/react'


export const Route = createFileRoute('/_layout/_protected/_layout/account/detail/_layout/$transactionId')({
  component: AccountDetail
})

const layoutStyle = css`
  margin-top: 50px;
`

export default function AccountDetail() {
  const { transactionId } = Route.useParams()

  return (
    <div css={layoutStyle}>
      {transactionId}의 상세 거래 내역 페이지
    </div>
  )
}