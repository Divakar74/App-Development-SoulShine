import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

// Header styling
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

const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  margin-right: 2rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white; /* Icon color */
`;

// Sidebar styling
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background: #f8f9fa;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease;
  z-index: 2000;
`;

const SidebarLink = styled(Link)`
  display: block;
  margin-bottom: 1rem;
  color: #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #007bff;
  }
`;

const DashboardHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <HeaderContainer isScrolled={isScrolled}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo>SoulShine &#x2665;</Logo>
        </Link>
        <Nav>
          <Link to="/newsletter">Newsletter</Link>
          <Link to="/books">Books</Link>
          <Link to="/community">Community</Link>
          <ProfileIcon onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
          </ProfileIcon>
        </Nav>
      </HeaderContainer>
      <Sidebar isOpen={isSidebarOpen}>
        <h2>Settings</h2>
        <SidebarLink to="/settings">Account Settings</SidebarLink>
        <SidebarLink to="/privacy">Privacy Settings</SidebarLink>
        <SidebarLink to="/help">Help & Support</SidebarLink>
        <SidebarLink to="/" onClick={toggleSidebar}>Close</SidebarLink>
      </Sidebar>
    </>
  );
};

export default DashboardHeader;
