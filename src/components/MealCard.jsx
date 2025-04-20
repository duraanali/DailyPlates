import React from 'react';
import '../styles/components/MealCard.css';

const MealCard = ({ meal }) => {
  return (
    <div className="meal-card">
      <div className="meal-card-image">
        <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
      </div>
      <div className="meal-card-content">
        <h3>{meal.strMeal}</h3>
        <div className="meal-card-meta">
          {meal.strCategory && <span className="tag category">{meal.strCategory}</span>}
          {meal.strArea && <span className="tag area">{meal.strArea}</span>}
        </div>
      </div>
    </div>
  );
};

export default MealCard;