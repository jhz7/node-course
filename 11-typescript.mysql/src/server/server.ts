import path = require('path');
import express = require('express');


export default class Server {

  public app: express.Application;
  public port: number;

  constructor(puerto: number){
    this.port = puerto;
    this.app = express();
  }

  static init(puerto: number): Server {
    return new Server(puerto);
  }

  start(callback: Function): void {
    this.app.listen(this.port, callback());
    this.setPublicFolder();
  }

  private setPublicFolder() {
    this.app.use(
      express.static(path.resolve(__dirname, '../public'))
    );
  }
}