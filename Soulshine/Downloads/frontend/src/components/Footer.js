import React from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';

const FooterContainer = styled.footer`
  background: #2d9cdb;
  color: white;
  padding: 2rem;
  text-align: left;
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
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <FooterTitle>MindWell</FooterTitle>
          <FooterLink href="#home">Home</FooterLink>
          <FooterLink href="#business">Business</FooterLink>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#faq">FAQ</FooterLink>
        </Grid>
        <Grid item xs={12} md={3}>
          <FooterTitle>Information</FooterTitle>
          <FooterLink href="#reviews">Reviews</FooterLink>
          <FooterLink href="#advice">Advice</FooterLink>
          <FooterLink href="#careers">Careers</FooterLink>
          <FooterLink href="#find-therapist">Find a Therapist</FooterLink>
        </Grid>
        <Grid item xs={12} md={3}>
          <FooterTitle>Services</FooterTitle>
          <FooterLink href="#online-therapy">Online Therapy</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
          <FooterLink href="#for-therapists">For Therapists</FooterLink>
        </Grid>
        <Grid item xs={12} md={3}>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink href="#terms">Terms & Conditions</FooterLink>
          <FooterLink href="#privacy">Privacy Policy</FooterLink>
        </Grid>
      </Grid>
      <FooterBottom>
        <p>&copy; 2024 MindWell &#x2665;</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
