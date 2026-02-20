import { ResultSetHeader, Pool, PoolConnection} from "mysql2/promise";
import connection from "../database/db.ts";

type DB = Pool | PoolConnection;

const insertSale = (date: Date, total_price: number, user_name: string, conn: DB = connection) => {
    const sql = `INSERT INTO sales (date, total_price, user_name) VALUES (?, ?, ?)`;
    return conn.query<ResultSetHeader>(sql, [date, total_price, user_name]);

}

const insertSaleProduct = (id_sale: number, id_product: number, conn: DB = connection) => {
    const sql = `INSERT INTO products_sales (id_sale , id_product) VALUES (?, ?)`;
    return conn.query<ResultSetHeader>(sql, [id_sale, id_product]);

}

export default {
    insertSale,
    insertSaleProduct
}