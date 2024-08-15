import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three columns for news */
  gap: 20px; /* Space between items */
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  text-align: center; /* Center the title */
`;

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 12px;
  background-color: #e8f4f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ArticleImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ArticleTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: center;
`;

const Summary = styled.p`
  font-family: 'Poppins', sans-serif;
  margin-bottom: 10px; /* Reduced margin */
  font-size: 14px; /* Smaller font size */
`;

const ReadMore = styled.a`
  font-family: 'Poppins', sans-serif;
  color: #0056b3; /* Slightly reduced blue theme */
  text-decoration: none;
  font-size: 14px; /* Smaller font size */
  &:hover {
    text-decoration: underline;
  }
`;

const ArticlesBox = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=ddce837b9a544d11925e0dae4b52d661');
        const topArticles = response.data.articles.slice(0, 6); // Select only the first 6 articles
        setArticles(topArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Container>
      <TitleContainer>
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>Health News</h2>
      </TitleContainer>
      <Box>
        {articles.map((article, index) => (
          <ArticleContainer key={index}>
            {article.urlToImage && <ArticleImage src={article.urlToImage} alt={article.title} style={{ height: '150px', objectFit: 'cover' }} />}
            <ArticleTitle>{article.title}</ArticleTitle>
            <Summary>{article.description}</Summary>
            <ReadMore href={article.url} target="_blank" rel="noopener noreferrer">Read More</ReadMore>
          </ArticleContainer>
        ))}
      </Box>
    </Container>
  );
};

export default ArticlesBox;
