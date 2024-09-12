import { createFileRoute } from '@tanstack/react-router'
import { css } from '@emotion/react'
import React from 'react';
import { useState } from 'react';

export const Route = createFileRoute('/_layout/_protected/_layout/account/settledReceipt/_layout/')({
  component: settledReceipt
})  

const layoutStyle = css `
  margin-top:50px;
`;

export default function settledReceipt() {


  return (
    <div css={layoutStyle}>
      영수증 정산된 페이지
    </div>
  )
}