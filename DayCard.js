import React, { useState } from 'react';

const DayCard = ({ day }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const calculateSuccessChance = (day) => {
    const precipitationChance = Math.floor(day.precipitation); 
    const windChance = Math.floor(day.wind); 
    const randomChance = Math.floor(Math.random() * 11); 
  
    return 50 + precipitationChance - windChance;
  };

  return (
    <div className="day-card">
      <div className="day-card-summary">
        <h3>{day.date}</h3>
        <p>Summary: {day.summary}</p>
        <p>Precipitation chance: {calculateSuccessChance(day)}%</p> {}
        <button onClick={toggleExpand}>{expanded ? 'Hide Details' : 'Show Details'}</button>
      </div>
      {expanded && (
        <div className="day-card-details">
          <p>Temperature: {day.temperature}°C</p>
          <p>Precipitation: {day.precipitation}%</p>
          <p>Wind: {day.wind} km/h</p>
        </div>
      )}
    </div>
  );
};

export default DayCard;
