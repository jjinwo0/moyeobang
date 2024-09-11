import React from 'react';
import {createFileRoute} from '@tanstack/react-router';

const travelLogMain = () => {
  return <></>;
};

export const Route = createFileRoute('/_layout/_protected/_layout/travelLog/')({
  component: travelLogMain,
});
