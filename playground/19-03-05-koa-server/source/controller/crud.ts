import { RContext } from '@/types/global';
import * as mysql from 'mysql';
import * as dayjs from 'dayjs';
import { config } from '../config';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'chenng',
  password: config.MYSQL_PASSWORD,
  database: 'crud',
});

const query = (sql: string): Promise<any> => new Promise((resolve, reject) => {
  pool.getConnection((getConnectionErr, connection) => {
    if (getConnectionErr) {
      reject(getConnectionErr);
    } else {
      connection.query(sql, (queryErr, rows) => {
        if (queryErr) {
          reject(queryErr);
        } else {
          resolve(rows);
        }
        // 结束会话
        connection.release();
      });
    }
  });
});

export default class CrudController {
  public static async create(ctx: RContext) {
    const { data } = ctx.request.body;
    const res = await query(`
      INSERT INTO tdata(
        data,
        ctime
      )
      VALUES(
        '${data}',
        '${dayjs().format('YYYY/MM/DD HH:mm:ss')}'
      );
    `);

    ctx.body = {
      ret: 0,
      msg: res.message,
    };
  }

  public static async retrieve(ctx: RContext) {
    const { id } = ctx.params;
    const res = await query(`
      SELECT * FROM tdata WHERE id='${id}';
    `);

    ctx.body = {
      ret: 0,
      msg: res[0],
    };
  }

  public static async update(ctx: RContext) {
    const { data, id } = ctx.request.body;
    const res = await query(`
      UPDATE tdata SET data='${data}' WHERE id='${id}';
    `);

    ctx.body = {
      ret: 0,
      msg: res.message,
    };
  }

  public static async delete(ctx: RContext) {
    const { id } = ctx.params;
    const res = await query(`
      DELETE FROM tdata WHERE id='${id}'
    `);

    ctx.body = {
      ret: 0,
      msg: res.message,
    };
  }
}
