import React from "react";
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from "./pages/styles/global";
import  Routes  from './routes';


function App() {
  return (
    <BrowserRouter>
      <Routes/>
      <GlobalStyle/>
    </BrowserRouter>
  );
}

export default App;
