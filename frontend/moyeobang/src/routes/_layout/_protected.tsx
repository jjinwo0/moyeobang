import {createFileRoute, Outlet, useNavigate} from '@tanstack/react-router';
import {getCookie} from '@/uti, useNavigatel/cookie';
import React, {useEffect} from 'react';

// 로그인 된 사용자 아닐시 entrance로 이동
// 로그인 여부를 확인하는 함수
const isAuthenticated = () => {
  return Boolean(getCookie('refresh_token'));
};

export const Route = createFileRoute('/_layout/_protected')({
  component: Protected,
});

function Protected() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate({to: '/', replace: true});
    }
  }, [navigate]);

  return <Outlet />;
}
