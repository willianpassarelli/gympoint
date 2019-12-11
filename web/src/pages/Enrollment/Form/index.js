import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { addMonths, format, parseISO } from 'date-fns';
import { Form, Input, Select } from '@rocketseat/unform';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';

import Button from '~/components/Button';
import DatePicker from './DatePicker';

import { formatPrice } from '~/util/format';

import api from '~/services/api';

import { Container, Column, Row, Field } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.string().required('É obrigatório selecionar um aluno'),
  plan_id: Yup.string().required('É obrigatório selecionar um plano'),
  start_date: Yup.date().required('É obrigatório selecionar uma data'),
});

export default function EnrollmentForm({ match }) {
  const { id } = match.params;

  const [students, setStudents] = useState([]);
  const [duration, setDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [plans, setPlans] = useState([]);
  const [enrollment, setEnrollment] = useState([]);

  useEffect(() => {
    async function loadEnrollment() {
      if (id) {
        const response = await api.get(`enrollment/${id}`);
        const { student, plan, start_date, end_date, price } = response.data;

        const data = {
          student_id: student.id,
          plan_id: plan.id,
          start_date,
          end_date,
          price,
        };

        console.tron.log('modify', data);
        setEnrollment(data);
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

  async function loadStudents() {
    const response = await api.get('students');

    const data = response.data.map(student => {
      return {
        id: student.id,
        title: student.name,
      };
    });

    setStudents(data);
  }

  async function loadPlans() {
    const response = await api.get('plans');

    setPlans(response.data);
  }

  useEffect(() => {
    loadStudents();
    loadPlans();
  }, []);

  async function handleSubmit(data, { resetForm }) {
    try {
      const { student_id, plan_id, start_date } = data;
      const price = duration * totalPrice;
      const end_date = addMonths(startDate, duration);
      const dataEnrollment = {
        student_id,
        plan_id,
        start_date,
        end_date,
        price,
      };

      await api.post('enrollment', dataEnrollment);

      resetForm();
      setDuration(0);
      setTotalPrice(0);
      toast.success('Matrícula realizada com sucesso!');
    } catch (err) {
      toast.error('Erro ao realizar matrícula.');
    }
  }

  async function handleEdit(data) {
    try {
      // await api.put();

      toast.success('Dados da matrícula atualizados com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar dados da matrícula.');
    }
  }

  function onPlanChange(e) {
    const find = plans.find(plan => String(plan.id) === e.target.value);
    setDuration(find.duration);
    setTotalPrice(find.price);
  }

  return (
    <Container>
      <Form
        onSubmit={id ? handleEdit : handleSubmit}
        initialData={enrollment}
        schema={schema}
      >
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
            <Select
              name="student_id"
              placeholder="Buscar aluno"
              options={students}
            />
          </Field>
          <Row>
            <Field nospace>
              <strong>PLANO</strong>
              <Select
                name="plan_id"
                placeholder="Selecione o plano"
                options={plans}
                onChange={onPlanChange}
              />
            </Field>
            <Field>
              <strong>DATA DE INÍCIO</strong>
              <DatePicker
                name="start_date"
                placeholder="Escolha a data"
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
