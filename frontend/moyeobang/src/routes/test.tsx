import React from 'react';

import { createFileRoute } from '@tanstack/react-router'
import GeneralButton from '@/components/common/btn/GeneralButton'

export const Route = createFileRoute('/test')({
  component: Test,
})

function Test() {
  return <GeneralButton></GeneralButton>;
}
