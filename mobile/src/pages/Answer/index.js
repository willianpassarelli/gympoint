import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  Card,
  HeaderQuestion,
  Title,
  Text,
  Date,
  BodyAnswer,
} from './styles';

export default function Answer({ navigation }) {
  const item = navigation.getParam('item');

  return (
    <Background>
      <Header />
      <Container>
        <Card>
          <HeaderQuestion>
            <Title>PERGUNTA</Title>
            <Date>{item.answer_at}</Date>
          </HeaderQuestion>
          <Text>{item.question}</Text>
          <BodyAnswer>
            <Title>RESPOSTA</Title>
            <Text>{item.answer}</Text>
          </BodyAnswer>
        </Card>
      </Container>
    </Background>
  );
}

Answer.navigationOptions = ({ navigation }) => ({
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
