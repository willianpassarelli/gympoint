import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import ModalAnswer from '~/components/ModalAnswer';
import Loading from '~/components/Loading';

import api from '~/services/api';

import { Container, HelpList, Pagination } from './styles';

export default function HelpOrder() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [helpOrderId, setHelpOrderId] = useState('');
  const [question, setQuestion] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(false);

  async function loadHelpOrder() {
    try {
      const response = await api.get('help-orders', {
        params: {
          page,
        },
      });

      if (response.data.length !== 10) {
        setResults(true);
      } else {
        setResults(false);
      }

      setHelpOrders(response.data);
      setLoading(false);
    } catch (err) {
      toast.error('Erro a listar os pedidos de auxílio');
    }
  }

  useEffect(() => {
    loadHelpOrder();
  }, [page]);

  async function handleSubmit(data) {
    try {
      await api.post(`help-orders/${helpOrderId}/answer`, data);

      setIsOpen(false);
      setHelpOrderId('');
      setQuestion('');
      loadHelpOrder();
      toast.success('Resposta enviada com sucesso!');
    } catch (err) {
      toast.error('Erro ao enviar resposta.');
    }
  }

  function openModal(help) {
    setIsOpen(true);
    setHelpOrderId(help.id);
    setQuestion(help.question);
  }

  function closeModal() {
    setIsOpen(false);
    setHelpOrderId('');
    setQuestion('');
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
        <strong>Pedidos de auxílio</strong>
      </header>

      <HelpList>
        {helpOrders.length === 0 ? (
          <div>
            <h1>Lista vazia</h1>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {helpOrders.map(help => (
                <tr key={String(help.id)}>
                  <td>{help.student.name}</td>
                  <td className="edit">
                    <button type="button" onClick={() => openModal(help)}>
                      responder
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
      </HelpList>
      <ModalAnswer
        text={question}
        onSubmit={handleSubmit}
        handleOpen={modalIsOpen}
        handleClose={closeModal}
      />
    </Container>
  );
}
