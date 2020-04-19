import Server from './server/server';
import router from './router/router';
import ConeccionMysql from './nysql/mysql';

const server = Server.init(3000);
server.app.use(router);

const mysql = ConeccionMysql.instance;

server.start(() => {
  console.log('Escuchando puerto 3000')
});