import React from 'react';
import {createLazyFileRoute} from '@tanstack/react-router';
import {css} from '@emotion/react';

export const Route = createLazyFileRoute('/_layout/_protected/_layout/_Home/')({
  component: Index,
});

const margin = css`
  margin-top: 500px;
`;
function Index() {
  return <></>;
}
