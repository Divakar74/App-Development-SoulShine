import React from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  padding: 2rem 0;
  width: 100vw; /* Cover entire horizontal length of the page */
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  /* Hide scrollbar for WebKit and Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const Card = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 2rem;
  margin: 0 1rem;
  width: 30%; /* Adjust the width to fit three images properly */
  flex: 0 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  scroll-snap-align: center;

  img {
    max-width: 100%;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    width: 80%; /* Make cards larger on smaller screens */
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 45%; /* Adjust for tablet devices */
  }
`;

const Carousel = ({ cards }) => {
  return (
    <CarouselContainer>
      {cards.map((card, index) => (
        <Card key={index}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <img src={card.image} alt={card.title} />
        </Card>
      ))}
    </CarouselContainer>
  );
};

export default Carousel;
