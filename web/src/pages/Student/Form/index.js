import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';

import Button from '~/components/Button';

import api from '~/services/api';

import { Container, Column, Row, Field } from './styles';

export default function StudentForm({ match }) {
  const { id } = match.params;

  const [student, setStudent] = useState([]);
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    async function loadData() {
      if (id) {
        const response = await api.get(`students/${id}`);

        setStudent(response.data);
        setHeight(response.data.height);
        setAge(response.data.age);
      }
    }
    loadData();
  }, [id]);

  async function handleSubmit(data, { resetForm }) {
    try {
      await api.post('students', data);
      resetForm();
      toast.success('Aluno cadastrado com sucesso!');
    } catch (err) {
      toast.error('Erro ao cadastrar aluno.');
    }
  }

  async function handleEdit(data) {
    try {
      await api.put(`students/${id}`, data);

      toast.success('Dados do aluno atualizado com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar dados do aluno.');
    }
  }

  return (
    <Container>
      <Form onSubmit={id ? handleEdit : handleSubmit} initialData={student}>
        <header>
          <strong>{id ? 'Edição de aluno' : 'Cadastro de aluno'}</strong>
          <div>
            <Button back path="/student/list" />
            <Button save />
          </div>
        </header>

        <Column>
          <Field>
            <strong>NOME COMPLETO</strong>
            <Input name="name" placeholder="Nome completo" />
          </Field>
          <Field>
            <strong>ENDEREÇO DE E-MAIL</strong>
            <Input name="email" type="email" placeholder="exemplo@email.com" />
          </Field>
          <Row>
            <Field>
              <strong>IDADE</strong>
              <InputMask
                id="age"
                mask="99"
                name="age"
                value={age}
                onChange={e => setAge(e.target.value)}
              >
                {inputProps => <Input {...inputProps} id="age" name="age" />}
              </InputMask>
            </Field>
            <Field>
              <strong>PESO (em kg)</strong>
              <Input
                id="weight"
                name="weight"
                type="number"
                placeholder="0kg"
              />
            </Field>
            <Field>
              <strong>Altura</strong>
              <InputMask
                mask="9.99m"
                name="height"
                value={height}
                onChange={e => setHeight(e.target.value)}
              >
                {inputProps => (
                  <Input
                    {...inputProps}
                    id="height"
                    name="height"
                    placeholder="0.00m"
                  />
                )}
              </InputMask>
            </Field>
          </Row>
        </Column>
      </Form>
    </Container>
  );
}
