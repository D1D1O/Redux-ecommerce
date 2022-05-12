import React from "react";
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from "./pages/styles/global";
import Routes  from './routes';
import './config/ReactotronConfig';
import Header from "./components/Header";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import store from "./store";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Routes/>
        <GlobalStyle/>
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </Provider>
  );
}

export default App;
