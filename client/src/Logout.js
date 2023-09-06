import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  transition: var(--transition);
  
  &:hover {
    text-decoration: underline;
  }
`;

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loginEmail');
    navigate('/login');
  };

  return (
    <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
  );
};

export default Logout;
