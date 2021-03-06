import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ee4d64;
    border: 0;
    height: 36px;
    width: 112px;
    color: #fff;
    font-weight: bold;
    border-radius: 4px;
    transition: background 0.2s;

    :hover {
      background: ${lighten(0.06, '#ee4d64')};
    }

    svg {
      margin-right: 8px;
    }

    h1 {
      font-size: 14px;
      color: #fff;
    }
  }
`;

export const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  border: 0;
  height: 36px;
  width: 112px;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  margin-right: 15px;
  transition: background 0.2s;

  :hover {
    background: ${darken(0.06, '#ccc')};
  }

  svg {
    margin-right: 8px;
  }

  h1 {
    font-size: 14px;
    color: #fff;
  }
`;

export const RegisterButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ee4d64;
  border: 0;
  height: 36px;
  width: 142px;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  transition: background 0.2s;

  :hover {
    background: ${lighten(0.06, '#ee4d64')};
  }

  svg {
    margin-right: 8px;
  }

  h1 {
    font-size: 14px;
    color: #fff;
  }
`;
