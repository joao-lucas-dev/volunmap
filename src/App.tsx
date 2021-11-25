import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Global from './styles/global';
import { RoutesApp } from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RoutesApp />
      <Global />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;