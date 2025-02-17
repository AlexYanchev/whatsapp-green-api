import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar/Avatar';
import { T_AvatarSize } from '../../types/T_AvatarSize';
import { useChatContext } from '../../providers/ChatProvider/ChatProvider';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 80px;
  padding: 8px;
  width: 100%;
  background: transparent;
  border-bottom: 1px solid var(--common-grey);
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const MessageContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

interface ChatPreviewProps {
  children: ReactNode;
  avatarSize: T_AvatarSize;
  chatId: number;
}

const ChatPreview: FC<ChatPreviewProps> = ({
  children,
  avatarSize,
  chatId,
}) => {
  const { dispatch } = useChatContext();

  const setActiveChat = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch({ type: 'SET_ACTIVE_CHAT', payload: chatId });
  };

  return (
    <Container onClick={setActiveChat}>
      <Avatar
        size={avatarSize}
        src='https://avatars.mds.yandex.net/i?id=19285fd833cf68afd4265e908690d1d8_l-7761117-images-thumbs&n=13'
      />
      <MessageContainer>{children}</MessageContainer>
    </Container>
  );
};

export default ChatPreview;
