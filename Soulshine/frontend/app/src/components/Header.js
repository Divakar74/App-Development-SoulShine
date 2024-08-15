import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

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

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    a {
      margin: 0.5rem 0;
    }
  }
`;

const ProfileIcon = styled(FaUserCircle)`
  font-size: 2rem;
  color: white;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffeb3b;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
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

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background: white;
  color: #004d40;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 1001;

  a {
    color: #004d40;
    text-decoration: none;
    display: block;
    margin-bottom: 0.5rem;

    &:hover {
      color: #0C80CB;
    }
  }
`;

const Header = ({ user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo>SoulShine &#x2665;</Logo>
      </Link>
      <Nav>
        <Link to="/mentalhealthmonitoring">Why SoulShine?</Link>
        <Link to="/testimonials">Reviews</Link>
        <Link to="/contact">Contact</Link>
        {user ? (
          <>
            <ProfileIcon onClick={toggleDropdown} />
            <DropdownMenu show={showDropdown}>
              <Link to="/profile">Profile</Link>
              <Link to="/settings">Settings</Link>
              <a href="/" onClick={onLogout}>
                Logout
              </a>
            </DropdownMenu>
          </>
        ) : (
          <LoginButton to="/login">Login</LoginButton>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
