
var params = new URLSearchParams(window.location.search);

var divUsuarios = $('#divUsuarios'); 
var divChatbox = $('#divChatbox'); 
var formularioEnviarMensaje = $('#formEnviar');
var txtMensaje = $('#txtMensaje');

var nombreUsuario = params.get('nombre');
var sala = params.get('sala');

var x = document.getElementById('divUsuarios');

function generarPlantillaUsuario(usuario, idx) {

  var htmlUsuario = '';

  htmlUsuario += '<li>';
  htmlUsuario += '<a data-id="'+ usuario.id +'" href="javascript:void(0)"><img src="assets/images/users/'+ idx +'.jpg" alt="user-img" class="img-circle"> <span>'+ usuario.nombre +' <small class="text-success">online</small></span></a>';
  htmlUsuario += '</li>';

  return htmlUsuario;
}

function renderizarUsuarios(usuarios) {

  var html = '';

  html += '<li>';
  html += '<a href="javascript:void(0)" class="active"> Chat de <span> '+ params.get('sala')  +'</span></a>';
  html += '</li>';

  usuarios.forEach( (usuario, idx) => {
    html += generarPlantillaUsuario(usuario, idx + 1);
  });

  //divUsuarios.innerHTML = html;
  divUsuarios.html(html);
}

function renderizarMensajes(mensaje, yo) {

  var mensajeHtml = '';
  var fecha = new Date(mensaje.fecha);
  var hora = fecha.getHours() + ':' + fecha.getMinutes();

  var adminClass = 'info';
  if(mensaje.nombre === 'Administrador') adminClass = 'danger';
  

  if(yo) {

    mensajeHtml += '<li class="animated fadeIn reverse">';
    mensajeHtml += '<div class="chat-content">';
    mensajeHtml += '<h5>'+ mensaje.nombre +'</h5>';
    mensajeHtml += '<div class="box bg-light-inverse">'+ mensaje.mensaje +'</div>';
    mensajeHtml += '</div>';
    mensajeHtml += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    mensajeHtml += '<div class="chat-time">' + hora + '</div>';
    mensajeHtml += '</li>';
  } else {

    mensajeHtml += '<li class="animated fadeIn">';
    mensajeHtml += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    mensajeHtml += '<div class="chat-content">';
    mensajeHtml += '<h5>'+ mensaje.nombre +'</h5>';
    mensajeHtml += '<div class="box bg-light-'+ adminClass +'">'+ mensaje.mensaje +'</div>';
    mensajeHtml += '</div>';
    mensajeHtml += '<div class="chat-time">' + hora + '</div>';
    mensajeHtml += '</li>'; 
  }

  divChatbox.append(mensajeHtml);
}

divUsuarios.on('click', 'a', function() {
  var id = $(this).data('id');
  if(id) console.log(id);
})

formularioEnviarMensaje.on('submit', function(e) {
  e.preventDefault();

  if(txtMensaje.val().trim().length === 0) {
    return;
  }

  socket.emit('crearMensaje', { nombre: nombreUsuario, mensaje: txtMensaje.val() }, function(mensaje) {

    txtMensaje.val('').focus();
    renderizarMensajes(mensaje, true);
    scrollBottom();
  })
})


//x.getElementsByTagName('a')

