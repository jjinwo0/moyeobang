import React from 'react';

import {createFileRoute} from '@tanstack/react-router';
import Btn from '@/components/common/btn/Btn';

export const Route = createFileRoute('/test')({
  component: Test,
});

function Test() {
  return (
    <>
      <Btn buttonStyle={{size: 'small', style: 'red'}}>
        확인
      </Btn>
      <Btn buttonStyle={{size: 'middle', style: 'blue'}}>
        중간 버튼
      </Btn>
      <Btn buttonStyle={{size: 'big', style: 'blue'}}>
        계좌인증 하기
      </Btn>
      <Btn buttonStyle={{size: 'big', style: 'blueOutlined'}}>
        작은 버튼
      </Btn>
      <Btn buttonStyle={{size: 'middle', style: 'gray'}}>
        작은 버튼
      </Btn>
    </>
  );
}
