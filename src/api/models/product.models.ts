import { ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../database/db.js";
import { IProduct } from "../../../@types/express/index.js";

const selectAllProducts = () => {

    const sql = `SELECT * FROM products`;

    return connection.query<RowDataPacket[] & IProduct[]>(sql);
    // return connection.query(sql);
};

const selectAllActiveProducts = () => {
    
    const sql = `SELECT * FROM products WHERE active = 1`;
    
    return connection.query<RowDataPacket[] & IProduct[]>(sql);
    // return connection.query(sql);
};

const selectProductWhereId = (id: string) => {
    
    let sql = `SELECT * FROM products where id = ?`;
    
    return connection.query<RowDataPacket[] & IProduct[]>(sql);
    // return connection.query(sql, [id]); 
};

const insertProduct = (name: string, image: string, category: string, price: string) => {
    
    let sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
    
    
    return connection.query<ResultSetHeader>(sql, [name, image, category, price]);
    // return connection.query(sql, [name, image, category, price]);
};

const updateProduct = (name: string, image: string, price: string, category: string, active: string, id: string) => {
    let sql = `
    UPDATE products
    SET name = ?, image = ?, price = ?, category = ?, active = ?
    WHERE id = ?
    `;
    
    return connection.query<ResultSetHeader>(sql, [name, image, price, category, active, id]);
    // return connection.query(sql, [name, image, price, category, active, id]);
};

// Eliminar producto
const deleteProduct = (id: string) => {
    // Opcion 1: Borrado normal, desaparece el archivo
    // let sql = "DELETE FROM products WHERE id = ?";
    
    // Opcion 2: Baja logica
    let sql = "UPDATE products set active = 0 WHERE id = ?";
    
    return connection.query<ResultSetHeader>(sql, [id]);
    // return connection.query(sql, [id]);
};

// Seleccionamos una cantidad de los productos por pagina
const selectPageProducts = (page: number, limit: number) => {
    
    const offset = (page - 1) * limit;
    
    
    const sql = `SELECT * FROM products WHERE active = 1 ORDER BY id LIMIT ? OFFSET ?`;
    
    
    return connection.query<RowDataPacket[] & IProduct[]>(sql, [limit, offset]);
    // return connection.query(sql, [limit, offset]);
};


const countProducts = () => {
    
    const sql = `SELECT COUNT(*) AS total FROM products WHERE active = 1`;
    
    return connection.query<RowDataPacket[] & IProduct[]>(sql);
    // return connection.query(sql);
};


export default {
    selectAllProducts,
    selectAllActiveProducts,
    selectProductWhereId,
    insertProduct,
    updateProduct,
    deleteProduct,
    selectPageProducts,
    countProducts
};