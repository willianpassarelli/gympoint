import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Button from '~/components/Button';

import {
  Container,
  Card,
  HelpOrderAnswer,
  HelpOrderList,
  AnswerIcon,
  AnswerText,
  AnswerDate,
  Question,
} from './styles';

function HelpOrder({ navigation, isFocused }) {
  const id = useSelector(state => state.user.profile);

  const [helpOrders, setHelpOrders] = useState([]);

  async function loadHelpOrders() {
    try {
      const response = await api.get(`students/${id}/help-orders`);

      const data = response.data.map(helpOrder => {
        const createdAt = formatDistanceStrict(
          parseISO(helpOrder.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        );

        const answer_at =
          helpOrder.answer_at &&
          formatDistanceStrict(parseISO(helpOrder.answer_at), new Date(), {
            locale: pt,
            addSuffix: true,
          });
        return {
          ...helpOrder,
          createdAt,
          answer_at,
        };
      });

      setHelpOrders(data);
    } catch (err) {
      Alert.alert('Pedido de auxílio', 'Erro a carregar lista');
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, id]);

  return (
    <Background>
      <Header />
      <Container>
        <Button onPress={() => navigation.navigate('New')}>
          Novo pedido de auxílio
        </Button>
        <HelpOrderList
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                item.answer &&
                navigation.navigate('Answer', {
                  item,
                })
              }
            >
              <HelpOrderAnswer>
                <AnswerIcon>
                  <Icon
                    name="check-circle"
                    size={16}
                    color={item.answer ? '#42CB59' : '#999'}
                  />
                  <AnswerText answer={item.answer}>
                    {item.answer ? 'Respondido' : 'Sem resposta'}
                  </AnswerText>
                </AnswerIcon>
                <AnswerDate>
                  {item.answer_at ? item.answer_at : item.createdAt}
                </AnswerDate>
              </HelpOrderAnswer>
              <Question>{item.question}</Question>
            </Card>
          )}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(HelpOrder);
