import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Button from '~/components/Button';

import { Container, Input } from './styles';

export default function New() {
  const id = useSelector(state => state.user.profile);

  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    try {
      await api.post(`students/${id}/help-orders`, { question });

      Alert.alert(
        'Pedido de auxílio',
        'Pedido de auxílio enviado com sucesso!'
      );
      setQuestion('');
    } catch (err) {
      Alert.alert('Pedido de auxílio', 'Erro ao enviar pedido de auxílio');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <Input
          autoCorrect={false}
          placeholder="Inclua seu pedido de auxílio"
          value={question}
          onChangeText={setQuestion}
        />
        <Button onPress={handleSubmit}>Enviar pedido</Button>
      </Container>
    </Background>
  );
}

New.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={26} color="#000" />
    </TouchableOpacity>
  ),
});
