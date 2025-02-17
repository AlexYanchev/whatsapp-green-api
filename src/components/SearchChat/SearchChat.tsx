import React, { FC } from 'react';
import styled from 'styled-components';
import { useChatContext } from '../../providers/ChatProvider/ChatProvider';
import { E_Storage } from '../../types/E_Storage';
import { I_Chat } from '../../types/I_Chat';
import { I_Message } from '../../types/I_Message';

const Container = styled.div`
  padding: 8px;
`;

const Form = styled.form`
  display: flex;
  height: 30px;
`;

const Input = styled.input`
  flex: 1;
  border: 1px solid var(--common-grey);
  padding: 3px;
`;

const Button = styled.button`
  background: transparent;
  border: 1px solid var(--common-grey);
`;

const SearchChat: FC = () => {
  const { dispatch } = useChatContext();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const input = form.get('searchChat');

    if (!input) return;

    const value = input.toString();

    const id = new Date().getTime();

    const newChat: I_Chat = {
      clientNumber: value,
      clientName: value,
      chatId: id,
      lastMessage: { lastTimeMessage: null, text: '' },
    };

    dispatch({
      type: 'ADD_CHAT',
      payload: newChat,
    });

    const storageChats = sessionStorage.getItem(E_Storage.CHATS);
    const storageMessages = sessionStorage.getItem(E_Storage.MESSAGES);

    if (storageChats) {
      const chats: I_Chat[] = [newChat, ...JSON.parse(storageChats)];
      sessionStorage.setItem(E_Storage.CHATS, JSON.stringify(chats));
    } else {
      sessionStorage.setItem(E_Storage.CHATS, JSON.stringify([newChat]));
    }

    if (storageMessages) {
      const messages: Record<number, I_Message[]> = JSON.parse(storageMessages);
      sessionStorage.setItem(
        E_Storage.MESSAGES,
        JSON.stringify({ ...messages, [newChat.chatId]: [] })
      );
    } else {
      sessionStorage.setItem(
        E_Storage.MESSAGES,
        JSON.stringify({ [newChat.chatId]: [] })
      );
    }

    e.currentTarget.reset();
  };
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          name='searchChat'
          type='number'
          title='Добавьте чат'
          placeholder='Добавьте чат...'
          maxLength={20}
        />
        <Button type='submit'>Добавить</Button>
      </Form>
    </Container>
  );
};

export default SearchChat;
