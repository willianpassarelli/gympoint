import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { useSelector } from 'react-redux';

import api from '~/services/api';

import Background from '~/components/Background';
import Button from '~/components/Button';
import Header from '~/components/Header';

import {
  Container,
  CheckinList,
  Card,
  CheckinTitle,
  CheckinDate,
} from './styles';

export default function Checkin() {
  const id = useSelector(state => state.user.profile);

  const [checkins, setCheckins] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const loadCheckins = useCallback(async () => {
    try {
      const response = await api.get(`students/${id}/checkins`);

      const data = response.data.map(checkin => {
        const dateFormatted = formatDistanceStrict(
          parseISO(checkin.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        );
        return {
          ...checkin,
          createdAt: dateFormatted,
        };
      });

      setCheckins(data);
    } catch (err) {
      Alert.alert('Checkins', 'Erro a carregar lista');
    }
  }, [id]);

  async function loadData(paginate = 1) {
    const response = await api.get(`students/${id}/checkins`, {
      params: {
        page: paginate,
      },
    });

    const data = response.data.map(checkin => {
      const dateFormatted = formatDistanceStrict(
        parseISO(checkin.createdAt),
        new Date(),
        {
          locale: pt,
          addSuffix: true,
        }
      );
      return {
        ...checkin,
        createdAt: dateFormatted,
      };
    });

    setRefreshing(false);
    setPage(paginate);
    setCheckins(paginate >= 2 ? [...checkins, ...data] : data);
  }

  useEffect(() => {
    loadCheckins();
  }, [id, loadCheckins]);

  async function handleSubmit() {
    try {
      await api.post(`students/${id}/checkins`);

      loadCheckins();
    } catch (err) {
      Alert.alert(
        'Erro realizar check-in',
        'Você já fez 5 check-ins esta semana.'
      );
    }
  }

  function loadMore() {
    const next = page + 1;
    loadData(next);
  }

  function refreshList() {
    setRefreshing(true);
    setCheckins([]);
    loadData();
  }

  return (
    <Background>
      <Header />
      <Container>
        <Button onPress={handleSubmit}>Novo check-in</Button>
        <CheckinList
          data={checkins}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Card>
              <CheckinTitle>Check-in #{item.id}</CheckinTitle>
              <CheckinDate>{item.createdAt}</CheckinDate>
            </Card>
          )}
        />
      </Container>
    </Background>
  );
}

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
