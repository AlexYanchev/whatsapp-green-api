import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { sendMessage } from '../../api';
import { useChatStateContext } from '../../providers/StateProvider/StateProvider';
import { useChatContext } from '../../providers/ChatProvider/ChatProvider';
import { E_Storage } from '../../types/E_Storage';
import { I_Message } from '../../types/I_Message';

const Container = styled.div`
  min-height: 80px;
`;
const Form = styled.form`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 10px 15px;
  align-items: stretch;
`;
const Input = styled.input`
  width: 100%;
`;
const Button = styled.button``;

interface MessageFormProps {
  clientNumber: string;
  activeChatId: number;
}

const MessageForm: FC<MessageFormProps> = ({ clientNumber, activeChatId }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { idInstance, apiTokenInstance } = useChatStateContext();
  const { dispatch } = useChatContext();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!idInstance || !apiTokenInstance) {
      return;
    }

    setLoading(true);

    const form = new FormData(e.currentTarget);
    const input = form.get('message');

    const inputValue = input && input.toString();

    if (!inputValue || inputValue.length <= 0) {
      return;
    }

    sendMessage({
      idInstance,
      apiTokenInstance,
      clientNumber,
      message: inputValue,
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((res: { idMessage: string }) => {
        const newMessage = {
          messageId: res.idMessage,
          chatId: activeChatId,
          text: inputValue,
          self: true,
          time: new Date().toLocaleTimeString(),
        };

        dispatch({
          type: 'ADD_MESSAGE',
          payload: newMessage,
        });

        const storage = sessionStorage.getItem(E_Storage.MESSAGES);

        if (storage) {
          const messages: I_Message[] = JSON.parse(storage)[activeChatId] || [];
          messages.push(newMessage);
          sessionStorage.setItem(
            E_Storage.MESSAGES,
            JSON.stringify({ [activeChatId]: messages })
          );
        } else {
          sessionStorage.setItem(
            E_Storage.MESSAGES,
            JSON.stringify({ [activeChatId]: [newMessage] })
          );
        }

        if (formRef.current) formRef.current.reset();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <Form onSubmit={onSubmit} ref={formRef}>
        <Input
          name='message'
          type='text'
          title='Отправить сообщение'
          placeholder='Отправить сообщение...'
          maxLength={2000}
        />
        <Button type='submit' disabled={loading}>
          Отправить
        </Button>
      </Form>
    </Container>
  );
};

export default MessageForm;
