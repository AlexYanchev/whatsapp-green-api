import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import ChatPreview from '../ChatPreview/ChatPreview';
import ChatHeader from '../ChatHeader/ChatHeader';
import Chat from '../Chat/Chat';
import MessageForm from '../MessageForm/MessageForm';
import { useChatContext } from '../../providers/ChatProvider/ChatProvider';

const RightSideContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const Header = styled.div`
  background: var(--common-grey);
  border-top-right-radius: var(--border-radius-medium);
`;

const EmptyChatsPlaceholder = styled.p`
  color: var(--common-grey);
  padding: 10px;
`;

const RightSide: FC = () => {
  const { activeChatId, chats } = useChatContext();

  const activeChat = useMemo(() => {
    return chats.find((chat) => chat.chatId === activeChatId);
  }, [activeChatId, chats]);

  return (
    <RightSideContainer>
      {activeChat ? (
        <>
          <Header>
            <ChatPreview avatarSize='medium' chatId={activeChat.chatId}>
              <ChatHeader
                title={activeChat.clientName}
                lastMessageTime={activeChat.lastMessage.lastTimeMessage || ''}
              />
            </ChatPreview>
          </Header>
          <Chat activeChatId={activeChat.chatId} />
          <MessageForm
            clientNumber={activeChat.clientNumber}
            activeChatId={activeChat.chatId}
          />
        </>
      ) : (
        <EmptyChatsPlaceholder>Нет активного чата</EmptyChatsPlaceholder>
      )}
    </RightSideContainer>
  );
};

export default RightSide;
