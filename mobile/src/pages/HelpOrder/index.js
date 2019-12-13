import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { Container } from './styles';

export default function HelpOrder() {
  return (
    <Background>
      <Header />
      <Container>
        <Text>Help</Text>
      </Container>
    </Background>
  );
}

HelpOrder.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
