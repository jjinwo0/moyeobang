import HeaderWithBackButton from '@/components/common/Header/HeaderWithBackButton'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/_layout/_protected/_layout/account/$transactionId/detail/_layout')({
  component: AccountDetailLayout
})

export default function AccountDetailLayout() {

  return (
    <>
      <HeaderWithBackButton />
      <Outlet />
    </>
  )
}