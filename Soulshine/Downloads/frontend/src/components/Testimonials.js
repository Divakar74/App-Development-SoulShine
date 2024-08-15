import React from 'react';
import styled from 'styled-components';

const TestimonialsContainer = styled.section`
  padding: 4rem 1rem;
  background: #ffffff;
  text-align: center;
`;

const TestimonialsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 2rem;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const TestimonialText = styled.p`
  color: #555;
  font-style: italic;
  margin-bottom: 1rem;
`;

const TestimonialAuthor = styled.h4`
  color: #2d9cdb;
  margin-top: 0.5rem;
`;

const TestimonialImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #2d9cdb;
  margin-bottom: 1rem;
`;

const testimonials = [
  { text: 'This platform has helped me stay on top of my mental health.', author: 'Kumar', image: 'https://img.freepik.com/free-vector/man-red-shirt-with-white-collar_90220-2873.jpg?t=st=1722182542~exp=1722186142~hmac=ea298341d41764cc68e013219da22bff7a38b4dcf4196a429033fbfa7c7c77ca&w=740' },
  { text: 'The mood tracking feature is incredibly useful!', author: 'Jane', image: 'https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162385.jpg?w=740' },
  { text: 'I love the journaling tool. It’s so easy to use.', author: 'Karthick', image: 'https://img.freepik.com/free-vector/flat-style-woman-avatar_90220-2876.jpg?t=st=1722182636~exp=1722186236~hmac=976e37fd3677c671453148c949962aac463f81487b35ff83470196deb90e34cb&w=740' }
];

const Testimonials = () => {
  return (
    <TestimonialsContainer id="testimonials">
      <h2>What Our Users Say</h2>
      <TestimonialsGrid>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index}>
            <TestimonialImage src={testimonial.image} alt={testimonial.author} />
            <TestimonialText>"{testimonial.text}"</TestimonialText>
            <TestimonialAuthor>- {testimonial.author}</TestimonialAuthor>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </TestimonialsContainer>
  );
};

export default Testimonials;
