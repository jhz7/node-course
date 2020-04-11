const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  }
});

categoriaSchema.plugin(uniquevalidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Categoria', categoriaSchema);
