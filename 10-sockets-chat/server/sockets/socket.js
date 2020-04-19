const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {

  console.log('Usuario conectado');

  client.on( 'entrarChat', (usuario, callback) => {

    if(!usuario.nombre || !usuario.sala) {
      return callback({
        error: true,
        mensaje: 'El nombre y la sala son necesarios'
      });
    }
      
    client.join(usuario.sala);
    usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);
    
    let personasEnSala = usuarios.getPersonasPorSala(usuario.sala);    
    client.broadcast.to(usuario.sala).emit('listaPersonas', personasEnSala);
    client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje('Administrador', `${usuario.nombre} se unió al chat`));
    
    return callback( personasEnSala );
    
  });

  client.on('crearMensaje', (data, callback) => {

    let persona = usuarios.getPersona(client.id);
    let mensaje = crearMensaje( persona.nombre, data.mensaje );

    client.broadcast.to(persona.sala).emit( 'crearMensaje', mensaje );

    callback(mensaje)
  });

  client.on('disconnect', () =>{
    let personaSaliente = usuarios.borrarPersona(client.id);

    client.broadcast.to(personaSaliente.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaSaliente.nombre} abandonó el chat`));
    client.broadcast.to(personaSaliente.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaSaliente.sala));
  });

  client.on('mensajePrivado', (data) => {

    let persona = usuarios.getPersona(client.id);

    client.broadcast.to(persona.sala).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
  });

});