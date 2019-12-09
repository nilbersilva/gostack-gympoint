import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';
// import Notifications from '~/components/Notifications';

import logo from '~/assets/logo.svg';
import { Container, Content, Profile } from './styles';

const activeStyle = {
  fontWeight: 'bold',
  color: '#000',
};

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPont" />
          <span>GYMPOINT</span>
          <NavLink to="/students" activeStyle={activeStyle}>
            ALUNOS
          </NavLink>
          <NavLink to="/plans" activeStyle={activeStyle}>
            PLANOS
          </NavLink>
          <NavLink to="/enrollments" activeStyle={activeStyle}>
            MATRÍCULAS
          </NavLink>
          <NavLink to="/help-orders" activeStyle={activeStyle}>
            PEDIDOS DE AUXÍLIO
          </NavLink>
        </nav>

        <aside>
          {/* <Notifications hasUnread /> */}
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/" onClick={() => dispatch(signOut())}>
                sair do sistema
              </Link>
            </div>
            {/* <img
              src={
                (profile.avatar && profile.avatar.url) ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt={profile.name}
            /> */}
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
