import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  height: 64px;
  margin: 0 auto;
  background: #fff;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #ddd;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const LinkMenu = styled(NavLink)`
  margin-right: 20px;
  font-weight: bold;
  color: #999;

  &.active {
    color: #000;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
      font-size: 14px;
      margin-bottom: 3px;
    }

    button {
      border: 0;
      background: transparent;

      span {
        color: #ee4d64;
        font-size: 14px;
      }
    }
  }

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
`;
