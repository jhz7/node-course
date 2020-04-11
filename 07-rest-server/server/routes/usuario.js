const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken, verificaAdminRole } = require('../moddlewares/autenticacion');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/usuario', verificaToken, (req, res) => {

  const condicion = {};

  const pagina = req.query.pagina;
  const registros = req.query.registros;
  const paginacion = getPaginacion(pagina, registros);

  Usuario.find(condicion, 'nombre email role img estado google')
    .skip(paginacion.inicio).limit(paginacion.fin).exec((error, usuariosDB) => {
      if(error)
        return res.status(400).json({
          ok: false,
          error
        });
      
      res.status(200).json({
        ok: true,
        usuarios: usuariosDB
      });
    })
});

app.post('/usuario', [verificaToken, verificaAdminRole], function (req, res) {
  const body = req.body;

  const usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    rol: body.rol
  })

  usuario.save((error, usuarioDB) => {
    if(error)
      return res.status(400).json({
        ok: false,
        error
      });

    res.status(200).json({
      ok: true,
      usuario: usuarioDB
    });
  });
});

app.put('/usuario/:id', verificaToken, function (req, res) {

  const camposAactualizar = [
    'nombre',
    'email',
    'img',
    'rol',
    'estado'
  ];
  const opcionesActualizacion = {
    new: true,
    useFindAndModify: false,
    runValidators: true
  };
  
  const id = req.params.id;
  const body = _.pick(req.body, camposAactualizar);

  Usuario.findByIdAndUpdate(id, body, opcionesActualizacion, (error, usuarioDB) => {

    if(error)
      return res.status(400).json({
        ok: false,
        error
      });

    res.status(200).json({
      ok: true,
      usuario: usuarioDB
    });

  });  
});

app.delete('/usuario/:id', verificaToken, (req, res) => {
  const id = req.params.id;
  const opcionesActualizacion = {
    new: true,
    useFindAndModify: false
  };

  Usuario.findByIdAndUpdate(id, {estado: false}, opcionesActualizacion, (error, usuarioDB) => {

    if(error)
      return res.status(400).json({
        ok: false,
        error
      });

    res.status(200).json({
      ok: true,
      usuario: usuarioDB
    });

  });  
});

const getPaginacion = (pagina, cantidad) => {
  const fin = Number(cantidad);
  const pag = Number(pagina);

  if(isNaN(fin) || isNaN(pag))
    throw new Error('La paginación debe ser numérica.');

  if(pag <= 0 || pag === 1)
    return {
      inicio: 0,
      fin
    };

  return {
    inicio: (pag * fin) - fin,
    fin
  }
};

module.exports = app;
