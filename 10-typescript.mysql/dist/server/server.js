"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
class Server {
    constructor(puerto) {
        this.port = puerto;
        this.app = express();
    }
    static init(puerto) {
        return new Server(puerto);
    }
    start(callback) {
        this.app.listen(this.port, callback());
        this.setPublicFolder();
    }
    setPublicFolder() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }
}
exports.default = Server;
