"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../nysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const query = `
    SELECT * 
    FROM heroes
  `;
    mysql_1.default.instance
        .ejecutarConsulta(query, (error, resultados) => {
        if (error)
            return res.status(500).json({
                ok: false,
                error
            });
        res.status(200).json({
            ok: true,
            heroes: resultados
        });
    });
});
router.get('/heroes/:id', (req, res) => {
    const id = req.params.id;
    const query = `
    SELECT * 
    FROM heroes 
    WHERE id = ${mysql_1.default.instance.conexion.escape(id)}
  `;
    mysql_1.default.instance
        .ejecutarConsulta(query, (error, resultados) => {
        if (error)
            return res.status(500).json({
                ok: false,
                error
            });
        res.status(200).json({
            ok: true,
            heroes: resultados
        });
    });
});
exports.default = router;
