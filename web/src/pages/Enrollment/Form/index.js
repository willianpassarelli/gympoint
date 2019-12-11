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
  const [studentId, setStudentId] = useState('');
  const [planId, setPlanId] = useState([]);

  useEffect(() => {
    async function loadEnrollment() {
      if (id) {
        const response = await api.get(`enrollment/${id}`);
        const { student, plan, start_date } = response.data;

        setStudentId(student.id);
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
      setStudentId(0);
      setPlanId(0);
      toast.success('Matrícula realizada com sucesso!');
    } catch (err) {
      toast.error('Erro ao realizar matrícula.');
    }
  }

  async function handleEdit(data) {
    try {
      const price = duration * totalPrice;
      const updateEnrollment = Object.assign(data, {
        end_date: endDate,
        price,
      });

      await api.put(`enrollment/${id}`, updateEnrollment);

      toast.success('Dados da matrícula atualizados com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar dados da matrícula.');
    }
  }

  function onPlanChange(e) {
    setPlanId(e.target.value);
    const find = plans.find(plan => String(plan.id) === e.target.value);
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
            <Select
              name="student_id"
              placeholder="Buscar aluno"
              options={students}
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
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
