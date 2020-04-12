"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class ConexionMysql {
    constructor() {
        this.conectado = false;
        console.log('Conexion a Mysql inicializada');
        this.conexion = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'node_db',
            password: '1234567890'
        });
        this.connectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    connectarDB() {
        this.conexion.connect((error) => {
            if (error)
                console.log(error);
            this.conectado = true;
        });
    }
    ejecutarConsulta(query, callback) {
        this.conexion.query(query, (error, results, fields) => {
            if (error)
                return callback(error);
            return callback(null, results);
        });
    }
}
exports.default = ConexionMysql;
