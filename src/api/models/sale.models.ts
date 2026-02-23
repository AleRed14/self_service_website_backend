import { ResultSetHeader, Pool, PoolConnection, RowDataPacket} from "mysql2/promise";
import connection from "../database/db.js";

type DB = Pool | PoolConnection;

const insertSale = (date: Date, total_price: number, user_name: string, conn: DB = connection) => {
    const sql = `INSERT INTO sales (date, total_price, user_name) VALUES (?, ?, ?)`;
    return conn.query<ResultSetHeader>(sql, [date, total_price, user_name]);

}

const insertSaleProduct = (id_sale: number, id_product: number, conn: DB = connection) => {
    const sql = `INSERT INTO products_sales (id_sale , id_product) VALUES (?, ?)`;
    return conn.query<ResultSetHeader>(sql, [id_sale, id_product]);

}

const selectSoldProducts = () => {
    const sql = `
            SELECT
                s.id AS sale_id,
                s.date,
                s.total_price,
                s.user_name,
                GROUP_CONCAT(p.name SEPARATOR ', ') AS products
            FROM sales s
            LEFT JOIN products_sales ps ON s.id = ps.sale_id
            LEFT JOIN products p ON ps.product_id = p.id
            GROUP BY s.id
            ORDER BY s.date DESC
        `;
    return connection.query<RowDataPacket[]>(sql);
}

const selectProductSalesWhereId = (productsData: Array<number>[][]) => {
    const sql = `
            INSERT INTO products_sales (sale_id, product_id) VALUES ?
        `;

    return connection.query(sql, [productsData]);
}

export default {
    insertSale,
    insertSaleProduct,
    selectSoldProducts,
    selectProductSalesWhereId
}