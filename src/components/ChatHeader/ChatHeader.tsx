import React, { FC } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-weight: 700;
`;

const Time = styled.p`
  color: var(--common-grey);
  font-size: 0.8rem;
  font-weight: 300;
`;

interface ChatHeaderProps {
  title: string;
  lastMessageTime: string;
}

const ChatHeader: FC<ChatHeaderProps> = ({ title, lastMessageTime }) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      {lastMessageTime && <Time>{lastMessageTime}</Time>}
    </HeaderContainer>
  );
};

export default ChatHeader;
