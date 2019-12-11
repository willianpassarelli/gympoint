import React from 'react';
import { MdClose } from 'react-icons/md';
import { Form, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container, ModalContainer, ButtoModal, ButtonClose } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required('É obrigatório escrever uma resposta'),
});

export default function ModalAnswer({
  handleOpen,
  handleClose,
  onSubmit,
  text,
}) {
  return (
    <>
      {handleOpen && (
        <Container>
          <ModalContainer>
            <Form schema={schema} onSubmit={onSubmit}>
              <ButtonClose type="button" onClick={handleClose}>
                <MdClose size={20} color="#999" />
              </ButtonClose>
              <strong>PERGUNTA DO ALUNO</strong>
              <div>
                <span>{text}</span>
              </div>
              <strong>SUA RESPOSTA</strong>
              <Textarea name="answer" />
              <ButtoModal type="submit">
                <span>Responder aluno</span>
              </ButtoModal>
            </Form>
          </ModalContainer>
        </Container>
      )}
    </>
  );
}
