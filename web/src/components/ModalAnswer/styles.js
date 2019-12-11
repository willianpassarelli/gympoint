import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
`;

export const ModalContainer = styled.div`
  width: 450px;
  height: auto;
  padding: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -100px 0 0 -225px;
  background-color: #fff;
  border-radius: 4px;
  z-index: 11;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  form {
    display: flex;
    flex-direction: column;

    textarea {
      margin: 8px 0;
      display: flex;
      width: 100%;
      height: 127px;
      resize: none;
      font-size: 16px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;

      ::placeholder {
        color: #999;
      }
    }
  }

  span {
    color: #ee4d64;
  }

  strong {
    display: flex;
    width: 100%;
  }

  div {
    margin: 8px 0 20px;

    span {
      color: #666;
      font-size: 16px;
    }
  }
`;

export const ButtoModal = styled.button`
  width: 100%;
  height: 45px;
  margin-top: 10px;
  border-radius: 4px;
  border: 0;
  background: #ee4d64;
  color: #fff;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  span {
    font-weight: bold;
    font-size: 16px;
    color: #fff;
  }
`;

export const ButtonClose = styled.button`
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  border: 0;
  background: transparent;
`;
