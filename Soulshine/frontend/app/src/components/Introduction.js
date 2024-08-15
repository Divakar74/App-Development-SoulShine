import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const IntroContainer = styled.section`
  position: relative;
  padding: 6rem 1rem 4rem;
  text-align: center;
  width: 97%;
  max-width: 1700px;
  margin: 0 auto;
  marginTop:17rem;
  border-radius: 15px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ffffff;stop-opacity:1" /><stop offset="100%" style="stop-color:%23e0e0e0;stop-opacity:1" /></linearGradient></defs><g fill="url(%23grad1)"><circle cx="50" cy="50" r="30" /><circle cx="100" cy="50" r="40" /><circle cx="150" cy="50" r="30" /><circle cx="75" cy="90" r="35" /><circle cx="125" cy="90" r="35" /><circle cx="50" cy="130" r="30" /><circle cx="100" cy="130" r="35" /><circle cx="150" cy="130" r="30" /></g></svg>') no-repeat center center/cover;
  background-color: #A7E6FF;
  overflow-x: hidden;
`;

const CloudOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23D3F4FF;stop-opacity:0.6" /><stop offset="100%" style="stop-color:%23eef5ff;stop-opacity:0.6" /></linearGradient></defs><g fill="url(%23grad2)"><ellipse cx="40" cy="40" rx="40" ry="15" /><ellipse cx="80" cy="80" rx="50" ry="20" /><ellipse cx="120" cy="120" rx="60" ry="25" /><ellipse cx="60" cy="90" rx="30" ry="12" /><ellipse cx="100" cy="130" rx="35" ry="15" /></g></svg>') no-repeat center center/cover;
  opacity: 0.5;
  z-index: -1;
`;

const Heading = styled.h2`
  color: #2d9cdb;
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Text = styled.p`
  color: #333;
  max-width: 600px;
  margin: 1rem auto;
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const Card = styled.div`
  position: relative;
  background: #f8f9fa;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
  flex: 1 1 auto;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &:hover div {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const CardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  transition: background 0.2s ease;
`;

const CardTitle = styled.h3`
  margin: 0;
  padding: 0.5rem;
  font-size: 1.25rem;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CardDescription = styled.p`
  margin: 0;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif, 'Poppins';

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Introduction = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Feel. Live. Thrive.',
      description: '',
      image: 'https://img.freepik.com/free-vector/hand-drawn-lo-fi-illustrations_52683-82993.jpg?t=st=1721882737~exp=1721886337~hmac=1e36269b0039c8e80be27cd61a71b2c257d07554f978643e03f5c66a56b70318&w=740',
      link: '/login'
    }
    // {
    //   title: 'Couple',
    //   description: 'For me and my partner',
    //   image: 'https://img.freepik.com/free-vector/hand-drawn-hug-day-illustration_52683-151120.jpg?t=st=1721882813~exp=1721886413~hmac=ebc92f717a318926c0344089e2e2f4675682f6bcfaee63356e01dcb8b14ca31a&w=740',
    //   link: '/dashboard/couple'
    // }
    // {
    //   title: 'Teen',
    //   description: 'For my child',
    //   image: 'https://img.freepik.com/premium-vector/sad-man-sits-floor-with-tangled-thoughts-confused-boy-depressed-guy-has-memory-problems_442961-380.jpg?w=740',
    //   link: '/dashboard/teen'
    // }
  ];

  return (
    <IntroContainer id="introduction">
      <CloudOverlay />
      <Heading>Your Partner in Mental Wellness</Heading>
      {/* <Text>What type of therapy are you looking for?</Text> */}
      <CardsContainer>
        {cards.map((card, index) => (
          <Card key={index} onClick={() => navigate(card.link)}>
            <img src={card.image} alt={card.title} />
            <CardContent>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </CardsContainer>
    </IntroContainer>
  );
};

export default Introduction;
