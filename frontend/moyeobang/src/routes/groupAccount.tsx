import { createFileRoute } from '@tanstack/react-router'
import 'react'
import LabeledInput from '../components/common/Inputs/LabeledInput'
import MemoInput from '../components/common/Inputs/MemoInput'
import LocationInput from '../components/common/Inputs/LocationInput'
import TimeInput from '../components/common/Inputs/TimeInput'
import MoneyInput from '../components/common/Inputs/MoneyInput'
import HeaderWithBackButton from '@/components/common/Header/HeaderWithBackButton'
import HeaderWithXButton from '@/components/common/Header/HeaderWithXbutton'
import HeaderWithAlarmAndQR from '@/components/common/Header/HeaderWithAlarmAndQR'

export const Route = createFileRoute('/groupAccount')({
  component: GroupAccount
})

function GroupAccount() {

  return (
    <>
    {/* <HeaderWithAlarmAndQR /> */}
    {/* <HeaderWithXButton />  */}
    {/* <HeaderWithBackButton /> */}
    <LocationInput label='여행장소' placeholder='dsdf'/>
      <LabeledInput label='여행장소' placeholder='dsdf'/>
      <MemoInput label='여행장소' placeholder='dsdf' />
      <LocationInput label='여행장소' placeholder='dsdf'/>
      <TimeInput label='시' />
      <MoneyInput label='원'/>
    </>
  )
}

export default GroupAccount;