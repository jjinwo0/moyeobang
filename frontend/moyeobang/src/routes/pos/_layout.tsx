import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import React from 'react'
import { css } from '@emotion/react'

export const Route = createFileRoute('/pos/_layout')({
  component: PosLayout
})

const layoutStyle =css`
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  overflow-y:auto;
`;


export default function PosLayout() {

  return (
    <div css={layoutStyle}>
      <Outlet/>
    </div>
  )
}