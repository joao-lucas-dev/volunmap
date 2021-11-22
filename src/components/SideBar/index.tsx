import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import { Container, AreaTop, AreaBottom } from './styles';

import logo from '../../assets/logo.svg';
const SideBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <AreaTop>
        <img src={logo} alt="VolunMap" />
      </AreaTop>
      <AreaBottom>
        <button onClick={() => navigate('/')}>
          <FiArrowLeft size={22} color="#FFF" />
        </button>
      </AreaBottom>
    </Container>
  );
}

export { SideBar };