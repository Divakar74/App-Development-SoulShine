import React from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';

const FooterContainer = styled.footer`
  background: #2d9cdb;
  color: white;
  padding: 2rem;
  text-align: center; /* Center text alignment */
`;

const FooterTitle = styled.h4`
  margin-top: 0;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  margin-top: 2rem;
  text-align: center;
  border-top: 1px solid #ffffff50;
  padding-top: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer id="contact">
      <Grid container spacing={4} justifyContent="center"> {/* Center items */}
        <Grid item xs={12} md={3}>
          <FooterTitle>SoulShine</FooterTitle>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/contact">Contact Us</FooterLink>
        </Grid>
        <Grid item xs={12} md={3}>
          <FooterTitle>Services</FooterTitle>
          <FooterLink href="/therapy-scheduling">Booking Therapist</FooterLink>
        </Grid>
      </Grid>
      <FooterBottom>
        <p>&copy; 2024 SoulShine &#x2665;</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
