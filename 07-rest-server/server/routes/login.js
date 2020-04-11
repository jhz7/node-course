const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

    const token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRES });
    
    res.status(200).json({
      ok: true,
      usuario: usuarioDB,
      token
    });
  })
});

const verify = async (token) => {

  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
  });

  const payload = ticket.getPayload();

  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture
  }
}

app.post('/google-sign-in', async (req, res) => {

  const usuarioGoogle = await verify(req.body.idtoken).catch(error => {
    return res.status(403).json({
      ok: false,
      error
    })
  });

  const condicion = { email: usuarioGoogle.email };

  Usuario.findOne(condicion, (error, usuarioDB) => {
    if(error)
      return res.status(500).json({
        ok: false,
        error
      });

    if(!usuarioDB) {
      let usuario = new Usuario();      
      usuario.nombre = usuarioGoogle.nombre;
      usuario.email = usuarioGoogle.email;
      usuario.img = usuarioGoogle.img;
      usuario.google = true;
      usuario.password = bcrypt.hashSync(':)', 10);

      return usuario.save((error, usuarioDB) => {
        if(error)
          return res.status(500).json({
            ok: false,
            error
          });

        const token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRES });
    
        res.status(200).json({
          ok: true,
          usuario: usuarioDB,
          token
        });
      });
    }

    if(!usuarioDB.google)
      return res.status(400).json({
        ok: false,
        error: {
          message: 'Debe realizar la autenticación a través de la aplicación'
        }
      });

    const token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRES });

    res.status(200).json({
      ok: true,
      usuario: usuarioDB,
      token
    });
  });
})

module.exports = app;
