const express = require('express');
require('dotenv').config();
const mysql = require('mysql2/promise');
const morgan = require('morgan')
const {sequelize}=require('./db/sequelize');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/produtos', async (req, res) => {
  try {
    const [rows] = await sequelize.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/produtos/:id', async (req, res) => {
  try {
    const [rows] = await sequelize.query('SELECT * FROM produtos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Produto não encontrado' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.post('/produtos', async (req, res) => {
  try {
    const [result] = await sequelize.query('INSERT INTO produtos SET ?', req.body);
    const [rows] = await sequelize.query('SELECT * FROM produtos WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.put('/produtos/:id', async (req, res) => {
  try {
    const [result] = await sequelize.query('UPDATE produtos SET ? WHERE id = ?', [req.body, req.params.id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Produto não encontrado' });
    } else {
      const [rows] = await sequelize.query('SELECT * FROM produtos WHERE id = ?', [req.params.id]);
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  try {
    const [result] = await sequelize.query('DELETE FROM produtos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Produto não encontrado' });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Servidor iniciado na porta ${PORT}`);
});