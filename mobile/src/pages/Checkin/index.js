import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    async function loadCheckins() {
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
    }
    loadCheckins();
  }, [id]);

  return (
    <Background>
      <Header />
      <Container>
        <Button>Novo check-in</Button>
        <CheckinList
          data={checkins}
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
