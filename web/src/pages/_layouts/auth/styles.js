import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;

      &::placeholder {
        color: #bbb;
      }
    }

    span {
      color: #ee4d64;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    strong {
      align-self: flex-start;
      margin: 20px 0 8px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${lighten(0.04, '#ee4d64')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
