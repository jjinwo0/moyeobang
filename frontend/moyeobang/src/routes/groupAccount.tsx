import { createFileRoute } from '@tanstack/react-router'
import 'react'
import GroupAccountMain from '@/pages/groupAccount/groupAccountMain'


export const Route = createFileRoute('/groupAccount')({
  component: GroupAccount
})

function GroupAccount() {

  return (
    <>
    <GroupAccountMain />
    </>
  )
}

export default GroupAccount;