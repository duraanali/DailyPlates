import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MealCard from '../components/MealCard';
import '../styles/pages/Healthy.css';

const Healthy = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast');
        setMeals(response.data.meals || []);
      } catch (err) {
        setError('Failed to load meals. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
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
    <div className="healthy-container">
      <div className="section-header">
        <h1>Healthy Chicken Recipes</h1>
        <p className="section-description">
          Discover delicious and nutritious chicken-based meals for a healthy lifestyle
        </p>
      </div>

      <div className="meals-grid">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div className="meal-item" key={meal.idMeal}>
              <MealCard meal={meal} />
            </div>
          ))
        ) : (
          <div className="no-meals">No meals found for this ingredient.</div>
        )}
      </div>
    </div>
  );
};

export default Healthy;