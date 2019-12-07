import React from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Container } from './styles';

export default function Button({ save, back, path }) {
  return (
    <Container>
      {save && (
        <button type="submit">
          <MdCheck size={20} color="#fff" />
          <span>SALVAR</span>
        </button>
      )}
      {back && (
        <Link to={path}>
          <MdKeyboardArrowLeft size={20} color="#fff" />
          <span>VOLTAR</span>
        </Link>
      )}
    </Container>
  );
}
