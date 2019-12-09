import React, {useState} from 'react';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import logo from '~/assets/logo.png';

import {Container, Form, InputText, SubmitButton} from './styles';
import {signInRequest} from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispacth = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const [id, setId] = useState();

  function handleSubmit() {
    dispacth(signInRequest(id));
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <InputText
          keyboardType="number-pad"
          returnKeyType="send"
          value={id}
          onChangeText={setId}
          placeholder="Informe seu ID de cadastro"
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
