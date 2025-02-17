import React, { FC } from 'react';
import styled from 'styled-components';
import ChatPreview from '../ChatPreview/ChatPreview';
import SearchChat from '../SearchChat/SearchChat';
import ChatHeader from '../ChatHeader/ChatHeader';
import { useChatStateContext } from '../../providers/StateProvider/StateProvider';
import { useChatContext } from '../../providers/ChatProvider/ChatProvider';

const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 30%;
  min-width: 250px;
`;
const ChatPreviewContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const MessagePreview = styled.p`
  text-overflow: ellipsis;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
`;

const Header = styled.h1`
  font-size: 0.8rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
`;

const EmptyChatsPlaceholder = styled.p`
  color: var(--common-grey);
  padding: 10px;
`;

const LogoutButton = styled.button``;

const LeftSide: FC = () => {
  const { chats } = useChatContext();
  const { idInstance, methods } = useChatStateContext();

  const logout = () => {
    if (!methods) {
      return;
    }
    methods.logout();
  };

  return (
    <LeftSideContainer>
      <HeaderContainer>
        <Header>ID Инстанса: {idInstance}</Header>
        <LogoutButton onClick={logout}>Выход</LogoutButton>
      </HeaderContainer>

      <SearchChat />
      <ChatPreviewContainer>
        {chats.length > 0 ? (
          chats.map((chat) => {
            return (
              <ChatPreview
                avatarSize='small'
                chatId={chat.chatId}
                key={chat.chatId}
              >
                <ChatHeader
                  title={chat.clientName}
                  lastMessageTime={chat.lastMessage.lastTimeMessage || ''}
                />
                <MessagePreview>{chat.lastMessage.text}</MessagePreview>
              </ChatPreview>
            );
          })
        ) : (
          <EmptyChatsPlaceholder>Добавьте чаты...</EmptyChatsPlaceholder>
        )}
      </ChatPreviewContainer>
    </LeftSideContainer>
  );
};

export default LeftSide;
