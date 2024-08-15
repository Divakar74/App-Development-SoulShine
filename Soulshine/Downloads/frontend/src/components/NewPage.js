import React, { useState } from 'react';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const QuestionSliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  min-height: calc(100vh - 80px); /* Adjust based on your navigation bar height */
  text-align: center;
  font-family: 'Poppins', sans-serif; /* Ensure Poppins is loaded in your project */
`;

const Card = styled.div`
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 2rem;
  margin: 1rem;
  text-align: center;
  width: 90%;
  max-width: 600px;
`;

const QuestionTitle = styled.h3`
  color: #2d9cdb;
  margin-bottom: 1rem;
`;

const RadioButton = styled.label`
  display: flex;
  align-items: center;
  margin: 0.5rem auto;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #333;

  &:hover {
    background-color: #e2e6ea;
    transform: scale(1.02);
  }

  input {
    display: none;
  }

  input:checked + span {
    background-color: #2d9cdb;
    color: white;
    border-radius: 8px;
    border: 1px solid #2d9cdb;
  }
`;

const RadioSpan = styled.span`
  display: inline-block;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin-left: 0.5rem;
  font-size: 1rem;
`;

const Summary = styled.div`
  margin-top: 2rem;
  text-align: left;
  padding: 1rem;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #2d9cdb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #238bb2;
    transform: scale(1.02);
  }
`;

const questions = [
  { question: 'How often do you feel anxious?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { question: 'How is your sleep quality?', options: ['Very Poor', 'Poor', 'Average', 'Good', 'Very Good'] },
  { question: 'How often do you feel sad or depressed?', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { question: 'Do you have trouble concentrating?', options: ['Never', 'Sometimes', 'Often', 'Always'] }
];

const NewPage = () => {
  const [responses, setResponses] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const handleSelect = (question, option) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [question]: option
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
    }
  };

  return (
    <QuestionSliderContainer>
      {!showSummary ? (
        <Card>
          <QuestionTitle>{questions[currentQuestion].question}</QuestionTitle>
          {questions[currentQuestion].options.map(option => (
            <RadioButton key={option}>
              <input
                type="radio"
                name={questions[currentQuestion].question}
                id={option}
                checked={responses[questions[currentQuestion].question] === option}
                onChange={() => handleSelect(questions[currentQuestion].question, option)}
              />
              <RadioSpan htmlFor={option}>{option}</RadioSpan>
            </RadioButton>
          ))}
          <SubmitButton onClick={handleNext}>
            {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
          </SubmitButton>
        </Card>
      ) : (
        <Summary>
          <h3>Summary of Your Responses</h3>
          <p>Here is a summary of your responses to the questions:</p>
          <ul>
            {Object.entries(responses).map(([question, answer]) => (
              <li key={question}>
                <strong>{question}:</strong> {answer}
              </li>
            ))}
          </ul>
          <p>Thank you for completing the questionnaire! Your responses will help us provide you with a personalized experience.</p>
        </Summary>
      )}
    </QuestionSliderContainer>
  );
};

export default NewPage;
