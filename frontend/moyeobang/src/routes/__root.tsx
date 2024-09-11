import React from 'react';
import {createRootRoute, Link, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';

// rootRoute로 내보내기
export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
