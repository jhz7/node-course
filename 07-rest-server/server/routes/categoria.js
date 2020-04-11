const express = require('express');
const _ = require('underscore');

const Categoria = require('../models/categoria');
const { verificaToken, verificaAdminRole } = require('../moddlewares/autenticacion');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/categoria/:id', verificaToken, (req, res) => {

  const id = req.params.id;

  Categoria.findById(id, (error, categoriaDB) => {
    if(error)
      return res.status(500).json({
        ok: false,
        error
      });

    if(!categoriaDB)
      return res.status(400).json({
        ok: false,
        error: { message: 'El id no es correcto' }
      })

    res.status(200).json({
      ok: true,
      categoria: categoriaDB
    });
  });
});

app.get('/categoria', verificaToken, (req, res) => {

  Categoria.find({})
    .sort('descripcion')
    .populate('usuario', 'nombre email')
    .exec((error, categoriasDB) => {

      if(error)
        return res.status(500).json({
          ok: false,
          error
        });

      res.status(200).json({
        ok: true,
        categorias: categoriasDB
      });
    });
});

app.post('/categoria', verificaToken, (req, res) => {

  const usuario = req.usuario._id; 
  const body = req.body;

  const categoria = new Categoria({
    usuario,
    descripcion: body.descripcion
  });

  categoria.save((error, categoriaDB) => {

    if(error)
      return res.status(500).json({
        ok: false,
        error
      });

    if(!categoriaDB)
      return res.status(400).json({
        ok: false,
        error: { message: 'No se creó la categoria' }
      });

    res.status(200).json({
      ok: true,
      categoria: categoriaDB
    });
  });
});

app.put('/categoria/:id', verificaToken, (req, res) => {

  const id = req.params.id;

  const camposAactualizar = [
    'descripcion'
  ];
  const opcionesActualizacion = {
    new: true,
    useFindAndModify: false,
    runValidators: true
  };

  const body = _.pick(req.body, camposAactualizar);

  Categoria.findByIdAndUpdate(id, body, opcionesActualizacion, (error, categoriaDB) => {

      if(error)
        return res.status(400).json({
          ok: false,
          error
        });

      if(!categoriaDB)
        return res.status(400).json({
          ok: false,
          error: { message: 'No se encontró la categoria' }
        });

      res.status(200).json({
        ok: true,
        categoria: categoriaDB
      });
    });
});

app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {

  const id = req.params.id;

  Categoria.findByIdAndRemove(id, (error, categoriaDB) => {

      if(error)
        return res.status(500).json({
          ok: false,
          error
        });

      if(!categoriaDB)
        return res.status(400).json({
          ok: false,
          error: { message: 'No se borró la categoria' }
        });

      res.status(200).json({
        ok: true,
        categoria: categoriaDB
      });
    });
});


module.exports = app;
