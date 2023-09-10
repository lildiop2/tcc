'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

//aqui vão as variáveis de rotas
const usuarioRoute = require('./routes/usuarioRoute');
const produtoRoute = require('./routes/produtoRoute');
const categoriaRoute = require('./routes/categoriaRoute');
const carrinhoRoute = require('./routes/carrinhoRoute');
const pedidoRoute = require('./routes/pedidoRoute');

//aplicando CORS
app.use(cors());
app.use(express.static('public'))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true})); //apenas dados simples
app.use(bodyParser.json({limit: '50mb'})); // apenas json de entrada no body

//Middlewares




//aqui vão as rotas
app.use('/api', usuarioRoute);
app.use('/api', produtoRoute);
app.use('/api', categoriaRoute);
app.use('/api', carrinhoRoute);
app.use('/api', pedidoRoute);




app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', "OPTIONS,GET,POST,PUT,DELETE");
        return res.status(200).send({
            //retorna um objeto vazio
        });
    }
    next();

});

//quando não encontrar rota, entra aqui
app.use((req, res, next) => {
    const err = new Error('Não encontrado!');
    err.status = 404;

    next(err);

});


// handle error, print stacktrace
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ status: err.status, message: err.message });
});

module.exports = app;