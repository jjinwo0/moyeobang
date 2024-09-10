import React from 'react';
import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {css} from '@emotion/react';

import TravelHome from './pages/TravelHome'; // TravelHome 페이지 불러오기

import '@/styles/App.css';

function App() {
  return (
    <>
      <TravelHome />
    </>
  );
}

export default App;
