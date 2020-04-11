const jwt = require('jsonwebtoken');


const verificaToken = (req, res, next) => {

  const token = req.get('Authorization');

  jwt.verify(token, process.env.SEED, (error, decoded) => {
    if(error)
      return res.status(401).json({
        ok: false,
        error
      });

    req.usuario = decoded.usuario;
    next();
  })
};

const verificaAdminRole = (req, res, next) => {

  const rol = req.usuario.rol;

  if(rol !== 'ADMIN_ROLE')
    return res.status(400).json({
      ok: false,
      error: 'El usuario no es administrador'
    });

  next();
};

module.exports = { verificaToken, verificaAdminRole }