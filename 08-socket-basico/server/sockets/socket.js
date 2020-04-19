const { io } = require('../index');

io.on('connection', (cliente) => {
  console.log('usuario conectado');

  cliente.on('disconnect', () => {
    console.log('usuario desconectado');
  });

  cliente.on('enviarMensaje', (data) => {
    console.log('Cliente dice: ', data);

    cliente.broadcast.emit('enviarMensaje', data);
  });
});