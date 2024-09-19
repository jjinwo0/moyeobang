import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import HeaderWithBackButton from '@/components/common/Header/HeaderWithBackButton';

export const Route = createFileRoute('/_layout/_protected/_layout/account/$transactionId/resultByReceipt/_layout')({
  component: CalculateLayout
})

export default function CalculateLayout() {

  return (
    <>
      <HeaderWithBackButton />
      <Outlet />
    </>
  )
}