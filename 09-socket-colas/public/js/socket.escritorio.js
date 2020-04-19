var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
let small = document.querySelector('small');

document.querySelector('h1').innerHTML = 'Escritorio ' + escritorio;

document.querySelector('button').addEventListener('click', function() {
  
  socket.emit('atenderTicket', {escritorio: escritorio}, function(respuesta) {
    if(respuesta.err) {
      throw new Error(respuesta.mensaje);
    }

    if(!respuesta.ticket.numero) {
      small.innerHTML = respuesta.ticket;
      alert(respuesta.ticket);
      return;
    }

    console.log(respuesta);

    small.innerHTML = 'Ticket ' + respuesta.ticket.numero;
  });
})
