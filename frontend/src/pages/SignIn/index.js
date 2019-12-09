import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { PulseLoader } from 'react-spinners';
import * as Yup from 'yup';

import { Container } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <img src={logo} alt="GymPoint" />
      <b>GYMPOINT</b>

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">
          <b>SEU EMAIL</b>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
        </label>

        <label htmlFor="password">
          <b>SUA SENHA</b>
          <Input name="password" type="password" placeholder="**************" />
        </label>

        <button type="submit">
          {loading ? (
            <PulseLoader size={15} color="#fff" />
          ) : (
            'Entrar no sistema'
          )}
        </button>
      </Form>
    </Container>
  );
}
