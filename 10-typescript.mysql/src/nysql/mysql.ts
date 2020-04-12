import mysql, { MysqlError } from 'mysql';

export default class ConexionMysql {

  private static _instance: ConexionMysql;
  conexion: mysql.Connection;
  conectado: boolean = false;

  private constructor() {
    console.log('Conexion a Mysql inicializada');

    this.conexion = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'node_db',
      password: '1234567890'
    });

    this.connectarDB();
    
  }

  public static get instance(): ConexionMysql {
    return this._instance || ( this._instance = new this() );
  }

  private connectarDB() {
    this.conexion.connect((error: MysqlError) => {
      if(error)
        console.log(error);

      this.conectado = true;
    });
  }

  public ejecutarConsulta(query: string, callback: Function) {
    this.conexion.query(query, (error: MysqlError, results: Object[], fields) => {
      if(error)
        return callback(error);

      return callback(null, results);
    })
  }

}