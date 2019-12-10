import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Modal from '~/components/Modal';
import Button from '~/components/Button';

import api from '~/services/api';

import { Container, EnrollmentList } from './styles';

export default function Enrollment() {
  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentId, setEnrollmentId] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  async function loadEnrollments() {
    try {
      const response = await api.get('enrollment');

      const data = response.data.map(enrollment => {
        const start_date = format(
          parseISO(enrollment.start_date),
          "d 'de' MMMM 'de' yyyy",
          { locale: pt }
        );

        const end_date = format(
          parseISO(enrollment.end_date),
          "d 'de' MMMM 'de' yyyy",
          { locale: pt }
        );

        return {
          ...enrollment,
          start_date,
          end_date,
        };
      });

      setEnrollments(data);
    } catch (err) {
      toast.error('Erro ao listar as matrículas');
    }
  }

  useEffect(() => {
    loadEnrollments();
  }, []);

  async function handleDelete() {
    try {
      await api.delete(`enrollment/${enrollmentId}`);

      setIsOpen(false);
      setEnrollmentId('');
      loadEnrollments();
      toast.success('Matrícula removida com sucesso.');
    } catch (err) {
      toast.error('Erro ao remover matrícula.');
    }
  }

  function openModal(id) {
    setIsOpen(true);
    setEnrollmentId(id);
  }

  function closeModal() {
    setIsOpen(false);
    setEnrollmentId('');
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando matrículas</strong>
        <div>
          <Button register path="/enrollment/form" />
        </div>
      </header>

      <EnrollmentList>
        <table>
          <thead>
            <tr>
              <th className="student">ALUNO</th>
              <th className="center">PLANO</th>
              <th className="center">INÍCIO</th>
              <th className="center">TÉRMINO</th>
              <th className="center">ATIVA</th>
              <th className="edit" />
              <th className="delete" />
            </tr>
          </thead>
          <tbody>
            {enrollments.map(enrollment => (
              <tr key={String(enrollment.id)}>
                <td>{enrollment.student.name}</td>
                <td className="center">{enrollment.plan.title}</td>
                <td className="center">{enrollment.start_date}</td>
                <td className="center">{enrollment.end_date}</td>
                <td className="center">
                  <MdCheckCircle
                    size={20}
                    color={enrollment.active ? '#42CB59' : '#DDD'}
                  />
                </td>
                <td className="edit">
                  <Link to={`/enrollment/form/${enrollment.id}`}>editar</Link>
                </td>
                <td className="delete">
                  <button
                    type="button"
                    onClick={() => openModal(enrollment.id)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </EnrollmentList>
      <Modal
        text="Você tem certeza que deseja apagar esta matrícula?"
        handleOpen={modalIsOpen}
        handleClose={closeModal}
        handleDelete={handleDelete}
      />
    </Container>
  );
}
