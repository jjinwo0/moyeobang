import React from 'react';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { css } from '@emotion/react';

import '@/styles/App.css'
import Btn from './components/common/btn/Btn';


function App() {
  return (
    <>
    <Btn buttonStyle={{style:'blue', size:'small'}}>확인</Btn>
    </>
  );
}

export default App;
