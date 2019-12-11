import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { addMonths, format, parseISO } from 'date-fns';
import { Form, Input, Select } from '@rocketseat/unform';

import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';

import Button from '~/components/Button';
import AsyncSelect from '~/components/AsyncSelect';
import DatePicker from './DatePicker';

import { formatPrice } from '~/util/format';

import history from '~/services/history';
import api from '~/services/api';

import { Container, Column, Row, Field } from './styles';

const schema = Yup.object().shape({
  plan_id: Yup.string().required('É obrigatório selecionar um plano'),
  start_date: Yup.string().required('É obrigatório selecionar uma data'),
});

export default function EnrollmentForm({ match }) {
  const { id } = match.params;

  const [duration, setDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [plans, setPlans] = useState([]);
  const [studentData, setStudentData] = useState('');
  const [planId, setPlanId] = useState([]);

  useEffect(() => {
    async function loadEnrollment() {
      if (id) {
        const response = await api.get(`enrollment/${id}`);
        const { student, plan, start_date } = response.data;

        setStudentData({ id: student.id, title: student.name });
        setPlanId(plan.id);
        setDuration(plan.duration);
        setTotalPrice(plan.price);
        setStartDate(parseISO(start_date));
      }
    }
    loadEnrollment();
  }, [id]);

  const formattedPrice = useMemo(() => {
    return formatPrice(duration * totalPrice);
  }, [duration, totalPrice]);

  const endDate = useMemo(() => {
    if (startDate && duration) {
      const changeDate = addMonths(startDate, duration);
      return format(changeDate, 'dd/MM/yyyy', { locale: pt });
    }
    return '';
  }, [startDate, duration]);

  async function loadPlans() {
    const response = await api.get('plans');

    setPlans(response.data);
  }

  useEffect(() => {
    loadPlans();
  }, []);

  async function handleSubmit(data) {
    try {
      const price = duration * totalPrice;
      const end_date = addMonths(startDate, duration);
      const dataEnrollment = Object.assign(data, {
        student_id: studentData.id,
        end_date,
        price,
      });

      await api.post('enrollment', dataEnrollment);

      history.push('/enrollment/list');

      toast.success('Matrícula realizada com sucesso!');
    } catch (err) {
      toast.error('Erro ao realizar matrícula.');
    }
  }

  async function handleEdit(data) {
    try {
      const price = duration * totalPrice;
      const end_date = addMonths(startDate, duration);
      const updateEnrollment = Object.assign(data, {
        student_id: studentData.id,
        end_date,
        price,
      });

      await api.put(`enrollment/${id}`, updateEnrollment);

      toast.success('Dados da matrícula atualizados com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar dados da matrícula.');
    }
  }

  async function loadStudents(inputValue) {
    const response = await api.get(`students`, {
      params: {
        search: inputValue,
      },
    });

    const data = response.data.map(student => {
      return {
        id: student.id,
        title: student.name,
      };
    });

    return data;
  }

  function onPlanChange(e) {
    const find = plans.find(plan => String(plan.id) === e.target.value);
    setPlanId(e.target.value);
    setDuration(find.duration);
    setTotalPrice(find.price);
  }

  return (
    <Container>
      <Form onSubmit={id ? handleEdit : handleSubmit} schema={schema}>
        <div>
          <header>
            <strong>
              {id ? 'Edição de matrícula' : 'Cadastro de matrícula'}
            </strong>
            <div>
              <Button back path="/enrollment/list" />
              <Button save />
            </div>
          </header>
        </div>

        <Column>
          <Field nospace>
            <strong>ALUNO</strong>
            <AsyncSelect
              name="student_id"
              placeholder="Buscar aluno"
              value={studentData}
              onChange={change => setStudentData(change)}
              loadOptions={loadStudents}
            />
          </Field>
          <Row>
            <Field nospace>
              <strong>PLANO</strong>
              <Select
                name="plan_id"
                placeholder="Selecione o plano"
                options={plans}
                value={planId}
                onChange={onPlanChange}
              />
            </Field>
            <Field>
              <strong>DATA DE INÍCIO</strong>
              <DatePicker
                name="start_date"
                placeholder="Escolha a data"
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </Field>
            <Field>
              <strong>DATA DE TÉRMINO</strong>
              <Input name="end_date" value={endDate} disabled />
            </Field>
            <Field>
              <strong>VALOR TOTAL</strong>
              <Input name="price" value={formattedPrice} disabled />
            </Field>
          </Row>
        </Column>
      </Form>
    </Container>
  );
}
