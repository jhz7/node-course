const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El email es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio']
  },
  img: {
    type: String,
    required: false
  },
  rol: {
    type: String,
    default: 'USER_ROLE',
    enum: {values: ['USER_ROLE', 'ADMIN_ROLE'], message: '{VALUE} no es un rol valido'}
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

usuarioSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
}

usuarioSchema.plugin(uniquevalidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);
