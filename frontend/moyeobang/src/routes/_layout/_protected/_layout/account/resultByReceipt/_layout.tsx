import { createFileRoute, Outlet } from '@tanstack/react-router'
import HeaderWithBackButton from '@/components/common/Header/HeaderWithBackButton';
import React from 'react';


export const Route = createFileRoute('/_layout/_protected/_layout/account/resultByReceipt/_layout')({
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