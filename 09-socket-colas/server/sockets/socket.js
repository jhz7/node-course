const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

	console.log('Usuario conectado');

	client.on('disconnect', () => {
			console.log('Usuario desconectado');
	});

	client.on('siguienteTicket', (_, callback) => {
		const siguienteTicket = ticketControl.siguiente();
		console.log(siguienteTicket);
		callback(siguienteTicket);
	})

	client.emit('estadoActual', {
		actual: ticketControl.getUltimo(),
		ultimos4: ticketControl.getUltimos4()
	});

	client.on('atenderTicket', (data, callback) => {
		if(!data.escritorio)
			return callback({
				err: true,
				mensaje: 'Debe enviar el escritorio'
			});

		const ticketAatender = ticketControl.atender(data.escritorio);

		client.broadcast.emit('estadoActual', {
			actual: ticketControl.getUltimo(),
			ultimos4: ticketControl.getUltimos4()
		});

		return callback({
			err: false,
			ticket: ticketAatender
		});
	})

});