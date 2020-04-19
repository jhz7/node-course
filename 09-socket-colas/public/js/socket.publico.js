var socket = io();

var label1 = document.getElementById('lblTicket1');
var label2 = document.getElementById('lblTicket2');
var label3 = document.getElementById('lblTicket3');
var label4 = document.getElementById('lblTicket4');

var escritorio1 = document.getElementById('lblEscritorio1');
var escritorio2 = document.getElementById('lblEscritorio2');
var escritorio3 = document.getElementById('lblEscritorio3');
var escritorio4 = document.getElementById('lblEscritorio4');

var labelTickets = [label1, label2, label3, label4];
var escritorios = [escritorio1, escritorio2, escritorio3, escritorio4];

socket.on('estadoActual', function(data) {

  console.log(data);

  if(!data.ultimos4) {
    alert('No hay tickets pendientes');
    return;
  }

  var audio = new Audio('audio/new-ticket.mp3');
  audio.play();

  data.ultimos4.forEach((element, idx) => {
    var numeroTicket = element.numero;
    var escritorio = element.escritorio;

    labelTickets[idx].innerHTML = 'Ticket ' + numeroTicket;
    escritorios[idx].innerHTML = 'Escritorio ' + escritorio;
  });
});