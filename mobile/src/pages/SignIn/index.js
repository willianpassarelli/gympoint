import React, { useState } from 'react';
import { Image } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';
import Button from '~/components/Button';
import Background from '~/components/Background';

import { Container, Form, FormInput } from './styles';

export default function SignIn() {
  const [idUser, setIdUser] = useState();

  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(signInRequest(idUser));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            keyboardType="numeric"
            placeholder="Informe seu ID de cadastro"
            value={idUser}
            onChangeText={setIdUser}
          />
          <Button onPress={handleSubmit} loading={loading}>
            Entrar no sistema
          </Button>
        </Form>
      </Container>
    </Background>
  );
}
