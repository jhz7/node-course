require('./config/config');

const mongoose = require('mongoose');
const express = require('express');

const app = express();

app.use(require('./routes/index'));

mongoose.connect(
  process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  (err, rsp) => {
    if(err) throw err;
    console.log('base de datos online');
  });

app.listen(process.env.PORT, () => console.log(`Escuchando puerto ${process.env.PORT}`));