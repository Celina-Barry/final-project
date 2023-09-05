import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CategoryLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledNavLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: var(--transition);

  &.active {
    font-weight: bold;
    text-decoration: underline;
  }

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <CategoryLinks>
        <StyledNavLink exact to="/" activeClassName="active">Home</StyledNavLink>
        <StyledNavLink to="/createmeeting" activeClassName="active">Create Meeting</StyledNavLink>
        <StyledNavLink to="/pastmeetings" activeClassName="active">View Past Meetings</StyledNavLink>
        <StyledNavLink to="/updatecredentials" activeClassName="active">Update Credentials</StyledNavLink>
      </CategoryLinks>
    </HeaderContainer>
  );
};

export default Header;
