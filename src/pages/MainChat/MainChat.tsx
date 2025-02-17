import React, { FC } from 'react';
import styled from 'styled-components';
import LeftSide from '../../components/LeftSide/LeftSide';
import RightSide from '../../components/RightSide/RightSide';
import ChatProvider from '../../providers/ChatProvider/ChatProvider';

const MainWindow = styled.section`
  background-color: var(--white);
  height: 100%;
  border-radius: var(--border-radius-medium);
  display: flex;
`;

const MainChat: FC = () => {
  return (
    <ChatProvider>
      <MainWindow>
        <LeftSide />
        <RightSide />
      </MainWindow>
    </ChatProvider>
  );
};

export default MainChat;
