import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Global from './styles/global';
import { RoutesApp } from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RoutesApp />
      <Global />
    </BrowserRouter>
  );
}

export default App;