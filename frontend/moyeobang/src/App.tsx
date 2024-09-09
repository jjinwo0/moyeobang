import React from 'react';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { css } from '@emotion/react';

import '@/styles/App.css'
import GeneralButton from './components/common/btn/GeneralButton';


function App() {
  return (
    <>
    <GeneralButton buttonStyle={{style:'blue', size:'small'}}>확인</GeneralButton>
    </>
  );
}

export default App;
