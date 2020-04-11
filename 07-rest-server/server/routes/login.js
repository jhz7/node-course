const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/login', function (req, res) {

  const body = req.body;
  const condicion =  {
    email: body.email
  };

  Usuario.findOne(condicion, {}, (error, usuarioDB) => {
    if(error)
      return res.status(500).json({
        ok: false,
        error
      }); 

    if(!usuarioDB)
      return res.status(400).json({
        ok: false,
        error: '(Usuario) o password incorrectos'
      }); 

    if(!bcrypt.compareSync(body.password, usuarioDB.password))
      return res.status(400).json({
        ok: false,
        error: 'Usuario o (password) incorrectos'
      });

    const token = jwt.sign(
    {
      usuario: usuarioDB
    },
    process.env.SEED, 
    {
      expiresIn: process.env.TOKEN_EXPIRES
    });
    
    res.status(200).json({
      ok: true,
      usuario: usuarioDB,
      token
    });
  })
});

module.exports = app;
