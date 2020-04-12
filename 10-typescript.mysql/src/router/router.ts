import { Router, Request, Response } from 'express';
import ConexionMysql from '../nysql/mysql';
import { MysqlError } from 'mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {

  const query = `
    SELECT * 
    FROM heroes
  `;

  ConexionMysql.instance
    .ejecutarConsulta(query, (error: MysqlError, resultados: Object[]) => {
      if(error)
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


router.get('/heroes/:id', (req: Request, res: Response) => {

  const id = req.params.id;

  const query = `
    SELECT * 
    FROM heroes 
    WHERE id = ${ConexionMysql.instance.conexion.escape(id)}
  `;

  ConexionMysql.instance
    .ejecutarConsulta(query, (error: MysqlError, resultados: Object[]) => {
      if(error)
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

export default router;