import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 6rem 1rem 4rem;
  background: #ffffff;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Heading = styled.h2`
  color: #2d9cdb;
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Text = styled.p`
  color: #333;
  max-width: 800px;
  margin: 1rem auto;
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const ReviewCard = styled.div`
  display: flex;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ReviewerImage = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-right: 1rem;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-right: 0.5rem;
  }
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const ReviewerName = styled.h4`
  margin: 0;
  padding: 0.5rem 0;
  font-family: 'Roboto', sans-serif;
  font-size: 1.25rem;
  color: #2d9cdb;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ReviewText = styled.p`
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const PatientReview = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  color: #ffeb3b;
  margin-right: 0.1rem;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const reviews = [
  {
    name: 'Dr. John Doe',
    text: 'Mental health monitoring is crucial for early detection and intervention. It can help individuals manage their mental health more effectively.',
    image: 'https://via.placeholder.com/80',
    patientReview: 5
  },
  {
    name: 'Dr. Jane Smith',
    text: 'Regular mental health check-ups can prevent severe psychological issues. It is important to monitor your mental health just like your physical health.',
    image: 'https://via.placeholder.com/80',
    patientReview: 4
  },
  {
    name: 'Dr. Emily Johnson',
    text: 'Through mental health monitoring, we can offer timely support and care to those in need. It is a proactive approach to mental wellness.',
    image: 'https://via.placeholder.com/80',
    patientReview: 4
  }
];

const MentalHealthMonitoring = () => {
  return (
    <PageContainer>
      <Heading>Need for Monitoring Mental Health</Heading>
      <Text>
        Mental health monitoring is essential for maintaining psychological well-being. It helps in identifying potential mental health issues early, ensuring timely intervention and support. Regular check-ups and monitoring can lead to better management of mental health, reducing the risk of severe mental health disorders.
      </Text>
      <Heading>Reviews from Experts</Heading>
      <ReviewsContainer>
        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <ReviewerImage src={review.image} alt={review.name} />
            <ReviewContent>
              <ReviewerName>{review.name}</ReviewerName>
              <ReviewText>{review.text}</ReviewText>
              <PatientReview>
                {Array.from({ length: review.patientReview }).map((_, starIndex) => (
                  <Star key={starIndex}>&#9733;</Star>
                ))}
                {Array.from({ length: 5 - review.patientReview }).map((_, starIndex) => (
                  <Star key={starIndex} style={{ color: '#ccc' }}>&#9733;</Star>
                ))}
              </PatientReview>
            </ReviewContent>
          </ReviewCard>
        ))}
      </ReviewsContainer>
    </PageContainer>
  );
};

export default MentalHealthMonitoring;
