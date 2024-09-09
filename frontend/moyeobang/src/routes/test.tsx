import React from 'react';

import {createFileRoute} from '@tanstack/react-router';
import GeneralButton from '@/components/common/btn/GeneralButton';

export const Route = createFileRoute('/test')({
  component: Test,
});

function Test() {
  return (
    <>
      <GeneralButton buttonStyle={{size: 'small', style: 'red'}}>
        확인
      </GeneralButton>
      <GeneralButton buttonStyle={{size: 'middle', style: 'blue'}}>
        중간 버튼
      </GeneralButton>
      <GeneralButton buttonStyle={{size: 'big', style: 'blue'}}>
        계좌인증 하기
      </GeneralButton>
      <GeneralButton buttonStyle={{size: 'big', style: 'blueOutlined'}}>
        작은 버튼
      </GeneralButton>
      <GeneralButton buttonStyle={{size: 'middle', style: 'gray'}}>
        작은 버튼
      </GeneralButton>
    </>
  );
}
