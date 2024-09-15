import { createFileRoute } from '@tanstack/react-router'
import { css } from '@emotion/react'
import React from 'react';
import { useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import { receipts } from "@/data/data";
import { extractReceiptData } from '@/utils/receiptParser';

export const Route = createFileRoute('/_layout/_protected/_layout/account/resultByReceipt/_layout/')({
  component: settledReceipt
})  

const layoutStyle = css `
  margin-top:50px;
`;

export default function settledReceipt() {

  const location = useLocation();
  const data = location.state;

  const transactionId = data?.transactionId;
  const results = data?.data;


  // 영수증 텍스트 리스트 추출
  const receiptText: string[] = receipts.map((field) => field.inferText);

  const receiptData = extractReceiptData(receiptText);
  console.log(JSON.stringify(receiptData, null, 2));

  return (
    <div css={layoutStyle}>
      {transactionId ? (
        // 수정페이지
        <div>수정페이지</div>
      ) : (
        <>
        {/* <pre>{JSON.stringify(receiptData, null, 2)}</pre> */}
        </>
      )}
    </div>
  )
}