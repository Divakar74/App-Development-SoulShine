import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const ServicesContainer = styled.section`
  padding: 4rem 1rem;
  background: #fff;
  text-align: center;
`;

const ServiceCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center align cards */
  gap: 1rem; /* Add space between cards */
`;

const ServiceCard = styled.div`
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1.5rem;
  width: 300px; /* Set a fixed width for cards */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align text inside card */
  margin: 1rem;
`;

const ServiceTitle = styled.h3`
  color: #2d9cdb;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: #555;
  text-align: center; /* Center align text */
`;

const AppointmentContainer = styled.div`
  display: flex;
  flex-direction: row-reverse; /* Move image to the right and text to the left */
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  padding: 2rem;
  background: #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease, transform 1s ease; /* Slow down transition */
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
    max-width: 500px; /* Limit maximum width of the image */
    border-radius: 8px;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  flex: 2;
  padding: 1rem;
  text-align: left;
  max-width: 500px; /* Limit maximum width of the content */
`;

const Button = styled.a`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #2d9cdb;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #1a76d2;
    transform: scale(1.05);
  }
`;

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight } = document.documentElement;
      const sectionTop = document.getElementById('appointment').offsetTop;
      if (scrollTop + clientHeight > sectionTop + 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { title: 'Mood Tracking', description: 'Log your daily moods and track trends over time.' },
    { title: 'Journaling', description: 'Keep a personal journal to express your thoughts and feelings.' },
    { title: 'Therapy Scheduling', description: 'Schedule and manage therapy sessions with ease.' },
    { title: 'Analytics', description: 'View detailed analytics of your mental health progress.' }
  ];

  return (
    <ServicesContainer id="services">
      <Typography style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '40px' ,textAlign:'center'}}>
  Features
</Typography>

      <ServiceCardContainer>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServiceCardContainer>

      <AppointmentContainer id="appointment" className={isVisible ? 'visible' : ''}>
        <ContentContainer>
          <h3>Professional and credentialled therapists who you can trust</h3>
          <p>Schedule a one-on-one session with a licensed therapist to discuss your mental health and get personalized support.</p>
          <Button href="/therapy-scheduling">Get matched to a Therapist</Button>
        </ContentContainer>
        <ImageContainer>
          <img src="https://img.freepik.com/free-vector/appointment-booking-with-smartphone-man_23-2148576384.jpg?t=st=1721896182~exp=1721899782~hmac=db21d04b6a1db7253deb21f82087cb32d9bf10a1066396ecb90cd48899df05ce&w=740" alt="Book Appointment" />
        </ImageContainer>
      </AppointmentContainer>
    </ServicesContainer>
  );
};

export default Services;
