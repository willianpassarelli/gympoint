import React, { useState, useEffect, useCallback } from 'react';
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
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const loadHelpOrders = useCallback(async () => {
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
  }, [id]);

  async function loadData(paginate = 1) {
    const response = await api.get(`students/${id}/help-orders`, {
      params: {
        page: paginate,
      },
    });

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

    setRefreshing(false);
    setPage(paginate);
    setHelpOrders(paginate >= 2 ? [...helpOrders, ...data] : data);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders();
    }
  }, [isFocused, id, loadHelpOrders]);

  function loadMore() {
    const next = page + 1;
    loadData(next);
  }

  function refreshList() {
    setRefreshing(true);
    setHelpOrders([]);
    loadData();
  }

  return (
    <Background>
      <Header />
      <Container>
        <Button onPress={() => navigation.navigate('New')}>
          Novo pedido de auxílio
        </Button>
        <HelpOrderList
          data={helpOrders}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
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
