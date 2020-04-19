var socket = io();

socket.on('connect', function() {
  console.log('conectado al servidor');
});

socket.on('disconnect', function(){
  console.log('conexión perdida');
});

socket.on('enviarMensaje', function(data){
  console.log('Servicor dice: ', data);
});

socket.emit('enviarMensaje', {
  usuario: 'Jhon',
  mensaje: 'Hola mundo'
});