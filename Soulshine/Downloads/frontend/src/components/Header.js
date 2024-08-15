import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background: ${({ isScrolled }) => (isScrolled ? '#0C80CB' : '#2FA0E8')};
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: background 0.3s ease;

  ${({ isScrolled }) =>
    isScrolled &&
    css`
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    `}
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  a {
    color: white;
    margin: 0 1.4rem;
    text-decoration: none;
    position: relative;

    &:hover {
      color: #ffeb3b;
    }

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      display: block;
      margin-top: 5px;
      right: 0;
      background: #ffeb3b;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
      left: 0;
      background: #ffeb3b;
    }
  }
`;

const LoginButton = styled(Link)`
  display: inline-block;
  margin-left: 0.7rem;
  padding: 0.5rem 1rem;
  background-color: #ffeb3b;
  color: #004d40;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background-color: #fdd835;
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo>MindWell &#x2665;</Logo>
      </Link>
      <Nav>
        <Link to="/#about">About</Link>
        <Link to="/mentalhealthmonitoring">Why MindWell?</Link>
        <Link to="/#reviews">Reviews</Link>
        <Link to="/#contact">Contact</Link>
        <LoginButton to="/login">Login</LoginButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
