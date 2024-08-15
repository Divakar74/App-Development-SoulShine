import React from 'react';
import styled from 'styled-components';

const FeaturesContainer = styled.section`
  padding: 2rem;
  background: #f9f9f9;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const FeatureCard = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 1rem;
  margin: 1rem;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FeatureTitle = styled.h3`
  color: #6200ea;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #555;
  font-size: 1rem;
`;

const features = [
  { title: 'Improved Emotional Health', description: 'Therapy helps in managing emotions, reducing stress, and improving overall emotional well-being.' },
  { title: 'Better Communication Skills', description: 'Gain skills to communicate more effectively, both in personal and professional relationships.' },
  { title: 'Enhanced Self-Awareness', description: 'Develop a deeper understanding of yourself and your behavioral patterns to make positive changes.' },
  { title: 'Coping Strategies', description: 'Learn practical strategies to cope with challenges and manage daily stressors more effectively.' }
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
