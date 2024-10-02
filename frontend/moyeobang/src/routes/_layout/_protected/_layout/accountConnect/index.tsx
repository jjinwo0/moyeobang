import {createFileRoute} from '@tanstack/react-router';
import AccountConnect from '@/components/accountConnect/AccountConnect';
import React from 'react';

export const Route = createFileRoute(
  '/_layout/_protected/_layout/accountConnect/'
)({
  component: Index,
});

function Index() {
  return (
    <>
      <AccountConnect />
    </>
  );
}
