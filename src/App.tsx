import React from 'react';
import './App.css';
import styled from 'styled-components';
import Login from './pages/Login/Login';
import MainChat from './pages/MainChat/MainChat';
import { useChatStateContext } from './providers/StateProvider/StateProvider';

const RootBackground = styled.div`
  background: linear-gradient(
    to bottom,
    var(--teal-green-dark) 20%,
    var(--common-grey) 20%
  );
  height: 100vh;
  padding: 20px 40px;
`;

function App() {
  const { idInstance, apiTokenInstance } = useChatStateContext();

  const isLogged = idInstance && apiTokenInstance;

  return <RootBackground>{isLogged ? <MainChat /> : <Login />}</RootBackground>;
}

export default App;
