import { createFileRoute, Outlet } from '@tanstack/react-router'
// import {Suspense} from 'react';
import React from 'react';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});

function Layout() {
  return (
    <div>
      {/* <Suspense fallback={<Spinner />}> */}
        <Outlet />
      {/* </Suspense> */}
    </div>
  );
}