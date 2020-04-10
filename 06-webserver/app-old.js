const http = require('http');

http.createServer((req, rsp) => {

  rsp.writeHead(200, {'Content-Type': 'application/json'});

  let salida = {
    nombre: 'Jhon',
    edad: 28,
    url: req.url
  }

  rsp.write(JSON.stringify(salida));
  rsp.end()
  
}).listen(8080);