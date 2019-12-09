import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Modal from '~/components/Modal';
import Button from '~/components/Button';

import api from '~/services/api';

import { Container, PlanList } from './styles';

export default function Plan() {
  const [plans, setPlans] = useState([]);
  const [planId, setPlanId] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  async function loadPlans() {
    try {
      const response = await api.get('plans');

      setPlans(response.data);
    } catch (err) {
      toast.error('Erro ao carregar lista de planos');
    }
  }

  useEffect(() => {
    loadPlans();
  }, []);

  async function handleDelete() {
    try {
      await api.delete(`plans/${planId}`);

      setIsOpen(false);
      setPlanId('');
      loadPlans();
      toast.success('Plano removido com sucesso.');
    } catch (err) {
      toast.error('Erro ao remover plano.');
    }
  }

  function openModal(id) {
    setIsOpen(true);
    setPlanId(id);
  }

  function closeModal() {
    setIsOpen(false);
    setPlanId('');
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando planos</strong>
        <div>
          <Button register path="/plan/form" />
        </div>
      </header>

      <PlanList>
        <table>
          <thead>
            <tr>
              <th className="title">TÍTULO</th>
              <th className="duration">DURAÇÃO</th>
              <th className="price">VALOR p/ MÊS</th>
              <th className="edit" />
              <th className="delete" />
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={String(plan.id)}>
                <td>{plan.title}</td>
                <td className="duration">{plan.duration}</td>
                <td className="price">{plan.price}</td>
                <td className="edit">
                  <Link to={`/plan/form/${plan.id}`}>editar</Link>
                </td>
                <td className="delete">
                  <button type="button" onClick={() => openModal(plan.id)}>
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PlanList>
      <Modal
        text="Você tem certeza que deseja apagar este plano?"
        handleOpen={modalIsOpen}
        handleClose={closeModal}
        handleDelete={handleDelete}
      />
    </Container>
  );
}
