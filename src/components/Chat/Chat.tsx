import React, { FC, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import Message from '../Message/Message';
import { useChatContext } from '../../providers/ChatProvider/ChatProvider';
import { getMessage, deleteNotification } from '../../api';
import { useChatStateContext } from '../../providers/StateProvider/StateProvider';

const Container = styled.div`
  background: var(--chat-background);
  padding: 10px;
  overflow-y: auto;
`;

interface ChatProps {
  activeChatId: number;
}

const Chat: FC<ChatProps> = ({ activeChatId }) => {
  const { idInstance, apiTokenInstance } = useChatStateContext();
  const { chats, messages, dispatch } = useChatContext();
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const abortControllerRef = useRef<AbortController>(null);

  const activeMessages = useMemo(() => {
    return messages[activeChatId];
  }, [activeChatId, messages]);

  useEffect(() => {
    if (!idInstance || !apiTokenInstance) return;
    intervalRef.current = setInterval(async () => {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        const data = await getMessage({
          idInstance,
          apiTokenInstance,
          signal: abortControllerRef.current.signal,
        });

        if (!data) return;

        await deleteNotification({
          idInstance,
          apiTokenInstance,
          receiptId: data.receiptId,
        });

        const clientNumber = data.body.senderData.sender.substring(
          0,
          data.body.senderData.sender.indexOf('@')
        );
        const clientName = data.body.senderData.senderContactName;
        const text = data.body.messageData.textMessageData.textMessage;
        const messageId = data.body.idMessage;
        const time = new Date(data.body.timestamp).toLocaleTimeString();
        const localChat = chats.find(
          (chat) => chat.clientNumber === clientNumber
        );

        if (!localChat) return;
        if (localChat.clientName !== clientName) {
          dispatch({
            type: 'CHANGE_CHAT',
            payload: { chatId: localChat.chatId, data: { clientName } },
          });
        }

        dispatch({
          type: 'ADD_MESSAGE',
          payload: {
            chatId: localChat.chatId,
            messageId,
            text,
            self: false,
            time,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }, 7000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [idInstance, apiTokenInstance, activeChatId, chats, dispatch]);

  return (
    <Container>
      {activeMessages.map((message) => {
        return (
          <Message
            key={message.messageId}
            text={message.text}
            self={message.self}
            time={message.time}
          />
        );
      })}
    </Container>
  );
};

export default Chat;
