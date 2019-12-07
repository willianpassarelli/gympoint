import React from 'react';

import { Container, ModalContainer, ButtoModal } from './styles';

export default function Modal({
  handleDelete,
  handleOpen,
  handleClose,
  text,
  title,
}) {
  return (
    <>
      {handleOpen && (
        <Container>
          <ModalContainer>
            <strong>{title}</strong>
            <span>{text}</span>
            <nav>
              <ButtoModal type="submit" onClick={handleDelete}>
                Sim
              </ButtoModal>
              <ButtoModal type="submit" cancel onClick={handleClose}>
                Cancelar
              </ButtoModal>
            </nav>
          </ModalContainer>
        </Container>
      )}
    </>
  );
}
