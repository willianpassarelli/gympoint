import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ModalAnswer from '~/components/ModalAnswer';

import api from '~/services/api';

import { Container, HelpList } from './styles';

export default function HelpOrder() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [helpOrderId, setHelpOrderId] = useState('');
  const [question, setQuestion] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  async function loadHelpOrder() {
    try {
      const response = await api.get('help-orders');

      setHelpOrders(response.data);
    } catch (err) {
      toast.error('Erro a listar os pedidos de auxílio');
    }
  }

  useEffect(() => {
    loadHelpOrder();
  }, []);

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

  return (
    <Container>
      <header>
        <strong>Pedidos de auxílio</strong>
      </header>

      <HelpList>
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
