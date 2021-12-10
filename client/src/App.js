import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

import * as components from './components/'
import useToken from './useToken';


function App() {
  const { token, setToken } = useToken();

  if (!token)
    return <components.Login setToken={setToken}/>

  return <components.Price setToken={setToken}/>;
}

export default App;
