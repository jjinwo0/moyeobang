import React from 'react';
import GeneralButton from './Btn';

function App() {
  return (
    <div>
      <GeneralButton buttonStyle={{ style: 'primary', size: 'big' }}>
        Big Primary Button
      </GeneralButton>
      <GeneralButton buttonStyle={{ style: 'secondary', size: 'small' }}>
        Small Secondary Button
      </GeneralButton>
      <GeneralButton buttonStyle={{ style: 'danger', size: 'middle' }}>
        Middle Danger Button
      </GeneralButton>
    </div>
  );
}

export default App;
