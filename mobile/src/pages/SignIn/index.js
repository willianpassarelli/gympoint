import React, { useState } from 'react';
import { Image, Alert } from 'react-native';

import logo from '~/assets/logo.png';
import Button from '~/components/Button';
import Background from '~/components/Background';

import { Container, Form, FormInput } from './styles';

export default function SignIn({ navigation }) {
  const [idUser, setIdUser] = useState();

  function handleSubmit() {
    navigation.navigate('Checkin');
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
          <Button onPress={handleSubmit}>Entrar no sistema</Button>
        </Form>
      </Container>
    </Background>
  );
}
