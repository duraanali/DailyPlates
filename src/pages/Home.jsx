import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw } from 'lucide-react';
import '../styles/pages/Home.css';

const Home = () => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomMeal = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        setMeal(response.data.meals[0]);
      } catch (err) {
        setError('Failed to load meal. Please try again.');
        console.error('Error fetching random meal:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMeal();
  }, []);
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-container">
      <div className="section-header">
        <h1>Meal of the Day</h1>
        <button 
          className="refresh-button" 
          onClick={() => {
            const fetchNewMeal = async () => {
              try {
                setLoading(true);
                const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
                setMeal(response.data.meals[0]);
              } catch (err) {
                setError('Failed to load meal. Please try again.');
                console.error('Error fetching random meal:', err);
              } finally {
                setLoading(false);
              }
            };
            fetchNewMeal();
          }}
          disabled={loading}
          aria-label="Get a new random meal"
        >
          <RefreshCw size={18} className={loading ? 'icon-spin' : ''} />
          <span>Surprise Me</span>
        </button>
      </div>
      
      <div className="meal-container">
        {meal ? (
          <div className="meal-card">
            <div className="meal-card-image">
              <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
            </div>
            <div className="meal-card-content">
              <h2>{meal.strMeal}</h2>
              <div className="meal-card-meta">
                <span className="tag category">{meal.strCategory}</span>
                <span className="tag area">{meal.strArea}</span>
              </div>
              <div className="meal-instructions">
                <h3>Instructions</h3>
                <p>{meal.strInstructions}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-meal">No meal found. Please try again.</div>
        )}
      </div>
    </div>
  );
};

export default Home;