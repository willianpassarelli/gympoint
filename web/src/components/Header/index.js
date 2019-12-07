import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import logo from '~/assets/logo-header.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile, LinkMenu } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <LinkMenu to="/student/list">ALUNOS</LinkMenu>
          <LinkMenu to="/plan">PLANOS</LinkMenu>
          <LinkMenu to="/enrollment">MATRÍCULAS</LinkMenu>
          <LinkMenu to="/helpOrder">PEDIDOS DE AUXÍLIO</LinkMenu>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="submit" onClick={handleSignOut}>
                <span>sair do sistema</span>
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
