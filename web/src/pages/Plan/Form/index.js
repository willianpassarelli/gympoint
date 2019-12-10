import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import Button from '~/components/Button';

import { formatPrice } from '~/util/format';

import api from '~/services/api';

import { Container, Column, Row, Field } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.string().required('A duração do plano é obrigatório'),
  price: Yup.string().required('O valor do plano é obrigatório'),
});

export default function PlanForm({ match }) {
  const { id } = match.params;

  const [plan, setPlan] = useState([]);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    async function loadPlan() {
      if (id) {
        const response = await api.get(`plans/${id}`);

        setPlan(response.data);
        setDuration(response.data.duration);
        setPrice(response.data.price);
      }
    }
    loadPlan();
  }, [id]);

  const formattedPrice = useMemo(() => {
    return formatPrice(duration * price);
  }, [duration, price]);

  async function handleSubmit({ title, duration, price }, { resetForm }) {
    try {
      await api.post('plans', { title, duration, price });

      resetForm();
      toast.success('Plano cadastrado com sucesso!');
    } catch (err) {
      toast.error('Erro ao cadastrar plano.');
    }
  }

  async function handleEdit({ title, duration, price }) {
    try {
      await api.put(`plans/${id}`, { title, duration, price });

      toast.success('Dados do plano atualizado com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar dados do plano.');
    }
  }

  return (
    <Container>
      <Form
        onSubmit={id ? handleEdit : handleSubmit}
        initialData={plan}
        schema={schema}
      >
        <header>
          <strong>{id ? 'Edição de plano' : 'Cadastro de plano'}</strong>
          <div>
            <Button back path="/plan/list" />
            <Button save />
          </div>
        </header>

        <Column>
          <Field>
            <strong>TÍTULO DO PLANO</strong>
            <Input id="title" name="title" />
          </Field>
          <Row>
            <Field>
              <strong>DURAÇÃO (em meses)</strong>
              <Input
                id="duration"
                name="duration"
                type="number"
                onChange={e => setDuration(e.target.value)}
              />
            </Field>
            <Field>
              <strong>PREÇO MENSAL</strong>
              <Input
                id="price"
                name="price"
                type="number"
                onChange={e => setPrice(e.target.value)}
              />
            </Field>
            <Field>
              <strong>PREÇO TOTAL</strong>
              <Input
                id="totalPrice"
                name="totalPrice"
                value={formattedPrice}
                disabled
              />
            </Field>
          </Row>
        </Column>
      </Form>
    </Container>
  );
}
