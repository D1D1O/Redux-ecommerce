import React from "react";
import { Routes as Routess, Route } from "react-router-dom";

import Home from './pages/Home';
import Cart from './pages/Cart';

export default function Routes() {
  return (
    <Routess>
      <Route path="/" exact element={<Home/>} />
      <Route path="/cart"  element={<Cart/>} />
    </Routess>
  )
}
