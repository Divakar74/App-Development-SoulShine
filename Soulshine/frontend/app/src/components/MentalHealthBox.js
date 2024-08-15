import React from 'react';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  max-width: 1200px;
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Info = styled.div`
  flex: 1;
  margin-left: 20px;
  font-family: 'Poppins', sans-serif;
`;

const ChartWrapper = styled.div`
  flex: 0.4;
`;

const data = {
  labels: ['Depression', 'Schizophrenia', 'Bipolar Disorder', 'Others'],
  datasets: [
    {
      data: [33, 10, 7, 50], // Example data
      backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
    },
  ],
};

const PieChart = () => (
  <Pie
    data={data}
    options={{
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    }}
  />
);

const MentalHealthBox = () => (
  <Container>
    <Box>
      <ChartWrapper>
        <PieChart />
      </ChartWrapper>
      <Info>
        <h2>Mental Health Issues Are Common</h2>
        <p>
          Mental health conditions are not uncommon. Hundreds of millions suffer from them yearly, and many more do over their lifetimes. It’s estimated that 1 in 3 women and 1 in 5 men will experience major depression in their lives. Other conditions, such as schizophrenia and bipolar disorder, are less common but still have a large impact on people’s lives.
        </p>
      </Info>
    </Box>
  </Container>
);

export default MentalHealthBox;
