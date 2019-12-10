import React from 'react';
import { MdKeyboardArrowLeft, MdCheck, MdAdd } from 'react-icons/md';

import { Container, RegisterButton, BackButton } from './styles';

export default function Button({ save, back, register, path }) {
  return (
    <Container>
      {save && (
        <button type="submit">
          <MdCheck size={20} color="#fff" />
          <h1>SALVAR</h1>
        </button>
      )}
      {back && (
        <BackButton to={path}>
          <MdKeyboardArrowLeft size={20} color="#fff" />
          <h1>VOLTAR</h1>
        </BackButton>
      )}
      {register && (
        <RegisterButton to={path}>
          <MdAdd size={20} color="#fff" />
          <h1>CADASTRAR</h1>
        </RegisterButton>
      )}
    </Container>
  );
}
