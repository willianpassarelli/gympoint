import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { formatPrice } from '~/util/format';

import Modal from '~/components/Modal';
import Button from '~/components/Button';
import Loading from '~/components/Loading';

import api from '~/services/api';

import { Container, PlanList, Pagination } from './styles';

export default function Plan() {
  const [plans, setPlans] = useState([]);
  const [planId, setPlanId] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(false);

  async function loadPlans() {
    try {
      const response = await api.get('plans', {
        params: {
          page,
        },
      });

      const data = response.data.map(plan => {
        const duration =
          plan.duration === 1
            ? `${plan.duration} mês`
            : `${plan.duration} meses`;

        return {
          ...plan,
          price: formatPrice(plan.price),
          duration,
        };
      });

      if (response.data.length !== 10) {
        setResults(true);
      } else {
        setResults(false);
      }

      setPlans(data);
      setLoading(false);
    } catch (err) {
      toast.error('Erro ao carregar lista de planos');
    }
  }

  useEffect(() => {
    loadPlans();
  }, [loadPlans, page]);

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

  async function handlePage(e) {
    await setPage(e === 'back' ? page - 1 : page + 1);
  }

  if (loading) {
    return <Loading />;
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
        {plans.length === 0 ? (
          <div>
            <h1>Lista vazia</h1>
          </div>
        ) : (
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
        )}
        <Pagination>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => handlePage('back')}
          >
            <FaChevronLeft />
          </button>
          <span>Página {page}</span>
          <button
            type="button"
            disabled={results}
            onClick={() => handlePage('next')}
          >
            <FaChevronRight />
          </button>
        </Pagination>
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
