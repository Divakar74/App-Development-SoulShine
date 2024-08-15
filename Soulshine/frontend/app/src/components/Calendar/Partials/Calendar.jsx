import React, { useState } from 'react';
import { Badge, Calendar } from 'antd';
// import 'antd/dist/antd.css'; 

const CalendarComponent = ({ moodEntries }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const getListData = (value) => {
    const date = value.format('YYYY-MM-DD');
    return moodEntries.filter((entry) => entry.date === date);
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.date}>
            <Badge
              status={item.mood.toLowerCase()}
              text={`${item.mood} ${item.emojis.join(' ')}`} // Display mood and emojis
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar dateCellRender={dateCellRender} onSelect={setSelectedDate} />
  );
};

export default CalendarComponent;
