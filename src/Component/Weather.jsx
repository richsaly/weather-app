


import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = '15f4920428bdf80fa6af3c5f58581a43'; 

  const getWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

      
      
    
      setTimeout(() => {
        setWeather(response.data);
        setLoading(false);
      }, 2000);
    } catch (err) {
      setTimeout(() => {
        setError('City not found, please check if there was a typo');
        setWeather(null);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className='bg-black h-screen flex flex-col items-center justify-center text-white'>
      <section className='mb-32 text-center'>
      <h1 className='text-8xl'>Weather In My City</h1>
      </section>
      
      <section className='flex mb-10'>
        <input
          className='w-full text-blue-800 text-5xl p-2'
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className='px-8 py-5 bg-lime-300 text-black text-2xl' onClick={getWeather}>
          Get Weather
        </button>
      </section>

      {loading && <p className='text-4xl mb-10'>Please Wait...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {weather && (
        <div className='text-4xl px-20 py-20 border-2 border-solid rounded-xl border-white'>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>

  );
};

export default Weather;
