const express = require('express');
const { Pool } = require('pg');
const rateLimit = require('express-rate-limit');

const app = express();

// Защита от спама
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // максимум 100 запросов с одного IP
});

app.use(limiter);

// База данных
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'plakor',
  password: 'password',
  port: 5432,
});

// API для отзывов
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, text, rating } = req.body;
    const result = await pool.query(
      'INSERT INTO reviews (name, text, rating) VALUES ($1, $2, $3) RETURNING *',
      [name, text, rating]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar la reseña' });
  }
}); 