import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [reviews, setReviews] = useState([]);

  // Получение отзывов
  const fetchReviews = async () => {
    const response = await fetch('/api/reviews/pending');
    const data = await response.json();
    setReviews(data);
  };

  // Модерация отзыва
  const moderateReview = async (id, status) => {
    await fetch(`/api/reviews/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      headers: { 'Content-Type': 'application/json' }
    });
    fetchReviews();
  };

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      {reviews.map(review => (
        <div key={review.id} className="review-item">
          <p>{review.text}</p>
          <button onClick={() => moderateReview(review.id, 'approved')}>
            Aprobar
          </button>
          <button onClick={() => moderateReview(review.id, 'rejected')}>
            Rechazar
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel; 