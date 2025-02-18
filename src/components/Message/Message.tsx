import React, { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div<{ $self: boolean }>`
  display: flex;
  margin-bottom: 8px;
  ${(props) =>
    props.$self
      ? css`
          justify-content: flex-end;
        `
      : css`
          justify-content: flex-start;
        `};
`;

const MessageContainer = styled.div<{ $background: string }>`
  padding: 5px;
  max-width: 40%;
  border-radius: var(--border-radius-medium);
  ${(props) =>
    props.$background &&
    css`
      background: ${props.$background};
    `};
`;
const MessageText = styled.p``;

const Time = styled.p`
  font-size: 0.8rem;
  color: var(--common-grey);
`;

interface MessageProps {
  text: string;
  time: string;
  self: boolean;
}

const Message: FC<MessageProps> = ({ text, self, time }) => {
  return (
    <Container $self={self}>
      <MessageContainer
        $background={self ? 'var(--outgoing-chat)' : 'var(--white)'}
      >
        <MessageText>{text}</MessageText>
        <Time>{time}</Time>
      </MessageContainer>
    </Container>
  );
};

export default Message;
