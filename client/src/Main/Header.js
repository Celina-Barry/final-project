import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: blue;
  color: #fff;
`;

const CategoryLinks = styled.div`
  display: flex;
  gap: 1g0px;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <CategoryLinks>
      <Link to="/">Home</Link>
      
      </CategoryLinks>
      <StyledLink to="/createmeeting">Create Meeting</StyledLink>
      <StyledLink to="/pastmeetings">View Past Meetings</StyledLink>
      <StyledLink to="/updatecredentials">Update Credentials</StyledLink>
    </HeaderContainer>
  );
};

export default Header;
