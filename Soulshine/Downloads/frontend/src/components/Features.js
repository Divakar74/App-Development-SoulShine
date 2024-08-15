import React from 'react';
import styled from 'styled-components';

const FeaturesContainer = styled.section`
  padding: 2rem;
  background: #fff;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const FeatureCard = styled.div`
  background: #f4f4f9;
  border: 1px solid #ddd;
  border-radius: 15px;
  border-size:10px;
  padding: 1rem;
  margin: 1rem;
  width: 200px;
  text-align: center;
`;

const FeatureTitle = styled.h3`
  color: #6200ea;
`;

const FeatureDescription = styled.p`
  color: #555;
`;

const features = [
  { title: 'Mood Tracking', description: 'Log your daily moods and track trends over time.' },
  { title: 'Journaling', description: 'Keep a personal journal to express your thoughts and feelings.' },
  { title: 'Appointments', description: 'Schedule and manage therapy sessions with ease.' },
  { title: 'Analytics', description: 'View detailed analytics of your mental health progress.' }
];

const Features = () => {
  return (
    <FeaturesContainer>
      {features.map((feature, index) => (
        <FeatureCard key={index}>
          <FeatureTitle>{feature.title}</FeatureTitle>
          <FeatureDescription>{feature.description}</FeatureDescription>
        </FeatureCard>
      ))}
    </FeaturesContainer>
  );
};

export default Features;
