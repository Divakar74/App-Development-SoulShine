import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const MoodChart = ({ data = [] }) => {
  // Calculate mood counts from entries
  const moodCounts = data.reduce((acc, entry) => {
    // Extract mood from the title if it's included
    const mood = entry.title?.split(' - ')[0] || '';
    if (mood) {
      acc[mood] = (acc[mood] || 0) + 1;
    }
    return acc;
  }, {});

  // Prepare data for the chart
  const chartData = Object.keys(moodCounts).map((mood) => ({
    id: mood,
    label: mood,
    value: moodCounts[mood],
  }));

  console.log('chartData:', chartData); // Check processed chartData

  return (
    <div style={{ height: 380 }}>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 100, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default MoodChart;
