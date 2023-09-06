import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Logout from './Logout';
//import Logout from './Logout'

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
    text-decoration: none;
    text-decoration: underline;
  }

  &:hover {
    font-weight: bold;
    color: #fff;
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
      <HeaderActions>
        <Logout />
      </HeaderActions>
    </HeaderContainer>
  );
};

export default Header;
