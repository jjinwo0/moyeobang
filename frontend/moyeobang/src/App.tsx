import React from 'react';
import { useState } from 'react';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { css } from '@emotion/react';
import PlusBtn from './components/common/btn/PlustBtn';
import CalculatePopup from './components/common/calculate/CalculatePopup';

import '@/styles/App.css'

function App() {
  return (
    <>
    <PlusBtn></PlusBtn>
    <CalculatePopup></CalculatePopup>
    </>
  );
}

export default App;
