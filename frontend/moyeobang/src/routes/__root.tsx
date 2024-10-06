import React from 'react';
import {createRootRoute, Link, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';
import {AuthProvider} from '@/contexts/AuthContext';
import {ConnectAccountProvider} from '@/contexts/ConnectAccount';

// rootRoute로 내보내기
export const Route = createRootRoute({
  component: () => (
    <>
      <AuthProvider>
        <ConnectAccountProvider>
          <Outlet />
          <TanStackRouterDevtools />
        </ConnectAccountProvider>
      </AuthProvider>
    </>
  ),
});
