const express = require('express');
const _ = require('underscore');

const Producto = require('../models/producto');
const { verificaToken } = require('../moddlewares/autenticacion');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/producto/:id', verificaToken, (req, res) => {

  const id = req.params.id;

  Producto.find({_id: id})
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((error, productoDB) => {
      if(error)
        return res.status(500).json({
          ok: false,
          error
        });

      if(!productoDB)
        return res.status(400).json({
          ok: false,
          error: { message: 'El id no es correcto' }
        })

      res.status(200).json({
        ok: true,
        producto: productoDB
      });
    });
});

app.get('/producto', verificaToken, (req, res) => {

  const pagina = req.query.pagina || 0;
  const registros = req.query.registros || 50;

  const getPaginacion = require('../tools/paginacion');
  const { inicio, fin } = getPaginacion(pagina, registros);

  Producto.find({})
    .skip(inicio)
    .limit(fin)
    .sort('nombre')
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((error, productosDB) => {

      if(error)
        return res.status(500).json({
          ok: false,
          error
        });

      res.status(200).json({
        ok: true,
        productos: productosDB
      });
    });
});

app.post('/producto', verificaToken, (req, res) => {

  const usuario = req.usuario._id; 
  const body = req.body;

  let producto = new Producto({
    usuario,
    nombre: body.nombre,
    precio: body.precio,
    descripcion: body.descripcion,
    categoria: body.categoria
  });

  producto.save((error, productoDB) => {

    if(error)
      return res.status(500).json({
        ok: false,
        error
      });

    if(!productoDB)
      return res.status(400).json({
        ok: false,
        error: { message: 'No se creó el Producto' }
      });

    res.status(200).json({
      ok: true,
      producto: productoDB
    });
  });
});

app.put('/producto/:id', verificaToken, (req, res) => {

  const id = req.params.id;

  const camposAactualizar = [
    'nombre',
    'precio',
    'descripcion',
    'disponible',
    'categoria'
  ];
  const opcionesActualizacion = {
    new: true,
    useFindAndModify: false,
    runValidators: true
  };

  const body = _.pick(req.body, camposAactualizar);

  Producto.findByIdAndUpdate(id, body, opcionesActualizacion, (error, productoDB) => {

      if(error)
        return res.status(400).json({
          ok: false,
          error
        });

      if(!productoDB)
        return res.status(400).json({
          ok: false,
          error: { message: 'No se encontró el Producto' }
        });

      res.status(200).json({
        ok: true,
        producto: productoDB
      });
    });
});

app.delete('/producto/:id', verificaToken, (req, res) => {

  const id = req.params.id;

  const opcionesActualizacion = {
    new: true,
    useFindAndModify: false,
    runValidators: true
  };

  Producto.findByIdAndUpdate(id, { disponible: false }, opcionesActualizacion, (error, productoDB) => {

      if(error)
        return res.status(400).json({
          ok: false,
          error
        });

      if(!productoDB)
        return res.status(400).json({
          ok: false,
          error: { message: 'No se encontró el Producto' }
        });

      res.status(200).json({
        ok: true,
        producto: productoDB
      });
    });
});

module.exports = app;
