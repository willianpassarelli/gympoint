import React from 'react';
import { MdKeyboardArrowLeft, MdCheck, MdAdd } from 'react-icons/md';

import { Container, RegisterButton, BackButton } from './styles';

export default function Button({ save, back, register, path }) {
  return (
    <Container>
      {save && (
        <button type="submit">
          <MdCheck size={20} color="#fff" />
          <span>SALVAR</span>
        </button>
      )}
      {back && (
        <BackButton to={path}>
          <MdKeyboardArrowLeft size={20} color="#fff" />
          <span>VOLTAR</span>
        </BackButton>
      )}
      {register && (
        <RegisterButton to={path}>
          <MdAdd size={20} color="#fff" />
          <span>CADASTRAR</span>
        </RegisterButton>
      )}
    </Container>
  );
}
