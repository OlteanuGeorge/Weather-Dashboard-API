import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayCard from './DayCard';
import './App.css';


const calculateSuccessChance = (day) => {
  
  const precipitationChance = day.day.daily_chance_of_rain;
  const windChance = day.day.daily_chance_of_windy;
  const randomChance = Math.floor(Math.random() * 11); 
  
  return 50 + precipitationChance - windChance;
};

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const API_KEY = '9fed0ce4a0ac4435804185346232806'; 
  const NUM_OF_DAYS = 14; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=London&days=${NUM_OF_DAYS}`
        );
        const { forecast } = response.data;
        const processedData = forecast.forecastday.map((day) => ({
          date: day.date,
          summary: day.day.condition.text,
          chance: calculateSuccessChance(day),
          temperature: day.day.avgtemp_c,
          precipitation: day.day.totalprecip_mm,
          wind: day.day.maxwind_kph
        }));
        setWeatherData(processedData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleBookmark = (day) => {
    if (bookmarks.includes(day)) {
      const updatedBookmarks = bookmarks.filter((bookmark) => bookmark !== day);
      setBookmarks(updatedBookmarks);
    } else {
      const updatedBookmarks = [...bookmarks, day];
      setBookmarks(updatedBookmarks);
    }
  };

  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard</h1>
      <div className="day-cards">
        {weatherData.map((day, index) => (
          <div key={index} className={`day-card ${bookmarks.includes(day) ? 'bookmarked' : ''}`}>
            <DayCard day={day} />
            <button onClick={() => toggleBookmark(day)}>
              {bookmarks.includes(day) ? 'Remove Bookmark' : 'Add Bookmark'}
            </button>
          </div>
        ))}
      </div>
      <div className="footer">
        <p>Nu sunt mare priceput,asta e tot ce am stiut :) </p>
        <p>WeatherAPI by George</p>
      </div>
    </div>
  );
};

export default WeatherDashboard;
