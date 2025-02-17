import React, { FC } from 'react';
import styled from 'styled-components';
import { useChatStateContext } from '../../providers/StateProvider/StateProvider';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 15px;
`;

const Form = styled.form`
  max-width: 30%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  border-left: 4px solid var(--teal-green-dark);
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  line-height: 2;
`;

const Label = styled.label``;

const Button = styled.button`
  max-width: 40%;
`;

const Header = styled.h1`
  max-width: 30%;
`;

const Login: FC = () => {
  const { methods } = useChatStateContext();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!methods) {
      return;
    }

    const form = new FormData(e.currentTarget);
    const idInstance = form.get('idInstance');
    const apiTokenInstance = form.get('apiTokenInstance');

    if (!idInstance || !apiTokenInstance) {
      return;
    }

    methods.setInstance(idInstance.toString(), apiTokenInstance.toString());
  };
  return (
    <Container>
      <Header>
        Введите свои данные из{' '}
        <a href='https://green-api.com/' title='Ссылка на GREEN-API'>
          GREEN-API
        </a>
      </Header>
      <Form onSubmit={onSubmit}>
        <Label htmlFor='idInstance'>ID Instance</Label>
        <Input
          name='idInstance'
          id='idInstance'
          type='text'
          placeholder='idInstance...'
          title='idInstance'
        />
        <Label htmlFor='apiTokenInstance'>API Token Instance</Label>
        <Input
          name='apiTokenInstance'
          id='apiTokenInstance'
          type='text'
          placeholder='apiTokenInstance...'
          title='apiTokenInstance'
        />
        <Button>Войти</Button>
      </Form>
    </Container>
  );
};

export default Login;
