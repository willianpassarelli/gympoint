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
  display: flex;
  flex-direction: column;
  width: 300px;
  height: auto;
  padding: 15px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -100px 0 0 -150px;
  background-color: #fff;
  border-radius: 4px;
  z-index: 11;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  span {
    color: #666;
    margin: 5px;
    font-size: 14px;
  }

  nav {
    font-size: 16px;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }
`;

export const ButtoModal = styled.button`
  width: 100px;
  height: 30px;
  margin: 10px 5px 0;
  border-radius: 4px;
  border: 0;
  background: ${props => (props.cancel ? '' : '#EE4D64')};
  color: ${props => (props.cancel ? '#000' : '#fff')};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
