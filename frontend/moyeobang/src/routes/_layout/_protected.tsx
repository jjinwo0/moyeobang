import { createFileRoute, Outlet } from '@tanstack/react-router'
import React from 'react';

export const Route = createFileRoute('/_layout/_protected')({
  component: Protected
})

// 로그인 된 사용자 아닐시 entrance로 이동
function Protected() {
  return <Outlet />;
}