var socket = io();

var label = document.getElementById('lblNuevoTicket');

socket.on('connect', function() {
  console.log('Conectado al servidor');
});


socket.on('disconnect', function() {
  console.log('Desconectado del servidor');
});

$('button').on('click', function() {
  
  socket.emit('siguienteTicket', null, function(ticket) {
    label.innerHTML = ticket;
    console.log(ticket);
  })
});

socket.on('estadoActual', function(estadoactual) {
  label.innerHTML = estadoactual.actual;
})
